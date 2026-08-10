import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Globe, ArrowUpRight } from "lucide-react";
import { ProjectImages } from "@/components/project-images";
import { TechBadge } from "@/components/tech-badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ProjectData {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  demoUrl: string;
  githubUrl?: string;
}

const STATIC_PROJECTS: Record<string, ProjectData> = {
  "cek-bmi-yu": {
    title: "cekbmi.yu",
    description: "A responsive health utility designed to calculate Body Mass Index (BMI) dynamically, featuring micro-animations, clear category visualizations, and personal metric logs.\n\n**Architecture & Stack:**\nNext.js → Static site → Tailwind CSS. Deployed on Vercel.",
    imageUrl: "/projects/cek-bmi-yu.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://cekbmi.my.id",
    githubUrl: "https://github.com/sepsu-dev/cek-bmi-yu"
  },
  "naha-admin": {
    title: "naha.admin",
    description: "A modular admin dashboard skeleton designed for complex internal panels. Features rich UI components, fully responsive analytics widgets, and a cohesive dark/light layout system.\n\n**Architecture & Stack:**\nNext.js → Bootstrap 5 → Tailwind CSS. Deployed on Vercel.",
    imageUrl: "/projects/naha-admin.jpg",
    tags: ["Next.js", "Bootstrap", "Tailwind CSS"],
    demoUrl: "https://naha-admin.my.id",
    githubUrl: "https://github.com/sepsu-dev/naha-admin"
  },
  "numpux": {
    title: "numpux",
    description: "An interactive task coordination ecosystem featuring custom-draggable Kanban boards, strategic team calendar visualizations, and collaborative goal mapping.\n\n**Architecture & Stack:**\nNext.js → Tailwind CSS → Kanban & Calendar. Deployed on Vercel.",
    imageUrl: "/projects/numpux.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://numpux.my.id",
    githubUrl: "https://github.com/sepsu-dev/numpux"
  },
  "kritqr": {
    title: "krit.qr",
    description: "An optimized, client-side utility for generating custom vector QR codes from raw text, URLs, or structured data instantly. Built with a focus on speed, light package footprint, and clean rendering.\n\n**Architecture & Stack:**\nNext.js → Canvas API → Tailwind CSS. Deployed on Vercel.",
    imageUrl: "/projects/kritqr.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "React.js"],
    demoUrl: "https://kritqr.my.id",
    githubUrl: "https://github.com/sepsu-dev/kritqr"
  },
  "sepsu-dev": {
    title: "sepsu.dev",
    description: "A highly interactive, glassmorphic portfolio displaying professional developer credentials. Built using Next.js Server Components, localized DB service architecture, and a custom Tailwind dark-theme design system.\n\n**Architecture & Stack:**\nNext.js → Server Components → Tailwind CSS → REST API. Deployed on Vercel.",
    imageUrl: "/projects/sepsu-dev.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "React.js"],
    demoUrl: "https://sepsu.dev",
    githubUrl: "https://github.com/sepsu-dev/sepsu-dev"
  },
  "otw-sah": {
    title: "otw.sah",
    description: "An elegant, high-performance platform for creating modern interactive wedding and engagement invitations. Featuring customizable themes, dynamic RSVPs, guest list management, and fluid animations.\n\n**Architecture & Stack:**\nNext.js → Tailwind CSS → Server Components. Deployed on Vercel.",
    imageUrl: "/projects/otw-sah.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://otwsah.my.id",
    githubUrl: "https://github.com/sepsu-dev/otw-sah"
  },
  "titik-tanah": {
    title: "titik.tanah",
    description: "An interactive geospatial mapping application designed to record, coordinate, and track land boundaries. Built with GIS integration, Mapbox visualizers, and PostgreSQL geospatial indexing.\n\n**Architecture & Stack:**\nNext.js → Mapbox/Leaflet → PostgreSQL → REST API. Deployed on Vercel.",
    imageUrl: "/projects/titik-tanah.jpg",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    demoUrl: "https://titiktanah.my.id",
    githubUrl: "https://github.com/sepsu-dev/titik-tanah"
  },
  "bootstrap-only": {
    title: "bootstrap.only",
    description: "A production-ready repository of clean, modern, and highly modular Bootstrap components and page templates designed to accelerate early-stage startup layout prototyping.\n\n**Architecture & Stack:**\nBootstrap 5 → HTML/CSS → JavaScript. Deployed on Vercel.",
    imageUrl: "/projects/bootstrap-only.jpg",
    tags: ["Bootstrap", "JavaScript", "HTML5", "CSS3"],
    demoUrl: "https://bootstraponly.my.id",
    githubUrl: "https://github.com/sepsu-dev/bootstrap-only"
  },
  "lupa-servis": {
    title: "lupa.servis",
    description: "A smart vehicle maintenance tracker that records service histories and automatically sends upcoming maintenance reminders via WhatsApp Business API integration.\n\n**Architecture & Stack:**\nNext.js → REST API → WhatsApp Business API → PostgreSQL. Deployed on Vercel.",
    imageUrl: "/projects/lupa-servis.jpg",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    demoUrl: "https://lupaservis.my.id",
    githubUrl: "https://github.com/sepsu-dev/lupa-servis"
  },
  "warung-page": {
    title: "warung.page",
    description: "A highly scalable landing page generator allowing micro-businesses to deploy custom digital storefronts instantly. Features dynamic routing and rapid template instantiation without overhead.\n\n**Architecture & Stack:**\nNext.js → Dynamic routing → Template engine. Deployed on Vercel.",
    imageUrl: "/projects/warung-page.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://warungpage.my.id",
    githubUrl: "https://github.com/sepsu-dev/warungpage"
  },
  "krit-cv": {
    title: "krit.cv",
    description: "An intuitive web utility designed to build ATS-optimized resumes from modular forms. Incorporates dynamic PDF rendering pipelines and automated formatting presets.\n\n**Architecture & Stack:**\nReact.js → Redux Toolkit → PDF generation (jsPDF). Deployed on Vercel.",
    imageUrl: "/projects/krit-cv.jpg",
    tags: ["React.js", "TypeScript", "Tailwind CSS", "Node.js"],
    demoUrl: "https://kritcv.my.id",
    githubUrl: "https://github.com/sepsu-dev/kritcv"
  },
  "skul-page": {
    title: "skul.page",
    description: "A responsive CMS and template system tailored specifically for educational institutions, supporting quick deployment, dynamic announcements, and structured curriculum layouts.\n\n**Architecture & Stack:**\nNext.js → Tailwind CSS → Landing page. Deployed on Vercel.",
    imageUrl: "/projects/skul-page.jpg",
    tags: ["Next.js", "Tailwind CSS"],
    demoUrl: "https://skulpage.my.id",
    githubUrl: "https://github.com/sepsu-dev/skulpage"
  },
  "kirim-otp-email": {
    title: "kirimotp.email",
    description: "A secure transactional email microservice engineered for high delivery rates, low latency, and cost-effective user verification via SMTP pipelines.\n\n**Architecture & Stack:**\nNode.js → Express.js → Nodemailer → SMTP. Deployed on Vercel.",
    imageUrl: "/projects/kirim-otp-email.jpg",
    tags: ["Node.js", "Express.js", "TypeScript", "Docker"],
    demoUrl: "https://kirimotpemail.my.id",
    githubUrl: "https://github.com/sepsu-dev/kirim-otp-email"
  },
  "kirim-otp-wa": {
    title: "kirimotp.wa",
    description: "An enterprise-grade WhatsApp verification gateway featuring rapid OTP dispatch, retry management, and simple REST API integration.\n\n**Architecture & Stack:**\nNode.js → Express.js → WhatsApp Business API. Deployed on Vercel.",
    imageUrl: "/projects/kirim-otp-wa.jpg",
    tags: ["Node.js", "Express.js", "TypeScript", "Docker"],
    demoUrl: "https://kirimotpwa.my.id",
    githubUrl: "https://github.com/sepsu-dev/kirim-otp-wa"
  },
  "hemat-yu": {
    title: "hemat.yu",
    description: "A streamlined accounting web app that logs income, tracks expenses by categories, and visualizes monthly spending habits to optimize budget planning.\n\n**Architecture & Stack:**\nNext.js → Tailwind CSS. Deployed on Vercel.",
    imageUrl: "/projects/hemat-yu.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://hematyu.com",
    githubUrl: "https://github.com/sepsu-dev/hematyu"
  }
};

