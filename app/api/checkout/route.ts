import { NextResponse } from "next/server";
import { products } from "@/lib/products";
import { orders } from "@/lib/orders";

export async function POST(req: Request) {
  try {
    const { productId, buyerEmail, buyerName, buyerWhatsapp, quantity } =
      await req.json();

    if (!buyerEmail) {
      return NextResponse.json({ error: "Email wajib diisi" }, { status: 400 });
    }

    const product = products.find((p) => p.id === productId);

    if (!product) {
      return NextResponse.json(
        { error: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    const qty = quantity || 1;

    if (qty < 1) {
      return NextResponse.json({ error: "Jumlah tidak valid" }, { status: 400 });
    }

    if (qty > product.stock) {
      return NextResponse.json(
        { error: "Jumlah melebihi stok tersedia" },
        { status: 400 }
      );
    }

    const grossAmount = product.price * qty;
    const orderId = `ORDER-${Date.now()}`;

    orders.push({
      orderId,
      productId,
      buyerEmail,
      buyerName,
      buyerWhatsapp,
      quantity: qty,
      grossAmount,
      status: "pending",
      delivered: false,
    });

    const pakasirSlug = "wayyystoredigital";
    const redirectUrl = `https://wayyystoredigital.netlify.app/payment/${orderId}`;

    const paymentUrl =
      `https://app.pakasir.com/pay/${pakasirSlug}/${grossAmount}` +
      `?order_id=${encodeURIComponent(orderId)}` +
      `&redirect=${encodeURIComponent(redirectUrl)}`;

    return NextResponse.json({
      orderId,
      paymentUrl,
    });
  } catch (error) {
    console.error("CHECKOUT ERROR:", error);
    return NextResponse.json(
      { error: "Gagal membuat pembayaran Pakasir" },
      { status: 500 }
    );
  }
}