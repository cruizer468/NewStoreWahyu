import { NextRequest, NextResponse } from "next/server";
import {
  getOrder,
  updateOrderStatus,
  markOrderDelivered,
} from "@/lib/orders";
import { getSupabaseServerClient } from "@/lib/supabase";
import {
  takeInventory,
  releaseInventory,
  markInventoryDelivered,
} from "@/lib/inventory";
import { sendAccountEmail } from "@/lib/email";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Pakasir webhook endpoint aktif. Gunakan method POST.",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, order_id, status } = body;

    console.log("PAKASIR WEBHOOK BODY:", body);

    if (!order_id || !amount) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const order = await getOrder(order_id);

    if (!order) {
      return NextResponse.json(
        { error: "Order tidak ditemukan" },
        { status: 404 }
      );
    }

    if (Number(order.gross_amount) !== Number(amount)) {
      return NextResponse.json(
        { error: "Amount tidak cocok" },
        { status: 400 }
      );
    }

    if (
      order.payment_status === "paid" &&
      order.delivery_status === "delivered"
    ) {
      return NextResponse.json({
        success: true,
        message: "Order sudah pernah diproses",
      });
    }

    if (status !== "completed") {
      return NextResponse.json({
        success: true,
        message: "Status belum completed, tidak ada aksi.",
      });
    }

    await updateOrderStatus(order.order_id, "paid");

    const supabase = getSupabaseServerClient();
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id, name")
      .eq("id", order.product_id)
      .maybeSingle();

    if (productError || !product) {
      console.error("WEBHOOK PRODUCT ERROR:", productError);
      return NextResponse.json(
        { error: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    const qty = Number(order.quantity || 1);
    const items = await takeInventory(order.product_id, qty, order.order_id);

    if (!items || items.length < qty) {
      return NextResponse.json(
        { error: "Inventory tidak cukup" },
        { status: 500 }
      );
    }

    try {
      const deliveredAccounts = items.map((item) => ({
        email: item.account_email ?? undefined,
        password: item.account_password ?? undefined,
        code: item.account_code ?? undefined,
      }));

      await sendAccountEmail({
        to: order.buyer_email,
        buyerName: order.buyer_name,
        productName: product.name,
        orderId: order.order_id,
        accounts: deliveredAccounts,
      });

      const inventoryIds = items.map((item) => item.id);

      await markInventoryDelivered(inventoryIds, order.order_id);
      await markOrderDelivered(order.order_id, inventoryIds);

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("EMAIL OR DELIVERY ERROR:", error);

      await releaseInventory(
        items.map((item) => item.id),
        order.order_id
      );

      return NextResponse.json(
        { error: "Gagal kirim akun / update delivery" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("WEBHOOK ERROR:", error);
    return NextResponse.json({ error: "Webhook gagal" }, { status: 500 });
  }
}