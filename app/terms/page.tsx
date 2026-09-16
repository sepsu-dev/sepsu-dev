import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { JOTTER_SETTINGS } from "@/lib/jotter-data";

export const metadata = {
  title: "Terms of Service - Jotter",
  description: "Terms of Service for Oscar Bergman portfolio.",
};

export default function TermsPage() {
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
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-stone-400 dark:text-stone-500">
            Last updated 29 July 2026
          </p>
        </div>

        {/* Content Box */}
        <div className="p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#1c1c1c] space-y-8 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed shadow-sm">
          <p>
            By accessing and using this website you agree to the terms below. If you
            don’t agree with them, please don’t use the site.
          </p>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Using this site
            </h2>
            <p>
              You’re welcome to browse, get inspired and reach out. You agree not
              to misuse the site — no attempting to break, overload or gain
              unauthorised access to it, and nothing unlawful.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Intellectual property
            </h2>
            <p>
              Unless stated otherwise, the design, layout, text and visuals on
              this site are my own work and are protected by copyright. Please
              don’t reproduce or republish them without permission.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Portfolio work
            </h2>
            <p>
              Projects shown here may have been created for or with clients and can
              include their trademarks or brands. They remain the property of
              their respective owners and are displayed for portfolio purposes only.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Disclaimer
            </h2>
            <p>
              This site is provided “as is”. While I try to keep everything accurate
              and up to date, I make no guarantee that the content is complete,
              current or error-free.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Limitation of liability
            </h2>
            <p>
              To the maximum extent permitted by law, I won’t be liable for any
              loss or damage arising from your use of this site.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
              External links
            </h2>
            <p>
              This site may link to external websites. I don’t control those sites
              and can’t accept responsibility for their content or privacy
              practices.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Changes to these terms
            </h2>
            <p>
              These terms may be updated from time to time. The date at the top will
              always reflect when they were last revised. Continued use of the
              site means you accept any changes.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-stone-200 dark:border-stone-800">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Contact
            </h2>
            <p>
              Anything unclear? Email{" "}
              <a
                href={`mailto:${JOTTER_SETTINGS.contactEmail}`}
                className="font-medium text-stone-900 dark:text-stone-100 underline underline-offset-4"
              >
                {JOTTER_SETTINGS.contactEmail}
              </a>{" "}
              and I’ll gladly explain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
