export type {
  ProjectItem,
  PaginationParams,
  PaginatedResult,
} from "@/app/(backend)/api/projects/schema";
import type { ProjectItem } from "@/app/(backend)/api/projects/schema";

export const DUMMY_PROJECTS: ProjectItem[] = [
  {
    slug: "kritqr",
    title: "KritQR",
    category: "Utility & Tooling",
    tagline: "Instant QR Generator",
    year: "2024",
    role: "Fullstack Engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Canvas API"],
    description:
      "A fast, lightweight, and clutter-free online QR code generator. Generate customizable QR codes from text or links instantly without registration.",
    mainImage: "/projects/kritqr.webp",
    problemStatement:
      "Most existing QR generator websites are bloated with intrusive ads, paid paywalls for basic features, and unnecessary multi-step signups.",
    outcome:
      "Engineered an instant, client-first QR generation tool with real-time rendering, seamless SVG/PNG export, and zero signup barriers.",
    objectives: [
      "Instant client-side QR generation with real-time previews",
      "One-click high-resolution download support for PNG and SVG formats",
      "Minimalist and responsive user interface tailored for speed",
    ],
    kpiLabel: "Generation Speed",
    kpiValue: "<10ms generation latency · 100% free with zero ads",
    liveUrl: "https://kritqr.vercel.app/",
    secondaryImages: [],
    tags: ["Utility", "Web App", "QR Code", "Next.js"],
  },
  {
    slug: "numpux",
    title: "Numpux",
    category: "Productivity & Management",
    tagline: "Modern Project Workspace",
    year: "2024",
    role: "Fullstack Engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Radix UI"],
    description:
      "A modern task and project management workspace built for speed and clarity. Streamline workflows, organize projects, and collaborate with your team.",
    mainImage: "/projects/numpux.webp",
    problemStatement:
      "Complex project management tools suffer from cognitive overload, sluggish interactions, and steep learning curves that slow down agile teams.",
    outcome:
      "Crafted a distraction-free, fluid Kanban workspace with smooth drag-and-drop interactions, sprint tracking, and instant collaboration.",
    objectives: [
      "Intuitive drag-and-drop Kanban board for sprint execution",
      "Integrated sprint progress analytics and velocity indicators",
      "Distraction-free interface engineered for fast keyboard-centric interactions",
    ],
    kpiLabel: "Team Productivity",
    kpiValue: "100% free forever · Snappy & zero cognitive friction",
    liveUrl: "https://numpux.vercel.app/",
    secondaryImages: [],
    tags: ["Productivity", "SaaS", "Kanban", "Workflow"],
  },
  {
    slug: "pdf-signer-editor",
    title: "PDF Signer Editor",
    category: "Document Tooling",
    tagline: "Online PDF Signature & Annotation",
    year: "2024",
    role: "Frontend Engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PDF-lib", "Canvas API"],
    description:
      "A private, client-side browser application to digitally sign PDF files and add custom text overlays without uploading sensitive documents to external servers.",
    mainImage: "/projects/pdf-signer-editor.webp",
    problemStatement:
      "Users often need to sign documents quickly but hesitate to upload confidential contracts and personal papers to third-party cloud servers.",
    outcome:
      "Developed a completely client-side PDF signing suite ensuring 100% privacy, instant vector signature placement, and lossless document exports.",
    objectives: [
      "100% client-side PDF parsing and vector signature rendering",
      "Smooth signature draw pad with customizable stroke width and colors",
      "Dynamic text annotation and drag-and-drop element positioning",
    ],
    kpiLabel: "Privacy & Security",
    kpiValue: "Zero server uploads · 100% client-side processing",
    liveUrl: "https://pdf-signer-editor.vercel.app/",
    secondaryImages: [],
    tags: ["PDF Tool", "Digital Signature", "Privacy First", "Canvas API"],
  },
  {
    slug: "getbmi",
    title: "GetBMI",
    category: "Health & Fitness",
    tagline: "Interactive BMI Calculator",
    year: "2024",
    role: "Frontend Engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    description:
      "A fast, accurate, and interactive Body Mass Index (BMI) calculator with real-time fluid morphing visualizations and WHO-standard ideal weight guidance.",
    mainImage: "/projects/get-bmi.webp",
    problemStatement:
      "Standard health calculators provide static, boring tabular readouts that fail to intuitively engage users in understanding their physical health status.",
    outcome:
      "Designed a sleek, interactive micro-app featuring fluid visual transitions, real-time slider controls, and actionable health range insights.",
    objectives: [
      "Real-time reactive BMI recalculation on slider input",
      "Fluid morphing visual cues representing BMI categories",
      "Accurate ideal weight range estimates aligned with WHO standards",
    ],
    kpiLabel: "Interactivity",
    kpiValue: "Real-time reactive updates · WHO-standard accuracy",
    liveUrl: "https://getbmi.vercel.app/",
    secondaryImages: [],
    tags: ["HealthTech", "Interactive", "Micro App", "Calculator"],
  },
  {
    slug: "heemt",
    title: "Heemt",
    category: "Personal Finance",
    tagline: "Smart Expense & Cashflow Tracker",
    year: "2024",
    role: "Fullstack Engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Radix UI"],
    description:
      "A modern personal finance and expense tracking web app designed to help users monitor cash flow, limit category budgets, and save money effortlessly.",
    mainImage: "/projects/heemt.webp",
    problemStatement:
      "Tracking daily income and expenses manually is often tedious and overwhelming, causing individuals to lose visibility over their budget limits.",
    outcome:
      "Created an intuitive, lightweight financial dashboard with rapid transaction logging, interactive cash flow charts, and customizable budget limits.",
    objectives: [
      "Rapid transaction entry for daily income and expenses",
      "Dynamic category budget limits to prevent overspending",
      "Real-time visual cashflow analytics and saldo tracking",
    ],
    kpiLabel: "Simplicity & Free Access",
    kpiValue: "100% free forever · Fast transaction tracking",
    liveUrl: "https://heemt.vercel.app/",
    secondaryImages: [],
    tags: ["Fintech", "Expense Tracker", "Personal Finance", "Next.js"],
  },
];
