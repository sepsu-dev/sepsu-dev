import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, GitBranch, Globe, Terminal, Code2, ArrowUpRight, Sparkles } from "lucide-react";
import { ProjectImages } from "@/components/project-images";
import { Highlighter } from "@/components/highlighter";
import { TechBadge } from "@/components/tech-badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { projectsService } from "@/services";
import { type Project } from "@/lib/utils";

interface ProjectPageProps {
  params: Promise<{ project_id: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { project_id } = await params;
  try {
    const project = await projectsService.getById(project_id);
    if (!project) return { title: "Project Not Found" };
    return {
      title: `${project.title || "Project"}`,
      description: (project as any).overview || "",
    };
  } catch (error) {
    return { title: "Project Not Found" };
  }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { project_id } = await params;
  let apiProject;

  try {
    apiProject = await projectsService.getById(project_id);
    if (!apiProject) notFound();
  } catch (error) {
    notFound();
  }

  const project: Project & { architecture?: string } = {
    project_id: apiProject.uid,
    title: apiProject.title,
    description: apiProject.overview,
    architecture: apiProject.architecture,
    tags: apiProject.skills?.map((s: any) => s.name) || [],
    imageUrl: apiProject.image_url,
    images: apiProject.image_url ? [apiProject.image_url] : [],
    href: apiProject.demo_url,
    githubUrl: apiProject.source_url,
  };

  return (
    <div className="relative min-h-screen bg-background pb-12 font-sans overflow-hidden pt-12">
      {/* Background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>

      {/* Floating Coding Symbols */}
      <div className="fixed top-32 left-10 text-primary/3 text-8xl font-mono font-bold select-none pointer-events-none animate-float hidden md:block z-0">
        {`{ }`}
      </div>
      <div className="fixed bottom-40 right-10 text-primary/3 text-8xl font-mono font-bold select-none pointer-events-none animate-float-reverse hidden md:block z-0">
        {`< />`}
      </div>

      {/* Aurora Ambient Glow Orbs */}
      <div className="absolute top-20 left-10 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full bg-primary/5 blur-[90px] sm:blur-[130px] pointer-events-none animate-orb-1 -z-10"></div>
      <div className="absolute top-1/2 right-10 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full bg-purple-500/5 blur-[80px] sm:blur-[120px] pointer-events-none animate-orb-2 -z-10"></div>

      {/* Navbar component */}
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 pt-28 pb-16 md:pt-36 md:pb-24 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Back Button */}
        <div className="mb-10">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-card border border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground text-xs font-mono font-bold tracking-tight transition-all duration-300 group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-primary" />
            <span>cd .. <span className="opacity-40">/projects</span></span>
          </Link>
        </div>

        {/* Header Section */}
        <header className="mb-12 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            <span className="relative inline-block z-10">
              {project.title}
              <Highlighter variant={1} className="-rotate-1 scale-x-105 opacity-30" />
            </span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </header>

        {/* Project Image Gallery Slider */}
        <div className="mb-12 rounded-lg overflow-hidden border border-border bg-card/40 backdrop-blur-sm shadow-md transition-all hover:border-primary/20 duration-500">
          <ProjectImages
            images={project.images || (project.imageUrl ? [project.imageUrl] : [])}
            title={project.title}
          />
        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

          {/* Main Description Content Column */}
          <div className="md:col-span-2 space-y-12">
            <section className="p-6 rounded-lg border border-border bg-card/25 backdrop-blur-md">
              <h2 className="text-base sm:text-lg font-bold text-foreground mb-4 flex items-center gap-2 font-mono">
                <GitBranch className="w-5 h-5 text-primary animate-pulse" />
                <span className="relative inline-block">
                  Project Overview
                  <Highlighter variant={2} className="rotate-1 opacity-20" />
                </span>
              </h2>
              <div className="text-muted-foreground leading-relaxed text-sm sm:text-base space-y-4 font-medium">
                <p>{project.description}</p>
              </div>
            </section>

            {/* Architecture macOS Mockup window */}
            {project.architecture && (
              <section className="rounded-lg overflow-hidden border border-border dark:border-[#30363d] bg-card dark:bg-[#0d1117] text-foreground dark:text-zinc-100 shadow-md hover:shadow-xl transition-all duration-500 font-mono text-xs sm:text-sm">
                <div className="flex items-center justify-between px-4 py-2.5 bg-muted/80 dark:bg-[#161b22] border-b border-border/40 dark:border-b-[#30363d]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/20"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/20"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/20"></div>
                    <span className="text-[11px] text-muted-foreground/80 dark:text-[#8b949e] ml-3 font-semibold tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-yellow-500 animate-spin-slow" />
                      architecture_specs.json
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-background/50 dark:bg-zinc-800/80 border border-border/40 dark:border-zinc-700 text-muted-foreground dark:text-zinc-300">JSON</div>
                  </div>
                </div>
                <div className="p-6 leading-relaxed bg-[#f6f8fa]/80 dark:bg-[#0d1117] transition-colors duration-500 flex flex-col gap-4 font-medium">
                  <div className="flex items-start gap-3">
                    <Code2 className="w-4 h-4 mt-1 text-[#005cc5] dark:text-[#79c0ff] shrink-0" />
                    <div>
                      <h4 className="text-foreground dark:text-zinc-200 font-bold text-xs sm:text-sm mb-1 font-mono">Stack Details:</h4>
                      <p className="text-xs sm:text-sm font-mono opacity-90 text-[#22863a] dark:text-[#a5d6ff]">{project.architecture}</p>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Info Column */}
          <div className="space-y-6">
            {/* Tech Stack Card */}
            <div className="p-5 rounded-lg border border-border bg-card/30 backdrop-blur-sm shadow-sm hover:border-primary/20 transition-all duration-300">
              <h3 className="text-xs font-bold text-foreground mb-4 font-mono tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary animate-pulse" />
                TECHNOLOGIES
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <TechBadge
                    key={tag}
                    tag={tag}
                    className="px-2.5 py-1 text-[10px]"
                  />
                ))}
              </div>
            </div>

            {/* CTA Links Card */}
            <div className="p-5 rounded-lg border border-border bg-card/30 backdrop-blur-sm shadow-sm hover:border-primary/20 transition-all duration-300 space-y-3">
              <h3 className="text-xs font-bold text-foreground mb-4 font-mono tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary animate-pulse" />
                RESOURCES
              </h3>
              <a
                href={project.href}
                target="_blank"
                className="flex items-center justify-between p-3 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-bold shadow-md hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(var(--primary),0.3)] transition-all group"
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
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-background hover:bg-muted text-xs sm:text-sm font-bold transition-all group"
                >
                  <span className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-primary"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
                    Source Code
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Footer component */}
      <Footer />
    </div>
  );
}