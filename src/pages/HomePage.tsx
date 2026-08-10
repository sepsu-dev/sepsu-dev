import { useEffect } from "react";
import { useLocation, Link, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactSection } from "@/components/contact-section";
import { Terminal, Code2, Database, Layout, Server, GitBranch, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { TechBadge } from "@/components/tech-badge";
import { cn } from "@/lib/utils";

interface ProjectItem {
  uid: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

const ALL_PROJECTS: ProjectItem[] = [
  {
    uid: "cek-bmi-yu",
    title: "cekbmi.yu",
    description: "A responsive health utility designed to calculate Body Mass Index (BMI) dynamically.",
    imageUrl: "/projects/cek-bmi-yu.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    uid: "naha-admin",
    title: "naha.admin",
    description: "Enterprise Bootstrap 5 Dashboard Template skeleton for internal panels.",
    imageUrl: "/projects/naha-admin.jpg",
    tags: ["Next.js", "Bootstrap", "Tailwind CSS"],
  },
  {
    uid: "numpux",
    title: "numpux",
    description: "Agile Workspace & Kanban Productivity Suite with collaborative mapping.",
    imageUrl: "/projects/numpux.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    uid: "kritqr",
    title: "krit.qr",
    description: "High-Performance Instant QR Code Generator client utility.",
    imageUrl: "/projects/kritqr.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "React.js"],
  },
  {
    uid: "sepsu-dev",
    title: "sepsu.dev",
    description: "Professional Engineering Portfolio & Console dashboard.",
    imageUrl: "/projects/sepsu-dev.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "React.js"],
  },
  {
    uid: "otw-sah",
    title: "otw.sah",
    description: "Interactive Digital Invitation & Guest RSVP Platform.",
    imageUrl: "/projects/otw-sah.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    uid: "titik-tanah",
    title: "titik.tanah",
    description: "Geospatial Land Plot & Geolocation Manager mapping application.",
    imageUrl: "/projects/titik-tanah.jpg",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    uid: "bootstrap-only",
    title: "bootstrap.only",
    description: "Curated Responsive UI Design Template Directory for prototype layouts.",
    imageUrl: "/projects/bootstrap-only.jpg",
    tags: ["Bootstrap", "JavaScript", "HTML5", "CSS3"],
  },
  {
    uid: "lupa-servis",
    title: "lupa.servis",
    description: "Automated Vehicle Maintenance Scheduler and tracker.",
    imageUrl: "/projects/lupa-servis.jpg",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
  },
  {
    uid: "warung-page",
    title: "warung.page",
    description: "No-Code Landing Page Builder for MSME storefronts.",
    imageUrl: "/projects/warung-page.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    uid: "krit-cv",
    title: "krit.cv",
    description: "Automated ATS-Friendly Resume Builder layout generator.",
    imageUrl: "/projects/krit-cv.jpg",
    tags: ["React.js", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    uid: "skul-page",
    title: "skul.page",
    description: "Institutional Web Portal & CMS Management System.",
    imageUrl: "/projects/skul-page.jpg",
    tags: ["Next.js", "Tailwind CSS"],
  },
  {
    uid: "kirim-otp-email",
    title: "kirimotp.email",
    description: "High-Availability Email OTP Microservice engine.",
    imageUrl: "/projects/kirim-otp-email.jpg",
    tags: ["Node.js", "Express.js", "TypeScript", "Docker"],
  },
  {
    uid: "kirim-otp-wa",
    title: "kirimotp.wa",
    description: "WhatsApp Transactional OTP Microservice API gateway.",
    imageUrl: "/projects/kirim-otp-wa.jpg",
    tags: ["Node.js", "Express.js", "TypeScript", "Docker"],
  },
  {
    uid: "hemat-yu",
    title: "hemat.yu",
    description: "Personal Ledger & Financial Health Tracker accounting web app.",
    imageUrl: "/projects/hemat-yu.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
];

export default function HomePage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const limit = 3;
  const currentPage = parseInt(searchParams.get("page") || "1");
  const totalPages = Math.ceil(ALL_PROJECTS.length / limit);
  
  const startIndex = (currentPage - 1) * limit;
  const p1 = ALL_PROJECTS[startIndex];
  const p2 = ALL_PROJECTS[startIndex + 1];
  const p3 = ALL_PROJECTS[startIndex + 2];

  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  // Handle scrolling to hash after mount or page change
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [location.hash, currentPage]);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden font-sans pt-12">
      {/* Decorative background grid and blobs */}
      <div className="fixed inset-0 bg-[radial-gradient(#8080800d_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/4 blur-[130px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-purple-500/3 blur-[120px] pointer-events-none -z-10"></div>
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 pt-28 pb-16 md:pt-36 md:pb-24 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* About Section */}
        <section id="about" className="mb-24 scroll-mt-28">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="relative group flex-shrink-0">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-card border border-border/40 overflow-hidden shadow-sm transition-all duration-300 group-hover:border-primary/30">
                <img src="/profile-sketch.png" alt="Sepsu Dev" width={96} height={96} decoding="async" className="w-full h-full object-cover object-center transition duration-500 group-hover:scale-[1.015]" />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/8 text-primary text-[10px] sm:text-xs font-mono font-semibold tracking-tight mb-2 border border-primary/10">
                <Terminal className="w-3 h-3" />
                <span>portfolio.sh</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 text-foreground">
                Sepsu <span className="text-primary">Dev</span>
              </h1>
            </div>
          </div>

          <div className="space-y-6 text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/40 backdrop-blur-sm text-xs font-mono font-medium shadow-sm hover:border-primary/20 transition-colors mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-muted-foreground">Based in <span className="text-foreground font-semibold">Jakarta, Indonesia</span></span>
              <div className="w-3.5 h-2.5 rounded-[2px] overflow-hidden flex flex-col shadow-[0_0_2px_rgba(0,0,0,0.15)] ml-0.5 border border-border/30">
                <div className="w-full h-1/2 bg-[#FF0000]"></div>
                <div className="w-full h-1/2 bg-white"></div>
              </div>
            </div>
            <p className="text-foreground/80 font-medium">
              Full-stack engineer with 3+ years of experience building reliable backends and modern web applications. Focused on delivering clean, maintainable code with pragmatic architecture. Experienced in end-to-end product development, from API design to frontend deployment.
            </p>
          </div>

          {/* Focus Cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-xl border border-primary/20 bg-card/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <span className="text-base shrink-0 select-none">⚡</span>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-medium">Architecting robust backend services using Laravel, CodeIgniter, Express.js, and Nest.js</p>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl border border-primary/20 bg-card/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <span className="text-base shrink-0 select-none">⚛️</span>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-medium">Crafting highly interactive user interfaces with React.js, Vue.js, and React Native</p>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl border border-primary/20 bg-card/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <span className="text-base shrink-0 select-none">🐳</span>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-medium">Orchestrating containerized environments with Docker, Ubuntu, GitLab, and GitHub CI/CD</p>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl border border-primary/20 bg-card/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <span className="text-base shrink-0 select-none">🛢️</span>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-medium">Managing scalable databases using PostgreSQL, MySQL, SQL Server, Redis, and MongoDB</p>
            </div>
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
          <p className="text-sm text-muted-foreground -mt-4 mb-8 max-w-xl">Curated frameworks and tools I rely on to build fast, scalable applications.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Frontend Category */}
            <div className="group relative p-5 rounded-xl border border-primary/20 bg-card/30 backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:bg-card/50">
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className="p-2 bg-primary/8 rounded-lg text-primary"><Layout className="w-4 h-4" /></div>
                <h3 className="text-sm sm:text-base font-bold text-foreground">Frontend</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1 relative z-10">
                <TechBadge tag="TypeScript" />
                <TechBadge tag="JavaScript" />
                <TechBadge tag="jQuery" />
                <TechBadge tag="React.js" />
                <TechBadge tag="Next.js" />
                <TechBadge tag="Vue.js" />
                <TechBadge tag="Nuxt.js" />
                <TechBadge tag="React Native" />
                <TechBadge tag="Bootstrap" />
                <TechBadge tag="Tailwind CSS" />
              </div>
            </div>

            {/* Backend Category */}
            <div className="group relative p-5 rounded-xl border border-primary/20 bg-card/30 backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:bg-card/50">
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className="p-2 bg-primary/8 rounded-lg text-primary"><Server className="w-4 h-4" /></div>
                <h3 className="text-sm sm:text-base font-bold text-foreground">Backend</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1 relative z-10">
                <TechBadge tag="Go" />
                <TechBadge tag=".NET Core" />
                <TechBadge tag="Spring Boot" />
                <TechBadge tag="PHP" />
                <TechBadge tag="Laravel" />
                <TechBadge tag="CodeIgniter" />
                <TechBadge tag="Express.js" />
                <TechBadge tag="Nest.js" />
                <TechBadge tag="Node.js" />
                <TechBadge tag="Prisma" />
                <TechBadge tag="Sequelize" />
              </div>
            </div>

            {/* Database Category */}
            <div className="group relative p-5 rounded-xl border border-primary/20 bg-card/30 backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:bg-card/50">
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className="p-2 bg-primary/8 rounded-lg text-primary"><Database className="w-4 h-4" /></div>
                <h3 className="text-sm sm:text-base font-bold text-foreground">Database</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1 relative z-10">
                <TechBadge tag="PostgreSQL" />
                <TechBadge tag="MySQL" />
                <TechBadge tag="Microsoft SQL Server" />
                <TechBadge tag="Redis" />
                <TechBadge tag="MongoDB" />
              </div>
            </div>

            {/* DevOps Category */}
            <div className="group relative p-5 rounded-xl border border-primary/20 bg-card/30 backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:bg-card/50">
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className="p-2 bg-primary/8 rounded-lg text-primary"><Database className="w-4 h-4" /></div>
                <h3 className="text-sm sm:text-base font-bold text-foreground">DevOps</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1 relative z-10">
                <TechBadge tag="CI/CD" />
                <TechBadge tag="GitLab" />
                <TechBadge tag="GitHub" />
                <TechBadge tag="Ubuntu" />
                <TechBadge tag="Microsoft IIS" />
                <TechBadge tag="Docker" />
              </div>
            </div>

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
              <p className="text-sm text-muted-foreground mt-2 max-w-xl">Featured engineering projects highlighting performance, intuitive UI, and clean architecture.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 relative">
            
            {/* Project Slot 1 */}
            {p1 && (
              <Link to={`/project/${p1.uid}`} className="group relative flex flex-col sm:flex-row gap-6 p-5 sm:p-6 rounded-xl border border-primary/20 bg-card/25 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:bg-card items-stretch animate-in fade-in duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="relative flex-shrink-0 w-full sm:w-52 md:w-56 aspect-[16/10] rounded-xl overflow-hidden border border-border/45 bg-muted/10 z-10 shadow-sm group-hover:border-primary/30 transition-all duration-300">
                  <img src={p1.imageUrl} alt={p1.title} loading="lazy" decoding="async" className="w-full h-full object-cover object-top relative z-10 transition-all duration-300 ease-out group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-col gap-3 min-w-0 flex-1 relative z-10">
                  <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight transition-colors group-hover:text-primary flex items-center gap-1">
                    <span>{p1.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-primary flex-shrink-0" />
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed font-medium">
                    {p1.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                    {p1.tags[0] && <TechBadge tag={p1.tags[0]} />}
                    {p1.tags[1] && <TechBadge tag={p1.tags[1]} />}
                    {p1.tags[2] && <TechBadge tag={p1.tags[2]} />}
                    {p1.tags[3] && <TechBadge tag={p1.tags[3]} />}
                  </div>
                </div>
              </Link>
            )}

            {/* Project Slot 2 */}
            {p2 && (
              <Link to={`/project/${p2.uid}`} className="group relative flex flex-col sm:flex-row gap-6 p-5 sm:p-6 rounded-xl border border-primary/20 bg-card/25 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:bg-card items-stretch animate-in fade-in duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="relative flex-shrink-0 w-full sm:w-52 md:w-56 aspect-[16/10] rounded-xl overflow-hidden border border-border/45 bg-muted/10 z-10 shadow-sm group-hover:border-primary/30 transition-all duration-300">
                  <img src={p2.imageUrl} alt={p2.title} loading="lazy" decoding="async" className="w-full h-full object-cover object-top relative z-10 transition-all duration-300 ease-out group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-col gap-3 min-w-0 flex-1 relative z-10">
                  <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight transition-colors group-hover:text-primary flex items-center gap-1">
                    <span>{p2.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-primary flex-shrink-0" />
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed font-medium">
                    {p2.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                    {p2.tags[0] && <TechBadge tag={p2.tags[0]} />}
                    {p2.tags[1] && <TechBadge tag={p2.tags[1]} />}
                    {p2.tags[2] && <TechBadge tag={p2.tags[2]} />}
                    {p2.tags[3] && <TechBadge tag={p2.tags[3]} />}
                  </div>
                </div>
              </Link>
            )}

            {/* Project Slot 3 */}
            {p3 && (
              <Link to={`/project/${p3.uid}`} className="group relative flex flex-col sm:flex-row gap-6 p-5 sm:p-6 rounded-xl border border-primary/20 bg-card/25 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:bg-card items-stretch animate-in fade-in duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="relative flex-shrink-0 w-full sm:w-52 md:w-56 aspect-[16/10] rounded-xl overflow-hidden border border-border/45 bg-muted/10 z-10 shadow-sm group-hover:border-primary/30 transition-all duration-300">
                  <img src={p3.imageUrl} alt={p3.title} loading="lazy" decoding="async" className="w-full h-full object-cover object-top relative z-10 transition-all duration-300 ease-out group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-col gap-3 min-w-0 flex-1 relative z-10">
                  <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight transition-colors group-hover:text-primary flex items-center gap-1">
                    <span>{p3.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-primary flex-shrink-0" />
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed font-medium">
                    {p3.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                    {p3.tags[0] && <TechBadge tag={p3.tags[0]} />}
                    {p3.tags[1] && <TechBadge tag={p3.tags[1]} />}
                    {p3.tags[2] && <TechBadge tag={p3.tags[2]} />}
                    {p3.tags[3] && <TechBadge tag={p3.tags[3]} />}
                  </div>
                </div>
              </Link>
            )}

          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-4 mt-8 pt-6 border-t border-border/40">
              <div className="flex items-center gap-2">
                <Link
                  to={`?page=${currentPage - 1}`}
                  aria-label="Previous page"
                  className={cn(
                    "group flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-card/40 transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-[0_0_15px_rgba(var(--primary),0.1)]",
                    !hasPrevPage && "pointer-events-none opacity-20 grayscale"
                  )}
                >
                  <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
                </Link>

                <div className="flex items-center gap-2 mx-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      to={`?page=${p}`}
                      aria-label={`Go to page ${p}`}
                      className={cn(
                        "relative w-10 h-10 flex items-center justify-center rounded-lg text-xs font-mono font-bold transition-all duration-300 border overflow-hidden",
                        p === currentPage
                          ? "border-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.2)]"
                          : "border-border/50 bg-card/20 text-muted-foreground hover:border-border hover:bg-card hover:text-foreground"
                      )}
                    >
                      {p === currentPage && (
                        <div className="absolute inset-0 bg-primary -z-10 animate-in fade-in zoom-in duration-300" />
                      )}
                      {p.toString().padStart(2, "0")}
                    </Link>
                  ))}
                </div>

                <Link
                  to={`?page=${currentPage + 1}`}
                  aria-label="Next page"
                  className={cn(
                    "group flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-card/40 transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-[0_0_15px_rgba(var(--primary),0.1)]",
                    !hasNextPage && "pointer-events-none opacity-20 grayscale"
                  )}
                >
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          )}
        </section>

        <ContactSection email="sepsu.dev@gmail.com" githubUrl="https://github.com/sepsu-dev" />
      </div>
      <Footer />
    </div>
  );
}