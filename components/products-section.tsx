"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/product-types";
import ProductCard from "@/components/ProductCard";
import CategoryTabs from "@/components/category-tabs";

function detectCategory(product: Product) {
  const text = `${product.name} ${product.description || ""}`.toLowerCase();

  if (text.includes("fore")) return "Fore";
  if (text.includes("netflix")) return "Netflix";
  if (text.includes("spotify")) return "Spotify";
  if (text.includes("canva")) return "Canva";
  if (text.includes("youtube")) return "YouTube";

  return "Lainnya";
}

export default function ProductsSection({ products }: { products: Product[] }) {
  const categories = useMemo(() => {
    const dynamic = Array.from(new Set(products.map(detectCategory)));
    return ["Semua Produk", ...dynamic];
  }, [products]);

  const [activeCategory, setActiveCategory] = useState("Semua Produk");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "Semua Produk") return products;
    return products.filter((product) => detectCategory(product) === activeCategory);
  }, [products, activeCategory]);

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

        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}