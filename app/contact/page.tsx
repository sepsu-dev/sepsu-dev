import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Mail, MapPin, Send, MessageSquare, ArrowUpRight } from "lucide-react";
import { JOTTER_SETTINGS } from "@/lib/jotter-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Sepsu Dev. Available for software engineering roles, software projects, and technical collaborations.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact - Sepsu Dev",
    description:
      "Get in touch with Sepsu Dev. Available for software engineering roles, software projects, and technical collaborations.",
    url: "https://sepsu.dev/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-[#fafafa] dark:bg-[#121212] text-stone-900 dark:text-stone-100 overflow-y-auto px-4 py-12 md:py-20 pb-36">
      <div className="max-w-2xl mx-auto space-y-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1c1c] text-xs font-mono text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 shadow-xs transition-colors group"
        >
          <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to desk</span>
        </Link>

        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Let&apos;s talk.
          </h1>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
            Have an exciting project, a role opening, or simply want to say hello? Drop me an email or reach out directly.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={`mailto:${JOTTER_SETTINGS.contactEmail}`}
            className="p-5 rounded-2xl bg-white dark:bg-[#1c1c1c] border border-stone-200/90 dark:border-stone-800 shadow-xs hover:shadow-md transition-all duration-200 group flex flex-col justify-between gap-4"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300 group-hover:bg-[#0099ff] group-hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-[#0099ff] transition-colors" />
            </div>
            <div>
              <p className="text-xs font-mono text-stone-400 dark:text-stone-500">EMAIL</p>
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate mt-0.5">
                {JOTTER_SETTINGS.contactEmail}
              </p>
            </div>
          </a>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#1c1c1c] border border-stone-200/90 dark:border-stone-800 shadow-xs flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300">
                <MapPin className="w-4 h-4 text-[#0099ff]" />
              </div>
              <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">GMT+7</span>
            </div>
            <div>
              <p className="text-xs font-mono text-stone-400 dark:text-stone-500">LOCATION</p>
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
                {JOTTER_SETTINGS.location}
              </p>
            </div>
          </div>
        </div>

        {/* Direct Message Box */}
        <div className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-[#1c1c1c] border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Send a quick message
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              This will launch your default email client with your message pre-filled.
            </p>
          </div>

          <form
            action={`mailto:${JOTTER_SETTINGS.contactEmail}`}
            method="GET"
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <label htmlFor="subject" className="text-xs font-mono text-stone-600 dark:text-stone-400">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Project Inquiry / Job Opportunity"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#161616] text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-stone-400 dark:focus:border-stone-600 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="body" className="text-xs font-mono text-stone-600 dark:text-stone-400">
                Message
              </label>
              <textarea
                id="body"
                name="body"
                rows={4}
                placeholder="Hi Sepsu, I'd like to discuss a project..."
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#161616] text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-stone-400 dark:focus:border-stone-600 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#121212] text-white dark:bg-white dark:text-[#121212] text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
            >
              <span>Send Message</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

