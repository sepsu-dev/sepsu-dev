import type { Metadata } from "next";
import { ProjectList } from "@/components/projects/project-list";
import { getPaginatedProjects } from "@/lib/services/projects";
import { getSiteConfig } from "@/lib/api";
import { Terminal, Code2, Database, Layout, Server, GitBranch } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  return {
    title: "About",
    description: siteConfig.description,
  };
}

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

const Highlighter3 = ({ className = "" }: { className?: string }) => (
  <svg className={`absolute top-1/2 left-0 w-full h-full -translate-y-1/2 text-primary/20 -z-10 scale-110 ${className}`} viewBox="0 0 100 24" preserveAspectRatio="none">
    <path d="M2,19 C20,15 40,22 60,16 C80,10 90,20 98,17" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default async function AboutPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");
  
  const [{ data: projects, meta }, config] = await Promise.all([
    getPaginatedProjects(currentPage, 3),
    getSiteConfig()
  ]);

  const iconMap: Record<string, any> = {
    Server,
    Database,
    Layout,
    Code2,
    GitBranch,
    Terminal
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden font-sans">
      {/* Programmer Ornaments */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

      <div className="fixed top-32 left-10 text-primary/5 text-8xl font-mono font-bold select-none pointer-events-none rotate-12 hidden md:block">
        {`{ }`}
      </div>
      <div className="fixed bottom-40 right-10 text-primary/5 text-8xl font-mono font-bold select-none pointer-events-none -rotate-12 hidden md:block">
        {`< />`}
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 md:py-24 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Intro Section */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl animate-pulse"></div>
              <img
                src="https://www.svgrepo.com/show/404545/avatar-man-profile-user-3.svg"
                alt={config.author}
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-muted border border-border shadow-lg object-cover ring-4 ring-background"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-primary/10 text-primary text-[10px] sm:text-xs font-mono font-semibold tracking-tight mb-2">
                <Terminal className="w-3 h-3" />
                <span>~/portfolio/about_me.sh</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                <span className="relative inline-block z-10">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500">{config.author}</span>
                  <Highlighter1 className="-rotate-3" />
                </span>
              </h1>
            </div>
          </div>

          <div className="space-y-6 text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
            <p>{config.bio}</p>

            <div className="rounded-xl overflow-hidden border border-border shadow-sm dark:shadow-xl bg-card text-card-foreground mt-4 font-mono text-xs sm:text-sm">
              <div className="flex items-center px-4 py-2.5 bg-muted/50 border-b border-border">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="mx-auto text-xs text-muted-foreground flex items-center gap-2">
                  <Code2 className="w-3 h-3" /> focus.ts
                </div>
              </div>
              <div className="p-4 overflow-x-auto leading-relaxed">
                <span className="text-pink-600 dark:text-pink-400">const</span> <span className="text-blue-600 dark:text-blue-400">currentFocus</span> <span className="text-foreground">=</span> [<br />
                &nbsp;&nbsp;<span className="text-green-600 dark:text-green-300">"exploring new technologies"</span>,<br />
                &nbsp;&nbsp;<span className="text-green-600 dark:text-green-300">"optimizing infrastructure"</span>,<br />
                &nbsp;&nbsp;<span className="text-green-600 dark:text-green-300">"building side projects"</span><br />
                ];
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-20 relative">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-6 flex items-center gap-2 font-mono">
            <GitBranch className="w-5 h-5 text-primary" />
            <span className="relative inline-block z-10">
              Core Technologies
              <Highlighter2 className="rotate-2 scale-x-110" />
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {config.techStack.map((item, idx) => {
              const Icon = iconMap[item.icon] || Code2;
              return (
                <div key={idx} className="group relative p-4 sm:p-5 rounded-xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl hover:bg-card">
                  <div className="flex items-center gap-3 mb-2 sm:mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">{item.category}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-mono">{item.skills.join(", ")}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Projects */}
        <section id="portfolio">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2 font-mono relative">
              <Code2 className="w-5 h-5 text-primary" />
              <span className="relative inline-block z-10">
                Selected Projects
                <Highlighter3 className="-rotate-2 scale-y-125" />
              </span>
            </h2>
            <div className="h-px flex-1 bg-border ml-6"></div>
          </div>
          <ProjectList projects={projects} meta={meta} title="" />
        </section>

      </div>
    </div>
  );
}