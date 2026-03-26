import Link from "next/link";
import type { Product } from "@/lib/product-types";

export default function ProductCard({ product }: { product: Product }) {
  const soldOut = product.stock <= 0;

  return (
    <div className="rounded-2xl border-4 border-black bg-white p-4 shadow-[4px_4px_0_#000]">
      <div className="mb-3">
        <p className="text-[10px] font-black uppercase text-black/50">
          Premium Account
        </p>
        <h3 className="mt-1 min-h-[48px] text-base font-black uppercase leading-5 text-black">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-black/70">
          {product.description || "Produk digital premium."}
        </p>
      </div>

      <div className="space-y-2 text-xs font-bold uppercase">
        <div className="flex items-center justify-between border-b border-black pb-2">
          <span>Stok</span>
          <span>{product.stock}</span>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-2xl font-black text-black">
          Rp {product.price.toLocaleString("id-ID")}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          href={soldOut ? "#" : `/checkout/${product.slug}`}
          className={`flex-1 rounded-full border-2 border-black px-3 py-2 text-center text-[11px] font-black uppercase ${
            soldOut
              ? "cursor-not-allowed bg-neutral-200 text-neutral-500"
              : "bg-black text-white"
          }`}
        >
          {soldOut ? "Stok Habis" : "Beli Sekarang"}
        </Link>

        <Link
          href={`/checkout/${product.slug}`}
          className="rounded-full border-2 border-black bg-white px-3 py-2 text-[11px] font-black uppercase text-black"
        >
          Detail
        </Link>
      </div>
    </div>
  );
}