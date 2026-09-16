"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let current = 0;
    // Ticking konsisten: naik bertahap dari 0% ke 100%
    const interval = setInterval(() => {
      // Step kenaikan pelan-pelan (rata-rata 2% - 5% per 40ms)
      const step = Math.floor(Math.random() * 4) + 2;
      current += step;

      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);

        // Setelah tepat 100%, fade out lalu tutup
        setTimeout(() => {
          setFading(true);
          setTimeout(() => {
            setLoading(false);
          }, 350);
        }, 200);
      } else {
        setProgress(current);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div
      style={{
        transition: "opacity 0.35s ease",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "auto",
      }}
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#fafafa] dark:bg-[#121212] select-none"
    >
      {/* Simple text + loadbar */}
      <div className="w-[180px] flex flex-col items-center gap-2.5">
        <div className="flex items-center justify-between w-full text-xs font-mono text-stone-600 dark:text-stone-400">
          <span>Loading</span>
          <span suppressHydrationWarning className="tabular-nums font-medium">
            {progress}%
          </span>
        </div>

        {/* Loadbar container */}
        <div className="w-full h-1 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-stone-900 dark:bg-stone-100 rounded-full transition-[width] duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
