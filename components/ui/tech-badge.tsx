"use client";

import { useState } from "react";

interface TechBadgeProps {
    tag: string;
    iconSlug?: string;
    className?: string;
}

// Maps tag names to exact icon definitions (devicon official colored SVGs or simple-icons)
const TECH_ICON_MAP: Record<string, { devicon?: string; deviconDark?: string; slug?: string; color?: string }> = {
    // Frontend
    "React": { devicon: "react/react-original.svg", color: "61DAFB" },
    "React.js": { devicon: "react/react-original.svg", color: "61DAFB" },
    "Next.js": { devicon: "nextjs/nextjs-original.svg", deviconDark: "nextjs/nextjs-original.svg", color: "000000" },
    "Next.js 15": { devicon: "nextjs/nextjs-original.svg", deviconDark: "nextjs/nextjs-original.svg", color: "000000" },
    "Nuxt.js": { devicon: "nuxtjs/nuxtjs-original.svg", slug: "nuxt", color: "00DC82" },
    "Nuxt": { devicon: "nuxtjs/nuxtjs-original.svg", slug: "nuxt", color: "00DC82" },
    "Tailwind CSS": { devicon: "tailwindcss/tailwindcss-original.svg", color: "06B6D4" },
    "Bootstrap 5": { devicon: "bootstrap/bootstrap-original.svg", color: "7952B3" },
    "Bootstrap": { devicon: "bootstrap/bootstrap-original.svg", color: "7952B3" },
    "HTML5": { devicon: "html5/html5-original.svg", color: "E34F26" },
    "CSS3": { devicon: "css3/css3-original.svg", color: "1572B6" },
    "CSS": { devicon: "css3/css3-original.svg", color: "1572B6" },
    "JavaScript": { devicon: "javascript/javascript-original.svg", color: "F7DF1E" },
    "jQuery": { devicon: "jquery/jquery-original.svg", color: "0769AD" },
    "TypeScript": { devicon: "typescript/typescript-original.svg", color: "3178C6" },
    "Framer Motion": { slug: "framer", color: "0055FF" },
    "React Query": { slug: "reactquery", color: "FF4154" },
    "Redux": { devicon: "redux/redux-original.svg", color: "764ABC" },
    "Vue.js": { devicon: "vuejs/vuejs-original.svg", color: "4FC08D" },
    "React Native": { devicon: "react/react-original.svg", color: "61DAFB" },
    "UI/UX": { devicon: "figma/figma-original.svg", color: "F24E1E" },
    "UI/UX Design": { devicon: "figma/figma-original.svg", color: "F24E1E" },
    "Figma": { devicon: "figma/figma-original.svg", color: "F24E1E" },

    // Backend
    "Go": { devicon: "go/go-original.svg", color: "00ADD8" },
    "Golang": { devicon: "go/go-original.svg", color: "00ADD8" },
    "Java": { devicon: "java/java-original.svg", color: "ED8B00" },
    ".NET": { devicon: "dotnetcore/dotnetcore-original.svg", color: "512BD4" },
    ".NET Core": { devicon: "dotnetcore/dotnetcore-original.svg", color: "512BD4" },
    "PHP": { devicon: "php/php-original.svg", color: "777BB4" },
    "Node.js": { devicon: "nodejs/nodejs-original.svg", color: "339933" },
    "Nest.js": { devicon: "nestjs/nestjs-original.svg", color: "E0234E" },
    "NestJS": { devicon: "nestjs/nestjs-original.svg", color: "E0234E" },
    "Express.js": { devicon: "express/express-original.svg", color: "000000" },
    "ExpressJS": { devicon: "express/express-original.svg", color: "000000" },
    "Express": { devicon: "express/express-original.svg", color: "000000" },
    "Laravel": { devicon: "laravel/laravel-original.svg", color: "FF2D20" },
    "CodeIgniter": { devicon: "codeigniter/codeigniter-plain.svg", color: "EF4223" },
    "Python": { devicon: "python/python-original.svg", color: "3776AB" },
    "Spring Boot": { devicon: "spring/spring-original.svg", color: "6DB33F" },
    "Spring": { devicon: "spring/spring-original.svg", color: "6DB33F" },
    "FastAPI": { devicon: "fastapi/fastapi-original.svg", color: "009688" },
    "Django": { devicon: "django/django-plain.svg", color: "092E20" },

    // Databases
    "PostgreSQL": { devicon: "postgresql/postgresql-original.svg", color: "4169E1" },
    "MySQL": { devicon: "mysql/mysql-original.svg", color: "4479A1" },
    "SQL Server": { devicon: "microsoftsqlserver/microsoftsqlserver-plain.svg", color: "CC292B" },
    "Microsoft SQL Server": { devicon: "microsoftsqlserver/microsoftsqlserver-plain.svg", color: "CC292B" },
    "SQLite": { devicon: "sqlite/sqlite-original.svg", color: "003B57" },
    "MariaDB": { devicon: "mariadb/mariadb-original.svg", color: "003545" },
    "MongoDB": { devicon: "mongodb/mongodb-original.svg", color: "47A248" },
    "Redis": { devicon: "redis/redis-original.svg", color: "DC382D" },
    "Prisma": { devicon: "prisma/prisma-original.svg", color: "2D3748" },
    "Sequelize": { devicon: "sequelize/sequelize-original.svg", color: "52B0E7" },
    "Elasticsearch": { devicon: "elasticsearch/elasticsearch-original.svg", color: "005571" },
    "Drizzle": { slug: "drizzle", color: "C5F74F" },
    "RabbitMQ": { devicon: "rabbitmq/rabbitmq-original.svg", color: "FF6600" },
    "API Development": { slug: "fastapi", color: "009688" },
    "REST API": { slug: "fastapi", color: "009688" },

    // DevOps & Tools
    "Docker": { devicon: "docker/docker-original.svg", color: "2496ED" },
    "Git": { devicon: "git/git-original.svg", color: "F05032" },
    "GitHub": { devicon: "github/github-original.svg", color: "181717" },
    "GitLab": { devicon: "gitlab/gitlab-original.svg", color: "FC6D26" },
    "Ubuntu": { devicon: "ubuntu/ubuntu-plain.svg", color: "E95420" },
    "Linux": { devicon: "linux/linux-original.svg", color: "FCC624" },
    "Nginx": { devicon: "nginx/nginx-original.svg", color: "009639" },
    "Postman": { devicon: "postman/postman-original.svg", color: "FF6C37" },
    "Swagger": { devicon: "swagger/swagger-original.svg", color: "85EA2D" },
    "Bash": { devicon: "bash/bash-original.svg", slug: "gnubash", color: "4EAA25" },
    "DBeaver": { devicon: "dbeaver/dbeaver-original.svg", slug: "dbeaver", color: "372923" },
    "CI/CD": { devicon: "githubactions/githubactions-original.svg", color: "2088FF" },
    "GitHub Actions": { devicon: "githubactions/githubactions-original.svg", color: "2088FF" },
    "Vercel": { slug: "vercel", color: "000000" },
    "cPanel": { slug: "cpanel", color: "FF6C2C" },
    "VPS": { devicon: "linux/linux-original.svg", color: "FCC624" },

    // AI & Agentic Stack
    "OpenClaw": { slug: "🤖", color: "FF6B6B" },
    "Hermes": { slug: "🧠", color: "8B5CF6" },
    "MCP": { slug: "🔌", color: "3B82F6" },
    "MCP (Model Context Protocol)": { slug: "🔌", color: "3B82F6" },
    "Model Context Protocol": { slug: "🔌", color: "3B82F6" },
    "Vibe Coding": { slug: "⚡", color: "10B981" },
    "AI": { slug: "openai", color: "412991" },
    "AI Models": { slug: "openai", color: "412991" },
    "OpenAI API": { slug: "openai", color: "412991" },
    "OpenAI": { slug: "openai", color: "412991" },
    "Vercel AI SDK": { slug: "vercel", color: "000000" },
    "LangChain": { slug: "langchain", color: "1C3C3C" },
    "Claude": { slug: "anthropic", color: "D97757" },
    "WhatsApp API": { slug: "whatsapp", color: "25D366" },
    "OCR": { slug: "googlelens", color: "4285F4" },
    "PWA": { slug: "pwa", color: "5A0FC8" },
    "Real-time Data": { slug: "socketdotio", color: "010101" },
    "Task Management": { slug: "notion", color: "000000" },
};

