import Link from "next/link";
import type { Product } from "@/lib/product-types";

export default function ProductCard({ product }: { product: Product }) {
  const soldOut = product.stock <= 0;

  return (
    <div className="rounded-2xl border-4 border-black bg-white p-4 shadow-[4px_4px_0_#000]">
      <p className="text-[10px] font-black uppercase text-black/50">
        Premium Account
      </p>

      <h3 className="mt-2 text-base font-black uppercase text-black">
        {product.name}
      </h3>

      <p className="mt-2 text-xs leading-5 text-black/70">
        {product.description || "Produk digital premium."}
      </p>

      <div className="mt-4 border-t border-black pt-3">
        <p className="text-2xl font-black text-black">
          Rp {product.price.toLocaleString("id-ID")}
        </p>
        <p className="mt-1 text-xs font-bold uppercase text-black/60">
          Stok: {product.stock}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        {soldOut ? (
          <button
            disabled
            className="flex-1 cursor-not-allowed rounded-full border-2 border-black bg-neutral-200 px-3 py-2 text-center text-[11px] font-black uppercase text-neutral-500"
          >
            Stok Habis
          </button>
        ) : (
          <Link
            href={`/checkout/${product.slug}`}
            className="flex-1 rounded-full border-2 border-black bg-black px-3 py-2 text-center text-[11px] font-black uppercase text-white"
          >
            Beli Sekarang
          </Link>
        )}

        <Link
          href={`/produk/${product.slug}`}
          className="rounded-full border-2 border-black bg-white px-3 py-2 text-[11px] font-black uppercase text-black"
        >
          Detail
        </Link>
      </div>
    </div>
  );
}