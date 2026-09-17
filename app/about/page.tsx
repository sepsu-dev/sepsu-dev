import type { Metadata } from "next";
import AboutCanvas from "@/components/AboutCanvas";
export const metadata: Metadata = {
  title: "About",
  description:
    "About Sepsu Dev - Software Engineer with 3+ years of experience building reliable backends, modern web applications, and scalable services in Jakarta, Indonesia.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About - Sepsu Dev",
    description:
      "Software Engineer with 3+ years of experience building reliable backends, modern web applications, and scalable services in Jakarta, Indonesia.",
    url: "https://sepsu.dev/about",
    images: [
      {
        url: "/avatar.webp",
        width: 1024,
        height: 768,
        alt: "Sepsu Dev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About - Sepsu Dev",
    description:
      "Software Engineer with 3+ years of experience building reliable backends, modern web applications, and scalable services in Jakarta, Indonesia.",
  },
};

export default function AboutPage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <AboutCanvas />
    </main>
  );
}
