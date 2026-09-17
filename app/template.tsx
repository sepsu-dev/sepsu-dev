"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reset loader on route change
    setLoading(true);
    setShowContent(false);
    setProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      const step = Math.floor(Math.random() * 5) + 4;
      current += step;

      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);

        // Setelah loading 100%, tutup loading overlay DULU
        setTimeout(() => {
          setLoading(false);
          // Baru trigger animasi render konten halaman agar animasinya terlihat jelas
          setTimeout(() => {
            setShowContent(true);
          }, 50);
        }, 120);
      } else {
        setProgress(current);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [pathname]);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key={`loader-${pathname}`}
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Konten selalu ada di DOM agar elemen semantik <main> terdeteksi langsung saat SSR / Lighthouse */}
      <motion.div
        key={`content-${pathname}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{
          opacity: showContent ? 1 : 0,
          y: showContent ? 0 : 16,
        }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
}
