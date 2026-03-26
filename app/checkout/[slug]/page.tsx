import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products-db";
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

        <div className="mt-4 border-4 border-black bg-[#f6d90f] p-3 shadow-[4px_4px_0_#000]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-black uppercase text-black">
                {product.name}
              </h2>
              <div className="mt-2 flex gap-2">
                <span className="border-2 border-black bg-[#32d74b] px-2 py-1 text-[9px] font-black uppercase">
                  Account
                </span>
                <span className="border-2 border-black bg-black px-2 py-1 text-[9px] font-black uppercase text-white">
                  Instan
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-3xl font-black text-black">
                Rp {product.price.toLocaleString("id-ID")}
              </p>
              <p className="text-[9px] font-bold uppercase text-black/60">
                per item
              </p>
            </div>
          </div>

          <div className="mt-4 border-2 border-black bg-white p-3 text-[10px] leading-5 text-black">
            <p className="font-black uppercase">Ketentuan Garansi :</p>
            <p>- Garansi 7 hari setelah akun aktif dan voucher 100% valid</p>
            <p>- Garansi jika akun tidak bisa login</p>
            <p className="mt-2">Selain kendala di atas tidak ada garansi.</p>
          </div>

          <button className="mt-3 border-2 border-black bg-black px-3 py-2 text-[10px] font-black uppercase text-white shadow-[3px_3px_0_#000]">
            Lihat Selengkapnya !
          </button>
        </div>

        <div className="mt-5">
          <CheckoutForm product={product}/>
        </div>
      </section>
    </main>
  );
}