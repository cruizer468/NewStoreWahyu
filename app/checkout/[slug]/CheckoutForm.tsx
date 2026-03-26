"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/product-types";

export default function CheckoutForm({ product }: { product: Product }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const maxStock = product.stock;
  const soldOut = maxStock <= 0;
  const subtotal = product.price * quantity;
  const total = subtotal;

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(maxStock, prev + 1));
  };

  const handleCheckout = async () => {
    if (soldOut) {
      alert("Stok habis");
      return;
    }

    if (!fullName.trim()) {
      alert("Nama lengkap wajib diisi");
      return;
    }

    if (!email.trim()) {
      alert("Email wajib diisi");
      return;
    }

    if (!whatsapp.trim()) {
      alert("Nomor WhatsApp wajib diisi");
      return;
    }

    if (quantity < 1) {
      alert("Jumlah minimal 1");
      return;
    }

    if (quantity > maxStock) {
      alert("Jumlah melebihi stok tersedia");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          buyerEmail: email.trim(),
          buyerName: fullName.trim(),
          buyerWhatsapp: whatsapp.trim(),
          quantity,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Checkout gagal");
        return;
      }

      if (!data?.paymentUrl) {
        alert("Link pembayaran tidak ditemukan");
        return;
      }

      window.location.href = data.paymentUrl;
    } catch (error) {
      console.error(error);
      alert("Terjadi error saat checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <section className="border-t-2 border-black pt-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs">👤</span>
          <h3 className="text-sm font-black uppercase text-black">
            Data Pembeli
          </h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-[10px] font-black uppercase text-black">
              Nama Lengkap
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nama lengkap pembeli"
              className="h-11 w-full border-4 border-black bg-white px-3 text-[11px] font-medium outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-black uppercase text-black">
              Email Pembeli
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@gmail.com"
              className="h-11 w-full border-4 border-black bg-white px-3 text-[11px] font-medium outline-none"
            />
            <p className="mt-1 text-[9px] leading-4 text-neutral-500">
              Invoice dan status pembayaran dikirim ke email ini
            </p>
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-black uppercase text-black">
              No. HP/WhatsApp
            </label>
            <input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="0812-3456-7890"
              className="h-11 w-full border-4 border-black bg-white px-3 text-[11px] font-medium outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-black uppercase text-black">
              Jumlah
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDecrease}
                disabled={soldOut || quantity <= 1}
                className="flex h-11 w-11 items-center justify-center border-4 border-black bg-[#f5f0d8] text-lg font-black text-black disabled:cursor-not-allowed disabled:opacity-50"
              >
                -
              </button>

              <input
                type="number"
                min={1}
                max={maxStock}
                value={quantity}
                onChange={(e) => {
                  const val = Number(e.target.value);

                  if (!Number.isFinite(val) || val < 1) {
                    setQuantity(1);
                    return;
                  }

                  if (val > maxStock) {
                    setQuantity(maxStock);
                    return;
                  }

                  setQuantity(val);
                }}
                disabled={soldOut}
                className="h-11 w-full border-4 border-black bg-[#fff3b0] px-3 text-center text-[11px] font-black outline-none disabled:cursor-not-allowed disabled:opacity-60"
              />

              <button
                type="button"
                onClick={handleIncrease}
                disabled={soldOut || quantity >= maxStock}
                className="flex h-11 w-11 items-center justify-center border-4 border-black bg-[#f5f0d8] text-lg font-black text-black disabled:cursor-not-allowed disabled:opacity-50"
              >
                +
              </button>
            </div>

            <p className="mt-1 text-[9px] leading-4 text-neutral-500">
              {soldOut ? "Stok habis" : `Maksimal ${maxStock} item`}
            </p>
          </div>
        </div>

        <div className="mt-4 border-4 border-black bg-[#fff3b0] px-3 py-3 text-[10px] leading-5 text-black">
          ⚡ Data pembeli digunakan untuk notifikasi pesanan dan pengiriman akun.
        </div>
      </section>

      <section className="border-t-2 border-black pt-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs">💳</span>
          <h3 className="text-sm font-black uppercase text-black">
            Metode Pembayaran
          </h3>
        </div>

        <div className="border-4 border-black bg-white p-3">
          <div className="border-4 border-black bg-[#f7dc18] px-4 py-3 text-[12px] font-black uppercase text-black">
            QRIS - Pakasir
          </div>

          <p className="mt-2 text-[10px] leading-4 text-neutral-600">
            Pembayaran akan diarahkan ke halaman QRIS Pakasir.
          </p>
        </div>
      </section>

      <section className="border-t-2 border-black pt-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs">🛡️</span>
          <h3 className="text-sm font-black uppercase text-black">
            Verifikasi Keamanan
          </h3>
        </div>

        <div className="border-4 border-black bg-[#dcdcdc] p-5">
          <div className="mx-auto flex w-fit items-center gap-3 border-2 border-[#f7dc18] bg-black px-3 py-2">
            <div className="rounded bg-green-500 px-2 py-1 text-[9px] font-black text-white">
              ✓ Human
            </div>
            <div className="text-[9px] font-black uppercase text-white">
              Pikachu Security Check
            </div>
          </div>
        </div>
      </section>

      <section className="border-t-2 border-black pt-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs">🧾</span>
          <h3 className="text-sm font-black uppercase text-black">
            Ringkasan Pembayaran
          </h3>
        </div>

        <div className="border-4 border-black bg-white p-3">
          <div className="space-y-2 text-[10px] font-black uppercase text-black">
            <div className="flex items-center justify-between border-b border-black pb-2">
              <span>Produk</span>
              <span className="text-right">{product.name}</span>
            </div>

            <div className="flex items-center justify-between border-b border-black pb-2">
              <span>Harga per item</span>
              <span>Rp {product.price.toLocaleString("id-ID")}</span>
            </div>

            <div className="flex items-center justify-between border-b border-black pb-2">
              <span>Jumlah item</span>
              <span>{quantity}</span>
            </div>

            <div className="flex items-center justify-between border-b border-black pb-2">
              <span>Tipe Produk</span>
              <span>Electric Account</span>
            </div>

            <div className="flex items-center justify-between border-b border-black pb-2">
              <span>Metode bayar</span>
              <span>Pakasir</span>
            </div>

            <div className="flex items-center justify-between pb-1">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>
          </div>

          <div className="mt-4 border-t-2 border-black pt-4">
            <div className="flex items-end justify-between gap-3">
              <p className="text-xs font-black uppercase text-black">
                Total Pembayaran
              </p>
              <p className="text-3xl font-black text-black">
                Rp {total.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-3 pt-1">
        <button
          onClick={handleCheckout}
          disabled={
            !email.trim() ||
            !fullName.trim() ||
            !whatsapp.trim() ||
            loading ||
            quantity < 1 ||
            soldOut
          }
          className="w-full border-4 border-black bg-[#1737ff] px-4 py-3 text-sm font-black uppercase text-white shadow-[4px_4px_0_#000] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {soldOut
            ? "Stok Habis"
            : loading
            ? "Memproses..."
            : "🔒 Lanjut ke Pembayaran"}
        </button>

        <Link
          href="/#produk"
          className="block w-full border-4 border-black bg-white px-4 py-3 text-center text-sm font-black uppercase text-black"
        >
          ← Kembali ke Produk
        </Link>
      </div>
    </div>
  );
}