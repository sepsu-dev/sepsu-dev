"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Mail, MapPin, ArrowUpRight, Copy, Check, Loader2 } from "lucide-react";
import { useContactStore } from "@/stores";

export default function ContactContent() {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const { isSubmitting, submitResult, sendMessage } = useContactStore();

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("sepsu.dev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const success = await sendMessage({
      email: "visitor@sepsu.dev",
      subject: subject.trim() || "Portfolio Contact",
      message: message.trim(),
    });

    if (success) {
      setSubject("");
      setMessage("");
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#fafafa] dark:bg-[#121212] text-stone-900 dark:text-stone-100 overflow-y-auto px-4 py-12 md:py-20 pb-36">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-200/90 dark:border-stone-800 bg-white/90 dark:bg-[#1c1c1c]/90 text-xs font-mono text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:border-stone-300 dark:hover:border-stone-700 shadow-2xs hover:shadow-xs hover:-translate-x-0.5 active:translate-x-0 transition-all duration-200 group"
        >
          <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to home</span>
        </Link>

        {/* Header & Status */}
        <div className="space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for new opportunities</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Let&apos;s talk.
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            Have a project in mind, an opportunity, or just want to connect? Drop a message below or email directly.
          </p>
        </div>

        {/* Minimal Unified Contact & Message Box */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#1c1c1c] border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-6">
          {/* Direct Email Line with Copy */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/70 dark:border-stone-800/80">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-[#0099ff]" />
              </div>
              <span className="text-xs sm:text-sm font-mono font-medium text-stone-900 dark:text-stone-100 truncate">
                sepsu.dev@gmail.com
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopyEmail}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-[11px] font-medium text-stone-700 dark:text-stone-200 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-700/80 hover:border-stone-300 dark:hover:border-stone-600 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-150 cursor-pointer"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500 animate-in zoom-in-50 duration-150" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                href="mailto:sepsu.dev@gmail.com"
                className="group/mail inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-[#121212] text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white text-[11px] font-semibold shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-150 cursor-pointer"
              >
                <span>Email</span>
                <ArrowUpRight className="w-3 h-3 transition-transform group-hover/mail:translate-x-0.5 group-hover/mail:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Clean Message Form connected via Zustand store */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="space-y-1">
              <label htmlFor="subject" className="text-[11px] font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Project inquiry, collaboration, etc."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-stone-400 dark:focus:border-stone-600 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="body" className="text-[11px] font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="body"
                name="body"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-stone-400 dark:focus:border-stone-600 transition-colors resize-none"
              />
            </div>

            {submitResult && (
              <div
                className={`p-3 rounded-xl text-xs ${
                  submitResult.type === "success"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                }`}
              >
                {submitResult.text}
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              {/* Location Badge */}
              <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 font-mono">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <span>Jakarta · GMT+7</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group/submit inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#121212] text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white text-xs font-semibold shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/submit:translate-x-0.5 group-hover/submit:-translate-y-0.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
