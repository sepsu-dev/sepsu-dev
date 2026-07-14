import React from "react";
import { ProjectList } from "@/components/project-list";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactSection } from "@/components/contact-section";
import { Terminal, Code2, Database, Layout, Server, GitBranch, Mail, type LucideIcon, Globe, Cpu, Puzzle, Cloud, Palette, Wrench, Smartphone, Sparkles } from "lucide-react";
import { Highlighter } from "@/components/highlighter";
import { TechBadge } from "@/components/tech-badge";
import { projectsService, skillsService, skillCategoriesService, profileService } from "@/services";
import { type Project } from "@/lib/utils";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata() {
  try {
    const profile = await profileService.get();
    const title = profile.name || "Sepsu Dev";
    const description = profile.bio || "Full-stack Engineer specializing in high-performance backends and fluid modern user interfaces.";

    return {
      title: title,
      description: description,
      openGraph: {
        title: title,
        description: description,
        type: 'website',
      }
    };
  } catch (error) {
    return {
      title: "Sepsu Dev",
      description: "Full-stack Engineer specializing in high-performance backends and fluid modern user interfaces.",
    };
  }
}

interface TechStackItem {
  category: string;
  skills: { name: string, icon?: string }[];
  icon: LucideIcon;
}

export default async function AboutPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");
  const limit = 3;

  const [projectsData, apiSkills, apiCategories, profile] = await Promise.all([
    projectsService.getAll({ page: currentPage, limit: 3 }).catch(() => [] as any),
    skillsService.getAll().catch(() => ({}) as any),
    skillCategoriesService.getAll().catch(() => [] as any),
    profileService.get().catch(() => ({}) as any),
  ]);

  // Handle potential different response formats from BE
  const apiProjects = Array.isArray(projectsData) ? projectsData : (projectsData as any)?.items || (projectsData as any)?.projects || [];

  // _meta is attached by our API client interceptor from the backend's meta field
  const metaFromApi = (projectsData as any)?._meta;
  const total = metaFromApi?.total || apiProjects.length;

  const paginatedProjects: Project[] = apiProjects.map((p: any) => ({
    project_id: p.uid,
    title: p.title,
    description: p.overview,
    tags: p.skills?.map((s: any) => s.name) || [],
    imageUrl: p.image_url,
    href: p.demo_url,
    githubUrl: p.source_url,
  }));

  const totalPages = metaFromApi?.totalPages || Math.ceil(total / limit);
  const meta = {
    total,
    page: currentPage,
    limit,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };

  // Build category lookup from /skill-categories endpoint: { name → { name, icon } }
  const categoryMap: Record<string, { name: string; icon: string }> = {};
  const categoriesArray = Array.isArray(apiCategories) ? apiCategories : [];
  for (const cat of categoriesArray) {
    categoryMap[cat.name] = { name: cat.name, icon: cat.icon };
  }

  // Mapping category name → Lucide fallback icon (used if category icon URL fails)
  const iconFallbackMap: Record<string, LucideIcon> = {
    "frontend": Layout,
    "backend": Server,
    "integration": Puzzle,
    "devops": Cloud,
    "database": Database,
    "design": Palette,
    "tools": Wrench,
    "mobile": Smartphone,
    "hardware": Cpu,
  };

  // API returns skills grouped by category: { backend: Skill[], frontend: Skill[], ... }
  // Flatten then re-group, extracting category name from nested object if needed
  const rawSkillsArray = Array.isArray(apiSkills) ? apiSkills : Object.values(apiSkills || {}).flat();
  const groupedSkills = rawSkillsArray.reduce((acc: any, skill: any) => {
    const cat = typeof skill?.category === 'object' && skill.category !== null
      ? skill.category.name
      : skill?.category;
    if (!cat) return acc;
    if (!acc[cat]) acc[acc.name || cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const normalizedSkills: { category: string, skills: any[] }[] = Object.entries(groupedSkills).map(([category, skills]) => ({
    category,
    skills: skills as any[]
  }));

  const techStack: TechStackItem[] = normalizedSkills.map((group) => {
    const catInfo = categoryMap[group.category];
    const displayName = catInfo?.name
      ? catInfo.name.charAt(0).toUpperCase() + catInfo.name.slice(1)
      : group.category.charAt(0).toUpperCase() + group.category.slice(1);

    return {
      category: displayName,
      skills: group.skills.map((s: any) =>
        typeof s === "string" ? { name: s } : { name: s.name, icon: s.icon }
      ),
      icon: iconFallbackMap[group.category.toLowerCase()] || Code2,
    };
  });

  // Logic for terminal focus items from profile.focus
  const focusItems = Array.isArray(profile?.focus) && profile.focus.length > 0
    ? profile.focus
    : profile?.title
      ? profile.title.split('|').map((item: string) => item.trim())
      : [
        "⚡ Engineering high-performance backends",
        "🎨 Crafting fluid and interactive UIs",
        "🚀 Architecting scalable cloud infrastructure"
      ];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden font-sans pt-12">
      {/* Dynamic Background Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>

      {/* Floating Decorative Coding Symbols */}
      <div className="fixed top-32 left-10 text-primary/3 text-8xl font-mono font-bold select-none pointer-events-none animate-float hidden md:block z-0">
        {`{ }`}
      </div>
      <div className="fixed bottom-40 right-10 text-primary/3 text-8xl font-mono font-bold select-none pointer-events-none animate-float-reverse hidden md:block z-0">
        {`< />`}
      </div>

      {/* Aurora Ambient Glow Orbs */}
      <div className="absolute top-20 left-10 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full bg-primary/5 blur-[90px] sm:blur-[130px] pointer-events-none animate-orb-1 -z-10"></div>
      <div className="absolute top-1/2 right-10 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full bg-purple-500/5 blur-[80px] sm:blur-[120px] pointer-events-none animate-orb-2 -z-10"></div>

      {/* Floating Glassmorphic Navbar */}
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 pt-28 pb-16 md:pt-36 md:pb-24 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Intro Section */}
        <section id="about" className="mb-24 scroll-mt-28">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            {/* Avatar with spinning gradient ring */}
            <div className="relative group flex-shrink-0">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-60 blur-sm transition duration-700 group-hover:opacity-100 animate-spin-slow"></div>
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-card border border-border/30 overflow-hidden ring-4 ring-background">
                <img
                  src={profile?.image_url || "https://media.tenor.com/Rd0jrWH5JjgAAAAM/cat-scuba.gif"}
                  alt={profile?.name || "Profile"}
                  className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-primary/10 text-primary text-[10px] sm:text-xs font-mono font-semibold tracking-tight mb-2">
                <Terminal className="w-3 h-3 animate-pulse" />
                <span>~/portfolio/about_me.sh</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                <span className="relative inline-block z-10 text-foreground">
                  {profile?.name ? profile.name.split(' ')[0] : "Sepsu"} <span className="text-primary">{profile?.name ? profile.name.split(' ').slice(1).join(' ') : "Dev"}</span>
                  <Highlighter variant={1} className="-rotate-2 scale-x-110 opacity-30" />
                </span>
              </h1>
            </div>
          </div>

          <div className="space-y-6 text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
            {/* Location Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur-sm text-xs font-mono font-medium shadow-sm hover:border-primary/20 transition-colors mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              </span>
              <span className="text-muted-foreground">Based in <span className="text-foreground font-semibold">{profile?.location || "Jakarta"}</span></span>
              <div className="w-3.5 h-2.5 rounded-[2px] overflow-hidden flex flex-col shadow-[0_0_2px_rgba(0,0,0,0.2)] ml-0.5 border border-border/50" title={profile?.location || "Indonesia"}>
                <div className="w-full h-1/2 bg-[#FF0000]"></div>
                <div className="w-full h-1/2 bg-white"></div>
              </div>
            </div>

            <p className="text-foreground/90 font-medium">
              {profile?.bio || "Full-stack Engineer specializing in high-performance backends and fluid modern user interfaces."}
            </p>
          </div>

          {/* macOS Editor/Terminal mockup for Focus Areas */}
          <div className="rounded-lg overflow-hidden border border-border dark:border-[#30363d] bg-card dark:bg-[#0d1117] text-foreground dark:text-zinc-100 shadow-md hover:shadow-xl transition-all duration-500 mt-8 font-mono text-xs sm:text-sm">
            <div className="flex items-center justify-between px-4 py-2.5 bg-muted/80 dark:bg-[#161b22] border-b border-border/40 dark:border-b-[#30363d]">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/20"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/20"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/20"></div>
                <span className="text-[11px] text-muted-foreground/80 dark:text-[#8b949e] ml-3 font-semibold tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-yellow-500 animate-spin-slow" />
                  active_session.js
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-background/50 dark:bg-zinc-800/80 border border-border/40 dark:border-zinc-700 text-muted-foreground dark:text-zinc-300">JS</div>
              </div>
            </div>
            <div className="p-4 overflow-x-auto leading-relaxed flex items-start gap-4 bg-[#f6f8fa]/80 dark:bg-[#0d1117] transition-colors duration-500">
              <div className="select-none text-muted-foreground/30 dark:text-[#8b949e]/30 text-right pr-2 border-r border-border/20 dark:border-r-[#30363d]/50 space-y-0.5">
                {focusItems.map((_: string, index: number) => (
                  <div key={index} className="h-5 flex items-center justify-end">{index + 1}</div>
                ))}
                <div className="h-5 flex items-center justify-end">{focusItems.length + 1}</div>
              </div>
              <div className="flex-1 whitespace-nowrap min-w-0 font-medium space-y-0.5">
                <div className="h-5 flex items-center">
                  <span className="text-[#d73a49] dark:text-[#ff7b72]">const</span>&nbsp;
                  <span className="text-[#005cc5] dark:text-[#79c0ff]">currentFocus</span>&nbsp;
                  <span className="text-[#d73a49] dark:text-[#ff7b72]">=</span>&nbsp;
                  <span className="text-foreground dark:text-zinc-300">[</span>
                </div>
                {focusItems.map((item: string, i: number) => (
                  <div key={i} className="h-5 flex items-center">
                    &nbsp;&nbsp;<span className="text-[#22863a] dark:text-[#a5d6ff]">"{item}"</span>
                    <span className="text-foreground dark:text-zinc-300">{i < focusItems.length - 1 ? "," : ""}</span>
                  </div>
                ))}
                <div className="h-5 flex items-center">
                  <span className="text-foreground dark:text-zinc-300">]</span>
                  <span className="text-[#d73a49] dark:text-[#ff7b72]">;</span>
                  <span className="inline-block w-1.5 h-4 bg-primary ml-1 cursor-blink align-middle"></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech-stack" className="mb-24 scroll-mt-28 relative">
          <div className="mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2 font-mono">
              <GitBranch className="w-5 h-5 text-primary animate-pulse" />
              <span className="relative inline-block z-10">
                Tech Stack
                <Highlighter variant={2} className="rotate-2 scale-x-110" />
              </span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">A curated selection of modern technologies and frameworks I leverage to engineer enterprise-grade applications.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {techStack.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="group relative p-4 sm:p-5 rounded-lg border border-border/60 bg-card/30 backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_30px_-15px_rgba(0,0,0,0.3)] hover:bg-card hover:border-primary/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-105 transition-transform text-primary">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="relative inline-block text-sm sm:text-base font-bold text-foreground">
                      {item.category}
                      <Highlighter variant={1} className="scale-x-125 opacity-10" />
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1 relative z-10">
                    {item.skills.map((skill) => (
                      <TechBadge key={skill.name} tag={skill.name} iconSlug={skill.icon} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-24 scroll-mt-28">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2 font-mono relative">
                <Code2 className="w-5 h-5 text-primary" />
                <span className="relative inline-block z-10">
                  Projects
                  <Highlighter variant={3} className="-rotate-2 scale-y-125" />
                </span>
              </h2>
              <p className="text-sm text-muted-foreground mt-1">A showcase of my recent engineering work, highlighting expertise in performance optimization and scalable architecture.</p>
            </div>
            <div className="h-px flex-1 bg-border/40 ml-6 hidden sm:block"></div>
          </div>
          <ProjectList projects={paginatedProjects} meta={meta} title="" />
        </section>

        {/* Dynamic Interactive Contact Section */}
        <ContactSection email={profile?.email || "sepsu.dev@gmail.com"} githubUrl={profile?.github_url} />

      </div>

      {/* General Footer */}
      <Footer />
    </div>
  );
}