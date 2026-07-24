import React from "react";
import { ProjectList } from "@/components/project-list";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactSection } from "@/components/contact-section";
import { Terminal, Code2, Database, Layout, Server, GitBranch, Mail, type LucideIcon, Globe, Cpu, Puzzle, Cloud, Palette, Wrench, Smartphone, Sparkles } from "lucide-react";
import { Highlighter } from "@/components/highlighter";
import { TechBadge } from "@/components/tech-badge";
import { SectionHeader } from "@/components/section-header";
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
      {/* Premium Micro-dot Grid Background */}
      <div className="fixed inset-0 bg-[radial-gradient(#8080800d_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0"></div>

      {/* Elegant Radial Light Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/4 blur-[130px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-purple-500/3 blur-[120px] pointer-events-none -z-10 animate-pulse-slow"></div>

      {/* Floating Glassmorphic Navbar */}
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 pt-28 pb-16 md:pt-36 md:pb-24 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Intro Section */}
        <section id="about" className="mb-24 scroll-mt-28">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            {/* Profile Avatar Container */}
            <div className="relative group flex-shrink-0">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-card border border-border/40 overflow-hidden shadow-sm transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
                <img
                  src={profile?.image_url || "/profile-sketch.png"}
                  alt={profile?.name || "Profile"}
                  className="w-full h-full object-cover object-center transition duration-500 group-hover:scale-[1.015]"
                />
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/8 text-primary text-[10px] sm:text-xs font-mono font-semibold tracking-tight mb-2 border border-primary/10">
                <Terminal className="w-3 h-3" />
                <span>portfolio.sh</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 text-foreground">
                {profile?.name ? profile.name.split(' ')[0] : "Sepsu"}{" "}
                <span className="text-primary">{profile?.name ? profile.name.split(' ').slice(1).join(' ') : "Dev"}</span>
              </h1>
            </div>
          </div>

          <div className="space-y-6 text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
            {/* Location Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/40 backdrop-blur-sm text-xs font-mono font-medium shadow-sm hover:border-primary/20 transition-colors mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-muted-foreground">Based in <span className="text-foreground font-semibold">{profile?.location || "Jakarta"}</span></span>
              <div className="w-3.5 h-2.5 rounded-[2px] overflow-hidden flex flex-col shadow-[0_0_2px_rgba(0,0,0,0.15)] ml-0.5 border border-border/30" title={profile?.location || "Indonesia"}>
                <div className="w-full h-1/2 bg-[#FF0000]"></div>
                <div className="w-full h-1/2 bg-white"></div>
              </div>
            </div>

            <p className="text-foreground/80 font-medium">
              {profile?.bio || "Full-stack Engineer specializing in high-performance backends and fluid modern user interfaces."}
            </p>
          </div>

          {/* Focus Areas list */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {focusItems.map((item: string, index: number) => {
              const emojiMatch = item.match(/^([^\s]+)\s+(.+)$/);
              const emoji = emojiMatch ? emojiMatch[1] : "▪";
              const text = emojiMatch ? emojiMatch[2] : item;
              return (
                <div key={index} className="flex items-start gap-3 p-4 rounded-xl border border-primary/20 bg-card/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <span className="text-base shrink-0 select-none">{emoji}</span>
                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-medium">
                    {text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tech Stack Section */}
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
          <p className="text-sm text-muted-foreground -mt-4 mb-8 max-w-xl">A curated selection of modern technologies and frameworks I leverage to engineer enterprise-grade applications.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {techStack.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="group relative p-5 rounded-xl border border-primary/20 bg-card/30 backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:bg-card/50">
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div className="p-2 bg-primary/8 rounded-lg text-primary">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-foreground">
                      {item.category}
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
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground flex items-center gap-2 shrink-0">
                  <Code2 className="w-4 h-4 text-primary" />
                  <span>Projects</span>
                </h2>
                <div className="h-[1px] flex-1 bg-border/40 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"></div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2 max-w-xl">A showcase of my recent engineering work, highlighting expertise in performance optimization and scalable architecture.</p>
            </div>
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