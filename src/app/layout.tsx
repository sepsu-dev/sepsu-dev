import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getSiteConfig } from "@/lib/api";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  
  return {
    title: {
      default: siteConfig.title,
      template: `%s — ${siteConfig.name}`,
    },
    description: siteConfig.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await getSiteConfig();
  
  return (
    <html lang="en" className={`${inter.variable}`} data-scroll-behavior="smooth">
      <body className="antialiased font-sans min-h-screen flex flex-col bg-background text-foreground">
        <NextTopLoader showSpinner={false} color="#6366f1" />
        <TooltipProvider>
          <SiteHeader name={siteConfig.name} />
          <main className="flex-1">{children}</main>
          <SiteFooter author={siteConfig.author} />
        </TooltipProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
