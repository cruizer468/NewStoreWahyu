import { NextRequest, NextResponse } from "next/server";
import {
  getOrder,
  updateOrderStatus,
  markOrderDelivered,
} from "@/lib/orders";
import { products } from "@/lib/products";
import { takeInventory, releaseInventory } from "@/lib/inventory";
import { sendAccountEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { amount, order_id, status } = body;

    console.log("Pakasir webhook masuk:", body);

    if (!order_id || !amount) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const order = getOrder(order_id);

    if (!order) {
      return NextResponse.json(
        { error: "Order tidak ditemukan" },
        { status: 404 }
      );
    }

    if (order.grossAmount !== Number(amount)) {
      return NextResponse.json(
        { error: "Amount tidak cocok" },
        { status: 400 }
      );
    }

    if (order.status === "paid" && order.delivered) {
      return NextResponse.json({
        success: true,
        message: "Order sudah pernah diproses",
      });
    }

    if (status === "completed") {
      updateOrderStatus(order_id, "paid");

      const qty = order.quantity || 1;
      const product = products.find((p) => p.id === order.productId);

      if (!product) {
        return NextResponse.json(
          { error: "Produk tidak ditemukan" },
          { status: 404 }
        );
      }

      const items = takeInventory(order.productId, qty);

      if (!items) {
        return NextResponse.json(
          { error: "Inventory tidak cukup" },
          { status: 500 }
        );
      }

      try {
        await sendAccountEmail({
          to: order.buyerEmail,
          buyerName: order.buyerName,
          productName: product.name,
          orderId: order.orderId,
          accounts: items,
        });

        markOrderDelivered(
          order.orderId,
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