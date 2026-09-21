import { Suspense } from "react";
import type { Metadata } from "next";
import ProjectsList from "./ProjectsList";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore selected projects and case studies by Sepsu Dev — web applications, SaaS platforms, and developer tooling built with modern engineering.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects - Sepsu Dev",
    description:
      "Explore selected projects and case studies by Sepsu Dev — web applications, SaaS platforms, and developer tooling built with modern engineering.",
    url: "https://sepsu.dev/projects",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Sepsu Dev",
    description:
      "Explore selected projects and case studies by Sepsu Dev — web applications, SaaS platforms, and developer tooling.",
  },
};

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="w-full min-h-screen bg-[#fafafa] dark:bg-[#121212]" />}>
      <ProjectsList />
    </Suspense>
  );
}
