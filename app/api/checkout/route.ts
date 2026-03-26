import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { getPakasirClient } from "@/lib/pakasir";

export async function POST(req: Request) {
  try {
    const { productId, buyerEmail, buyerName, buyerWhatsapp, quantity } =
      await req.json();

    if (!buyerEmail) {
      return NextResponse.json({ error: "Email wajib diisi" }, { status: 400 });
    }

    const qty = Number(quantity || 1);

    if (qty < 1) {
      return NextResponse.json({ error: "Jumlah tidak valid" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();

    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id, name, slug, price, stock, is_active")
      .eq("id", productId)
      .eq("is_active", true)
      .single();

    if (productError || !product) {
      return NextResponse.json(
        { error: "Produk tidak ditemukan" },
        { status: 404 }
      );
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

    const { error: insertError } = await supabase.from("orders").insert({
      order_id: orderId,
      product_id: product.id,
      buyer_email: buyerEmail,
      buyer_name: buyerName,
      buyer_whatsapp: buyerWhatsapp,
      quantity: qty,
      gross_amount: grossAmount,
      payment_status: "pending",
      delivery_status: "pending",
    });

    if (insertError) {
      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

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