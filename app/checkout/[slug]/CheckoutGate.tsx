"use client";

import { useState } from "react";
import type { Product } from "@/lib/product-types";
import CheckoutForm from "./CheckoutForm";

export default function CheckoutGate({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  const handleContinue = () => {
    setIsAllowed(true);
    setIsOpen(false);
  };

  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <>
      <div className={isOpen ? "pointer-events-none select-none blur-[2px]" : ""}>
        <div className="mt-4 border-4 border-black bg-[#FACC15] p-3 shadow-[4px_4px_0_#000]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-black uppercase text-black">
                {product.name}
              </h2>
              <div className="mt-2 flex gap-2">
                <span className="border-2 border-black bg-[#7ED9D3] px-2 py-1 text-[9px] font-black uppercase">
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

          <div className="mt-4 border-2 border-black bg-[#FFF7CC] p-3 text-[10px] leading-5 text-black">
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
          <CheckoutForm product={product} />
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md border-4 border-black bg-[#EFEFEF] shadow-[10px_10px_0_#000]">
            <div className="flex items-center justify-between border-b-4 border-black bg-[#FACC15] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <h2 className="text-lg font-black uppercase text-black">
                  Perhatian Penting!
                </h2>
              </div>

              <button
                onClick={handleBack}
                className="flex h-10 w-10 items-center justify-center border-2 border-black bg-black text-xl font-black text-white"
                aria-label="Tutup popup"
              >
                ×
              </button>
            </div>

            <div className="px-5 py-6 text-center">
              <div className="mb-4 text-5xl">⚠️</div>

              <h3 className="text-2xl font-black uppercase leading-tight text-black">
                Harap baca deskripsi produk
              </h3>
              <p className="mt-2 text-2xl font-black uppercase leading-tight text-red-600">
                sebelum mengisi formulir pembelian !!!
              </p>

              <div className="mt-5 border-4 border-black bg-white p-4 text-left shadow-[4px_4px_0_#000]">
                <p className="mb-2 text-[11px] font-black uppercase text-black">
                  Mengapa ini penting:
                </p>
                <ul className="space-y-1 text-[11px] leading-5 text-black">
                  <li>• Deskripsi berisi informasi lengkap produk</li>
                  <li>• Berisi syarat dan ketentuan penggunaan</li>
                  <li>• Berisi cara penggunaan dan batasan produk</li>
                  <li>• Memastikan Anda mendapatkan produk sesuai kebutuhan</li>
                </ul>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={handleContinue}
                  className="border-4 border-black bg-[#32D74B] px-3 py-4 text-sm font-black uppercase text-black shadow-[4px_4px_0_#000]"
                >
                  Ya, Saya Akan
                  <br />
                  Membaca Deskripsi
                </button>

                <button
                  onClick={handleBack}
                  className="border-4 border-black bg-[#E5E5E5] px-3 py-4 text-sm font-black uppercase text-black shadow-[4px_4px_0_#000]"
                >
                  ← Kembali
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}