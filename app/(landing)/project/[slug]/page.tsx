import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ArrowUpRight, CheckCircle2, Layers, Sparkles, Cpu } from "lucide-react";
import type { Metadata } from "next";
import ProjectImageGallery from "./ProjectImageGallery";
import TechIcon from "@/components/TechIcon";

import { DUMMY_PROJECTS as PROJECTS } from "@/types/projects";
import { getProjectBySlug } from "@/app/(backend)/api/projects/query";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title}`,
    description: project.description,
    alternates: {
      canonical: `/project/${project.slug}`,
    },
    openGraph: {
      title: `${project.title}`,
      description: project.description,
      url: `https://sepsu.dev/project/${project.slug}`,
      type: "article",
      images: [
        {
          url: project.mainImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title}`,
      description: project.description,
      images: [project.mainImage],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    applicationCategory: project.category,
    operatingSystem: "Web",
    description: project.description,
    image: project.mainImage,
    author: {
      "@type": "Person",
      name: "Sepsu Dev",
      url: "https://sepsu.dev",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <main className="w-full min-h-screen bg-[#fafafa] dark:bg-[#121212] text-stone-900 dark:text-stone-100 overflow-y-auto px-4 py-12 md:py-20 pb-36">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Breadcrumb & Back Link */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-200/90 dark:border-stone-800 bg-white/90 dark:bg-[#1c1c1c]/90 text-xs font-mono text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:border-stone-300 dark:hover:border-stone-700 shadow-2xs hover:shadow-xs hover:-translate-x-0.5 active:translate-x-0 transition-all duration-200 group"
            >
              <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to home</span>
            </Link>

            <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs font-mono text-stone-500 dark:text-stone-400">
              <Link href="/" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                home
              </Link>
              <span>/</span>
              <Link href="/projects" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                projects
              </Link>
              <span>/</span>
              <span className="text-stone-800 dark:text-stone-200 font-semibold">{project.slug}</span>
            </nav>
          </div>

          {/* Case Study Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-medium text-stone-700 dark:text-stone-300 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700/80">
                {project.category}
              </span>
              <span className="text-xs font-mono text-stone-400">·</span>
              <span className="text-xs font-mono text-stone-500 dark:text-stone-400">{project.year}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
                {project.title}
              </h1>

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-1.5 px-4 py-2 self-start rounded-full bg-stone-900 text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white text-xs font-medium shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200"
              >
                <span>Visit website</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
            </div>

            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          {/* Interactive Project Image Gallery Preview */}
          <ProjectImageGallery
            title={project.title}
            images={[project.mainImage, ...(project.secondaryImages || [])]}
          />

          {/* Overview: The Challenge & The Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#181818] space-y-2.5">
              <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                <Layers className="w-3.5 h-3.5" />
                <h2 className="text-xs font-mono font-semibold uppercase tracking-wider">
                  The Problem
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#181818] space-y-2.5">
              <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <h2 className="text-xs font-mono font-semibold uppercase tracking-wider">
                  The Solution
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                {project.outcome}
              </p>
            </div>
          </div>

          {/* Key Deliverables & Engineering Highlights */}
          <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#181818] space-y-3.5">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Key Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.objectives.map((obj, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300 font-medium leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies & Stack Highlights */}
          <div className="p-6 sm:p-7 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#181818] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Technologies & Architecture
              </h2>
              <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
                {project.stack.length} core tools
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {project.stack.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/70 dark:border-stone-800/80 shadow-2xs hover:border-stone-300 dark:hover:border-stone-700 transition-colors"
                >
                  <div className="w-6 h-6 rounded-lg bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 flex items-center justify-center shrink-0">
                    <TechIcon name={tech} size={14} />
                  </div>
                  <span className="text-xs font-mono font-medium text-stone-800 dark:text-stone-200 truncate">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
