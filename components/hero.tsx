export function Hero() {
  return (
    <section className="border-b-2 border-black bg-yellow-300">
      <div className="pika-container py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="pika-badge-yellow">⚡ Premium Digital Store</span>

            <h1 className="mt-5 max-w-2xl text-4xl font-black leading-tight tracking-tight text-black md:text-6xl">
              Solusi Kebutuhan
              <span className="block">Digital Premium ⚡</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-neutral-800 md:text-lg">
              Solusi Kebutuhan Digital Premium. Mulai dari Akses ChatGPT Team, Akun Hiburan, hingga Lisensi Software Original dengan Harga Terjangkau.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#produk" className="pika-button-primary">
                Lihat Produk
              </a>
              <a href="#telegram" className="pika-button-secondary">
                Join Channel
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="pika-card pika-lightning flex h-[280px] w-full max-w-[420px] items-center justify-center bg-white p-8">
              <div className="text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-black bg-yellow-400 text-4xl shadow-[4px_4px_0px_#111]">
                  ⚡
                </div>
                <h3 className="mt-5 text-2xl font-black text-black">
                  Wayyy Store
                </h3>
                <p className="mt-3 text-sm leading-6 text-neutral-700">
                  Semua Kebutuhan Digital, Dalam Sekali Klik.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}