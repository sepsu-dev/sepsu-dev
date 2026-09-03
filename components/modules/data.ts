export interface ProjectItem {
  uid: string;
  title: string;
  description: string;
  image_url: string;
  demo_url?: string;
  github_url?: string;
  tags: string[];
  sort_order: number;
}

export interface TechItem {
  name: string;
  icon: string;
}

export interface TechCategory {
  category: string;
  icon: string;
  items: TechItem[];
}

export const HARDCODED_SETTINGS: Record<string, string> = {
  site_name: "Sepsu Dev",
  role: "Software Engineer",
  hero_badge: "portfolio.sh",
  location: "Jakarta, Indonesia",
  email: "sepsu.dev@gmail.com",
  github_url: "https://github.com/sepsu-dev",
  bio: "Full-stack engineer with 3+ years of experience building reliable backends and modern web applications. Focused on delivering clean, maintainable code with pragmatic architecture. Experienced in end-to-end product development, from API design to frontend deployment.",
  focus_1: "Building high-throughput backend services with Go, Java, Node.js, and PHP (Laravel)",
  focus_2: "Crafting reactive modern user interfaces with React.js, Next.js, Vue.js, and TypeScript",
  focus_3: "Automating cloud & DevOps pipelines with Docker, Ubuntu, Nginx, and GitHub/GitLab CI/CD",
  focus_4: "Architecting scalable data persistence with PostgreSQL, MySQL, Redis, and Elasticsearch",
};

export const HARDCODED_PROJECTS: ProjectItem[] = [
  {
    uid: "english-course-center",
    title: "english.course.center",
    description: "An interactive institutional web portal and course catalog for English education programs.",
    image_url: "/projects/english-course-center.jpg",
    demo_url: "https://www.english-course-center.web.id/",
    github_url: "",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    sort_order: 0
  },
  {
    uid: "cek-bmi-yu",
    title: "cekbmi.yu",
    description: "A responsive health utility designed to calculate Body Mass Index (BMI) dynamically.",
    image_url: "/projects/cek-bmi-yu.jpg",
    demo_url: "",
    github_url: "",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    sort_order: 1
  },
  {
    uid: "naha-admin",
    title: "naha.admin",
    description: "Enterprise Bootstrap 5 Dashboard Template skeleton for internal panels.",
    image_url: "/projects/naha-admin.jpg",
    demo_url: "",
    github_url: "",
    tags: ["Next.js", "Bootstrap", "Tailwind CSS"],
    sort_order: 1
  },
  {
    uid: "numpux",
    title: "numpux",
    description: "Agile Workspace & Kanban Productivity Suite with collaborative mapping.",
    image_url: "/projects/numpux.jpg",
    demo_url: "",
    github_url: "",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    sort_order: 2
  },
  {
    uid: "kritqr",
    title: "krit.qr",
    description: "High-Performance Instant QR Code Generator client utility.",
    image_url: "/projects/kritqr.jpg",
    demo_url: "",
    github_url: "",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "React.js"],
    sort_order: 3
  },
  {
    uid: "sepsu-dev",
    title: "sepsu.dev",
    description: "Professional Engineering Portfolio & Console dashboard.",
    image_url: "/projects/sepsu-dev.jpg",
    demo_url: "",
    github_url: "",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "React.js"],
    sort_order: 4
  },
  {
    uid: "otw-sah",
    title: "otw.sah",
    description: "Interactive Digital Invitation & Guest RSVP Platform.",
    image_url: "/projects/otw-sah.jpg",
    demo_url: "",
    github_url: "",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    sort_order: 5
  },
  {
    uid: "titik-tanah",
    title: "titik.tanah",
    description: "Geospatial Land Plot & Geolocation Manager mapping application.",
    image_url: "/projects/titik-tanah.jpg",
    demo_url: "",
    github_url: "",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    sort_order: 6
  },
  {
    uid: "bootstrap-only",
    title: "bootstrap.only",
    description: "Curated Responsive UI Design Template Directory for prototype layouts.",
    image_url: "/projects/bootstrap-only.jpg",
    demo_url: "",
    github_url: "",
    tags: ["Bootstrap", "JavaScript", "HTML5", "CSS3"],
    sort_order: 7
  },
  {
    uid: "lupa-servis",
    title: "lupa.servis",
    description: "Automated Vehicle Maintenance Scheduler and tracker.",
    image_url: "/projects/lupa-servis.jpg",
    demo_url: "",
    github_url: "",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    sort_order: 8
  },
  {
    uid: "warung-page",
    title: "warung.page",
    description: "No-Code Landing Page Builder for MSME storefronts.",
    image_url: "/projects/warung-page.jpg",
    demo_url: "",
    github_url: "",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    sort_order: 9
  },
  {
    uid: "krit-cv",
    title: "krit.cv",
    description: "Automated ATS-Friendly Resume Builder layout generator.",
    image_url: "/projects/krit-cv.jpg",
    demo_url: "",
    github_url: "",
    tags: ["React.js", "TypeScript", "Tailwind CSS", "Node.js"],
    sort_order: 10
  },
  {
    uid: "skul-page",
    title: "skul.page",
    description: "Institutional Web Portal & CMS Management System.",
    image_url: "/projects/skul-page.jpg",
    demo_url: "",
    github_url: "",
    tags: ["Next.js", "Tailwind CSS"],
    sort_order: 11
  },
  {
    uid: "kirim-otp-email",
    title: "kirimotp.email",
    description: "High-Availability Email OTP Microservice engine.",
    image_url: "/projects/kirim-otp-email.jpg",
    demo_url: "",
    github_url: "",
    tags: ["Node.js", "Express.js", "TypeScript", "Docker"],
    sort_order: 12
  },
  {
    uid: "kirim-otp-wa",
    title: "kirimotp.wa",
    description: "WhatsApp Transactional OTP Microservice API gateway.",
    image_url: "/projects/kirim-otp-wa.jpg",
    demo_url: "",
    github_url: "",
    tags: ["Node.js", "Express.js", "TypeScript", "Docker"],
    sort_order: 13
  },
  {
    uid: "hemat-yu",
    title: "hemat.yu",
    description: "Personal Ledger & Financial Health Tracker accounting web app.",
    image_url: "/projects/hemat-yu.jpg",
    demo_url: "",
    github_url: "",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    sort_order: 14
  }
];

