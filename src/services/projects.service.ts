import { Project } from "@/types/api";
import { skillsService } from "./skills.service";

// ── Dummy data (real projects) ──────────────────────────────
let projects: Project[] = [
    {
        uid: "qris-dinamis",
        title: "QRIS Dinamis",
        subtitle: "Real-time Dynamic QRIS Payment Generator",
        overview: "A modern web application designed to instantly convert static QRIS barcodes into dynamic merchant QR codes. Supports automated nominal calculation, custom service fees, and real-time canvas rendering for seamless retail operations.",
        architecture: "Next.js → Tailwind CSS → Canvas API → Web Share API. Deployed on Vercel.",
        demo_url: "https://qris-static-to-dynamic-generator.vercel.app",
        source_url: "https://github.com/sepsu-dev/qris-static-to-dynamic-generator",
        image_url: "/projects/qris-dinamis.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "nextdotjs" },
            { uid: "typescript", name: "TypeScript", icon: "typescript" },
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "tailwindcss" },
            { uid: "react", name: "React", icon: "react" },
        ],
        created_at: "2026-07-15T08:00:00Z",
        updated_at: "2026-07-15T08:00:00Z",
    },
    {
        uid: "kritqr",
        title: "KritQR",
        subtitle: "High-Performance Instant QR Code Generator",
        overview: "An optimized, client-side utility for generating custom vector QR codes from raw text, URLs, or structured data instantly. Built with a focus on speed, light package footprint, and clean rendering.",
        architecture: "Next.js → Canvas API → Tailwind CSS. Deployed on Vercel.",
        demo_url: "https://kritqr.vercel.app",
        source_url: "https://github.com/sepsu-dev/kritqr",
        image_url: "/projects/kritqr.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "nextdotjs" },
            { uid: "typescript", name: "TypeScript", icon: "typescript" },
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "tailwindcss" },
            { uid: "react", name: "React", icon: "react" },
        ],
        created_at: "2025-06-01T08:00:00Z",
        updated_at: "2025-07-14T09:00:00Z",
    },
    {
        uid: "sepsu-dev",
        title: "Sepsu Dev",
        subtitle: "Professional Engineering Portfolio & Console",
        overview: "A highly interactive, glassmorphic portfolio displaying professional developer credentials. Built using Next.js Server Components, localized mock DB endpoints, and a custom Tailwind dark-theme design system.",
        architecture: "Next.js → Server Components → Tailwind CSS → REST API. Deployed on Vercel.",
        demo_url: "https://sepsu-dev.vercel.app",
        source_url: "https://github.com/sepsu-dev/sepsu-dev",
        image_url: "/projects/sepsu-dev.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "nextdotjs" },
            { uid: "typescript", name: "TypeScript", icon: "typescript" },
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "tailwindcss" },
            { uid: "react", name: "React", icon: "react" },
        ],
        created_at: "2025-06-10T08:00:00Z",
        updated_at: "2025-07-14T09:00:00Z",
    },
    {
        uid: "otw-sah",
        title: "OTW Sah",
        subtitle: "Interactive Digital Invitation & Guest RSVP Platform",
        overview: "An elegant, high-performance platform for creating modern interactive wedding and engagement invitations. Featuring customizable themes, dynamic RSVPs, guest list management, and fluid animations.",
        architecture: "Next.js → Tailwind CSS → Server Components. Deployed on Vercel.",
        demo_url: "https://otw-sah.vercel.app",
        source_url: "https://github.com/sepsu-dev/otw-sah",
        image_url: "/projects/otw-sah.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "nextdotjs" },
            { uid: "typescript", name: "TypeScript", icon: "typescript" },
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "tailwindcss" },
        ],
        created_at: "2025-06-19T08:00:00Z",
        updated_at: "2025-06-19T08:00:00Z",
    },
    {
        uid: "titik-tanah",
        title: "Titik Tanah",
        subtitle: "Geospatial Land Plot & Geolocation Manager",
        overview: "An interactive geospatial mapping application designed to record, coordinate, and track land boundaries. Built with GIS integration, Mapbox visualizers, and PostgreSQL geospatial indexing.",
        architecture: "Next.js → Mapbox/Leaflet → PostgreSQL → REST API. Deployed on Vercel.",
        demo_url: "https://www.titiktanah.my.id",
        source_url: "https://github.com/sepsu-dev/titik-tanah",
        image_url: "/projects/titik-tanah.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "nextdotjs" },
            { uid: "typescript", name: "TypeScript", icon: "typescript" },
            { uid: "postgresql", name: "PostgreSQL", icon: "postgresql" },
        ],
        created_at: "2025-06-19T08:00:00Z",
        updated_at: "2025-06-19T08:00:00Z",
    },
    {
        uid: "bootstrap-only",
        title: "Bootstrap Only",
        subtitle: "Curated Responsive UI Design Template Directory",
        overview: "A production-ready repository of clean, modern, and highly modular Bootstrap components and page templates designed to accelerate early-stage startup layout prototyping.",
        architecture: "Bootstrap 5 → HTML/CSS → JavaScript. Deployed on Vercel.",
        demo_url: "https://bootstrap-only.vercel.app",
        source_url: "https://github.com/sepsu-dev/bootstrap-only",
        image_url: "/projects/bootstrap-only.jpg",
        is_public: true,
        skills: [
            { uid: "bootstrap", name: "Bootstrap", icon: "bootstrap" },
            { uid: "javascript", name: "JavaScript", icon: "javascript" },
            { uid: "html5", name: "HTML5", icon: "html5" },
            { uid: "css3", name: "CSS3", icon: "css3" },
        ],
        created_at: "2025-06-19T08:00:00Z",
        updated_at: "2025-06-19T08:00:00Z",
    },
    {
        uid: "lupa-servis",
        title: "Lupa Servis",
        subtitle: "Automated Vehicle Maintenance Scheduler",
        overview: "A smart vehicle maintenance tracker that records service histories and automatically sends upcoming maintenance reminders via WhatsApp Business API integration.",
        architecture: "Next.js → REST API → WhatsApp Business API → PostgreSQL. Deployed on Vercel.",
        demo_url: "https://lupa-servis.vercel.app",
        source_url: "https://github.com/sepsu-dev/lupa-servis",
        image_url: "/projects/lupa-servis.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "nextdotjs" },
            { uid: "nodejs", name: "Node.js", icon: "nodedotjs" },
            { uid: "postgresql", name: "PostgreSQL", icon: "postgresql" },
        ],
        created_at: "2025-06-19T08:00:00Z",
        updated_at: "2025-06-19T08:00:00Z",
    },
    {
        uid: "warung-page",
        title: "Warung Page",
        subtitle: "No-Code Landing Page Builder for MSMEs",
        overview: "A highly scalable landing page generator allowing micro-businesses to deploy custom digital storefronts instantly. Features dynamic routing and rapid template instantiation without overhead.",
        architecture: "Next.js → Dynamic routing → Template engine. Deployed on Vercel.",
        demo_url: "https://warungpage.vercel.app",
        source_url: "https://github.com/sepsu-dev/warungpage",
        image_url: "/projects/warung-page.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "nextdotjs" },
            { uid: "typescript", name: "TypeScript", icon: "typescript" },
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "tailwindcss" },
        ],
        created_at: "2025-06-19T08:00:00Z",
        updated_at: "2025-06-19T08:00:00Z",
    },
    {
        uid: "krit-cv",
        title: "Krit CV",
        subtitle: "Automated ATS-Friendly Resume Builder",
        overview: "An intuitive web utility designed to build ATS-optimized resumes from modular forms. Incorporates dynamic PDF rendering pipelines and automated formatting presets.",
        architecture: "React → Redux Toolkit → PDF generation (jsPDF). Deployed on Vercel.",
        demo_url: "https://kritcv.vercel.app",
        source_url: "https://github.com/sepsu-dev/kritcv",
        image_url: "/projects/krit-cv.jpg",
        is_public: true,
        skills: [
            { uid: "react", name: "React", icon: "react" },
            { uid: "typescript", name: "TypeScript", icon: "typescript" },
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "tailwindcss" },
            { uid: "nodejs", name: "Node.js", icon: "nodedotjs" },
        ],
        created_at: "2025-06-18T08:00:00Z",
        updated_at: "2025-06-18T08:00:00Z",
    },
    {
        uid: "skul-page",
        title: "Skul Page",
        subtitle: "Institutional Web Portal & Management System",
        overview: "A responsive CMS and template system tailored specifically for educational institutions, supporting quick deployment, dynamic announcements, and structured curriculum layouts.",
        architecture: "Next.js → Tailwind CSS → Landing page. Deployed on Vercel.",
        demo_url: "https://skulpage.vercel.app",
        source_url: "https://github.com/sepsu-dev/skulpage",
        image_url: "/projects/skul-page.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "nextdotjs" },
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "tailwindcss" },
        ],
        created_at: "2025-06-18T08:00:00Z",
        updated_at: "2025-06-18T08:00:00Z",
    },
    {
        uid: "kirim-otp-email",
        title: "Kirim OTP Email",
        subtitle: "High-Availability Email OTP Microservice",
        overview: "A secure transactional email microservice engineered for high delivery rates, low latency, and cost-effective user verification via SMTP pipelines.",
        architecture: "Node.js → Express → Nodemailer → SMTP. Deployed on Vercel.",
        demo_url: "https://kirim-otp-email.vercel.app",
        source_url: "https://github.com/sepsu-dev/kirim-otp-email",
        image_url: "/projects/kirim-otp-email.jpg",
        is_public: true,
        skills: [
            { uid: "nodejs", name: "Node.js", icon: "nodedotjs" },
            { uid: "express", name: "Express", icon: "express" },
            { uid: "typescript", name: "TypeScript", icon: "typescript" },
            { uid: "docker", name: "Docker", icon: "docker" },
        ],
        created_at: "2025-06-18T08:00:00Z",
        updated_at: "2025-06-18T08:00:00Z",
    },
    {
        uid: "kirim-otp-wa",
        title: "Kirim OTP WA",
        subtitle: "WhatsApp Transactional OTP Microservice",
        overview: "An enterprise-grade WhatsApp verification gateway featuring rapid OTP dispatch, retry management, and simple REST API integration.",
        architecture: "Node.js → Express → WhatsApp Business API. Deployed on Vercel.",
        demo_url: "https://kirim-otp-wa.vercel.app",
        source_url: "https://github.com/sepsu-dev/kirim-otp-wa",
        image_url: "/projects/kirim-otp-wa.jpg",
        is_public: true,
        skills: [
            { uid: "nodejs", name: "Node.js", icon: "nodedotjs" },
            { uid: "express", name: "Express", icon: "express" },
            { uid: "typescript", name: "TypeScript", icon: "typescript" },
            { uid: "docker", name: "Docker", icon: "docker" },
        ],
        created_at: "2025-06-18T08:00:00Z",
        updated_at: "2025-06-18T08:00:00Z",
    },
    {
        uid: "cek-bmi-yu",
        title: "Cek BMI Yu",
        subtitle: "Aesthetic Body Mass Index Calculator",
        overview: "A responsive health utility designed to calculate Body Mass Index (BMI) dynamically, featuring micro-animations, clear category visualizations, and personal metric logs.",
        architecture: "Next.js → Static site → Tailwind CSS. Deployed on Vercel.",
        demo_url: "https://cekbmi.vercel.app",
        source_url: "https://github.com/sepsu-dev/cek-bmi-yu",
        image_url: "/projects/cek-bmi-yu.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "nextdotjs" },
            { uid: "typescript", name: "TypeScript", icon: "typescript" },
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "tailwindcss" },
        ],
        created_at: "2025-05-26T08:00:00Z",
        updated_at: "2025-06-19T08:00:00Z",
    },
    {
        uid: "numpux",
        title: "Numpux",
        subtitle: "Agile Workspace & Kanban Productivity Suite",
        overview: "An interactive task coordination ecosystem featuring custom-draggable Kanban boards, strategic team calendar visualizations, and collaborative goal mapping.",
        architecture: "Next.js → Tailwind CSS → Kanban & Calendar. Deployed on Vercel.",
        demo_url: "https://numpux.vercel.app",
        source_url: "https://github.com/sepsu-dev/numpux",
        image_url: "/projects/numpux.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "nextdotjs" },
            { uid: "typescript", name: "TypeScript", icon: "typescript" },
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "tailwindcss" },
        ],
        created_at: "2026-05-26T08:00:00Z",
        updated_at: "2026-07-14T03:45:00Z",
    },
    {
        uid: "naha-admin",
        title: "Naha Admin",
        subtitle: "Enterprise Bootstrap 5 Dashboard Template",
        overview: "A modular admin dashboard skeleton designed for complex internal panels. Features rich UI components, fully responsive analytics widgets, and a cohesive dark/light layout system.",
        architecture: "Next.js → Bootstrap 5 → Tailwind CSS. Deployed on Vercel.",
        demo_url: "https://naha-admin.vercel.app",
        source_url: "https://github.com/sepsu-dev/naha-admin",
        image_url: "/projects/naha-admin.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "nextdotjs" },
            { uid: "bootstrap", name: "Bootstrap 5", icon: "bootstrap" },
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "tailwindcss" },
        ],
        created_at: "2026-05-26T08:00:00Z",
        updated_at: "2026-07-14T03:45:00Z",
    },
    {
        uid: "hemat-yu",
        title: "Hemat Yu",
        subtitle: "Personal Ledger & Financial Health Tracker",
        overview: "A streamlined accounting web app that logs income, tracks expenses by categories, and visualizes monthly spending habits to optimize budget planning.",
        architecture: "Next.js → Tailwind CSS. Deployed on Vercel.",
        demo_url: "https://hematyu.vercel.app",
        source_url: "https://github.com/sepsu-dev/hematyu",
        image_url: "/projects/hemat-yu.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "nextdotjs" },
            { uid: "typescript", name: "TypeScript", icon: "typescript" },
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "tailwindcss" },
        ],
        created_at: "2026-05-13T08:00:00Z",
        updated_at: "2026-07-14T03:45:00Z",
    },
];

