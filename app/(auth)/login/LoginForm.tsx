"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.status === "success") {
        router.push("/admin");
      } else {
        setErrorMsg(data.message || "Invalid credentials");
      }
    } catch {
      setErrorMsg("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-white dark:bg-[#121212] text-stone-900 dark:text-stone-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs font-mono text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Kembali</span>
        </Link>

        <div className="space-y-1">
          <h1 className="text-lg font-semibold tracking-tight">Login Admin</h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Masuk untuk mengelola konten dan proyek.
          </p>
        </div>

        {errorMsg && (
          <div className="p-2.5 rounded-lg bg-red-500/10 text-xs text-red-500 font-mono">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-stone-500">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="nama@email.com"
              className="w-full px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-sm focus:outline-none focus:border-stone-400 dark:focus:border-stone-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-stone-500">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-sm focus:outline-none focus:border-stone-400 dark:focus:border-stone-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </main>
  );
}