export const HARDCODED_TECH_STACK: TechCategory[] = [
  {
    category: "Backend",
    icon: "backend",
    items: [
      { name: "Go", icon: "go" },
      { name: "Java", icon: "openjdk" },
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Nest.js", icon: "nestjs" },
      { name: "Express.js", icon: "express" },
      { name: "PHP", icon: "php" },
      { name: "Laravel", icon: "laravel" },
      { name: "CodeIgniter", icon: "codeigniter" }
    ]
  },
  {
    category: "Frontend",
    icon: "frontend",
    items: [
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "React.js", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "Vue.js", icon: "vuedotjs" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Bootstrap 5", icon: "bootstrap" }
    ]
  },
  {
    category: "Database & Cache",
    icon: "database",
    items: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "SQL Server", icon: "database" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Redis", icon: "redis" },
      { name: "Elasticsearch", icon: "elasticsearch" },
      { name: "RabbitMQ", icon: "rabbitmq" },
      { name: "Prisma", icon: "prisma" },
      { name: "Sequelize", icon: "sequelize" }
    ]
  },
  {
    category: "DevOps & Tools",
    icon: "devops",
    items: [
      { name: "Docker", icon: "docker" },
      { name: "CI/CD", icon: "githubactions" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "GitLab", icon: "gitlab" },
      { name: "Ubuntu", icon: "ubuntu" },
      { name: "Nginx", icon: "nginx" },
      { name: "Postman", icon: "postman" },
      { name: "Swagger", icon: "swagger" }
    ]
  }
];