let nextUid = (): string => `prj-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const projectsService = {
    getAll: async (params?: { page?: number; limit?: number }): Promise<any> => {
        await sleep(100);
        const page = params?.page || 1;
        const limit = params?.limit || 10;
        const start = (page - 1) * limit;
        const items = projects.slice(start, start + limit);

        // Return shape that api-client interceptor would have produced (_meta attached)
        const result: any = [...items];
        (result as any)._meta = {
            total: projects.length,
            page,
            limit,
            totalPages: Math.ceil(projects.length / limit),
        };
        return result;
    },
    getById: async (uid: string): Promise<Project> => {
        await sleep(50);
        const found = projects.find(p => p.uid === uid);
        if (!found) throw new Error("Project not found");
        // Return with _message injected like api-client interceptor does
        const result = { ...found };
        (result as any)._message = "Project retrieved successfully";
        return result;
    },
    create: async (data: Partial<Project> & { skill_uids?: string[] }): Promise<Project> => {
        await sleep(100);
        const allSkills = Object.values(await skillsService.getAll()).flat();
        const projectSkills = (data.skill_uids || [])
            .map(uid => allSkills.find(s => s.uid === uid))
            .filter(Boolean)
            .map(s => ({ uid: s!.uid, name: s!.name, icon: s!.icon }));

        const project: Project = {
            uid: nextUid(),
            title: data.title || "",
            subtitle: data.subtitle || "",
            overview: data.overview || "",
            architecture: data.architecture || "",
            demo_url: data.demo_url || "",
            source_url: data.source_url || "",
            image_url: data.image_url || "",
            is_public: data.is_public ?? true,
            skills: projectSkills,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };
        projects.push(project);
        const result = { ...project };
        (result as any)._message = "Project created successfully";
        return result;
    },
    update: async (uid: string, data: Partial<Project> & { skill_uids?: string[] }): Promise<Project> => {
        await sleep(100);
        const idx = projects.findIndex(p => p.uid === uid);
        if (idx === -1) throw new Error("Project not found");

        const allSkills = Object.values(await skillsService.getAll()).flat();
        const projectSkills = data.skill_uids
            ? data.skill_uids
                .map(uid => allSkills.find(s => s.uid === uid))
                .filter(Boolean)
                .map(s => ({ uid: s!.uid, name: s!.name, icon: s!.icon }))
            : projects[idx].skills;

        // Remove skill_uids before merging, it's not a Project field
        const { skill_uids, ...restData } = data;

        projects[idx] = {
            ...projects[idx],
            ...restData,
            skills: projectSkills,
            uid,
            updated_at: new Date().toISOString(),
        };
        const result = { ...projects[idx] };
        (result as any)._message = "Project updated successfully";
        return result;
    },
    delete: async (uid: string): Promise<any> => {
        await sleep(50);
        projects = projects.filter(p => p.uid !== uid);
        return { _message: "Project deleted successfully" };
    },
    addSkill: async (uid: string, skillUid: string): Promise<any> => {
        const idx = projects.findIndex(p => p.uid === uid);
        if (idx === -1) throw new Error("Project not found");
        const allSkills = Object.values(await skillsService.getAll()).flat();
        const skill = allSkills.find(s => s.uid === skillUid);
        if (!skill) throw new Error("Skill not found");
        if (!projects[idx].skills?.some(s => s.uid === skillUid)) {
            projects[idx].skills = [...(projects[idx].skills || []), { uid: skill.uid, name: skill.name, icon: skill.icon }];
        }
        return { _message: "Skill added to project" };
    },
    removeSkill: async (uid: string, skillUid: string): Promise<any> => {
        const idx = projects.findIndex(p => p.uid === uid);
        if (idx === -1) throw new Error("Project not found");
        projects[idx].skills = (projects[idx].skills || []).filter(s => s.uid !== skillUid);
        return { _message: "Skill removed from project" };
    },
};