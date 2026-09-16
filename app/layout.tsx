import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jotter - Creative Portfolio Template",
  description:
    "Premium Framer template for product designers. Clean, notebook-inspired design with draggable project canvas, dedicated case studies, and neutral sans-serif UI.",
  icons: {
    icon: "https://framerusercontent.com/images/cQUWMsY5CkPA87rZxOo8HY608aM.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${caveat.variable} antialiased min-h-screen relative`}>
        {children}
        <Navbar />
      </body>
    </html>
  );
}
