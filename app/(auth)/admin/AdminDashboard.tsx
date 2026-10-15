"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setError(null);
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/auth", { method: "DELETE" });
      if (!response.ok) throw new Error("Logout failed");
      router.replace("/login");
    } catch {
      setError("Logout gagal. Coba lagi.");
      setIsLoggingOut(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-white dark:bg-[#121212] text-stone-900 dark:text-stone-100 px-4 py-8 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
        <h1 className="text-base font-semibold">Admin</h1>
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="text-xs font-mono text-stone-500 hover:text-red-500 transition-colors cursor-pointer disabled:opacity-50"
        >
          Logout
        </button>
      </div>
      {error && <p role="status" className="text-sm text-red-600">{error}</p>}
      <p className="text-sm">Konten portfolio menggunakan JSON statis. Edit file berikut lalu build dan deploy ulang:</p>
      <ul className="list-disc pl-5 text-sm font-mono space-y-2">
        <li>data/projects.json</li>
        <li>data/profile.json</li>
        <li>data/settings.json</li>
      </ul>
    </main>
  );
}
