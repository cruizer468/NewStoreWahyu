"use client";

import { useEffect, useState } from "react";

type Status = "loading" | "pending" | "completed" | "failed";

export default function PaymentClient({
  orderId,
  amount,
}: {
  orderId: string;
  amount: string;
}) {
  const [status, setStatus] = useState<Status>("loading");
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        const res = await fetch(
          `/api/payment-status/${orderId}?amount=${encodeURIComponent(amount)}`
        );
        const data = await res.json();

        if (!res.ok) {
          setStatus("failed");
          return;
        }

        if (data.status === "completed") {
          setStatus("completed");
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
  }, [orderId, amount]);

  const handleSimulate = async () => {
    try {
      setSimulating(true);

      const res = await fetch("/api/pakasir/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          amount: Number(amount),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Simulasi gagal");
        return;
      }

      alert("Simulasi pembayaran berhasil dijalankan");
    } catch (error) {
      console.error(error);
      alert("Terjadi error saat simulasi");
    } finally {
      setSimulating(false);
    }
  };

  if (status === "loading" || status === "pending") {
    return (
      <div className="mx-auto max-w-xl p-6">
        <h1 className="text-2xl font-bold">Menunggu Pembayaran</h1>
        <p className="mt-2">
          Pembayaran sedang dicek ke Pakasir. Halaman ini update otomatis.
        </p>

        <button
          onClick={handleSimulate}
          disabled={simulating}
          className="mt-4 rounded border px-4 py-2"
        >
          {simulating ? "Mensimulasikan..." : "Simulate Success (Sandbox)"}
        </button>
      </div>
    );
  }

  if (status === "completed") {
    return (
      <div className="mx-auto max-w-xl p-6">
        <h1 className="text-2xl font-bold">Pembayaran Berhasil</h1>
        <p className="mt-2">
          Status pembayaran sudah completed di Pakasir sandbox.
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