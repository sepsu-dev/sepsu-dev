import type { Metadata } from "next";
import DraggableCanvas from "@/components/DraggableCanvas";

export const metadata: Metadata = {
  title: "Sepsu Dev",
  description:
    "Interactive desk portfolio of Sepsu Dev. Explore selected projects, technical stack, live widgets, and case studies.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sepsu Dev",
    description:
      "Interactive desk portfolio of Sepsu Dev. Explore selected projects, technical stack, live widgets, and case studies.",
    url: "https://sepsu.dev",
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sepsu Dev",
    jobTitle: "Software Engineer",
    url: "https://sepsu.dev",
    sameAs: [
      "https://github.com/sepsu-dev",
      "https://twitter.com/",
      "https://instagram.com",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressCountry: "Indonesia",
    },
    knowsAbout: [
      "Software Engineering",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Laravel",
      "Nest.js",
      "PostgreSQL",
      "Docker",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative w-screen h-screen overflow-hidden">
        <DraggableCanvas />
      </main>
    </>
  );
}
