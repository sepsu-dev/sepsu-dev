import { ProjectList } from "@/components/project-list";
import { Terminal, Code2, Database, Layout, Server, GitBranch } from "lucide-react";
import { type Project } from "@/utils";
import { Highlighter } from "@/components/highlighter";

const projects: Project[] = [
  {
    id: "ecommerce-api-core",
    title: "E-Commerce Core API",
    description: "Architecting a high-performance, microservices-based API designed to handle millions of transactions. Optimized with Nest.js and Prisma for ultimate reliability.",
    startDate: "Jan 2024",
    endDate: "Present",
    tags: ["Nest.js", "Prisma", "Postgre", "Rest API", "Docker", "Redis"],
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop"],
    href: "#",
  },
  {
    id: "hr-management-sys",
    title: "HRIS Enterprise Portal",
    description: "A sophisticated Human Resource platform streamlining payroll and attendance for large-scale enterprises. Built with Laravel to ensure maximum security.",
    startDate: "Aug 2023",
    endDate: "Dec 2023",
    tags: ["Laravel", "Mysql", "Bootstrap", "VPS", "Github"],
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"],
    href: "#",
  },
  {
    id: "realtime-collab",
    title: "Real-time Team Collaboration",
    description: "Breaking communication barriers with a lightning-fast collaboration hub. Features real-time sync across devices using Node.js and Redis.",
    startDate: "May 2023",
    endDate: "Jul 2023",
    tags: ["React.js", "Node.js", "Express.js", "Redis", "JS"],
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"],
    href: "#",
  },
  {
    id: "inventory-dashboard",
    title: "Smart Inventory Dashboard",
    description: "Visualizing complex warehouse data through an intuitive, high-fidelity dashboard. Crafted with React.js and Shadcn UI for a premium aesthetic.",
    startDate: "Feb 2023",
    endDate: "Apr 2023",
    tags: ["React.js", "Tailwind CSS", "Shadcn UI", "PHP", "Mysql"],
    imageUrl: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop"],
    href: "#",
  },
  {
    id: "mobile-pos",
    title: "Mobile Point of Sale",
    description: "Revolutionizing retail with a powerful, cross-platform mobile POS. Built using React Native to provide a native-feel experience on all platforms.",
    startDate: "Nov 2022",
    endDate: "Jan 2023",
    tags: ["React Native", "JS", "Node.js", "SQL server"],
    imageUrl: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=800&auto=format&fit=crop"],
    href: "#",
  },
  {
    id: "log-monitoring",
    title: "Centralized Log Analytics",
    description: "Mastering infrastructure visibility with a specialized log aggregation system. Leverages the ELK stack to provide real-time proactive alerting.",
    startDate: "Sep 2022",
    endDate: "Oct 2022",
    tags: ["Elasticsearch", "Kibana", "Docker", "VPS"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"],
    href: "#",
  },
  {
    id: "legacy-crm",
    title: "Legacy CRM System",
    description: "Maintaining and scaling business-critical infrastructure for enterprise clients. Revitalizing legacy systems with modern performance optimizations.",
    startDate: "Apr 2022",
    endDate: "Aug 2022",
    tags: ["Codeigniter", "PHP", "Mysql", "Bootstrap"],
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"],
    href: "#",
  },
  {
    id: "freelance-market",
    title: "Freelance Marketplace",
    description: "Empowering the global workforce with a feature-rich talent marketplace. Engineered to handle complex matching and secure interactions.",
    startDate: "Jan 2022",
    endDate: "Mar 2022",
    tags: ["Laravel", "React.js", "Tailwind CSS", "Postgre", "Gitlab"],
    imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop"],
    href: "#",
  },
  {
    id: "task-api",
    title: "Task Management Backend",
    description: "Powering productivity with a robust, type-safe REST API. Focused on data integrity and high-speed delivery using Nest.js and SQL Server.",
    startDate: "Oct 2021",
    endDate: "Dec 2021",
    tags: ["Nest.js", "Prisma", "Express.js", "Rest API", "SQL server"],
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=800&auto=format&fit=crop"],
    href: "#",
  },
];

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export function generateMetadata() {
  return {
    title: "About",
    description: "Software Engineer specializing in backend systems, microservices, and full-stack web development.",
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
    { category: "Frontend", skills: ["JS", "React.js", "React Native", "Tailwind Shadcn", "Bootstrap"], icon: "Layout" },
    { category: "Backend", skills: ["Node.js", "PHP", "Laravel", "Nest.js", "Express.js", "Codeigniter", "Rest API"], icon: "Server" },
    { category: "Database", skills: ["Mysql", "Postgre", "SQL server", "Redis", "Prisma"], icon: "Database" },
    { category: "Tools & DevOps", skills: ["Docker", "VPS", "Github", "Gitlab", "Elasticsearch", "Kibana"], icon: "Code2" },
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
            <p>
              As a <span className="relative inline-block px-1 text-foreground font-semibold">
                Full-stack Engineer
                <Highlighter variant={2} className="rotate-1 opacity-60" />
              </span>, I specialize in architecting high-availability systems and seamless digital experiences.
              With a proven track record across the PHP and JavaScript ecosystems, I transform complex technical challenges into
              <span className="relative inline-block mx-1 px-1 text-foreground font-medium">
                scalable, production-ready solutions.
                <Highlighter variant={3} className="-bottom-1" />
              </span>
            </p>

            <div className="rounded-xl overflow-hidden border border-border shadow-sm dark:shadow-xl bg-card text-card-foreground mt-4 font-mono text-xs sm:text-sm">
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
                &nbsp;&nbsp;<span className="text-emerald-700 dark:text-emerald-400">"🚀 Architecting High-Availability Systems"</span>,<br />
                &nbsp;&nbsp;<span className="text-emerald-700 dark:text-emerald-400">"🎨 Engineering Fluid User Experiences"</span>,<br />
                &nbsp;&nbsp;<span className="text-emerald-700 dark:text-emerald-400">"📱 Developing Integrated Mobile Ecosystems"</span><br />
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
            <p className="text-sm text-muted-foreground mt-1">The modern tools and frameworks I use to build scalable digital solutions.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {techStack.map((item, idx) => {
              const Icon = iconMap[item.icon] || Code2;
              return (
                <div key={idx} className="group relative p-4 sm:p-5 rounded-xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl hover:bg-card">
                  <div className="flex items-center gap-3 mb-2 sm:mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                    </div>
                    <h3 className="relative inline-block text-sm sm:text-base font-semibold text-foreground">
                      {item.category}
                      <Highlighter variant={1} className="scale-x-125 opacity-40" />
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-mono">{item.skills.join(", ")}</p>
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
              <p className="text-sm text-muted-foreground mt-1">A curated collection of my technical work, focusing on performance, scale, and clean architecture.</p>
            </div>
            <div className="h-px flex-1 bg-border ml-6 hidden sm:block"></div>
          </div>
          <ProjectList projects={paginatedProjects} meta={meta} title="" />
        </section>

      </div>
    </div>
  );
}