export default function Footer() {
  return (
    <footer className="border-t-4 border-black bg-[#f4efd8]">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 text-xs text-black/70 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h3 className="text-sm font-black uppercase text-black">Digital Store ⚡</h3>
          <p className="mt-2">Template store digital dengan payment otomatis.</p>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase text-black">Hubungi Kami</h3>
          <p className="mt-2">Telegram: @wayyy_store</p>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase text-black">Powered By</h3>
          <p className="mt-2">Next.js • Supabase • Pakasir</p>
        </div>
      </div>
    </footer>
  );
}