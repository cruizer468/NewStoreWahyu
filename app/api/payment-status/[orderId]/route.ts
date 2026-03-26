import { NextResponse } from "next/server";
import { getOrder } from "@/lib/orders";

export async function GET(
  _req: Request,
  { params }: { params: { orderId: string } }
) {
  const order = getOrder(params.orderId);

  if (!order) {
    return NextResponse.json(
      { error: "Order tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    orderId: order.orderId,
    status: order.status,
    delivered: order.delivered,
  });
}