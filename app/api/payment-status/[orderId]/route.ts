import { NextRequest, NextResponse } from "next/server";
import { getPakasirClient } from "@/lib/pakasir";
const pakasir = getPakasirClient();

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await context.params;
    const amountParam = req.nextUrl.searchParams.get("amount");

    if (!amountParam) {
      return NextResponse.json(
        { error: "Amount wajib dikirim" },
        { status: 400 }
      );
    }

    const amount = Number(amountParam);

    if (!Number.isFinite(amount) || amount < 500) {
      return NextResponse.json(
        { error: "Amount tidak valid" },
        { status: 400 }
      );
    }

    const detail = await pakasir.detailPayment(orderId, amount);

    return NextResponse.json({
      orderId,
      amount,
      status: detail.status,
      detail,
    });
  } catch (error) {
    console.error("PAYMENT STATUS ERROR:", error);
    return NextResponse.json(
      { error: "Gagal cek status pembayaran" },
      { status: 500 }
    );
  }
}