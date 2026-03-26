import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { getPakasirClient } from "@/lib/pakasir";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await context.params;
    const { amount } = await req.json();

    const supabase = getSupabaseServerClient();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("order_id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Order tidak ditemukan" }, { status: 404 });
    }

    if (order.delivery_status === "delivered" && order.delivered_accounts) {
      return NextResponse.json({
        success: true,
        alreadyDelivered: true,
        accounts: order.delivered_accounts,
      });
    }

    const pakasir = getPakasirClient();
    const paymentDetail = await pakasir.detailPayment(orderId, Number(amount));

    if (paymentDetail.status !== "completed") {
      return NextResponse.json(
        { error: "Pembayaran belum completed" },
        { status: 400 }
      );
    }

    const { data: items, error: invError } = await supabase
      .from("inventory")
      .select("*")
      .eq("product_id", order.product_id)
      .eq("is_sold", false)
      .limit(order.quantity);

    if (invError || !items || items.length < order.quantity) {
      return NextResponse.json(
        { error: "Inventory tidak cukup" },
        { status: 500 }
      );
    }

    const inventoryIds = items.map((item) => item.id);

    const { error: markSoldError } = await supabase
      .from("inventory")
      .update({
        is_sold: true,
        sold_at: new Date().toISOString(),
      })
      .in("id", inventoryIds);

    if (markSoldError) {
      return NextResponse.json(
        { error: markSoldError.message },
        { status: 500 }
      );
    }

    const { error: stockError } = await supabase.rpc("decrement_product_stock", {
      p_product_id: order.product_id,
      p_qty: order.quantity,
    });

    if (stockError) {
      return NextResponse.json(
        { error: stockError.message },
        { status: 500 }
      );
    }

    const deliveredAccounts = items.map((item) => ({
      id: item.id,
      email: item.account_email,
      password: item.account_password,
      code: item.account_code,
    }));

    const { error: updateOrderError } = await supabase
      .from("orders")
      .update({
        payment_status: "paid",
        delivery_status: "delivered",
        paid_at: new Date().toISOString(),
        delivered_accounts: deliveredAccounts,
      })
      .eq("order_id", orderId);

    if (updateOrderError) {
      return NextResponse.json(
        { error: updateOrderError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      alreadyDelivered: false,
      accounts: deliveredAccounts,
    });
  } catch (error) {
    console.error("DELIVER ERROR:", error);
    return NextResponse.json(
      { error: "Gagal mengirim akun" },
      { status: 500 }
    );
  }
}