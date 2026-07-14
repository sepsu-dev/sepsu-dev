import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import { MusicPlayer } from "@/components/music-player";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

import { profileService } from "@/services";

export async function generateMetadata(): Promise<Metadata> {
  const profileName = await profileService.get().then(p => p.name).catch(() => "Sepsu Dev");

  return {
    title: {
      default: profileName,
      template: `%s — ${profileName}`,
    },
    description: "Software Engineer specializing in high-performance backends and fluid modern user interfaces.",
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
        <main className="flex-1">{children}</main>
        <MusicPlayer />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}