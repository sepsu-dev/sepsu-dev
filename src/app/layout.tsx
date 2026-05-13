import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/tooltip";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CustomCursor } from "@/components/custom-cursor";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export function generateMetadata(): Metadata {
  return {
    title: {
      default: "Sepsu Dev — Software Engineer",
      template: `%s — Sepsu Dev`,
    },
    description: "Software Engineer specializing in backend systems, microservices, and full-stack web development.",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} data-scroll-behavior="smooth">
      <body className="antialiased font-sans min-h-screen flex flex-col bg-background text-foreground">
        <NextTopLoader showSpinner={false} color="#6366f1" />
        <CustomCursor />
        <TooltipProvider>
          <SiteHeader name="Sepsu Dev" />
          <main className="flex-1">{children}</main>
          <SiteFooter author="Sepsu Dev" />
        </TooltipProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
