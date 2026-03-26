import { NextResponse } from "next/server";
import { pakasir } from "@/lib/pakasir";

export async function POST(req: Request) {
  try {
    const { orderId, amount } = await req.json();

    if (!orderId || !amount) {
      return NextResponse.json(
        { error: "orderId dan amount wajib diisi" },
        { status: 400 }
      );
    }

    const result = await pakasir.simulationPayment(orderId, Number(amount));

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("SIMULATION ERROR:", error);
    return NextResponse.json(
      { error: "Gagal simulasi pembayaran" },
      { status: 500 }
    );
  }
}