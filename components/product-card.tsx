import Link from "next/link";
import { Product } from "@/lib/data";
import { formatRupiah } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.stock <= 0;

  return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
        {product.badge}
      </p>

      <p className="mt-3 text-sm text-neutral-500">Terjual: {product.sold.toLocaleString("id-ID")}</p>

      <h3 className="mt-2 text-lg font-semibold leading-6 text-neutral-900">
        {product.name}
      </h3>

      <p className="mt-3 text-sm text-neutral-500">
        {soldOut ? "Stok Habis" : `Stok: ${product.stock}`}
      </p>

      <p className="mt-4 text-2xl font-black text-neutral-900">
        {formatRupiah(product.price)}
      </p>

      <div className="mt-5 flex gap-2">
        <Link
          href={soldOut ? "#" : `/checkout/${product.slug}`}
          className={`rounded-2xl px-4 py-2 text-sm font-semibold ${
            soldOut
              ? "cursor-not-allowed bg-neutral-200 text-neutral-500"
              : "bg-black text-white hover:opacity-90"
          }`}
        >
          {soldOut ? "Stok Habis" : "Beli Sekarang"}
        </Link>

        <Link
          href={`/products/${product.slug}`}
          className="rounded-2xl border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
        >
          Detail
        </Link>
      </div>
    </div>
  );
}