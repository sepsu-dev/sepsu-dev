import { NextResponse } from "next/server";

export async function GET() {
  const profile = {
    name: "Sepsu Dev",
    title: "Software Engineer",
    location: "Jakarta, Indonesia",
    bio: "Software Engineer with 3+ years of experience building reliable backends, modern web applications, and scalable services.",
    status: "Available for new opportunities",
    email: "sepsu.dev@gmail.com",
    github: "https://github.com/sepsu-dev",
    skills: [
      { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
      { category: "Backend", items: ["Go", "Node.js", "Nest.js", "Laravel", "PostgreSQL", "Redis"] },
      { category: "DevOps & Cloud", items: ["Docker", "Kubernetes", "Cloudflare", "Linux"] },
    ],
  };

  return NextResponse.json({
    status: "success",
    data: profile,
  });
}
