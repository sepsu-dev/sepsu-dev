import { NextResponse } from "next/server";

export interface ProjectItem {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  year: string;
  role: string;
  stack: string[];
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
}

export const DUMMY_PROJECTS: ProjectItem[] = [
  {
    slug: "cryptix",
    title: "Cryptix",
    category: "Crypto Exchange",
    tagline: "Fintech Platform",
    year: "2024",
    role: "Lead Fullstack Engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "WebSockets", "PostgreSQL"],
    description:
      "A fast and intuitive cryptocurrency trading app focused on clean UX, instant token swaps, and zero-confusion asset management.",
    mainImage: "/projects/cryptix-main.webp",
    problemStatement:
      "Most crypto platforms overwhelm everyday users with complex charting, technical jargon, and hidden gas fees.",
    outcome:
      "Engineered an intuitive interface with sub-second order previews, transparent fee breakdowns, and live portfolio tracking.",
    objectives: [
      "Simplified onboarding with guided wallet setup and recovery",
      "Live portfolio tracking across 15+ popular cryptocurrencies",
      "Instant token swap engine with guaranteed price execution",
    ],
    kpiLabel: "Performance",
    kpiValue: "<100ms trade execution · 98% positive UX rating",
    liveUrl: "https://jotter.framer.website/work/cryptix",
    secondaryImages: [
      "/projects/cryptix-1.webp",
      "/projects/cryptix-2.webp",
    ],
    tags: ["Product Design", "Design System", "Mobile App", "Fintech"],
  },
  {
    slug: "novera",
    title: "Novera",
    category: "AI LegalTech",
    tagline: "Contract Automation",
    year: "2024",
    role: "Fullstack Engineer",
    stack: ["React", "Nest.js", "OpenAI API", "PostgreSQL", "Docker"],
    description:
      "An intelligent contract workspace that helps legal teams draft, review, and finalize agreements in minutes instead of days.",
    mainImage: "/projects/novera-main.webp",
    problemStatement:
      "Manual contract review is slow, prone to oversight, and fragmented across email threads and unverified redlines.",
    outcome:
      "Delivered an automated review hub that highlights clause risks, suggests verified revisions, and supports instant e-signing.",
    objectives: [
      "Automated clause risk analysis with clear compliance warnings",
      "Central library of reusable, company-approved contract templates",
      "Real-time team collaboration with complete change history",
    ],
    kpiLabel: "Efficiency",
    kpiValue: "70% faster contract cycle · 0% missed compliance clauses",
    liveUrl: "https://jotter.framer.website/work/novera",
    secondaryImages: [
      "/projects/novera-1.webp",
      "/projects/novera-2.webp",
    ],
    tags: ["SaaS", "Dashboard", "AI Workspace", "LegalTech"],
  },
  {
    slug: "pitlane",
    title: "Pitlane",
    category: "Motorsport Telemetry",
    tagline: "Realtime Analytics",
    year: "2023",
    role: "Frontend Engineer",
    stack: ["Next.js", "TypeScript", "Canvas API", "Redis", "SSE"],
    description:
      "Real-time telemetry dashboard designed for race engineers to monitor engine health, tire wear, and track conditions during live sessions.",
    mainImage: "/projects/pitlane-main.webp",
    problemStatement:
      "Race telemetry produces hundreds of thousands of sensor readings per second, making critical anomalies easy to miss in standard tools.",
    outcome:
      "Built custom canvas charts that render 60 FPS live streams with automated visual alerts for temperature and pressure spikes.",
    objectives: [
      "Smooth 60 FPS data visualization with zero lag or frame drops",
      "Customizable engineer dashboards with drag-and-drop telemetry widgets",
      "Instant anomaly alerts for powertrain and tire degradation",
    ],
    kpiLabel: "Latency",
    kpiValue: "<15ms telemetry render latency · 60 FPS charts",
    liveUrl: "https://jotter.framer.website/work/pitlane",
    secondaryImages: [
      "/projects/pitlane-1.webp",
      "/projects/pitlane-2.webp",
    ],
    tags: ["Web App", "Telemetry", "Data Visualization", "Realtime"],
  },
  {
    slug: "zenith",
    title: "Zenith",
    category: "Team Workspace",
    tagline: "Productivity Tool",
    year: "2024",
    role: "Frontend Architect",
    stack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    description:
      "A keyboard-first workspace that connects team documents, task boards, and notes into a distraction-free single window.",
    mainImage: "/projects/cryptix-1.webp",
    problemStatement:
      "Switching constantly between Slack, Notion, GitHub, and browser tabs drains team focus and slows down development.",
    outcome:
      "Unified team resources into a minimalist workspace with a global command palette (Cmd+K) that searches everything in milliseconds.",
    objectives: [
      "Global search across GitHub, Linear, Notion, and Slack",
      "Sub-30ms keyboard-first command bar navigation",
      "Minimalist, distraction-free interface with dark & light modes",
    ],
    kpiLabel: "Productivity",
    kpiValue: "40% less app-switching · 12,000+ active sessions",
    liveUrl: "https://jotter.framer.website/work/zenith",
    secondaryImages: [
      "/projects/cryptix-main.webp",
      "/projects/cryptix-2.webp",
    ],
    tags: ["Workspace", "System Design", "TypeScript", "Productivity"],
  },
  {
    slug: "pulse",
    title: "Pulse",
    category: "Developer Tooling",
    tagline: "API Reliability",
    year: "2023",
    role: "Backend Engineer",
    stack: ["Go", "Node.js", "Cloudflare Workers", "ClickHouse", "gRPC"],
    description:
      "Global edge monitoring tool that continuously tests API endpoints and web services, notifying engineers before users encounter errors.",
    mainImage: "/projects/novera-1.webp",
    problemStatement:
      "Traditional uptime checks only test homepages and miss broken API routes or slow responses in specific geographic regions.",
    outcome:
      "Constructed multi-region synthetic checks from 28 edge locations with instant alert dispatching to Slack, Telegram, and Discord.",
    objectives: [
      "Multi-step synthetic user flow testing across 28 global regions",
      "Instant incident alerts delivered in under 5 seconds",
      "Clear latency breakdowns covering DNS, TLS, TTFB, and payload transfer",
    ],
    kpiLabel: "Reliability",
    kpiValue: "99.99% monitor uptime · <5s alert delivery",
    liveUrl: "https://jotter.framer.website/work/pulse",
    secondaryImages: [
      "/projects/novera-main.webp",
      "/projects/novera-2.webp",
    ],
    tags: ["Monitoring", "Edge Network", "DevOps", "Node.js"],
  },
  {
    slug: "kube",
    title: "Kube",
    category: "Cloud Console",
    tagline: "DevOps Dashboard",
    year: "2024",
    role: "Fullstack & DevOps",
    stack: ["React", "Kubernetes Client", "WebSockets", "Go", "Helm"],
    description:
      "A streamlined web dashboard for Kubernetes clusters that lets developers inspect pods, stream logs, and manage deployments with ease.",
    mainImage: "/projects/pitlane-1.webp",
    problemStatement:
      "Managing production incidents through raw CLI terminal commands is stressful, slow, and prone to costly command typos.",
    outcome:
      "Created an intuitive web interface with real-time log streaming, live resource graphs, and safe one-click deployment rollbacks.",
    objectives: [
      "Live WebSocket log streaming with instant text filtering and search",
      "Visual cluster resource monitor for CPU, Memory, and Network usage",
      "One-click canary deployment controls and instant rollback safety",
    ],
    kpiLabel: "Resolution Time",
    kpiValue: "65% faster incident response · Zero syntax mistakes",
    liveUrl: "https://jotter.framer.website/work/kube",
    secondaryImages: [
      "/projects/pitlane-main.webp",
      "/projects/pitlane-2.webp",
    ],
    tags: ["Kubernetes", "DevOps", "WebSockets", "Infrastructure"],
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "6", 10);

  const startIndex = (page - 1) * limit;
  const paginatedProjects = DUMMY_PROJECTS.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    status: "success",
    data: paginatedProjects,
    pagination: {
      total: DUMMY_PROJECTS.length,
      page,
      limit,
      totalPages: Math.ceil(DUMMY_PROJECTS.length / limit),
    },
  });
}
