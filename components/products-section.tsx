"use client";

import type { Product } from "@/lib/product-types";
import ProductCard from "@/components/ProductCard";

export default function ProductsSection({ products }: { products: Product[] }) {
  return (
    <section id="produk" className="bg-[#e7e0c5]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-4">
          <div className="inline-flex rounded-full border-2 border-black bg-[#ffd400] px-3 py-1 text-[10px] font-black uppercase">
            Katalog
          </div>
          <h2 className="mt-3 text-3xl font-black text-black">Katalog Produk</h2>
          <p className="mt-2 text-sm text-black/70">
            Semua produk tampil langsung dari Supabase.
          </p>
        </div>

        <div className="mt-6 text-sm font-bold text-black">
          Total produk: {products.length}
        </div>

        {products.length === 0 ? (
          <div className="mt-6 rounded-2xl border-4 border-black bg-white p-6 shadow-[4px_4px_0_#000]">
            <p className="text-sm font-bold text-black">
              Produk kosong. Cek query Supabase atau props products.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}