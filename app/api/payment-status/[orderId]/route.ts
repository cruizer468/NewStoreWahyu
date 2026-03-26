import { NextRequest, NextResponse } from "next/server";
import { getOrder } from "@/lib/orders";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await context.params;

  const order = getOrder(orderId);

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