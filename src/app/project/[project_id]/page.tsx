import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, GitBranch, Globe, Terminal, Code2, ArrowUpRight } from "lucide-react";
import { ProjectImages } from "@/components/project-images";
import { Highlighter } from "@/components/highlighter";
import { TechBadge } from "@/components/tech-badge";
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
    <div className="relative min-h-screen bg-background pb-32 font-sans overflow-hidden">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

      <div className="fixed top-32 left-10 text-primary/5 text-8xl font-mono font-bold select-none pointer-events-none animate-float hidden md:block">
        {`{ }`}
      </div>
      <div className="fixed bottom-40 right-10 text-primary/5 text-8xl font-mono font-bold select-none pointer-events-none animate-float-reverse hidden md:block">
        {`< />`}
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 md:py-24 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Back Button */}
        <div className="mb-10">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono font-semibold tracking-tight transition-all hover:bg-primary/20 group"
          >
            <Terminal className="w-3 h-3" />
            <span>~/projects</span>
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

        {/* Project Image Slider */}
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
              <div className="text-muted-foreground leading-relaxed text-sm sm:text-base space-y-4">
                <p>{project.description}</p>
                {project.architecture && (
                  <div className="mt-8 p-6 rounded-xl bg-muted/30 border border-border/50">
                    <h3 className="text-foreground font-bold mb-3 flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-primary" /> Architecture & Tech Details
                    </h3>
                    <p className="text-sm italic opacity-80">{project.architecture}</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
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