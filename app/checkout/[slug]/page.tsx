import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CheckoutForm from "./CheckoutForm";
import { products } from "@/lib/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CheckoutPage({ params }: Props) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) return notFound();

  return (
    <main className="min-h-screen bg-[#fff7cc]">
      <div
        className="min-h-screen px-4 py-8"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #fff7cc 0px, #fff7cc 12px, #fff1a8 12px, #fff1a8 24px)",
        }}
      >
        <div className="mx-auto max-w-md overflow-hidden border-4 border-black bg-[#fff8dc] shadow-[8px_8px_0_#000]">
          <div className="border-b-4 border-black bg-yellow-400 px-4 py-3">
            <h1 className="text-xl font-black tracking-tight text-black">
              ⚡ CHECKOUT FORM
            </h1>
          </div>

          <div className="space-y-5 p-4">
            <section className="border-4 border-black bg-white p-3 shadow-[4px_4px_0_#000]">
              <div className="flex items-start gap-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden border-2 border-black bg-yellow-300">
                  {product.image ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <span className="text-2xl">⚡</span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="text-sm font-black uppercase leading-5 text-black">
                        {product.name}
                      </h2>

                      <div className="mt-2 flex flex-wrap gap-1">
                        <span className="border-2 border-black bg-black px-2 py-0.5 text-[10px] font-black uppercase text-white">
                          Instant
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-3xl font-black text-black">
                        Rp {product.price.toLocaleString("id-ID")}
                      </p>
                      <p className="text-[10px] font-bold uppercase text-neutral-500">
                        per item
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-2 border-black bg-[#fff8dc] p-3 text-[11px] leading-5 text-black">
                <p className="font-black">Ketentuan Garansi:</p>
                <p>- Garansi 7 hari selama order apabila tidak ada voucher baru</p>
                <p>- User SOC</p>
                <p>- Garansi jika akun tidak bisa login</p>
                <p className="mt-2 font-black">Selain kendala diatas tidak ada garansi</p>
              </div>

              <div className="mt-4">
                <Link
                  href={`/products/${product.slug}`}
                  className="inline-block border-2 border-black bg-black px-4 py-2 text-[11px] font-black uppercase text-white shadow-[3px_3px_0_#facc15]"
                >
                  Lihat Selengkapnya
                </Link>
              </div>
            </section>

            <CheckoutForm product={product} />

            <div className="border-t-2 border-black pt-4 text-center text-[10px] leading-4 text-neutral-700">
              <p>⚡ PEMBAYARAN 100% AMAN VIA QRIS</p>
              <p>⚡ INFORMASI DIKIRIM KE EMAIL PEMBELI</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}