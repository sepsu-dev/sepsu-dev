import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/services/projects";
import { getSiteConfig } from "@/lib/api";
import { ChevronLeft, GitBranch, Globe, Terminal } from "lucide-react";
import { ProjectImages } from "@/components/projects/project-images";
import { cn } from "@/lib/utils";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}


export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  };
}

// Re-using highlighter components from main page
const Highlighter1 = ({ className = "" }: { className?: string }) => (
  <svg className={`absolute top-1/2 left-0 w-full h-full -translate-y-1/2 text-primary/20 -z-10 scale-110 ${className}`} viewBox="0 0 100 24" preserveAspectRatio="none">
    <path d="M4,18 C25,14 55,20 96,16" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Highlighter2 = ({ className = "" }: { className?: string }) => (
  <svg className={`absolute top-1/2 left-0 w-full h-full -translate-y-1/2 text-primary/20 -z-10 scale-110 ${className}`} viewBox="0 0 100 24" preserveAspectRatio="none">
    <path d="M3,16 C30,20 70,14 97,18" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const [project, config] = await Promise.all([
    getProjectById(id),
    getSiteConfig(),
  ]);

  if (!project) notFound();

  return (
    <div className="relative min-h-screen bg-background pb-32 font-sans overflow-hidden">
      {/* Background Ornaments from main page */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

      <div className="fixed top-32 left-10 text-primary/5 text-8xl font-mono font-bold select-none pointer-events-none rotate-12 hidden md:block">
        {`{ }`}
      </div>
      <div className="fixed bottom-40 right-10 text-primary/5 text-8xl font-mono font-bold select-none pointer-events-none -rotate-12 hidden md:block">
        {`< />`}
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 md:py-24 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Back Button - Main style */}
        <div className="mb-10">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono font-semibold tracking-tight transition-all hover:bg-primary/20 group"
          >
            <Terminal className="w-3 h-3" />
            <span>~/projects/{id}.sh</span>
            <ChevronLeft className="w-3 h-3 ml-1 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>

        {/* Header Section */}
        <header className="mb-12 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            <span className="relative inline-block z-10">
              {project.title}
              <Highlighter1 className="-rotate-2" />
            </span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </header>

        {/* Project Image Slider - Main card style */}
        <div className="mb-16 rounded-2xl overflow-hidden border border-border bg-card/40 backdrop-blur-sm shadow-xl transition-all hover:shadow-2xl hover:border-primary/20">
          <ProjectImages
            images={project.images || (project.imageUrl ? [project.imageUrl] : [])}
            title={project.title}
          />
        </div>

        {/* Content Body */}
        <div className="space-y-20">

          {/* Overview Section */}
          <section className="relative">
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-8 flex items-center gap-2 font-mono">
              <GitBranch className="w-5 h-5 text-primary" />
              <span className="relative inline-block z-10">
                Project Overview
                <Highlighter2 className="rotate-1" />
              </span>
            </h2>

            <div className="space-y-6 text-muted-foreground leading-relaxed text-sm sm:text-base max-w-2xl">
              <p>
                This project was developed with a primary focus on high-performance data handling and seamless user experience.
                Utilizing modern technologies to ensure scalability and reliability across all modules.
              </p>
              <div className="rounded-xl overflow-hidden border border-border bg-card/40 backdrop-blur-sm p-6 text-sm italic">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              </div>
            </div>
          </section>

          {/* Tech Stack & Links combined to match main style flow */}
          <section className="space-y-12">

            {/* Tech Stack */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <div
                    key={tag}
                    className="px-3 py-1.5 rounded-lg border border-border bg-card/40 backdrop-blur-sm text-xs font-mono font-medium hover:border-primary/40 hover:text-primary transition-all cursor-default"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Links - Main style buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl pt-8">
              <a
                href={project.href}
                target="_blank"
                className="group flex items-center justify-between p-4 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4" />
                  <span>LAUNCH LIVE SITE</span>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#"
                className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card/40 backdrop-blur-sm text-sm font-bold hover:bg-card hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground">
                  <GitBranch className="w-4 h-4" />
                  <span>BROWSE SOURCE</span>
                </div>
                <ChevronLeft className="w-4 h-4 rotate-180 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

          </section>

        </div>
      </div>
    </div>
  );
}
