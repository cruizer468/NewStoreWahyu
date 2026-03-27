import Link from "next/link";

export default function TelegramCta() {
  return (
    <section id="telegram" className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="inline-flex rounded-full border-2 border-[#ffd400] bg-[#ffd400] px-3 py-1 text-[10px] font-black uppercase text-black">
          Join Channel
        </div>

        <h2 className="mt-4 text-3xl font-black">Join Channel Telegram</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80">
          Pakai section ini untuk notifikasi promo, update produk baru, dan status order.
        </p>

        <ul className="mt-5 space-y-2 text-sm text-white/80">
          <li>• Update produk baru & promo</li>
          <li>• Notifikasi stock masuk</li>
          <li>• Support cepat via Telegram</li>
        </ul>

        <Link
          href="https://t.me/+9vbgpThnEVY2Mzk1"
          target="_blank"
          className="mt-6 inline-block rounded-md border-4 border-[#ffd400] bg-[#ffd400] px-5 py-3 text-sm font-black uppercase text-black shadow-[4px_4px_0_#000]"
        >
          Gabung Channel Sekarang
        </Link>
      </div>
    </section>
  );
}