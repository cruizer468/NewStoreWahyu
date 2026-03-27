"use client";

import type { Product } from "@/lib/product-types";
import ProductCard from "@/components/ProductCard";

export default function ProductsSection({ products }: { products: Product[] }) {
  return (
    <section id="produk" className="bg-[#fff7cc]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="inline-flex rounded-full border-2 border-black bg-[#FACC15] px-3 py-1 text-[10px] font-black uppercase">
            Katalog
          </div>

          <h2 className="mt-4 text-4xl font-black leading-tight text-black">
            Katalog Produk
          </h2>

          <p className="mt-2 max-w-md text-sm text-black/60">
            Semua produk di cek berkala untuk menjamin kualitas.
          </p>
        </div>

        <div className="text-sm font-black text-black/80">
          Total produk: {products.length}
        </div>

        {products.length === 0 ? (
          <div className="mt-6 rounded-2xl border-4 border-black bg-white p-6 shadow-[4px_4px_0_#000]">
            <p className="text-sm font-bold text-black">
              Produk kosong. Cek query Supabase atau props products.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}