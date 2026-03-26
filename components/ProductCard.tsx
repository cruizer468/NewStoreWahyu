import Link from "next/link";
import type { Product } from "@/lib/product-types";

export default function ProductCard({ product }: { product: Product }) {
  const soldOut = product.stock <= 0;

  return (
    <article className="group border-4 border-black bg-white p-4 shadow-[5px_5px_0_#000] transition hover:-translate-y-1">
      <div className="mb-4 border-4 border-black bg-[#fff3b0] p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wide text-neutral-600">
              Electric Account
            </p>
            <h3 className="mt-1 text-lg font-black uppercase text-black">
              {product.name}
            </h3>
          </div>

          <span
            className={`shrink-0 border-2 border-black px-2 py-1 text-[10px] font-black uppercase ${
              soldOut
                ? "bg-red-300 text-black"
                : "bg-green-300 text-black"
            }`}
          >
            {soldOut ? "Sold Out" : "Ready"}
          </span>
        </div>

        <p className="mt-3 min-h-[48px] text-sm leading-5 text-neutral-700">
          {product.description || "Produk digital siap kirim otomatis."}
        </p>
      </div>

      <div className="space-y-2 border-4 border-black bg-white p-3 text-[11px] font-black uppercase text-black">
        <div className="flex items-center justify-between border-b border-black pb-2">
          <span>Harga</span>
          <span>Rp {product.price.toLocaleString("id-ID")}</span>
        </div>

        <div className="flex items-center justify-between border-b border-black pb-2">
          <span>Stok</span>
          <span>{product.stock}</span>
        </div>

        <div className="flex items-center justify-between">
          <span>Slug</span>
          <span className="max-w-[140px] truncate text-right">{product.slug}</span>
        </div>
      </div>

      <Link
        href={soldOut ? "#" : `/checkout/${product.slug}`}
        aria-disabled={soldOut}
        className={`mt-4 block border-4 border-black px-4 py-3 text-center text-sm font-black uppercase shadow-[4px_4px_0_#000] transition ${
          soldOut
            ? "cursor-not-allowed bg-neutral-300 text-neutral-600"
            : "bg-yellow-400 text-black hover:bg-yellow-300"
        }`}
      >
        {soldOut ? "Stok Habis" : "Beli Sekarang"}
      </Link>
    </article>
  );
}