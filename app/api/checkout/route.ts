import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { getPakasirClient } from "@/lib/pakasir";

export async function POST(req: Request) {
  try {
    const { productId, buyerEmail, buyerName, buyerWhatsapp, quantity } =
      await req.json();

    console.log("CHECKOUT BODY:", {
      productId,
      buyerEmail,
      buyerName,
      buyerWhatsapp,
      quantity,
    });

    if (!buyerEmail) {
      return NextResponse.json({ error: "Email wajib diisi" }, { status: 400 });
    }

    if (!buyerName) {
      return NextResponse.json(
        { error: "Nama pembeli wajib diisi" },
        { status: 400 }
      );
    }

    if (!buyerWhatsapp) {
      return NextResponse.json(
        { error: "WhatsApp wajib diisi" },
        { status: 400 }
      );
    }

    const qty = Number(quantity || 1);

    if (!Number.isFinite(qty) || qty < 1) {
      return NextResponse.json({ error: "Jumlah tidak valid" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();

    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id, name, slug, price, stock, is_active")
      .eq("id", productId)
      .eq("is_active", true)
      .maybeSingle();

    console.log("PRODUCT RESULT:", { product, productError });

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

    const grossAmount = Number(product.price) * qty;
    const now = Date.now();
    const orderId = `ORDER-${now}`;
    const invoiceCode = `INV-${now}`;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    console.log("ENV CHECK:", {
      appUrl,
      hasPakasirSlug: Boolean(process.env.PAKASIR_SLUG),
      hasPakasirApiKey: Boolean(process.env.PAKASIR_API_KEY),
    });

    if (!appUrl) {
      return NextResponse.json(
        { error: "NEXT_PUBLIC_APP_URL belum di-set" },
        { status: 500 }
      );
    }

    const redirectUrl = `${appUrl}/payment/${orderId}?amount=${grossAmount}`;

    console.log("ORDER DATA:", {
      orderId,
      invoiceCode,
      grossAmount,
      redirectUrl,
    });

    const { error: insertError } = await supabase.from("orders").insert({
      order_id: orderId,
      invoice_code: invoiceCode,
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
      console.error("INSERT ORDER ERROR:", insertError);

      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    console.log("ORDER INSERT SUCCESS");

    try {
      const pakasir = getPakasirClient();
      const payment = await pakasir.createPayment(
        "qris",
        orderId,
        grossAmount,
        redirectUrl
      );

      console.log("PAKASIR PAYMENT RESPONSE:", payment);

      if (!payment?.payment_url) {
        return NextResponse.json(
          { error: "payment_url dari Pakasir tidak ditemukan" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        orderId,
        invoiceCode,
        amount: grossAmount,
        paymentUrl: payment.payment_url,
      });
    } catch (pakasirError) {
      console.error("PAKASIR CREATE PAYMENT ERROR:", pakasirError);

      return NextResponse.json(
        { error: "Gagal membuat pembayaran Pakasir" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("CHECKOUT ERROR:", error);
    return NextResponse.json(
      { error: "Gagal membuat pembayaran Pakasir" },
      { status: 500 }
    );
  }
}