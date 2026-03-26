import { notFound } from "next/navigation";
import Link from "next/link";
import { orders } from "@/lib/orders";
import PaymentClient from "./payment-client";

type Props = {
  params: Promise<{ orderId: string }>;
};

export default async function PaymentPage({ params }: Props) {
  const { orderId } = await params;
  const order = orders.find((o) => o.orderId === orderId);

  if (!order) return notFound();

  return (
    <main className="min-h-screen bg-[#f3f3f3]">
      <div
        className="min-h-screen px-4 py-8"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #f3f3f3 0px, #f3f3f3 10px, #ece8dd 10px, #ece8dd 20px)",
        }}
      >
        <div className="mx-auto max-w-md border-4 border-black bg-[#efefef] shadow-[8px_8px_0_#000]">
          <div className="border-b-4 border-black bg-black px-4 py-4 text-white">
            <h1 className="text-2xl font-black uppercase">💰 Pembayaran QRIS</h1>
            <p className="mt-1 text-[11px] font-bold text-neutral-300">
              Selesaikan pembayaran sebelum waktu habis
            </p>
          </div>

          <div className="space-y-4 p-4">
            <div className="border-2 border-black bg-white">
              <div className="grid grid-cols-[90px_1fr] border-b border-black text-[10px] font-bold uppercase">
                <div className="border-r border-black px-3 py-2">Order ID</div>
                <div className="px-3 py-2 text-right">{order.orderId}</div>
              </div>
              <div className="grid grid-cols-[90px_1fr] border-b border-black text-[10px] font-bold uppercase">
                <div className="border-r border-black px-3 py-2">Email</div>
                <div className="px-3 py-2 text-right">{order.buyerEmail}</div>
              </div>
              <div className="grid grid-cols-[90px_1fr] text-[10px] font-bold uppercase">
                <div className="border-r border-black px-3 py-2">Metode</div>
                <div className="px-3 py-2 text-right">QRIS</div>
              </div>
            </div>

            <div className="border-4 border-black bg-white p-3 shadow-[4px_4px_0_#000]">
              <h2 className="mb-3 text-xs font-black uppercase">💰 Rincian Pembayaran</h2>
              <div className="space-y-2 text-[11px] font-bold uppercase">
                <div className="flex justify-between border-b border-black pb-2">
                  <span>Harga Produk</span>
                  <span>Rp {order.grossAmount.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between border-b border-black pb-2">
                  <span>Total Pembayaran</span>
                  <span className="text-lg">Rp {order.grossAmount.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>

            <PaymentClient
              orderId={order.orderId}
              qrUrl={order.qrUrl || ""}
              expiryTime={order.expiryTime || ""}
              grossAmount={order.grossAmount}
            />

            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/#produk"
                className="border-4 border-black bg-lime-500 px-4 py-3 text-center text-[11px] font-black uppercase text-black"
              >
                ← Kembali ke Toko
              </Link>
              <Link
                href={`/payment/${order.orderId}`}
                className="border-4 border-black bg-blue-700 px-4 py-3 text-center text-[11px] font-black uppercase text-white"
              >
                ⟳ Refresh Status
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}