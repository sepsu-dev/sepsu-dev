import { Project } from "@/types/api";
import { skillsService } from "./skills.service";

// ── Dummy data (real projects) ──────────────────────────────
let projects: Project[] = [
    {
        uid: "qris-dinamis",
        title: "QRIS Dinamis",
        subtitle: "Static to Dynamic QRIS Converter",
        overview: "Konversi QRIS statis menjadi dinamis secara instan. Upload, scan kamera, atau paste string QRIS — dapatkan QR code dinamis dengan nominal dan biaya layanan.",
        architecture: "Next.js → Tailwind CSS → Canvas API → Web Share API. Deployed on Vercel.",
        demo_url: "https://qris-static-to-dynamic-generator.vercel.app",
        source_url: "https://github.com/sepsu-dev/qris-static-to-dynamic-generator",
        image_url: "/projects/qris-dinamis.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "▲" },
            { uid: "typescript", name: "TypeScript", icon: "💎" },
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "🎨" },
            { uid: "react", name: "React", icon: "⚛️" },
        ],
        created_at: "2026-07-15T08:00:00Z",
        updated_at: "2026-07-15T08:00:00Z",
    },
    {
        uid: "kritqr",
        title: "KritQR",
        subtitle: "Generate QR Code Online Gratis",
        overview: "Tool sederhana untuk generate QR code dari teks secara instan. Gratis, cepat, dan mudah digunakan.",
        architecture: "Next.js → Canvas API → Tailwind CSS. Deployed on Vercel.",
        demo_url: "https://kritqr.vercel.app",
        source_url: "https://github.com/sepsu-dev/kritqr",
        image_url: "/projects/kritqr.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "▲" },
            { uid: "typescript", name: "TypeScript", icon: "💎" },
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "🎨" },
            { uid: "react", name: "React", icon: "⚛️" },
        ],
        created_at: "2025-06-01T08:00:00Z",
        updated_at: "2025-07-14T09:00:00Z",
    },
    {
        uid: "sepsu-dev",
        title: "Sepsu Dev",
        subtitle: "Full-stack Engineer Portfolio",
        overview: "Full-stack engineer with 3+ years of experience building reliable backends and modern web applications. Focused on delivering clean, maintainable code with pragmatic architecture. Experienced in end-to-end product development, from API design to frontend deployment.",
        architecture: "Next.js → Server Components → Tailwind CSS → REST API. Deployed on Vercel.",
        demo_url: "https://sepsu-dev.vercel.app",
        source_url: "https://github.com/sepsu-dev/sepsu-dev",
        image_url: "/projects/sepsu-dev.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "▲" },
            { uid: "typescript", name: "TypeScript", icon: "💎" },
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "🎨" },
            { uid: "react", name: "React", icon: "⚛️" },
        ],
        created_at: "2025-06-10T08:00:00Z",
        updated_at: "2025-07-14T09:00:00Z",
    },
    {
        uid: "otw-sah",
        title: "OTW Sah",
        subtitle: "Undangan Digital Pernikahan Modern & Elegan",
        overview: "Buat undangan digital pernikahan dan tunangan online yang elegan, modern, dan interaktif. Pilih template premium, bagikan link, dan kelola tamu dengan mudah di otw.sah.",
        architecture: "Next.js → Tailwind CSS → Server Components. Deployed on Vercel.",
        demo_url: "https://otw-sah.vercel.app",
        source_url: "https://github.com/sepsu-dev/otw-sah",
        image_url: "/projects/otw-sah.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "▲" },
            { uid: "typescript", name: "TypeScript", icon: "💎" },
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "🎨" },
        ],
        created_at: "2025-06-19T08:00:00Z",
        updated_at: "2025-06-19T08:00:00Z",
    },
    {
        uid: "titik-tanah",
        title: "Titik Tanah",
        subtitle: "Interactive Land Plot Manager",
        overview: "Mark and manage land plots on an interactive map. Open-source tool for personal land data tracking with precise geolocation capabilities.",
        architecture: "Next.js → Mapbox/Leaflet → PostgreSQL → REST API. Deployed on Vercel.",
        demo_url: "https://www.titiktanah.my.id",
        source_url: "https://github.com/sepsu-dev/titik-tanah",
        image_url: "/projects/titik-tanah.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "▲" },
            { uid: "typescript", name: "TypeScript", icon: "💎" },
            { uid: "postgresql", name: "PostgreSQL", icon: "🐘" },
        ],
        created_at: "2025-06-19T08:00:00Z",
        updated_at: "2025-06-19T08:00:00Z",
    },
    {
        uid: "bootstrap-only",
        title: "Bootstrap Only",
        subtitle: "Modern & Ready-to-Use Bootstrap Templates",
        overview: "Discover a collection of modern, responsive, ready-to-use Bootstrap templates for your projects. From landing pages to dashboards — both free and premium.",
        architecture: "Bootstrap 5 → HTML/CSS → JavaScript. Deployed on Vercel.",
        demo_url: "https://bootstrap-only.vercel.app",
        source_url: "https://github.com/sepsu-dev/bootstrap-only",
        image_url: "/projects/bootstrap-only.jpg",
        is_public: true,
        skills: [
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "🎨" },
        ],
        created_at: "2025-06-19T08:00:00Z",
        updated_at: "2025-06-19T08:00:00Z",
    },
    {
        uid: "lupa-servis",
        title: "Lupa Servis",
        subtitle: "Catat & Ingatkan Jadwal Servis Kendaraan",
        overview: "Aplikasi pencatatan servis kendaraan gratis. Catat riwayat servis motor & mobil, dapatkan notifikasi WhatsApp ketika jadwal servis sudah dekat. Jangan sampai lupa servis lagi!",
        architecture: "Next.js → REST API → WhatsApp Business API → PostgreSQL. Deployed on Vercel.",
        demo_url: "https://lupa-servis.vercel.app",
        source_url: "https://github.com/sepsu-dev/lupa-servis",
        image_url: "/projects/lupa-servis.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "▲" },
            { uid: "nodejs", name: "Node.js", icon: "🟢" },
            { uid: "postgresql", name: "PostgreSQL", icon: "🐘" },
        ],
        created_at: "2025-06-19T08:00:00Z",
        updated_at: "2025-06-19T08:00:00Z",
    },
    {
        uid: "warung-page",
        title: "Warung Page",
        subtitle: "Landing Page Gratis untuk UMKM Indonesia",
        overview: "Buat landing page modern untuk warung UMKM Anda, gratis dan langsung jadi. Dapatkan halaman profesional di warungpage.my.id/{nama_warung} dalam hitungan menit. Tanpa coding, tanpa biaya.",
        architecture: "Next.js → Dynamic routing → Template engine. Deployed on Vercel.",
        demo_url: "https://warungpage.vercel.app",
        source_url: "https://github.com/sepsu-dev/warungpage",
        image_url: "/projects/warung-page.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "▲" },
            { uid: "typescript", name: "TypeScript", icon: "💎" },
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "🎨" },
        ],
        created_at: "2025-06-19T08:00:00Z",
        updated_at: "2025-06-19T08:00:00Z",
    },
    {
        uid: "krit-cv",
        title: "Krit CV",
        subtitle: "Buat CV Profesional Gratis",
        overview: "Buat CV profesional dengan mudah menggunakan berbagai template modern. Daftar dengan Gmail atau WhatsApp, gratis selamanya!",
        architecture: "React → Redux Toolkit → PDF generation (jsPDF). Deployed on Vercel.",
        demo_url: "https://kritcv.vercel.app",
        source_url: "https://github.com/sepsu-dev/kritcv",
        image_url: "/projects/krit-cv.jpg",
        is_public: true,
        skills: [
            { uid: "react", name: "React", icon: "⚛️" },
            { uid: "typescript", name: "TypeScript", icon: "💎" },
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "🎨" },
            { uid: "nodejs", name: "Node.js", icon: "🟢" },
        ],
        created_at: "2025-06-18T08:00:00Z",
        updated_at: "2025-06-18T08:00:00Z",
    },
    {
        uid: "skul-page",
        title: "Skul Page",
        subtitle: "Website Sekolah TK, SD, SMP, SMA",
        overview: "Penyedia website sekolah profesional untuk PAUD, TK, SD/MI, SMP/MTS, SMA/SMK/MA, dan SLB. Template modern, bisa custom, domain .sch.id gratis.",
        architecture: "Next.js → Tailwind CSS → Landing page. Deployed on Vercel.",
        demo_url: "https://skulpage.vercel.app",
        source_url: "https://github.com/sepsu-dev/skulpage",
        image_url: "/projects/skul-page.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "▲" },
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "🎨" },
        ],
        created_at: "2025-06-18T08:00:00Z",
        updated_at: "2025-06-18T08:00:00Z",
    },
    {
        uid: "kirim-otp-email",
        title: "Kirim OTP Email",
        subtitle: "Email OTP Microservice",
        overview: "Email OTP microservice dengan delivery rate 99%, latensi <5 detik, dan biaya 70% lebih hemat dari SMS. Solusi OTP modern untuk developer, startup, dan enterprise.",
        architecture: "Node.js → Express → Nodemailer → SMTP. Deployed on Vercel.",
        demo_url: "https://kirim-otp-email.vercel.app",
        source_url: "https://github.com/sepsu-dev/kirim-otp-email",
        image_url: "/projects/kirim-otp-email.jpg",
        is_public: true,
        skills: [
            { uid: "nodejs", name: "Node.js", icon: "🟢" },
            { uid: "typescript", name: "TypeScript", icon: "💎" },
            { uid: "docker", name: "Docker", icon: "🐳" },
        ],
        created_at: "2025-06-18T08:00:00Z",
        updated_at: "2025-06-18T08:00:00Z",
    },
    {
        uid: "kirim-otp-wa",
        title: "Kirim OTP WA",
        subtitle: "WhatsApp OTP Microservice",
        overview: "WhatsApp OTP microservice dengan delivery rate 98%, latensi <3 detik, dan biaya 60% lebih hemat dari SMS. Solusi OTP modern untuk developer, startup, dan enterprise.",
        architecture: "Node.js → Express → WhatsApp Business API. Deployed on Vercel.",
        demo_url: "https://kirim-otp-wa.vercel.app",
        source_url: "https://github.com/sepsu-dev/kirim-otp-wa",
        image_url: "/projects/kirim-otp-wa.jpg",
        is_public: true,
        skills: [
            { uid: "nodejs", name: "Node.js", icon: "🟢" },
            { uid: "typescript", name: "TypeScript", icon: "💎" },
            { uid: "docker", name: "Docker", icon: "🐳" },
        ],
        created_at: "2025-06-18T08:00:00Z",
        updated_at: "2025-06-18T08:00:00Z",
    },
    {
        uid: "cek-bmi-yu",
        title: "Cek BMI Yu",
        subtitle: "Cek Berat Badan Idealmu",
        overview: "Cara simpel dan estetik untuk cek BMI dan kesehatan tubuhmu secara instan.",
        architecture: "Next.js → Static site → Tailwind CSS. Deployed on Vercel.",
        demo_url: "https://cekbmi.vercel.app",
        source_url: "https://github.com/sepsu-dev/cek-bmi-yu",
        image_url: "/projects/cek-bmi-yu.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "▲" },
            { uid: "typescript", name: "TypeScript", icon: "💎" },
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "🎨" },
        ],
        created_at: "2025-05-26T08:00:00Z",
        updated_at: "2025-06-19T08:00:00Z",
    },
    {
        uid: "numpux",
        title: "Numpux",
        subtitle: "Task Management & Team Productivity",
        overview: "Comprehensive task management platform with Kanban board, strategic calendar, and team collaboration. Designed to streamline workflows and track progress effectively.",
        architecture: "Next.js → Tailwind CSS → Kanban & Calendar. Deployed on Vercel.",
        demo_url: "https://numpux.vercel.app",
        source_url: "https://github.com/sepsu-dev/numpux",
        image_url: "/projects/numpux.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "▲" },
            { uid: "typescript", name: "TypeScript", icon: "💎" },
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "🎨" },
        ],
        created_at: "2026-05-26T08:00:00Z",
        updated_at: "2026-07-14T03:45:00Z",
    },
    {
        uid: "naha-admin",
        title: "Naha Admin",
        subtitle: "Free Bootstrap 5 Admin Dashboard Template",
        overview: "Modern and responsive admin dashboard template built with Bootstrap 5. Suitable for admin panels, CRM systems, and internal tools with a clean, professional design.",
        architecture: "Next.js → Bootstrap 5 → Tailwind CSS. Deployed on Vercel.",
        demo_url: "https://naha-admin.vercel.app",
        source_url: "https://github.com/sepsu-dev/naha-admin",
        image_url: "/projects/naha-admin.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "▲" },
            { uid: "typescript", name: "TypeScript", icon: "💎" },
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "🎨" },
        ],
        created_at: "2026-05-26T08:00:00Z",
        updated_at: "2026-07-14T03:45:00Z",
    },
    {
        uid: "hemat-yu",
        title: "Hemat Yu",
        subtitle: "Personal Finance Tracker",
        overview: "Hematyu membantu Anda memonitoring pemasukan dan pengeluaran uang agar bisa lebih hemat dan teratur.",
        architecture: "Next.js → Tailwind CSS. Deployed on Vercel.",
        demo_url: "https://hematyu.vercel.app",
        source_url: "https://github.com/sepsu-dev/hematyu",
        image_url: "/projects/hemat-yu.jpg",
        is_public: true,
        skills: [
            { uid: "nextjs", name: "Next.js", icon: "▲" },
            { uid: "typescript", name: "TypeScript", icon: "💎" },
            { uid: "tailwindcss", name: "Tailwind CSS", icon: "🎨" },
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