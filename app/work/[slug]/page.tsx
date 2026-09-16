import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { JOTTER_PROJECTS } from "@/lib/jotter-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return JOTTER_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = JOTTER_PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} - Jotter Case Study`,
    description: project.description,
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const project = JOTTER_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen bg-[#fafafa] dark:bg-[#121212] text-stone-900 dark:text-stone-100 overflow-y-auto px-4 py-12 md:py-20 pb-36">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1c1c] text-xs font-mono text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 shadow-xs transition-colors group"
        >
          <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to desk</span>
        </Link>

        {/* Case Study Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-xs font-medium text-stone-600 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700/80">
              {project.category}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
            {project.description}
          </p>

          <div className="pt-2">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#121212] text-white dark:bg-white dark:text-[#121212] text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <span>View live site</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Main Banner Image */}
        <div className="rounded-3xl overflow-hidden border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#1c1c1c] shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.mainImage}
            alt={project.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Problem Statement & Outcome */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#1c1c1c] shadow-sm space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-stone-400 dark:text-stone-500">
              Problem Statement
            </h2>
            <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#1c1c1c] shadow-sm space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-stone-400 dark:text-stone-500">
              Outcome
            </h2>
            <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
              {project.outcome}
            </p>
          </div>
        </div>

        {/* Objectives & KPI */}
        <div className="p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#1c1c1c] shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Objectives
          </h2>
          <ul className="space-y-4 text-sm sm:text-base text-stone-600 dark:text-stone-300">
            {project.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>

          <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-400 dark:text-stone-500">
              {project.kpiLabel}
            </span>
            <span className="text-sm font-semibold text-stone-800 dark:text-stone-200">
              {project.kpiValue}
            </span>
          </div>
        </div>

        {/* Secondary Gallery Images */}
        {project.secondaryImages.map((imgUrl, idx) => (
          <div
            key={idx}
            className="rounded-3xl overflow-hidden border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#1c1c1c] shadow-md"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgUrl}
              alt={`${project.title} detail ${idx + 1}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}

        {/* Tags */}
        <div className="pt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3.5 py-1 rounded-full bg-white dark:bg-[#1c1c1c] border border-stone-200 dark:border-stone-800 text-xs font-mono text-stone-600 dark:text-stone-400 shadow-2xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
