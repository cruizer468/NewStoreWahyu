import Link from "next/link";
import type { Product } from "@/lib/product-types";

export default function ProductCard({ product }: { product: Product }) {
  const soldOut = product.stock <= 0;

  return (
    <div className="relative rounded-2xl border-2 border-black/70 bg-[#E9E2C7] p-4 shadow-[6px_6px_0_rgba(0,0,0,0.8)]">

      {/* Badge top */}
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-teal-200 px-3 py-1 text-[10px] font-bold uppercase border border-black/50">
          Account
        </span>

        <span className="rounded-full bg-gray-200 px-3 py-1 text-[10px] font-bold border border-black/50">
        </span>
      </div>

      {/* Badge terlaris */}
      <div className="mt-2">
        <span className="inline-block rounded-full bg-red-300 px-3 py-1 text-[10px] font-bold uppercase border border-black/50">
          🔥 Terlaris
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-3 text-sm font-bold text-black">
        {product.name}
      </h3>

      {/* Stock */}
      <div className="mt-2">
        <span className="inline-block rounded-full bg-blue-200 px-3 py-1 text-[10px] font-bold border border-black/50">
          ✔ stok: {product.stock}
        </span>
      </div>

      {/* Price */}
      <p className="mt-4 text-xl font-extrabold text-orange-500">
        Rp {product.price.toLocaleString("id-ID")}
      </p>

      {/* Buttons */}
      <div className="mt-4 flex flex-col gap-2">
        {soldOut ? (
          <button
            disabled
            className="rounded-lg border border-black/50 bg-gray-300 py-2 text-xs font-bold text-gray-600"
          >
            Stok Habis
          </button>
        ) : (
          <Link
            href={`/checkout/${product.slug}`}
            className="rounded-lg border border-black/50 bg-blue-600 py-2 text-center text-xs font-bold text-white shadow"
          >
            🛒 Beli Sekarang
          </Link>
        )}

        <Link
          href={`/produk/${product.slug}`}
          className="rounded-lg border border-black/50 bg-gray-200 py-2 text-center text-xs font-bold text-black"
        >
          ℹ Detail
        </Link>
      </div>

      {/* Pikachu accent (pojok kanan bawah) */}
      <div className="absolute bottom-0 right-0 h-12 w-12 rounded-tl-2xl bg-yellow-300 border-l border-t border-black/50" />
    </div>
  );
}