import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/orders";
import AutoBackHome from "./payment-client";

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  const order = await getOrderById(orderId);

  if (!order) {
    notFound();
  }

  const isPaid = order.payment_status === "paid";

  return (
    <main className="min-h-screen bg-[repeating-linear-gradient(135deg,#ece8d7_0,#ece8d7_14px,#e3decb_14px,#e3decb_28px)] px-4 py-8">
      <section className="mx-auto w-full max-w-md border-4 border-black bg-[#efefef] p-5 shadow-[6px_6px_0_#000]">
        
        {/* HEADER */}
        <div className="border-b-2 border-black pb-3">
          <h1 className="text-xl font-black uppercase text-black">
            {isPaid ? "✅ Pembayaran Berhasil" : "⏳ Menunggu Pembayaran"}
          </h1>

          <p className="mt-2 text-sm text-black/70">
            {isPaid
              ? "Pembayaran sudah diterima dan pesanan sedang diproses."
              : "Silakan selesaikan pembayaran Anda."}
          </p>
        </div>

        {/* INFO PENGIRIMAN */}
        <div className="mt-4 border-4 border-black bg-[#fff3b0] p-4">
          <p className="text-sm font-black uppercase text-black">
            Pengiriman Akan Dikirim Ke:
          </p>

          <div className="mt-3 space-y-2 text-[12px] text-black">
            <div className="flex justify-between border-b border-black pb-2">
              <span className="font-black">Email</span>
              <span>{order.buyer_email}</span>
            </div>

            <div className="flex justify-between border-b border-black pb-2">
              <span className="font-black">WhatsApp</span>
              <span>{order.buyer_whatsapp}</span>
            </div>
          </div>
        </div>

        {/* DETAIL ORDER */}
        <div className="mt-4 border-4 border-black bg-white p-4">
          <p className="text-sm font-black uppercase text-black">
            Detail Pesanan
          </p>

          <div className="mt-3 space-y-2 text-[12px] text-black">
            <div className="flex justify-between border-b border-black pb-2">
              <span className="font-black">Invoice</span>
              <span>{order.invoice_code}</span>
            </div>

            <div className="flex justify-between border-b border-black pb-2">
              <span className="font-black">Produk</span>
              <span>{order.products?.name}</span>
            </div>

            <div className="flex justify-between border-b border-black pb-2">
              <span className="font-black">Jumlah</span>
              <span>{order.quantity}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-black">Total</span>
              <span>
                Rp {Number(order.total_amount).toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className="mt-4 border-4 border-black bg-white p-4 text-[12px] text-black">
          {isPaid ? (
            <>
              Invoice dan detail akun akan dikirim ke email atau WhatsApp yang Anda isi.
            </>
          ) : (
            <>Menunggu pembayaran dari sistem Pakasir...</>
          )}
        </div>

        {/* AUTO REDIRECT */}
        {isPaid && (
          <div className="mt-4">
            <AutoBackHome />
          </div>
        )}
      </section>
    </main>
  );
}