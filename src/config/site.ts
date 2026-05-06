export const siteConfig = {
  name: "Alan Smith",
  title: "Alan Smith — Software Engineer",
  description: "Software Engineer specializing in backend systems, microservices, and full-stack web development.",
  url: "https://alansmith.dev",
  ogImage: "https://alansmith.dev/og.jpg",
  links: {
    github: "https://github.com/alansmith",
    twitter: "https://twitter.com/alansmith",
  },
  author: "Alan Smith",
  bio: "Hi, I'm a Software Engineer specializing in scalable backend systems and full-stack web applications. I design architectures that solve complex problems using clean and maintainable code.",
  techStack: [
    {
      category: "Backend",
      skills: ["Node.js", "NestJS", "Go", "Python"],
      icon: "Server"
    },
    {
      category: "Database",
      skills: ["PostgreSQL", "Redis", "Prisma"],
      icon: "Database"
    },
    {
      category: "Frontend",
      skills: ["React", "Next.js", "TailwindCSS"],
      icon: "Layout"
    },
    {
      category: "DevOps",
      skills: ["Docker", "CI/CD", "AWS", "Linux"],
      icon: "Code2"
    }
  ]
};

export type SiteConfig = typeof siteConfig;
