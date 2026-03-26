import { NextResponse } from "next/server";
import { orders } from "@/lib/orders";
import { getTransactionStatus } from "@/lib/midtrans-core";

type Props = {
  params: Promise<{ orderId: string }>;
};

export async function GET(_: Request, { params }: Props) {
  try {
    const { orderId } = await params;
    const order = orders.find((o) => o.orderId === orderId);

    if (!order) {
      return NextResponse.json({ error: "Order tidak ditemukan" }, { status: 404 });
    }

    const trx = await getTransactionStatus(orderId);

    const paid =
      trx.transaction_status === "settlement" ||
      (trx.transaction_status === "capture" && trx.fraud_status === "accept");

    if (paid) {
      order.status = "paid";
    }

    return NextResponse.json({
      status: paid ? "paid" : order.status,
      transaction_status: trx.transaction_status,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal cek status" }, { status: 500 });
  }
}