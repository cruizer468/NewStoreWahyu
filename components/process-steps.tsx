const steps = [
  {
    number: "1",
    title: "Pilih Produk",
    description:
      "Pilih paket ChatGPT, akun premium, atau voucher lisensi sesuai kebutuhan Anda.",
    icon: "⚡",
  },
  {
    number: "2",
    title: "Pembayaran Instan",
    description:
      "Lakukan pembayaran via QRIS atau e-wallet. Verifikasi berjalan otomatis dan cepat.",
    icon: "💳",
  },
  {
    number: "3",
    title: "Pengiriman Kilat",
    description:
      "Detail akun, voucher, atau invite link langsung dikirim ke email atau halaman status Anda.",
    icon: "📦",
  },
];

export default function ProcessSteps() {
  return (
    <section className="border-b-4 border-black bg-[#fff7cc]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="inline-block rounded-full border-2 border-black bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wider">
            Cara Kerja
          </div>

          <h2 className="mt-4 text-3xl font-black text-black sm:text-4xl">
           Klik, Zap, Done! ⚡
          </h2>

          <div className="mt-3 h-2 w-24 rounded-full border-2 border-black bg-[#ff4d4d]" />
          <p className="mt-4 max-w-2xl text-sm leading-6 text-black/75 sm:text-base">
            Belanja cepat dengan sentuhan energi Pikachu ⚡
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative min-h-[320px] overflow-hidden rounded-[24px] border-4 border-black bg-[#f8f3df] px-6 pt-6 pb-16 shadow-[8px_8px_0_#000] transition-transform duration-200 hover:-translate-y-1"
            >
              {/* telinga pikachu */}
              <div className="absolute -top-3 left-8 h-8 w-4 rotate-[-20deg] rounded-t-full border-4 border-black border-b-0 bg-[#ffd400]" />
              <div className="absolute -top-3 right-8 h-8 w-4 rotate-[20deg] rounded-t-full border-4 border-black border-b-0 bg-[#ffd400]" />
              <div className="absolute left-8 top-[-3px] h-3 w-4 rounded-t-full bg-black" />
              <div className="absolute right-8 top-[-3px] h-3 w-4 rounded-t-full bg-black" />

              {/* isi card */}
              <div className="relative z-10 flex h-full flex-col">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-black bg-[#ffd400] text-xl font-black text-black shadow-[4px_4px_0_#000]">
                  {step.number}
                </div>

                <div className="mt-4 text-center text-3xl">{step.icon}</div>

                <h3 className="mt-3 text-center text-2xl font-black text-black">
                  {step.title}
                </h3>

                <p className="mt-3 text-center text-sm leading-6 text-black/70">
                  {step.description}
                </p>
              </div>

              {/* dekorasi sudut kanan bawah */}
              <div className="pointer-events-none absolute bottom-0 right-0 z-0 h-14 w-14 overflow-hidden rounded-tl-[18px] border-l-4 border-t-4 border-black bg-[#ffe066]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}