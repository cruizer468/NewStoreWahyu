import { NextResponse } from "next/server";
import { products } from "@/lib/products";
import { orders } from "@/lib/orders";
import { createQrisCharge } from "@/lib/midtrans-core";

export async function POST(req: Request) {
  try {
    const { productId, buyerEmail, buyerName, buyerWhatsapp, quantity } =
      await req.json();

    if (!buyerEmail) {
      return NextResponse.json({ error: "Email wajib diisi" }, { status: 400 });
    }

    const product = products.find((p) => p.id === productId);

  if (!product) {
  return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
}

const qty = quantity || 1;

if (qty < 1) {
  return NextResponse.json({ error: "Jumlah tidak valid" }, { status: 400 });
}

if (qty > product.stock) {
  return NextResponse.json({ error: "Jumlah melebihi stok tersedia" }, { status: 400 });
}

    
    const grossAmount = product.price * qty;
    const orderId = `ORDER-${Date.now()}`;

    const charge = await createQrisCharge({
      orderId,
      grossAmount,
    });

    const qrAction = Array.isArray(charge.actions)
      ? charge.actions.find((a: any) => a.name === "generate-qr-code")
      : null;

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
      qrString: charge.qr_string,
      qrUrl: qrAction?.url,
      expiryTime: charge.expiry_time,
    });

    return NextResponse.json({
      orderId,
      paymentUrl: `/payment/${orderId}`,
    });
  } catch (error) {
    console.error("CHECKOUT ERROR:", error);
    return NextResponse.json(
      { error: "Gagal membuat pembayaran QRIS" },
      { status: 500 }
    );
  }
}