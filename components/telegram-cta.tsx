import Link from "next/link";

export default function TelegramCta() {
  return (
    <section id="telegram" className="bg-[#fff7cc] text-black">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Badge */}
        <div className="inline-flex rounded-full border-2 border-black bg-[#FACC15] px-3 py-1 text-[10px] font-black uppercase text-black">
          Join Channel
        </div>

        {/* Title */}
        <h2 className="mt-4 text-3xl font-black leading-tight">
          Join Channel Telegram ⚡
        </h2>

        {/* Description */}
        <p className="mt-3 max-w-xl text-sm leading-6 text-black/70">
          Untuk notifikasi promo, update produk baru, dan status order.
        </p>

        {/* List */}
        <ul className="mt-6 space-y-2 text-sm text-black/80">
          <li>• Update produk baru & promo</li>
          <li>• Notifikasi stock masuk</li>
          <li>• Support cepat via Telegram</li>
        </ul>

        {/* Button */}
        <Link
          href="https://t.me/+9vbgpThnEVY2Mzk1"
          target="_blank"
          className="mt-8 inline-block rounded-md border-4 border-black bg-[#FACC15] px-6 py-3 text-sm font-black uppercase text-black shadow-[4px_4px_0_#000] transition hover:translate-y-[-2px]"
        >
          Gabung Channel Sekarang
        </Link>
      </div>
    </section>
  );
}