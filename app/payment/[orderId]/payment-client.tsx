"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AutoBackHome() {
  const router = useRouter();
  const [time, setTime] = useState(5);

  useEffect(() => {
    if (time <= 0) {
      router.push("/#produk");
      return;
    }

    const timer = setTimeout(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, router]);

  return (
    <div className="border-4 border-black bg-[#d9d9d9] p-4">
      <p className="text-sm font-black uppercase text-black">
        Redirect otomatis
      </p>
      <p className="mt-1 text-xs text-black/70">
        Kembali ke halaman utama dalam {time} detik...
      </p>

      <div className="mt-3 h-3 border-2 border-black bg-white">
        <div
          className="h-full bg-blue-600 transition-all duration-1000"
          style={{ width: `${((5 - time) / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}