export default function ProjectDetailPage() {
  const { project_id } = useParams<{ project_id: string }>();
  const project = project_id ? STATIC_PROJECTS[project_id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project_id]);

  if (!project) {
    return (
      <div className="relative min-h-screen bg-background pb-12 font-sans overflow-hidden pt-12">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 pt-28 pb-16 md:pt-36 md:pb-24 relative z-10 text-center space-y-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">Project Not Found</h1>
          <p className="text-muted-foreground text-sm">The requested showcase project could not be found.</p>
          <Link to="/#projects" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium">
            <ChevronLeft className="w-4 h-4" /> Back to Projects
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = project.imageUrl ? [project.imageUrl] : [];

  return (
    <div className="relative min-h-screen bg-background pb-12 font-sans overflow-hidden pt-12">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none -z-10"></div>
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 pt-28 pb-16 md:pt-36 md:pb-24 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-8">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium group">
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
                {project.description.split('\n').map((line: string, i: number) => {
                  if (!line.trim()) return <div key={i} className="h-3"></div>;
                  const parts = line.split(/(\*\*.*?\*\*)/g);
                  return (
                    <p key={i} className="mb-1.5 last:mb-0">
                      {parts.map((part, j) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={j} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
                        }
                        return part;
                      })}
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
                <a href={project.demoUrl} target="_blank" className="flex items-center justify-between p-3.5 rounded-xl bg-primary/90 hover:bg-primary text-primary-foreground text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                  <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> Live Demo</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" className="flex items-center justify-between p-3.5 rounded-xl border border-primary/20 bg-transparent hover:bg-muted/50 hover:shadow-md hover:-translate-y-0.5 text-foreground text-sm font-medium transition-all duration-300 group">
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