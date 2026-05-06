import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "logisync-platform",
    title: "LogiSync — Real-time Logistics Platform",
    description:
      "End-to-end shipment tracking system processing 50k+ events/day via Kafka. Built microservices architecture with NestJS, syncing data to Elasticsearch for sub-100ms search across 2M+ records.",
    startDate: "Jan 2025",
    endDate: "Present",
    tags: ["NestJS", "Kafka", "Elasticsearch", "PostgreSQL", "Redis", "Docker"],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop"
    ],
    href: "#",
  },
  {
    id: "hematyu-finance",
    title: "HematYu — AI-powered Finance Tracker",
    description:
      "Personal finance app with WhatsApp bot integration for expense logging via natural language. Leverages OpenAI to parse receipts and auto-categorize transactions. Built with Next.js App Router and Bun runtime.",
    startDate: "Nov 2024",
    endDate: "Mar 2025",
    tags: ["Next.js", "Bun", "OpenAI", "Tailwind CSS", "Shadcn UI", "Prisma"],
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800&auto=format&fit=crop"
    ],
    href: "#",
  },
  {
    id: "dashboard-vms",
    title: "VMS Dashboard — Vehicle Monitoring System",
    description:
      "Internal ops dashboard for fleet management with live GPS tracking, fuel analytics, and maintenance scheduling. REST + WebSocket backend with NestJS; scheduled sync jobs via cron with full unit test coverage.",
    startDate: "Aug 2024",
    endDate: "Nov 2024",
    tags: ["NestJS", "TypeORM", "PostgreSQL", "WebSocket", "Jest", "Next.js"],
    imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1449965072305-64f24af0821b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502161739991-008299be9850?q=80&w=800&auto=format&fit=crop"
    ],
    href: "#",
  },
  {
    id: "zenith-ecommerce",
    title: "Zenith — Scalable E-commerce API",
    description:
      "A high-performance e-commerce backend built with Go and Gin. Implements distributed locking with Redis for inventory management and uses gRPC for inter-service communication.",
    startDate: "Jun 2024",
    endDate: "Aug 2024",
    tags: ["Go", "gRPC", "Redis", "PostgreSQL", "Gin", "Docker"],
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop",
    href: "#",
  },
  {
    id: "nexus-chat",
    title: "Nexus — Real-time Collaboration Tool",
    description:
      "Slack-like messaging platform with channels, threads, and file sharing. Uses Socket.io for real-time updates and AWS S3 for secure media storage. Frontend built with React and TanStack Query.",
    startDate: "Apr 2024",
    endDate: "Jun 2024",
    tags: ["React", "Node.js", "Socket.io", "AWS S3", "MongoDB", "Express"],
    imageUrl: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=800&auto=format&fit=crop",
    href: "#",
  },
  {
    id: "cipher-vault",
    title: "CipherVault — Zero-Knowledge Password Manager",
    description:
      "A secure password manager that uses client-side encryption (AES-256) so data is never stored in plain text. Built with a focus on security and privacy using Electron and Rust (Wasm).",
    startDate: "Feb 2024",
    endDate: "Apr 2024",
    tags: ["Electron", "Rust", "Wasm", "TypeScript", "SQLite"],
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
    href: "#",
  },
  {
    id: "eco-track",
    title: "EcoTrack — Carbon Footprint Calculator",
    description:
      "Web app for individuals and businesses to calculate and offset their carbon emissions. Integrates with various APIs to fetch flight and transportation data. Built with Next.js and Tailwind CSS.",
    startDate: "Dec 2023",
    endDate: "Feb 2024",
    tags: ["Next.js", "Tailwind CSS", "Chart.js", "Node.js", "Firebase"],
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
    href: "#",
  },
  {
    id: "skyline-weather",
    title: "Skyline — Hyper-local Weather App",
    description:
      "Weather application providing minute-by-minute precipitation forecasts. Uses OpenWeatherMap API and Leaflet.js for interactive radar maps. Optimized for mobile devices with a PWA approach.",
    startDate: "Oct 2023",
    endDate: "Dec 2023",
    tags: ["React", "PWA", "Leaflet", "API Integration", "CSS Modules"],
    imageUrl: "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=800&auto=format&fit=crop",
    href: "#",
  },
  {
    id: "bit-stream",
    title: "BitStream — Video Streaming Engine",
    description:
      "Custom HLS video streaming implementation for low-latency live broadcasts. Handles transcoding via FFmpeg and distribution through a Global CDN. Built with C++ and Node.js control plane.",
    startDate: "Jul 2023",
    endDate: "Oct 2023",
    tags: ["C++", "FFmpeg", "HLS", "Node.js", "Redis", "AWS CloudFront"],
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
    href: "#",
  },
];
