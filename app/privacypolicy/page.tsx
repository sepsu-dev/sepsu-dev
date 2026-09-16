import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { JOTTER_SETTINGS } from "@/lib/jotter-data";

export const metadata = {
  title: "Privacy Policy - Jotter",
  description: "Privacy Policy for Oscar Bergman portfolio.",
};

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-stone-400 dark:text-stone-500">
            Last updated 29 July 2026
          </p>
        </div>

        {/* Content Box */}
        <div className="p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#1c1c1c] space-y-8 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed shadow-sm">
          <p>
            This Privacy Policy explains what information is collected when you visit
            this site, how it is used, and the choices you have. This is a personal
            portfolio, so data collection is kept to a minimum.
          </p>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Information I collect
            </h2>
            <p>
              You don’t need an account or any personal details to browse this
              site. Basic, non-identifying analytics — such as pages visited,
              approximate location, browser type and referring site — may be
              collected to understand how the site is used.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Cookies and analytics
            </h2>
            <p>
              This site may use privacy-friendly analytics and essential cookies to
              keep things running and to measure traffic in aggregate. You can block
              or delete cookies in your browser settings at any time without
              breaking the site.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
              How your information is used
            </h2>
            <p>
              Any data collected is used only to operate and improve the site — for
              example, to see which projects people are drawn to. It is never sold,
              rented or traded.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Third-party services
            </h2>
            <p>
              This site is hosted with modern infrastructure and may embed content
              from third parties such as fonts or media. Those providers have their
              own privacy policies governing the data they process.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Data retention
            </h2>
            <p>
              Analytics data is kept in aggregated, anonymised form only for as long
              as needed to understand site trends. Any emails sent directly to me are
              retained only as needed to converse and respond.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Your rights
            </h2>
            <p>
              Depending on where you live, you may have rights under privacy laws
              (like GDPR) to access, correct or delete any personal data held about
              you.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-stone-200 dark:border-stone-800">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Contact
            </h2>
            <p>
              Questions about this policy? Reach me at{" "}
              <a
                href={`mailto:${JOTTER_SETTINGS.contactEmail}`}
                className="font-medium text-stone-900 dark:text-stone-100 underline underline-offset-4"
              >
                {JOTTER_SETTINGS.contactEmail}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
