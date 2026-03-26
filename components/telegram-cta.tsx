export function TelegramCta() {
  return (
    <section id="telegram" className="border-y-2 border-black bg-black text-white">
      <div className="pika-container py-16">
        <div className="max-w-2xl">
          <span className="pika-badge-yellow">⚡ Community</span>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-yellow-300 md:text-4xl">
            Join Channel Telegram
          </h2>

          <p className="mt-4 text-neutral-300">
            Pakai section ini untuk notifikasi promo, update produk baru, dan
            status order.
          </p>

          <ul className="mt-6 space-y-2 text-sm text-neutral-200">
            <li>• Update produk baru & promo</li>
            <li>• Notifikasi status order</li>
            <li>• Support cepat via Telegram</li>
            <li>• Giveaway untuk member</li>
          </ul>

          <a
            href="https://t.me/"
            target="_blank"
            className="mt-8 inline-flex rounded-2xl border-2 border-black bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300"
          >
            Join Channel Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}