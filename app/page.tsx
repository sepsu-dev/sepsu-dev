import type { Metadata } from "next";
import DraggableCanvas from "@/components/DraggableCanvas";
import { JOTTER_SETTINGS, JOTTER_PROJECTS } from "@/lib/jotter-data";

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
    name: JOTTER_SETTINGS.name,
    jobTitle: JOTTER_SETTINGS.role,
    url: "https://sepsu.dev",
    sameAs: [
      JOTTER_SETTINGS.githubUrl,
      JOTTER_SETTINGS.twitterUrl,
      JOTTER_SETTINGS.instagramUrl,
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
