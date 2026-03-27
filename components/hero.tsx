import Link from "next/link";

export default function Hero() {
  return (
    <section className="border-b-4 border-black bg-[#ffd400]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-16">
        <div className="flex flex-col justify-center">
          <div className="mb-4 inline-flex w-fit rounded-full border-2 border-black bg-[#fff3b0] px-3 py-1 text-[10px] font-black uppercase tracking-wide">
            Top up & akun digital murah
          </div>

          <h1 className="max-w-xl text-4xl font-black leading-tight text-black sm:text-5xl">
            Solusi Kebutuhan
            <br />
            Digital Premium ⚡
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-6 text-black/80 sm:text-base">
            Solusi kebutuhan digital premium mulai dari Akun digital & voucher premium
            hingga lisensi software dengan harga hemat dan proses instan.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#produk"
              className="rounded-md border-4 border-black bg-black px-5 py-3 text-sm font-black uppercase text-white shadow-[4px_4px_0_#000]"
            >
              Beli Produk
            </Link>

            <Link
              href="#telegram"
              className="rounded-md border-4 border-black bg-white px-5 py-3 text-sm font-black uppercase text-black shadow-[4px_4px_0_#000]"
            >
              Join Channel
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-md rounded-2xl border-4 border-black bg-[#f3f0df] p-6 shadow-[6px_6px_0_#000]">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-black bg-[#ffd400] text-3xl">
                ⚡
              </div>
              <h2 className="mt-4 text-2xl font-black">Wayyy Store</h2>
              <p className="mt-2 text-sm text-black/70">
                Semua kebutuhan digital, dalam sekali klik.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}