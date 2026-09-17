export interface ProjectCaseStudy {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  mainImage: string;
  problemStatement: string;
  outcome: string;
  objectives: string[];
  kpiLabel: string;
  kpiValue: string;
  liveUrl: string;
  secondaryImages: string[];
  tags: string[];
  sortOrder: number;
}

export const JOTTER_SETTINGS = {
  name: "Sepsu Dev",
  short_name: "Sepsu",
  role: "Software Engineer",
  status: "Available for work",
  location: "Jakarta, Indonesia",
  email: "sepsu.dev@gmail.com",
  contactEmail: "sepsu.dev@gmail.com",
  githubUrl: "https://github.com/sepsu-dev",
  twitterUrl: "https://twitter.com/",
  instagramUrl: "https://instagram.com",
  avatarUrl: "/avatar.png",
  bulgariaPhotoUrl: "/avatar.png",
  bio: "Software Engineer with 3+ years of experience building reliable backends and modern web applications. Focused on delivering clean, maintainable code with pragmatic architecture. Experienced in end-to-end product development, from API design to frontend deployment.",
  focus: [
    "⚡ Architecting robust backend services using Laravel, CodeIgniter, Express.js, and Nest.js",
    "⚛️ Crafting highly interactive user interfaces with React.js, Vue.js, and React Native",
    "🐳 Orchestrating containerized environments with Docker, Ubuntu, GitLab, and GitHub CI/CD",
    "🛢️ Managing scalable databases using PostgreSQL, MySQL, SQL Server, Redis, and MongoDB",
  ],
};

export const JOTTER_PROJECTS: ProjectCaseStudy[] = [
  {
    slug: "cryptix",
    title: "Cryptix",
    category: "End-to-End Product",
    tagline: "End-to-End Product",
    description:
      "A next-generation crypto exchange app built around trust and speed. From onboarding through to complex multi-asset trades, Cryptix makes digital asset management feel intuitive and calm.",
    mainImage:
      "https://framerusercontent.com/images/4Gkd70fg0CvsPxE9NwLIZZal3Y.jpg?scale-down-to=1024&width=3231&height=2154",
    problemStatement:
      "Crypto products often intimidate everyday investors with complex charting, obscure jargon, and opaque fee breakdowns.",
    outcome:
      "Delivered a streamlined trade flow with instant asset preview, real-time live performance analytics, and transparent gas estimations.",
    objectives: [
      "Make key management and onboarding effortless and reassuring",
      "Give a live dashboard for prices, portfolio value and performance",
      "Keep buy, convert and trade fast, with transparent real-time fees across 15+ assets",
    ],
    kpiLabel: "KPI",
    kpiValue: "Onboarding completion rate · time to first trade",
    liveUrl: "https://jotter.framer.website/work/cryptix",
    secondaryImages: [
      "https://framerusercontent.com/images/vL6SyhEoYvxpHZ71VSpJM7Bufo.jpg?scale-down-to=1024",
      "https://framerusercontent.com/images/sZgoVc0LUWPuROD7Rmw9TsLyfcQ.png?scale-down-to=1024",
    ],
    tags: ["Product Design", "Design System", "Mobile App", "Fintech"],
    sortOrder: 1,
  },
  {
    slug: "novera",
    title: "Novera",
    category: "SaaS Platform",
    tagline: "SaaS Platform",
    description:
      "An AI-assisted contract workspace that speeds legal teams up without asking them to trust a black box. Reusable templates, auditable review, and live collaboration in one platform.",
    mainImage:
      "https://framerusercontent.com/images/zcXypX4pIV7M5p0yACXp9NQrM.jpg?scale-down-to=1024&width=3445&height=2297",
    problemStatement:
      "Legal contract cycles drag on for weeks across disconnected redlining tools and unverified AI suggestions.",
    outcome:
      "Engineered an interactive review hub with clause risk heatmaps, side-by-side comparison, and direct SignFlow e-signature execution.",
    objectives: [
      "Design an AI-assisted contract workspace that speeds legal teams up, without asking them to trust a black box.",
      "Surface AI risk and clause analysis in a way lawyers can verify and trust",
      "Streamline drafting with reusable, on-brand templates",
      "Bring review, compliance and collaboration into one auditable hub",
    ],
    kpiLabel: "KPI",
    kpiValue: "Average contract review time · negotiation cycle length",
    liveUrl: "https://jotter.framer.website/work/novera",
    secondaryImages: [
      "https://framerusercontent.com/images/Xtmff4tyDzRteHqFklkzdTK040U.jpg?scale-down-to=1024",
      "https://framerusercontent.com/images/cxJJACoDDV5aIrTlUW50tfnApeg.jpg?scale-down-to=1024",
    ],
    tags: ["SaaS", "Dashboard", "AI Workspace", "LegalTech"],
    sortOrder: 2,
  },
  {
    slug: "pitlane",
    title: "Pitlane",
    category: "Web App",
    tagline: "Web App",
    description:
      "High-throughput motorsport telemetry and event stream visualization. Translating millions of data points per second into readable, glanceable insights for race engineers.",
    mainImage:
      "https://framerusercontent.com/images/koCdGSWrWFnEVBQ218n8pijTr4.jpg?scale-down-to=1024&width=2548&height=1699",
    problemStatement:
      "Telemetry systems are notorious for cluttered interfaces where crucial engine and tire anomalies get lost in the noise.",
    outcome:
      "Created real-time telemetry dashboards with zero-SQL custom query builders, automated anomaly threshold alerts, and millisecond latency displays.",
    objectives: [
      "Make ingesting and querying huge event streams feel instant and legible",
      "Let anyone build live dashboards without writing SQL",
      "Turn anomaly detection and alerting into a calm, glanceable experience",
    ],
    kpiLabel: "KPI",
    kpiValue: "Time from data ingestion to actionable insight",
    liveUrl: "https://jotter.framer.website/work/pitlane",
    secondaryImages: [
      "https://framerusercontent.com/images/co6uucosi3Jlitl5SEavwqcR9ps.jpg?scale-down-to=1024",
      "https://framerusercontent.com/images/CUIA24pSQ2ufedIuj2Gs5EoMqY.jpg?scale-down-to=1024",
    ],
    tags: ["Web App", "Telemetry", "Data Visualization", "Realtime"],
    sortOrder: 3,
  },
];
