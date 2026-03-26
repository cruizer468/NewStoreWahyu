import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products-db";
import CheckoutForm from "./CheckoutForm";
import type { Product } from "@/lib/product-types";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product: Product | null = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[repeating-linear-gradient(135deg,#d6d1b8_0,#d6d1b8_18px,#c7c1a4_18px,#c7c1a4_36px)]">
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 border-4 border-black bg-[#fff3b0] p-5 shadow-[5px_5px_0_#000]">
          <p className="text-[11px] font-black uppercase tracking-wide text-neutral-700">
            Checkout Produk
          </p>
          <h1 className="mt-2 text-2xl font-black uppercase text-black">
            {product.name}
          </h1>
          <p className="mt-2 text-sm text-neutral-700">
            {product.description || "Produk digital siap kirim otomatis."}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <aside className="border-4 border-black bg-white p-5 shadow-[5px_5px_0_#000]">
            <h2 className="text-lg font-black uppercase text-black">
              Ringkasan Produk
            </h2>

            <div className="mt-4 space-y-3 text-[11px] font-black uppercase text-black">
              <div className="flex items-center justify-between border-b border-black pb-2">
                <span>Nama</span>
                <span>{product.name}</span>
              </div>
              <div className="flex items-center justify-between border-b border-black pb-2">
                <span>Harga</span>
                <span>Rp {product.price.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex items-center justify-between border-b border-black pb-2">
                <span>Stok</span>
                <span>{product.stock}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Status</span>
                <span>{product.stock > 0 ? "Tersedia" : "Habis"}</span>
              </div>
            </div>
          </aside>

          <section className="border-4 border-black bg-white p-5 shadow-[5px_5px_0_#000]">
            <CheckoutForm product={product} />
          </section>
        </div>
      </section>
    </main>
  );
}