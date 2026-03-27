export const dynamic = "force-dynamic";

import Hero from "@/components/hero";
import ProcessSteps from "@/components/process-steps";
import ProductsSection from "@/components/products-section";
import TrustSection from "@/components/trust-section";
import TelegramCta from "@/components/telegram-cta";
import Footer from "@/components/footer";
import { getProducts } from "@/lib/products-db";

export default async function HomePage() {
  const products = await getProducts();

  console.log("HOME PRODUCTS:", products);

  return (
    <main className="min-h-screen bg-[#E9E2C7]">
      <Hero />
      <ProcessSteps />
      <ProductsSection products={products} />
      <TrustSection />
      <TelegramCta />
      <Footer />
    </main>
  );
}