"use client";

interface TechBadgeProps {
    tag: string;
    iconSlug?: string;
    className?: string;
}

// Maps tag names to Simple Icons slugs and a fallback hex color
const TECH_ICON_MAP: Record<string, { slug: string; color?: string }> = {
    // Frontend
    "React": { slug: "react", color: "61DAFB" },
    "React.js": { slug: "react", color: "61DAFB" },
    "Next.js": { slug: "nextdotjs", color: "000000" },
    "Next.js 15": { slug: "nextdotjs", color: "000000" },
    "Tailwind CSS": { slug: "tailwindcss", color: "06B6D4" },
    "Bootstrap 5": { slug: "bootstrap", color: "7952B3" },
    "HTML5": { slug: "html5", color: "E34F26" },
    "CSS3": { slug: "css3", color: "1572B6" },
    "JavaScript": { slug: "javascript", color: "F7DF1E" },
    "TypeScript": { slug: "typescript", color: "3178C6" },
    "Framer Motion": { slug: "framer", color: "0055FF" },
    "React Query": { slug: "reactquery", color: "FF4154" },
    "Redux": { slug: "redux", color: "764ABC" },
    "Vue.js": { slug: "vuedotjs", color: "4FC08D" },
    "UI/UX": { slug: "figma", color: "F24E1E" },
    "UI/UX Design": { slug: "figma", color: "F24E1E" },
    "Figma": { slug: "figma", color: "F24E1E" },
    // Backend
    "Node.js": { slug: "nodedotjs", color: "339933" },
    "Nest.js": { slug: "nestjs", color: "E0234E" },
    "Express.js": { slug: "express", color: "000000" },
    "PHP": { slug: "php", color: "777BB4" },
    "Laravel": { slug: "laravel", color: "FF2D20" },
    "Python": { slug: "python", color: "3776AB" },
    "Go": { slug: "go", color: "00ADD8" },
    "PostgreSQL": { slug: "postgresql", color: "4169E1" },
    "MySQL": { slug: "mysql", color: "4479A1" },
    "MongoDB": { slug: "mongodb", color: "47A248" },
    "Redis": { slug: "redis", color: "DC382D" },
    "Prisma": { slug: "prisma", color: "2D3748" },
    "Drizzle": { slug: "drizzle", color: "C5F74F" },
    "API Development": { slug: "fastapi", color: "009688" },
    // Cloud & DevOps
    "Vercel": { slug: "vercel", color: "000000" },
    "Docker": { slug: "docker", color: "2496ED" },
    "GitHub": { slug: "github", color: "181717" },
    "VPS": { slug: "linux", color: "FCC624" },
    "Linux": { slug: "linux", color: "FCC624" },
    "Ubuntu": { slug: "ubuntu", color: "E95420" },
    "Nginx": { slug: "nginx", color: "009639" },
    "Azure": { slug: "microsoftazure", color: "0078D4" },
    "AWS": { slug: "amazonservices", color: "232F3E" },
    "CI/CD": { slug: "githubactions", color: "2088FF" },
    // Integration / Other
    "AI": { slug: "openai", color: "412991" },
    "AI Models": { slug: "openai", color: "412991" },
    "WhatsApp API": { slug: "whatsapp", color: "25D366" },
    "OCR": { slug: "googlelens", color: "4285F4" },
    "PWA": { slug: "pwa", color: "5A0FC8" },
    "Real-time Data": { slug: "socketdotio", color: "010101" },
    "Task Management": { slug: "notion", color: "000000" },
};

export function TechBadge({ tag, iconSlug, className = "" }: TechBadgeProps) {
    const slug = iconSlug || TECH_ICON_MAP[tag]?.slug;
    const isUrl = slug?.startsWith("http");

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border border-border/40 text-muted-foreground bg-muted/20 group-hover:border-primary/20 group-hover:text-primary/80 transition-colors ${className}`}
        >
            {slug && (
                <>
                    {isUrl ? (
                        <img
                            src={slug}
                            alt=""
                            aria-hidden="true"
                            className="w-3 h-3 shrink-0 object-contain"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                    ) : /^\p{Emoji}/u.test(slug) || slug.length <= 2 ? (
                        <span className="text-xs shrink-0 select-none">{slug}</span>
                    ) : (
                        <>
                            {/* Light mode icon */}
                            <img
                                src={`https://cdn.simpleicons.org/${slug}`}
                                alt=""
                                aria-hidden="true"
                                className="w-3 h-3 shrink-0 dark:hidden"
                                onError={(e) => (e.currentTarget.style.display = 'none')}
                            />
                            {/* Dark mode icon – white version */}
                            <img
                                src={`https://cdn.simpleicons.org/${slug}/white`}
                                alt=""
                                aria-hidden="true"
                                className="w-3 h-3 shrink-0 hidden dark:block"
                                onError={(e) => (e.currentTarget.style.display = 'none')}
                            />
                        </>
                    )}
                </>
            )}
            {tag}
        </span>
    );
}
