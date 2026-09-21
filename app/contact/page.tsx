"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Mail, MapPin, ArrowUpRight, Copy, Check } from "lucide-react";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("sepsu.dev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="w-full min-h-screen bg-[#fafafa] dark:bg-[#121212] text-stone-900 dark:text-stone-100 overflow-y-auto px-4 py-12 md:py-20 pb-36">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1c1c] text-xs font-mono text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 shadow-xs transition-colors group"
        >
          <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-[11px] font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors cursor-pointer shadow-2xs"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" />
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
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#121212] text-white dark:bg-white dark:text-[#121212] text-[11px] font-semibold hover:opacity-90 transition-opacity shadow-2xs cursor-pointer"
              >
                <span>Email</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Clean Message Form */}
          <form
            action="mailto:sepsu.dev@gmail.com"
            method="GET"
            className="space-y-3.5"
          >
            <div className="space-y-1">
              <label htmlFor="subject" className="text-[11px] font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Project inquiry, collaboration, etc."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-stone-400 dark:focus:border-stone-600 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="body" className="text-[11px] font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Message
              </label>
              <textarea
                id="body"
                name="body"
                rows={4}
                placeholder="Write your message here..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-stone-400 dark:focus:border-stone-600 transition-colors resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              {/* Location Badge */}
              <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 font-mono">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <span>Jakarta · GMT+7</span>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#121212] text-white dark:bg-white dark:text-[#121212] text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
              >
                <span>Send Message</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

