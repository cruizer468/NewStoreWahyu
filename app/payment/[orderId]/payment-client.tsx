"use client";

import { useEffect, useState } from "react";

type Status = "loading" | "pending" | "paid" | "failed";

export default function PaymentClient({ orderId }: { orderId: string }) {
  const [status, setStatus] = useState<Status>("loading");
  const [delivered, setDelivered] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/payment-status/${orderId}`);
        const data = await res.json();

        if (!res.ok) {
          setStatus("failed");
          return;
        }

        if (data.status === "paid") {
          setStatus("paid");
          setDelivered(Boolean(data.delivered));
          return;
        }

        setStatus("pending");
        timer = setTimeout(checkStatus, 3000);
      } catch (error) {
        console.error(error);
        setStatus("failed");
      }
    };

    checkStatus();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [orderId]);

  if (status === "loading" || status === "pending") {
    return (
      <div className="mx-auto max-w-xl p-6">
        <h1 className="text-2xl font-bold">Menunggu Pembayaran</h1>
        <p className="mt-2">
          Pembayaran sedang diverifikasi. Halaman ini akan update otomatis.
        </p>
      </div>
    );
  }

  if (status === "paid") {
    return (
      <div className="mx-auto max-w-xl p-6">
        <h1 className="text-2xl font-bold">Pembayaran Berhasil</h1>
        <p className="mt-2">
          {delivered
            ? "Akun sudah dikirim ke email kamu."
            : "Pembayaran berhasil, akun sedang diproses."}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-bold">Terjadi Kendala</h1>
      <p className="mt-2">Gagal mengecek status pembayaran.</p>
    </div>
  );
}