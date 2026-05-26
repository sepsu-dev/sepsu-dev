import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, GitBranch, Globe, Terminal, Code2, Database, ArrowUpRight } from "lucide-react";
import { ProjectImages } from "@/components/project-images";
import { cn, type Project } from "@/utils";
import { Highlighter } from "@/components/highlighter";
import { TechBadge } from "@/components/tech-badge";

const projects: Project[] = [
  {
    id: "hematyu",
    title: "Hematyu",
    description: "Personal finance ecosystem featuring 'AI Roast' financial analyzer, automatic expense tracking via WhatsApp, and OCR receipt scanning for seamless money management.",
    startDate: "Feb 2024",
    endDate: "Present",
    tags: ["Next.js", "Tailwind CSS", "AI", "WhatsApp API", "OCR"],
    imageUrl: "/projects/hematyu.png",
    images: ["/projects/hematyu.png"],
    href: "http://hematyu.com/",
  },
  {
    id: "numpux",
    title: "Numpux",
    description: "A minimalist task management platform designed for deep work. Integrates Kanban workflows and calendar planning into a cohesive productivity experience.",
    startDate: "Jan 2024",
    endDate: "Feb 2024",
    tags: ["Next.js", "Tailwind CSS", "Vercel", "Task Management"],
    imageUrl: "/projects/numpux.png",
    images: ["/projects/numpux.png"],
    href: "https://numpux.vercel.app/",
    githubUrl: "https://github.com/sepsu-dev/numpux",
  },
  {
    id: "naha-admin",
    title: "Naha Admin",
    description: "Modern, clean-coded administrative dashboard template. Engineered with Bootstrap 5 and Vanilla JS for high performance and lightweight integration.",
    startDate: "Nov 2023",
    endDate: "Dec 2023",
    tags: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript"],
    imageUrl: "/projects/naha-admin.png",
    images: ["/projects/naha-admin.png"],
    href: "https://naha-admin.vercel.app/index",
    githubUrl: "https://github.com/sepsu-dev/naha-admin",
  },
  {
    id: "cek-bmi-yu",
    title: "Cek BMI Yu",
    description: "High-fidelity health utility for real-time BMI calculations. Features interactive dynamic sliders and instant healthy weight classification insights.",
    startDate: "Oct 2023",
    endDate: "Oct 2023",
    tags: ["React", "Tailwind CSS", "Vercel", "UI/UX"],
    imageUrl: "/projects/cek-bmi-yu.png",
    images: ["/projects/cek-bmi-yu.png"],
    href: "https://cek-bmi-yu.vercel.app/",
    githubUrl: "https://github.com/sepsu-dev/cek-bmi-yu",
  },
  {
    id: "sepsu-dev",
    title: "sepsu.dev",
    description: "My personal portfolio website designed with a premium, technical aesthetic. Built with Next.js 15 and Tailwind CSS to showcase engineering work and experience.",
    startDate: "May 2024",
    endDate: "Present",
    tags: ["Next.js 15", "React", "Tailwind CSS", "Framer Motion"],
    imageUrl: "/projects/sepsu-dev.png",
    images: ["/projects/sepsu-dev.png"],
    href: "https://sepsu.dev",
    githubUrl: "https://github.com/sepsu-dev/sepsu-dev",
  },
];

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}


export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title}`,
    description: project.description,
  };
}

// Re-using highlighter components from main page
// Using centralized Highlighter component

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  return (
    <div className="relative min-h-screen bg-background pb-32 font-sans overflow-hidden">
      {/* Background Ornaments from main page */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

      <div className="fixed top-32 left-10 text-primary/5 text-8xl font-mono font-bold select-none pointer-events-none animate-float hidden md:block">
        {`{ }`}
      </div>
      <div className="fixed bottom-40 right-10 text-primary/5 text-8xl font-mono font-bold select-none pointer-events-none animate-float-reverse hidden md:block">
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
              <Highlighter variant={1} className="-rotate-2" />
            </span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </header>

        {/* Project Image Slider - Main card style */}
        <div className="mb-16 rounded-2xl overflow-hidden border border-border bg-card/40 backdrop-blur-sm transition-all hover:border-primary/20">
          <ProjectImages
            images={project.images || (project.imageUrl ? [project.imageUrl] : [])}
            title={project.title}
          />
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2 font-mono">
                <GitBranch className="w-5 h-5 text-primary" />
                <span className="relative inline-block z-10">
                  Project Overview
                  <Highlighter variant={2} className="rotate-1" />
                </span>
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
                <p>
                  {project.description} This initiative required a deep understanding of scalable architecture and modern engineering principles to deliver a robust, future-proof solution.
                </p>
                <p>
                  The primary objective was to architect a system capable of handling high throughput while maintaining sub-second latency and an intuitive user experience. By leveraging the latest in cloud-native technologies, the platform ensures maximum uptime and seamless data synchronization.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2 font-mono">
                <Database className="w-5 h-5 text-primary" />
                <span className="relative inline-block z-10">
                  Architecture & Approach
                  <Highlighter variant={3} className="-rotate-1" />
                </span>
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
                <p>
                  Built from the ground up with maintainability in mind, the architecture follows clean code principles and domain-driven design. The backend services are decoupled to allow independent scaling, while the frontend consumes a highly optimized API.
                </p>
                <div className="rounded-xl border border-border/50 bg-primary/5 p-6 text-sm font-medium leading-relaxed italic text-foreground/80 border-l-4 border-l-primary">
                  "Engineering excellence is not just about writing code; it's about architecting sustainable, resilient systems that empower businesses to scale effortlessly."
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar (Tech Stack & Links) */}
          <div className="space-y-8">
            {/* Tech Stack */}
            <div className="p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm shadow-sm hover:border-primary/30 transition-all duration-300">
              <h3 className="text-sm font-bold text-foreground mb-4 font-mono tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary" />
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <TechBadge
                    key={tag}
                    tag={tag}
                    className="px-2.5 py-1 rounded-md bg-muted/50 text-muted-foreground border border-border/50 text-[11px] font-mono font-bold hover:border-primary/50 hover:text-primary transition-colors cursor-default tracking-wider"
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm shadow-sm hover:border-primary/30 transition-all duration-300 space-y-4">
              <h3 className="text-sm font-bold text-foreground mb-4 font-mono tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                Resources
              </h3>
              <a
                href={project.href}
                target="_blank"
                className="flex items-center justify-between p-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-md hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-10px_rgba(var(--primary),0.5)] transition-all group"
              >
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Live Demo
                </span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-background hover:bg-muted text-sm font-bold transition-all group"
                >
                  <span className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
                    Source Code
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
