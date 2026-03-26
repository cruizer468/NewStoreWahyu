const steps = [
  {
    number: "1",
    title: "Pilih Produk",
    description: "Pilih paket atau akun digital sesuai kebutuhan Anda.",
  },
  {
    number: "2",
    title: "Pembayaran Cepat",
    description: "Lakukan pembayaran dengan metode yang tersedia.",
  },
  {
    number: "3",
    title: "Pengiriman Kilat",
    description: "Detail akun, invite, atau voucher dikirim dengan cepat.",
  },
];

export function ProcessSteps() {
  return (
    <section className="pika-grid-bg bg-[#fff8d6]">
      <div className="pika-container py-16">
        <h2 className="pika-section-title">Proses Instan & Otomatis</h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="pika-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-black text-sm font-bold text-white">
                {step.number}
              </div>

              <h3 className="mt-4 text-lg font-black text-black">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-700">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}