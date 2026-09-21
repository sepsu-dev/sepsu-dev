import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sepsu.dev"),
  title: "Sepsu Dev",
  description:
    "Software Engineer with 3+ years of experience building reliable backends, cloud-native services, and fluid web applications. Based in Jakarta, Indonesia.",
  keywords: [
    "Sepsu Dev",
    "Software Engineer",
    "Web Developer Jakarta",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Laravel",
    "Nest.js",
    "Go",
    "Golang",
    "Java Spring",
    "Express.js",
    "PostgreSQL",
    "MySQL",
    "SQL Server",
    "Elasticsearch",
    "Redis",
    "Docker",
    "Portfolio",
  ],
  authors: [{ name: "Sepsu Dev", url: "https://sepsu.dev" }],
  creator: "Sepsu Dev",
  publisher: "Sepsu Dev",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sepsu.dev",
    siteName: "Sepsu Dev",
    title: "Sepsu Dev",
    description:
      "Software Engineer with 3+ years of experience building reliable backends, cloud-native services, and fluid web applications.",
    images: [
      {
        url: "/projects/cryptix-main.webp",
        width: 1200,
        height: 630,
        alt: "Sepsu Dev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sepsu Dev",
    description:
      "Software Engineer with 3+ years of experience building reliable backends, cloud-native services, and fluid web applications.",
    images: ["/projects/cryptix-main.webp"],
    creator: "@sepsudev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/avatar.webp",
    apple: "/avatar.webp",
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
