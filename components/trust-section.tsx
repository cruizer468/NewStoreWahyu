const items = [
  {
    title: "Aman & Terpercaya",
    description: "Transaksi dibuat sederhana dan data pelanggan dijaga dengan baik.",
  },
  {
    title: "Sistem Otomatis",
    description: "Pesanan dapat diproses cepat tanpa harus menunggu balasan manual.",
  },
  {
    title: "Bantuan 24/7",
    description: "Sediakan channel bantuan agar pengguna mudah menghubungi support.",
  },
];

export function TrustSection() {
  return (
    <section className="bg-[#fff3a3]">
      <div className="pika-container py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="pika-card p-6">
              <div className="mb-3 text-2xl">⚡</div>
              <h3 className="text-lg font-black text-black">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-700">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}