export function TechBadge({ tag, iconSlug, className = "" }: TechBadgeProps) {
    const [isHovered, setIsHovered] = useState(false);
    const info = TECH_ICON_MAP[tag];
    const color = info?.color;
    const brandColor = color ? `#${color}` : null;

    // Resolve icon URL
    let lightUrl: string | null = null;
    let darkUrl: string | null = null;
    let isEmoji = false;
    let emojiChar = "";

    if (info?.devicon) {
        // Official full-color brand SVG from devicon CDN
        lightUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${info.devicon}`;
        darkUrl = info.deviconDark
            ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${info.deviconDark}`
            : lightUrl;
    } else {
        const slug = iconSlug || info?.slug;
        if (slug) {
            if (slug.startsWith("http")) {
                lightUrl = slug;
                darkUrl = slug;
            } else if (/^\p{Emoji}/u.test(slug) || slug.length <= 2) {
                isEmoji = true;
                emojiChar = slug;
            } else {
                lightUrl = `https://cdn.simpleicons.org/${slug}/${color === "ffffff" ? "000000" : (color || "666666")}`;
                darkUrl = `https://cdn.simpleicons.org/${slug}/${color === "000000" ? "ffffff" : (color || "cccccc")}`;
            }
        }
    }

    // Dynamic badge style matching brand color on hover
    const badgeStyle = brandColor
        ? {
            color: isHovered ? brandColor : "inherit",
            borderColor: isHovered ? `${brandColor}40` : `${brandColor}15`,
            backgroundColor: isHovered ? `${brandColor}10` : `${brandColor}04`,
        }
        : {};

    // Invert monochrome icons (like Express/GitHub/NextJS) in dark mode if needed
    const needsInvertInDark = (tag === "Next.js" || tag === "Next.js 15" || tag === "Express.js" || tag === "Express" || tag === "GitHub" || tag === "Vercel" || tag === "Prisma");

    return (
        <span
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={badgeStyle}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-mono font-semibold border border-border/40 text-foreground bg-card/60 transition-all duration-200 select-none shadow-xs ${className}`}
        >
            {isEmoji ? (
                <span className="text-xs shrink-0 select-none">{emojiChar}</span>
            ) : lightUrl ? (
                <>
                    {/* Light mode icon */}
                    <img
                        src={lightUrl}
                        alt=""
                        aria-hidden="true"
                        className={`w-3.5 h-3.5 shrink-0 object-contain ${needsInvertInDark ? "dark:hidden" : ""}`}
                        onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    {/* Dark mode icon if inverted or alternate */}
                    {needsInvertInDark && darkUrl && (
                        <img
                            src={darkUrl}
                            alt=""
                            aria-hidden="true"
                            className="w-3.5 h-3.5 shrink-0 hidden dark:block object-contain invert brightness-200"
                            onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                    )}
                </>
            ) : null}
            {tag}
        </span>
    );
}
