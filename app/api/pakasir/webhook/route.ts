import { NextRequest, NextResponse } from "next/server";
import {
  getOrder,
  updateOrderStatus,
  markOrderDelivered,
} from "@/lib/orders";
import { products } from "@/lib/products";
import { takeInventory, releaseInventory } from "@/lib/inventory";
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

    console.log("Pakasir webhook masuk:", body);

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

    if (status === "completed") {
      await updateOrderStatus(order.order_id, "paid");

      const qty = order.quantity || 1;
      const product = products.find((p) => p.id === order.product_id);

      if (!product) {
        return NextResponse.json(
          { error: "Produk tidak ditemukan" },
          { status: 404 }
        );
      }

      const items = takeInventory(order.product_id, qty);

      if (!items) {
        return NextResponse.json(
          { error: "Inventory tidak cukup" },
          { status: 500 }
        );
      }

      try {
        await sendAccountEmail({
          to: order.buyer_email,
          buyerName: order.buyer_name,
          productName: product.name,
          orderId: order.order_id,
          accounts: items,
        });

        await markOrderDelivered(
          order.order_id,
          items.map((item) => item.id)
        );
      } catch (error) {
        releaseInventory(items.map((item) => item.id));
        throw error;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook gagal" }, { status: 500 });
  }
}