"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { ContactSection } from "@/components/shared/contact-section";
import { Terminal, Code2, Database, Layout, Server, GitBranch, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { TechBadge } from "@/components/ui/tech-badge";
import { cn } from "@/lib/utils";

export interface ProjectItem {
  uid: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
}

export interface TechItem {
  name: string;
  icon: string;
}

export interface HomeContent {
  settings: Record<string, string>;
  projects: ProjectItem[];
  techStack: { category: string; icon: string; items: TechItem[] }[];
}

export function HomePage({ content }: { content: HomeContent }) {
  const { settings, projects, techStack } = content;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const limit = 3;
  const totalPages = Math.max(1, Math.ceil(projects.length / limit));
  const rawPage = Number(searchParams.get("page"));
  const currentPage = Math.min(Math.max(Number.isFinite(rawPage) ? rawPage : 1, 1), totalPages);
  const startIndex = (currentPage - 1) * limit;
  const pageItems = projects.slice(startIndex, startIndex + limit);
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        const timer = setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 150);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, currentPage]);

  const categoryIcons: Record<string, typeof Layout> = { frontend: Layout, backend: Server, database: Database, devops: GitBranch };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden font-sans pt-12">
      <div className="fixed inset-0 bg-[radial-gradient(#8080800d_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/4 blur-[130px] pointer-events-none -z-10"></div>
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 pt-28 pb-16 md:pt-36 md:pb-24 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* About */}
        <section id="about" className="mb-24 scroll-mt-28">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="relative group flex-shrink-0">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-card border border-border/40 overflow-hidden shadow-sm transition-all duration-300 group-hover:border-primary/30">
                <Image src="/profile-sketch.png" alt={settings.site_name ?? "Sepsu Dev"} width={96} height={96} priority className="w-full h-full object-cover object-center transition duration-500 group-hover:scale-[1.015]" />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/8 text-primary text-[10px] sm:text-xs font-mono font-semibold tracking-tight mb-2 border border-primary/10">
                <Terminal className="w-3 h-3" />
                <span>{settings.hero_badge ?? "portfolio.sh"}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 text-foreground">
                {settings.site_name ?? "Sepsu Dev"}
              </h1>
            </div>
          </div>

          <div className="space-y-6 text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/40 backdrop-blur-sm text-xs font-mono font-medium shadow-sm hover:border-primary/20 transition-colors mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-muted-foreground">Based in <span className="text-foreground font-semibold">{settings.location ?? "Jakarta, Indonesia"}</span></span>
            </div>
            <p className="text-foreground/80 font-medium">{settings.bio ?? ""}</p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[settings.focus_1, settings.focus_2, settings.focus_3, settings.focus_4].filter(Boolean).map((text, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-primary/20 bg-card/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <span className="text-base shrink-0 select-none">{["⚡", "⚛️", "🐳", "🛢️"][i]}</span>
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-medium">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech-stack" className="mb-24 scroll-mt-28 relative">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground flex items-center gap-2 shrink-0">
              <GitBranch className="w-4 h-4 text-primary" />
              <span>Tech Stack</span>
            </h2>
            <div className="h-[1px] flex-1 bg-border/40 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"></div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground -mt-4 mb-8 max-w-xl">Curated frameworks and tools I rely on to build fast, scalable applications.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {techStack.map((cat) => {
              const Icon = categoryIcons[cat.icon] ?? Layout;
              return (
                <div key={cat.category} className="group relative p-5 rounded-xl border border-primary/20 bg-card/30 backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:bg-card/50">
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div className="p-2 bg-primary/8 rounded-lg text-primary"><Icon className="w-4 h-4" /></div>
                    <h3 className="text-sm sm:text-base font-bold text-foreground capitalize">{cat.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1 relative z-10">
                    {cat.items.map((item) => (
                      <TechBadge key={item.name} tag={item.name} iconSlug={item.icon} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mb-24 scroll-mt-28">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
            <div>
              <div className="flex items-center gap-4">
                <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground flex items-center gap-2 shrink-0">
                  <Code2 className="w-4 h-4 text-primary" />
                  <span>Projects</span>
                </h2>
                <div className="h-[1px] flex-1 bg-border/40 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"></div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2 max-w-xl">Featured engineering projects highlighting performance, intuitive UI, and clean architecture.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 relative">
            {pageItems.map((p) => (
              <Link key={p.uid} href={`/project/${p.uid}`} className="group relative flex flex-col sm:flex-row gap-6 p-5 sm:p-6 rounded-xl border border-primary/20 bg-card/25 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:bg-card items-stretch animate-in fade-in duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="relative flex-shrink-0 w-full sm:w-52 md:w-56 aspect-[16/10] rounded-xl overflow-hidden border border-border/45 bg-muted/10 z-10 shadow-sm group-hover:border-primary/30 transition-all duration-300">
                  {p.image_url ? (
                    <Image src={p.image_url} alt={p.title} fill sizes="(max-width: 640px) 100vw, 224px" className="object-cover object-top relative z-10 transition-all duration-300 ease-out group-hover:scale-[1.03]" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-mono text-xs">IMAGE_NOT_AVAILABLE</div>
                  )}
                </div>
                <div className="flex flex-col gap-3 min-w-0 flex-1 relative z-10">
                  <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight transition-colors group-hover:text-primary flex items-center gap-1">
                    <span>{p.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-primary flex-shrink-0" />
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed font-medium">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                    {p.tags.slice(0, 4).map((tag) => <TechBadge key={tag} tag={tag} />)}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-4 mt-8 pt-6 border-t border-border/40">
              <div className="flex items-center gap-2">
                <Link href={`?page=${currentPage - 1}`} scroll={false} aria-label="Previous page" className={cn("group flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-card/40 transition-all duration-300 hover:border-primary/50 hover:bg-card", !hasPrevPage && "pointer-events-none opacity-20 grayscale")}>
                  <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
                </Link>
                <div className="flex items-center gap-2 mx-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link key={p} href={`?page=${p}`} scroll={false} aria-label={`Go to page ${p}`} className={cn("relative w-10 h-10 flex items-center justify-center rounded-lg text-xs font-mono font-bold transition-all duration-300 border overflow-hidden", p === currentPage ? "border-primary text-primary-foreground" : "border-border/50 bg-card/20 text-muted-foreground hover:border-border hover:bg-card hover:text-foreground")}>
                      {p === currentPage && <div className="absolute inset-0 bg-primary -z-10 animate-in fade-in zoom-in duration-300" />}
                      {p.toString().padStart(2, "0")}
                    </Link>
                  ))}
                </div>
                <Link href={`?page=${currentPage + 1}`} scroll={false} aria-label="Next page" className={cn("group flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-card/40 transition-all duration-300 hover:border-primary/50 hover:bg-card", !hasNextPage && "pointer-events-none opacity-20 grayscale")}>
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          )}
        </section>

        <ContactSection email={settings.email ?? "sepsu.dev@gmail.com"} githubUrl={settings.github_url ?? "https://github.com/sepsu-dev"} />
      </div>
      <Footer />
    </div>
  );
}