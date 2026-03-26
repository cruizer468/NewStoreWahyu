"use client";

import { useState } from "react";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  description: string;
  image?: string;
};

export default function CheckoutForm({ product }: { product: Product }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const maxStock = product.stock;
  const subtotal = product.price * quantity;
  const total = subtotal;
  const soldOut = maxStock <= 0;

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
    <>
      <section>
        <div className="mb-2 flex items-center gap-2 border-b-2 border-black pb-2">
          <span>👤</span>
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
              className="w-full border-4 border-black bg-white px-3 py-2 text-sm outline-none"
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
              className="w-full border-4 border-black bg-white px-3 py-2 text-sm outline-none"
            />
            <p className="mt-1 text-[10px] text-neutral-500">
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
              className="w-full border-4 border-black bg-white px-3 py-2 text-sm outline-none"
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
                className="flex h-[46px] w-[46px] items-center justify-center border-4 border-black bg-white text-xl font-black text-black transition hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-50"
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
                className="w-full border-4 border-black bg-[#fff3b0] px-3 py-2 text-center text-sm font-bold outline-none disabled:cursor-not-allowed disabled:opacity-60"
              />

              <button
                type="button"
                onClick={handleIncrease}
                disabled={soldOut || quantity >= maxStock}
                className="flex h-[46px] w-[46px] items-center justify-center border-4 border-black bg-white text-xl font-black text-black transition hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                +
              </button>
            </div>

            <p className="mt-1 text-[10px] text-neutral-500">
              {soldOut ? "Stok habis" : `Maksimal ${maxStock} item`}
            </p>
          </div>
        </div>

        <div className="mt-4 border-4 border-black bg-[#fff3b0] px-3 py-3 text-[11px] leading-5 text-black">
          ⚡ Data pembeli digunakan untuk notifikasi pesanan dan pengiriman akun.
        </div>
      </section>

      <section>
        <div className="mb-2 flex items-center gap-2 border-b-2 border-black pb-2">
          <span>💳</span>
          <h3 className="text-sm font-black uppercase text-black">
            Metode Pembayaran
          </h3>
        </div>

        <div className="border-4 border-black bg-white p-4">
          <div className="border-4 border-black bg-yellow-300 px-4 py-3 text-sm font-black uppercase text-black shadow-[4px_4px_0_#000]">
            QRIS - Pakasir
          </div>
          <p className="mt-2 text-[11px] text-neutral-600">
            Pembayaran akan diarahkan ke halaman QRIS Pakasir.
          </p>
        </div>
      </section>

      <section>
        <div className="mb-2 flex items-center gap-2 border-b-2 border-black pb-2">
          <span>🛡️</span>
          <h3 className="text-sm font-black uppercase text-black">
            Verifikasi Keamanan
          </h3>
        </div>

        <div className="border-4 border-black bg-white p-4">
          <div className="mx-auto flex max-w-[230px] items-center justify-center gap-3 border-2 border-black bg-black px-4 py-3 text-white shadow-[3px_3px_0_#facc15]">
            <div className="rounded bg-green-500 px-2 py-1 text-[10px] font-bold text-white">
              ✓ Human
            </div>
            <div className="text-[10px] font-bold uppercase">
              Pikachu Security Check
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-2 flex items-center gap-2 border-b-2 border-black pb-2">
          <span>🧾</span>
          <h3 className="text-sm font-black uppercase text-black">
            Ringkasan Pembayaran
          </h3>
        </div>

        <div className="border-4 border-black bg-white p-3 shadow-[3px_3px_0_#000]">
          <div className="space-y-3 text-[11px] font-bold uppercase text-black">
            <div className="flex items-center justify-between border-b border-black pb-2">
              <span>Produk</span>
              <span>{product.name}</span>
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

            <div className="flex items-center justify-between border-b border-black pb-2">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>
          </div>

          <div className="mt-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-black uppercase text-black">
                Total Pembayaran
              </p>
            </div>
            <p className="text-4xl font-black text-black">
              Rp {total.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </section>

      <div className="space-y-3">
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
          className="w-full border-4 border-black bg-yellow-400 px-4 py-3 text-sm font-black uppercase text-black shadow-[4px_4px_0_#000] transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {soldOut
            ? "Stok Habis"
            : loading
            ? "Memproses..."
            : "⚡ Lanjut ke Pembayaran"}
        </button>

        <Link
          href="/#produk"
          className="block w-full border-4 border-black bg-white px-4 py-3 text-center text-sm font-black uppercase text-black transition hover:bg-yellow-100"
        >
          ← Kembali ke Produk
        </Link>
      </div>
    </>
  );
}