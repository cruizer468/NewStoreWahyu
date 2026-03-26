import { NextResponse } from "next/server";
import { products } from "@/lib/products";
import { getPakasirClient } from "@/lib/pakasir";

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

    const qty = Number(quantity || 1);

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
    const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/payment/${orderId}?amount=${grossAmount}`;

    const pakasir = getPakasirClient();

    const payment = await pakasir.createPayment(
      "qris",
      orderId,
      grossAmount,
      redirectUrl
    );

    return NextResponse.json({
      orderId,
      amount: grossAmount,
      paymentUrl: payment.payment_url,
    });
  } catch (error) {
    console.error("CHECKOUT ERROR:", error);
    return NextResponse.json(
      { error: "Gagal membuat pembayaran Pakasir" },
      { status: 500 }
    );
  }
}