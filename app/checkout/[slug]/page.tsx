import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products-db";
import type { Product } from "@/lib/product-types";
import CheckoutGate from "./CheckoutGate";

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
    <main className="min-h-screen bg-[repeating-linear-gradient(135deg,#ece8d7_0,#ece8d7_14px,#e3decb_14px,#e3decb_28px)] px-3 py-6">
      <section className="mx-auto w-full max-w-md border-4 border-black bg-[#efefef] p-4 shadow-[6px_6px_0_#000] sm:p-5">
        <div className="border-b-2 border-black pb-3">
          <p className="text-[11px] font-black uppercase tracking-wide text-black/70">
            🛒 Checkout
          </p>
          <h1 className="mt-1 text-xl font-black uppercase text-black">
            {product.name}
          </h1>
        </div>

        <CheckoutGate product={product} />
      </section>
    </main>
  );
}