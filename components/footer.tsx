export function Footer() {
  return (
    <footer className="bg-[#fff8d6]">
      <div className="pika-container py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-black text-black">DIGITAL STORE ⚡</h3>
            <p className="mt-3 text-sm leading-6 text-neutral-700">
              Template toko digital modern dengan nuansa electric yellow.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-neutral-600">
              Tautan Cepat
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-neutral-800">
              <li><a href="#produk">Produk</a></li>
              <li><a href="#">Syarat & Ketentuan</a></li>
              <li><a href="#">Kebijakan Privasi</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-neutral-600">
              Hubungi Kami
            </h4>
            <p className="mt-3 text-sm text-neutral-800">@support_bot</p>
          </div>
        </div>

        <div className="mt-10 border-t-2 border-black pt-6 text-sm text-neutral-600">
          © 2026 Digital Store. Dibuat dengan Next.js.
        </div>
      </div>
    </footer>
  );
}