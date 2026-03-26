"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function PaymentClient({
  orderId,
  qrUrl,
  expiryTime,
  grossAmount,
}: {
  orderId: string;
  qrUrl: string;
  expiryTime: string;
  grossAmount: number;
}) {
  const [status, setStatus] = useState("Menunggu pembayaran...");
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const poll = setInterval(async () => {
      try {
        const res = await fetch(`/api/payment-status/${orderId}`, {
          cache: "no-store",
        });
        const data = await res.json();

        if (data.status === "paid") {
          setStatus("Pembayaran berhasil");
        }
      } catch (error) {
        console.error(error);
      }
    }, 5000);

    return () => clearInterval(poll);
  }, [orderId]);

  const remaining = useMemo(() => {
    if (!expiryTime) return "05:00";

    const end = new Date(expiryTime).getTime();
    const diff = Math.max(0, end - now);

    const m = String(Math.floor(diff / 60000)).padStart(2, "0");
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");

    return `${m}:${s}`;
  }, [expiryTime, now]);

  return (
    <>
      <div className="border-t-2 border-black pt-2 text-center text-xs font-black uppercase">
        📱 Scan QR Code
      </div>

      <div className="mx-auto w-fit border-4 border-black bg-white p-4 shadow-[4px_4px_0_#000]">
        {qrUrl ? (
          <div className="relative h-[220px] w-[220px]">
            <Image src={qrUrl} alt="QRIS" fill className="object-contain" unoptimized />
          </div>
        ) : (
          <div className="flex h-[220px] w-[220px] items-center justify-center text-sm font-bold">
            QR tidak tersedia
          </div>
        )}
      </div>

      <div className="border-4 border-black bg-white p-4 text-center">
        <p className="text-[10px] font-bold uppercase text-neutral-500">
          Batas waktu pembayaran
        </p>
        <p className="mt-1 text-4xl font-black text-orange-500">{remaining}</p>
        <p className="mt-1 text-[11px] font-bold uppercase">
          Bayar: Rp {grossAmount.toLocaleString("id-ID")}
        </p>
      </div>

      <div className="border-4 border-black bg-orange-400 px-4 py-3 text-center text-[11px] font-black uppercase text-black">
        ⌛ {status}
      </div>

      <div className="border-2 border-black bg-white p-4 text-center text-[10px] font-bold uppercase leading-5">
        <p>1. Pilih metode QRIS</p>
        <p>2. Scan QR code</p>
        <p>3. Selesaikan pembayaran</p>
      </div>
    </>
  );
}