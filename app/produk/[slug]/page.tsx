import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products-db";
import type { Product } from "@/lib/product-types";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product: Product | null = await getProductBySlug(slug);

  if (!product || !product.is_active) {
    notFound();
  }

  const soldOut = product.stock <= 0;

  return (
    <main className="min-h-screen bg-[repeating-linear-gradient(135deg,#ece8d7_0,#ece8d7_14px,#e3decb_14px,#e3decb_28px)] px-3 py-6">
      <section className="mx-auto w-full max-w-md border-4 border-black bg-[#efefef] p-4 shadow-[6px_6px_0_#000] sm:p-5">
        <div className="flex items-center justify-between border-b-2 border-black pb-3">
          <div>
            <p className="text-[11px] font-black uppercase tracking-wide text-black/70">
              ⚡ Detail Produk
            </p>
            <h1 className="mt-1 text-xl font-black uppercase text-black">
              {product.name}
            </h1>
          </div>

          <Link
            href="/"
            className="border-2 border-black bg-white px-3 py-1 text-[10px] font-black uppercase text-black shadow-[2px_2px_0_#000]"
          >
            Kembali
          </Link>
        </div>

        <div className="mt-4 border-4 border-black bg-[#f6d90f] p-3 shadow-[4px_4px_0_#000]">
          <div className="text-center">
            <h2 className="text-lg font-black uppercase text-black">
              {product.name}
            </h2>

            <p className="mt-2 text-3xl font-black text-black">
              Rp {product.price.toLocaleString("id-ID")}
            </p>

            <div className="mt-3 inline-block border-2 border-black bg-[#9ee7f5] px-3 py-2 text-[10px] font-black uppercase shadow-[3px_3px_0_#000]">
              ⚡ Stok tersedia: {soldOut ? "Habis" : product.stock}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="border-2 border-black bg-white px-2 py-2 text-center text-[9px] font-black uppercase shadow-[2px_2px_0_#000]">
              ⚡ Instan
            </div>
            <div className="border-2 border-black bg-white px-2 py-2 text-center text-[9px] font-black uppercase shadow-[2px_2px_0_#000]">
              🛡 Garansi
            </div>
            <div className="border-2 border-black bg-white px-2 py-2 text-center text-[9px] font-black uppercase shadow-[2px_2px_0_#000]">
              💬 24/7
            </div>
          </div>

          <div className="mt-4 border-2 border-black bg-white p-3 text-[10px] leading-5 text-black">
            <p className="font-black uppercase">Deskripsi Produk :</p>
            <p className="mt-2 whitespace-pre-line">
              {product.description ||
                "Produk digital premium dengan proses instan dan otomatis."}
            </p>
          </div>
        </div>

        <div className="mt-5 border-4 border-black bg-white p-4 shadow-[4px_4px_0_#000]">
          <p className="text-center text-sm font-black uppercase text-black">
            🛒 Beli Produk Ini
          </p>

          <div className="mt-4 border-2 border-black bg-[#f8f8f8] p-3 text-[11px] text-black">
            <div className="flex items-center justify-between border-b-2 border-black/20 pb-2">
              <span className="font-bold">Harga Satuan:</span>
              <span className="font-black">
                Rp {product.price.toLocaleString("id-ID")}
              </span>
            </div>

            <div className="flex items-center justify-between border-b-2 border-black/20 py-2">
              <span className="font-bold">Stok:</span>
              <span className="font-black text-sky-700">
                {soldOut ? "Habis" : `${product.stock} tersedia`}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3">
              <span className="text-base font-black uppercase">Total:</span>
              <span className="text-xl font-black text-black">
                Rp {product.price.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          <Link
            href={soldOut ? "#" : `/checkout/${product.slug}`}
            className={`mt-4 block border-2 border-black px-3 py-3 text-center text-sm font-black uppercase shadow-[3px_3px_0_#000] ${
              soldOut
                ? "pointer-events-none bg-gray-300 text-gray-500"
                : "bg-[#1697f6] text-white"
            }`}
          >
            {soldOut ? "Stok Habis" : "🛒 Beli Sekarang"}
          </Link>

          <p className="mt-3 text-center text-[9px] font-bold text-black/60">
            Pembayaran aman via QRIS + Pengiriman otomatis
          </p>

          <div className="mt-4 border-2 border-black bg-[#ffd36f] p-3 text-[10px] leading-5 text-black">
            <p className="font-black uppercase">⚠ Perhatian</p>
            <p className="mt-2">
              - Pastikan email checkout yang kamu isi sudah benar
            </p>
            <p>- Cek folder spam jika email belum masuk</p>
            <p>- Support tersedia 24/7 untuk bantuan</p>
          </div>
        </div>
      </section>
    </main>
  );
}