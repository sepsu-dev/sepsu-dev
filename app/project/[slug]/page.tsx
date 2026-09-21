import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

interface ProjectCaseStudy {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  mainImage: string;
  problemStatement: string;
  outcome: string;
  objectives: string[];
  kpiLabel: string;
  kpiValue: string;
  liveUrl: string;
  secondaryImages: string[];
  tags: string[];
}

const PROJECTS: ProjectCaseStudy[] = [
  {
    slug: "cryptix",
    title: "Cryptix",
    category: "End-to-End Product",
    tagline: "End-to-End Product",
    description:
      "A next-generation crypto exchange app built around trust and speed. From onboarding through to complex multi-asset trades, Cryptix makes digital asset management feel intuitive and calm.",
    mainImage: "/projects/cryptix-main.webp",
    problemStatement:
      "Crypto products often intimidate everyday investors with complex charting, obscure jargon, and opaque fee breakdowns.",
    outcome:
      "Delivered a streamlined trade flow with instant asset preview, real-time live performance analytics, and transparent gas estimations.",
    objectives: [
      "Make key management and onboarding effortless and reassuring",
      "Give a live dashboard for prices, portfolio value and performance",
      "Keep buy, convert and trade fast, with transparent real-time fees across 15+ assets",
    ],
    kpiLabel: "KPI",
    kpiValue: "Onboarding completion rate · time to first trade",
    liveUrl: "https://jotter.framer.website/work/cryptix",
    secondaryImages: [
      "/projects/cryptix-1.webp",
      "/projects/cryptix-2.webp",
    ],
    tags: ["Product Design", "Design System", "Mobile App", "Fintech"],
  },
  {
    slug: "novera",
    title: "Novera",
    category: "SaaS Platform",
    tagline: "SaaS Platform",
    description:
      "An AI-assisted contract workspace that speeds legal teams up without asking them to trust a black box. Reusable templates, auditable review, and live collaboration in one platform.",
    mainImage: "/projects/novera-main.webp",
    problemStatement:
      "Legal contract cycles drag on for weeks across disconnected redlining tools and unverified AI suggestions.",
    outcome:
      "Engineered an interactive review hub with clause risk heatmaps, side-by-side comparison, and direct SignFlow e-signature execution.",
    objectives: [
      "Design an AI-assisted contract workspace that speeds legal teams up, without asking them to trust a black box.",
      "Surface AI risk and clause analysis in a way lawyers can verify and trust",
      "Streamline drafting with reusable, on-brand templates",
      "Bring review, compliance and collaboration into one auditable hub",
    ],
    kpiLabel: "KPI",
    kpiValue: "Average contract review time · negotiation cycle length",
    liveUrl: "https://jotter.framer.website/work/novera",
    secondaryImages: [
      "/projects/novera-1.webp",
      "/projects/novera-2.webp",
    ],
    tags: ["SaaS", "Dashboard", "AI Workspace", "LegalTech"],
  },
  {
    slug: "pitlane",
    title: "Pitlane",
    category: "Web App",
    tagline: "Web App",
    description:
      "High-throughput motorsport telemetry and event stream visualization. Translating millions of data points per second into readable, glanceable insights for race engineers.",
    mainImage: "/projects/pitlane-main.webp",
    problemStatement:
      "Telemetry systems are notorious for cluttered interfaces where crucial engine and tire anomalies get lost in the noise.",
    outcome:
      "Created real-time telemetry dashboards with zero-SQL custom query builders, automated anomaly threshold alerts, and millisecond latency displays.",
    objectives: [
      "Make ingesting and querying huge event streams feel instant and legible",
      "Let anyone build live dashboards without writing SQL",
      "Turn anomaly detection and alerting into a calm, glanceable experience",
    ],
    kpiLabel: "KPI",
    kpiValue: "Time from data ingestion to actionable insight",
    liveUrl: "https://jotter.framer.website/work/pitlane",
    secondaryImages: [
      "/projects/pitlane-1.webp",
      "/projects/pitlane-2.webp",
    ],
    tags: ["Web App", "Telemetry", "Data Visualization", "Realtime"],
  },
];

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
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} - Case Study`,
    description: project.description,
    alternates: {
      canonical: `/project/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} - Sepsu Dev Case Study`,
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
      title: `${project.title} - Sepsu Dev Case Study`,
      description: project.description,
      images: [project.mainImage],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

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
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1c1c] text-xs font-mono text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 shadow-xs transition-colors group"
          >
            <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to home</span>
          </Link>

          {/* Case Study Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-medium text-stone-700 dark:text-stone-300 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700/80">
                {project.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
              {project.title}
            </h1>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
              {project.description}
            </p>

            <div className="pt-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-xs font-medium hover:opacity-90 transition-opacity"
              >
                <span>Visit website</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Main Banner Image */}
          <div className="rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#181818] shadow-xs relative aspect-[16/10]">
            <Image
              src={project.mainImage}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          {/* Problem Statement & Outcome */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#181818] space-y-2">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                Problem Statement
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#181818] space-y-2">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                Outcome
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                {project.outcome}
              </p>
            </div>
          </div>

          {/* Objectives & KPI */}
          <div className="p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#1c1c1c] shadow-sm space-y-6">
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
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                {project.kpiLabel}
              </span>
              <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                {project.kpiValue}
              </span>
            </div>
          </div>

          {/* Secondary Gallery Images */}
          {project.secondaryImages.map((imgUrl, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#1c1c1c] shadow-md relative aspect-[16/10]"
            >
              <Image
                src={imgUrl}
                alt={`${project.title} detail ${idx + 1}`}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          ))}

          {/* Tags */}
          <div className="pt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1 rounded-full bg-white dark:bg-[#1c1c1c] border border-stone-200 dark:border-stone-800 text-xs font-mono font-medium text-stone-700 dark:text-stone-300 shadow-2xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom Back to Home */}
          <div className="pt-8 border-t border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1c1c] text-xs font-mono text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 shadow-xs transition-colors group"
            >
              <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to home</span>
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1c1c] text-xs font-mono text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 shadow-xs transition-colors"
            >
              <span>All Projects</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
