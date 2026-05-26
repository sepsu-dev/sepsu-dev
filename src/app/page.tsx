import { ProjectList } from "@/components/project-list";
import { Terminal, Code2, Database, Layout, Server, GitBranch, Mail, Send, MapPin } from "lucide-react";
import { type Project } from "@/utils";
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

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export function generateMetadata() {
  return {
    title: "Sepsu Dev",
    description: "Full-stack Engineer specializing in high-performance backends, scalable microservices, and fluid modern user interfaces.",
  };
}

// Using centralized Highlighter component

export default async function AboutPage({ searchParams }: PageProps) {
  // searchParams is a Promise in Next.js App Router, so we keep async
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");
  const limit = 3;
  const startIndex = (currentPage - 1) * limit;
  const endIndex = currentPage * limit;

  const paginatedProjects = projects.slice(startIndex, endIndex);
  const totalPages = Math.ceil(projects.length / limit);
  const meta = {
    total: projects.length,
    page: currentPage,
    limit,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };

  const techStack = [
    { category: "Frontend", skills: ["React.js", "Next.js", "Tailwind CSS", "Bootstrap 5", "UI/UX Design"], icon: "Layout" },
    { category: "Backend", skills: ["Node.js", "Nest.js", "Express.js", "PHP", "Laravel", "API Development"], icon: "Server" },
    { category: "Integration", skills: ["WhatsApp API", "AI Models", "OCR", "PWA", "Real-time Data"], icon: "Code2" },
    { category: "Cloud & DevOps", skills: ["Vercel", "Docker", "VPS", "GitHub", "CI/CD"], icon: "Database" },
  ];

  const iconMap: Record<string, any> = {
    Server,
    Database,
    Layout,
    Code2,
    GitBranch,
    Terminal,
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden font-sans">
      {/* Programmer Ornaments */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

      <div className="fixed top-32 left-10 text-primary/5 text-8xl font-mono font-bold select-none pointer-events-none animate-float hidden md:block">
        {`{ }`}
      </div>
      <div className="fixed bottom-40 right-10 text-primary/5 text-8xl font-mono font-bold select-none pointer-events-none animate-float-reverse hidden md:block">
        {`< />`}
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 md:py-24 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Intro Section */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="relative">

              <img
                src="https://media.tenor.com/Rd0jrWH5JjgAAAAM/cat-scuba.gif"
                alt="Sepsu Dev"
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
                  <span className="text-foreground">Sepsu</span> <span className="text-primary">Dev</span>
                  <Highlighter variant={1} className="-rotate-3" />
                </span>
              </h1>
            </div>
          </div>

          <div className="space-y-6 text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm text-xs font-mono font-medium shadow-sm hover:border-primary/30 transition-colors mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              </span>
              <span className="text-muted-foreground">Based in <span className="text-foreground font-semibold">Jakarta</span></span>
              {/* Indonesian Flag */}
              <div className="w-3.5 h-2.5 rounded-[2px] overflow-hidden flex flex-col shadow-[0_0_2px_rgba(0,0,0,0.2)] ml-0.5 border border-border/50" title="Indonesia">
                <div className="w-full h-1/2 bg-[#FF0000]"></div>
                <div className="w-full h-1/2 bg-white"></div>
              </div>
            </div>
            <p>
              As a <span className="relative inline-block px-1 text-foreground font-semibold">
                Full-stack Engineer
                <Highlighter variant={2} className="rotate-1 opacity-60" />
              </span>, I specialize in designing high-performance backend architectures and crafting fluid, modern user interfaces.
              With extensive experience across the PHP and JavaScript ecosystems, I focus on turning complex business requirements into
              <span className="relative inline-block mx-1 px-1 text-foreground font-medium">
                scalable, production-grade solutions.
                <Highlighter variant={3} className="-bottom-1" />
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              <a href="https://github.com/sepsudev" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 text-secondary-foreground border border-border hover:bg-secondary hover:border-foreground/20 hover:text-foreground transition-all duration-300 shadow-sm font-mono text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
                <span>GitHub</span>
              </a>
              <a href="mailto:hello@sepsu.dev" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] font-mono text-sm font-bold hover:-translate-y-0.5">
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
            </div>

            <div className="rounded-xl overflow-hidden border border-border shadow-sm dark:shadow-xl bg-card text-card-foreground mt-8 font-mono text-xs sm:text-sm">
              <div className="flex items-center justify-between px-4 py-2 bg-muted/80 border-b border-border">
                <div className="flex items-center gap-2 text-primary">
                  <Terminal className="w-3.5 h-3.5" />
                  <span className="font-bold text-[11px] tracking-wider">active_session.js</span>
                </div>
                <div className="flex items-center gap-3 opacity-60">
                  <div className="w-2.5 h-0.5 bg-foreground/50"></div>
                  <div className="w-2.5 h-2.5 border border-foreground/50 rounded-[1px]"></div>
                  <div className="text-[14px] leading-none text-foreground/50 hover:text-red-500 transition-colors cursor-default">×</div>
                </div>
              </div>
              <div className="p-4 overflow-x-auto leading-relaxed">
                <span className="text-fuchsia-700 dark:text-fuchsia-400">const</span> <span className="text-blue-700 dark:text-blue-400">currentFocus</span> <span className="text-foreground">=</span> [<br />
                &nbsp;&nbsp;<span className="text-emerald-700 dark:text-emerald-400">"⚡ Engineering high-performance backends"</span>,<br />
                &nbsp;&nbsp;<span className="text-emerald-700 dark:text-emerald-400">"🎨 Crafting fluid and interactive UIs"</span>,<br />
                &nbsp;&nbsp;<span className="text-emerald-700 dark:text-emerald-400">"🚀 Architecting scalable cloud infrastructure"</span><br />
                ];
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-20 relative">
          <div className="mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2 font-mono">
              <GitBranch className="w-5 h-5 text-primary" />
              <span className="relative inline-block z-10">
                Tech Stack
                <Highlighter variant={2} className="rotate-2 scale-x-110" />
              </span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">A curated selection of modern technologies and frameworks I leverage to engineer enterprise-grade applications.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {techStack.map((item, idx) => {
              const Icon = iconMap[item.icon] || Code2;
              return (
                <div key={idx} className="group relative p-4 sm:p-5 rounded-xl border border-border bg-card/30 backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:bg-card hover:border-primary/30">
                  <div className="flex items-center gap-3 mb-2 sm:mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                    </div>
                    <h3 className="relative inline-block text-sm sm:text-base font-semibold text-foreground">
                      {item.category}
                      <Highlighter variant={1} className="scale-x-125 opacity-40" />
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {item.skills.map((skill) => (
                      <TechBadge key={skill} tag={skill} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Projects */}
        <section id="portfolio">
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
            <div className="h-px flex-1 bg-border ml-6 hidden sm:block"></div>
          </div>
          <ProjectList projects={paginatedProjects} meta={meta} title="" />
        </section>

      </div>
    </div>
  );
}