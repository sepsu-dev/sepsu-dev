import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Globe, ArrowUpRight } from "lucide-react";
import { getProject } from "@/lib/repo";
import { ProjectImages } from "@/components/modules/project-images";
import { TechBadge } from "@/components/ui/tech-badge";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export const dynamic = "force-dynamic";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default async function ProjectDetailPage({ params }: { params: Promise<{ project_id: string }> }) {
  const { project_id } = await params;
  const project = await getProject(project_id);
  if (!project) notFound();

  const images = project.image_url ? [project.image_url] : [];

  return (
    <div className="relative min-h-screen bg-background pb-12 font-sans overflow-hidden pt-12">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none -z-10"></div>
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 pt-28 pb-16 md:pt-36 md:pb-24 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-8">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium group">
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Link>
        </div>

        <div className="mb-16 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 border border-primary/20 bg-card/20 backdrop-blur-sm p-1 transition-all duration-300">
          <ProjectImages images={images} title={project.title} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-8 space-y-10">
            <section className="space-y-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground flex items-center gap-2 mb-6">{project.title}</h1>
              <div className="p-6 sm:p-8 rounded-xl bg-card border border-primary/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-muted-foreground text-base sm:text-[15px] leading-relaxed">
                {project.description.split("\n").map((line, i) => {
                  if (!line.trim()) return <div key={i} className="h-3" />;
                  const parts = line.split(/(\*\*.*?\*\*)/g);
                  return (
                    <p key={i} className="mb-1.5 last:mb-0">
                      {parts.map((part, j) =>
                        part.startsWith("**") && part.endsWith("**") ? (
                          <strong key={j} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>
                        ) : (
                          part
                        )
                      )}
                    </p>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="md:col-span-4 space-y-8">
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-foreground tracking-wide uppercase text-muted-foreground">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => <TechBadge key={tag} tag={tag} className="px-3 py-1.5 text-xs bg-background shadow-sm" />)}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-foreground tracking-wide uppercase text-muted-foreground">Links</h2>
              <div className="flex flex-col gap-3">
                {project.demo_url && (
                  <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3.5 rounded-xl bg-primary/90 hover:bg-primary text-primary-foreground text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                    <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> Live Demo</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3.5 rounded-xl border border-primary/20 bg-transparent hover:bg-muted/50 hover:shadow-md hover:-translate-y-0.5 text-foreground text-sm font-medium transition-all duration-300 group">
                    <span className="flex items-center gap-2"><GithubIcon className="w-4 h-4" /> Source Code</span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}