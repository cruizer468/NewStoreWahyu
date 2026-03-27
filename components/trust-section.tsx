const items = [
  {
    title: "Aman & Terpercaya",
    desc: "Transaksi dibantu verifikasi dan proses pengiriman cepat.",
  },
  {
    title: "Sistem Otomatis",
    desc: "Payment gateway dan pengiriman akun bisa berjalan otomatis.",
  },
  {
    title: "Bantuan 24/7",
    desc: "Kendala checkout atau produk bisa dibantu lewat channel.",
  },
];

export default function TrustSection() {
  return (
    <section className="bg-[#fff7cc]">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border-4 border-black bg-white p-5 shadow-[4px_4px_0_#000]"
          >
            <p className="text-xs">⚡</p>
            <h3 className="mt-2 text-sm font-black uppercase">{item.title}</h3>
            <p className="mt-2 text-xs leading-5 text-black/70">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}