import { notFound } from "next/navigation";
import Link from "next/link";
import { products } from "@/lib/data";
import { formatRupiah } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) return notFound();

  const soldOut = product.stock <= 0;

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <Link href="/" className="text-sm font-medium text-neutral-600 hover:text-black">
          ← Kembali ke katalog
        </Link>

        <div className="mt-6 rounded-3xl border bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            {product.badge}
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight">{product.name}</h1>

          <p className="mt-4 text-sm leading-6 text-neutral-600">
            {product.description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-sm text-neutral-500">Terjual</p>
              <p className="mt-1 text-xl font-bold">{product.sold.toLocaleString("id-ID")}</p>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-sm text-neutral-500">Stok</p>
              <p className="mt-1 text-xl font-bold">
                {soldOut ? "Habis" : product.stock}
              </p>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-sm text-neutral-500">Harga</p>
              <p className="mt-1 text-xl font-bold">{formatRupiah(product.price)}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              className={`rounded-2xl px-5 py-3 text-sm font-semibold ${
                soldOut
                  ? "cursor-not-allowed bg-neutral-200 text-neutral-500"
                  : "bg-black text-white"
              }`}
            >
              {soldOut ? "Stok Habis" : "Beli Sekarang"}
            </button>

            <Link
              href="/"
              className="rounded-2xl border border-neutral-300 px-5 py-3 text-sm font-semibold"
            >
              Lihat Produk Lain
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}