"use client";

import { useMemo, useState } from "react";
import { categories, products, totalSold } from "@/lib/data";
import { Hero } from "@/components/hero";
import { ProcessSteps } from "@/components/process-steps";
import { CategoryTabs } from "@/components/category-tabs";
import { ProductGrid } from "@/components/product-grid";
import { TrustSection } from "@/components/trust-section";
import { TelegramCta } from "@/components/telegram-cta";
import { Footer } from "@/components/footer";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-[#fff8d6] text-neutral-900">
      {/* HERO */}
      <Hero />

      {/* STEP */}
      <ProcessSteps />

      {/* PRODUK */}
      <section id="produk" className="pika-container py-16">
        <div className="mb-6">
          <span className="pika-badge-yellow">⚡ Katalog</span>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-black md:text-4xl">
            Katalog Produk
          </h2>

          <p className="mt-2 text-sm text-neutral-700">
            Semua produk dicek berkala untuk menjaga kualitas.
          </p>

          <p className="mt-3 text-sm font-bold text-black">
            {totalSold.toLocaleString("id-ID")} produk terjual
          </p>
        </div>

        <CategoryTabs
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />

        <ProductGrid products={filteredProducts} />
      </section>

      {/* TRUST */}
      <TrustSection />

      {/* TELEGRAM */}
      <TelegramCta />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}