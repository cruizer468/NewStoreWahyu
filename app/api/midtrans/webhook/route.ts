import { NextResponse } from "next/server";
import { orders } from "@/lib/orders";
import { inventory } from "@/lib/inventory";
import { sendAccountEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const orderId = body.order_id;
    const transactionStatus = body.transaction_status;
    const fraudStatus = body.fraud_status;

    const isPaid =
      transactionStatus === "settlement" ||
      (transactionStatus === "capture" && fraudStatus === "accept");

    const order = orders.find((o) => o.orderId === orderId);

    if (!order) {
      return NextResponse.json(
        { error: "Order tidak ditemukan" },
        { status: 404 }
      );
    }

    if (!isPaid) {
      return NextResponse.json({ message: "Belum dibayar" });
    }

    if (order.delivered) {
      return NextResponse.json({ message: "Sudah pernah dikirim" });
    }

    const stock = inventory.find(
      (item) => item.productId === order.productId && !item.sent
    );

    if (!stock) {
      return NextResponse.json(
        { error: "Stok akun habis" },
        { status: 400 }
      );
    }

    await sendAccountEmail(
      order.buyerEmail,
      stock.accountEmail,
      stock.accountPassword
    );

    stock.sent = true;
    order.paid = true;
    order.delivered = true;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("WEBHOOK ERROR:", error);
    return NextResponse.json(
      { error: "Webhook gagal" },
      { status: 500 }
    );
  }
}