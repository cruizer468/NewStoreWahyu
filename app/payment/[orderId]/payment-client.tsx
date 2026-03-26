"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentClient({ isPaid }: { isPaid: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (isPaid) return;

    const interval = setInterval(() => {
      router.refresh();
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaid, router]);

  return null;
}