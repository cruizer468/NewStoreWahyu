import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products-db";

export default async function HomePage() {
  const products = await getProducts();
  const dbConnected = products.length > 0;

  return (
    <main className="min-h-screen bg-[repeating-linear-gradient(135deg,#d6d1b8_0,#d6d1b8_18px,#c7c1a4_18px,#c7c1a4_36px)]">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="border-4 border-black bg-[#fff3b0] p-6 shadow-[6px_6px_0_#000]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-wider text-neutral-700">
                Pikachu Digital Store
              </p>
              <h1 className="mt-2 text-3xl font-black uppercase text-black sm:text-4xl">
                Produk Digital
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-800">
                Semua card produk sekarang diambil langsung dari Supabase.
              </p>
            </div>

            <div
              className={`inline-flex w-fit items-center gap-2 border-4 border-black px-3 py-2 text-xs font-black uppercase ${
                dbConnected
                  ? "bg-green-300 text-black"
                  : "bg-red-300 text-black"
              }`}
            >
              <span className="text-base">{dbConnected ? "🟢" : "🔴"}</span>
              {dbConnected ? "DB Connected" : "DB Not Connected / No Data"}
            </div>
          </div>
        </div>

        <div id="produk" className="mt-8">
          {products.length === 0 ? (
            <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0_#000]">
              <h2 className="text-xl font-black uppercase text-black">
                Produk belum tampil
              </h2>
              <p className="mt-2 text-sm text-neutral-700">
                Cek koneksi Supabase, environment variable, atau isi tabel
                <code className="mx-1 rounded bg-neutral-100 px-1 py-0.5">products</code>.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}