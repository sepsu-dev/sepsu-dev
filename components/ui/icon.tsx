import React, { lazy, Suspense } from "react";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

// Map of popular tech/brand names to Simple Icons slugs and colors
export const BRAND_ICON_MAP: Record<string, { slug: string; color: string }> = {
  // Frontend & Mobile
  react: { slug: "react", color: "61DAFB" },
  reactjs: { slug: "react", color: "61DAFB" },
  nextjs: { slug: "nextdotjs", color: "000000" },
  next: { slug: "nextdotjs", color: "000000" },
  vue: { slug: "vuedotjs", color: "4FC08D" },
  vuejs: { slug: "vuedotjs", color: "4FC08D" },
  nuxt: { slug: "nuxt", color: "00DC82" },
  nuxtjs: { slug: "nuxt", color: "00DC82" },
  angular: { slug: "angular", color: "DD0031" },
  svelte: { slug: "svelte", color: "FF3E00" },
  sveltekit: { slug: "svelte", color: "FF3E00" },
  astro: { slug: "astro", color: "FF5D01" },
  solidjs: { slug: "solid", color: "4F74B9" },
  remix: { slug: "remix", color: "000000" },
  preact: { slug: "preact", color: "673AB8" },
  html: { slug: "html5", color: "E34F26" },
  html5: { slug: "html5", color: "E34F26" },
  css: { slug: "css3", color: "1572B6" },
  css3: { slug: "css3", color: "1572B6" },
  javascript: { slug: "javascript", color: "F7DF1E" },
  js: { slug: "javascript", color: "F7DF1E" },
  typescript: { slug: "typescript", color: "3178C6" },
  ts: { slug: "typescript", color: "3178C6" },
  jquery: { slug: "jquery", color: "0769AD" },
  tailwindcss: { slug: "tailwindcss", color: "06B6D4" },
  tailwind: { slug: "tailwindcss", color: "06B6D4" },
  bootstrap: { slug: "bootstrap", color: "7952B3" },
  sass: { slug: "sass", color: "CC6699" },
  figma: { slug: "figma", color: "F24E1E" },
  flutter: { slug: "flutter", color: "02569B" },
  dart: { slug: "dart", color: "0175C2" },
  reactnative: { slug: "react", color: "61DAFB" },
  swift: { slug: "swift", color: "F05138" },
  swiftui: { slug: "swift", color: "F05138" },
  kotlin: { slug: "kotlin", color: "7F52FF" },
  android: { slug: "android", color: "3DDC84" },
  apple: { slug: "apple", color: "000000" },
  ios: { slug: "apple", color: "000000" },

  // State Management & Build Tools
  redux: { slug: "redux", color: "764ABC" },
  zustand: { slug: "react", color: "3178C6" },
  vite: { slug: "vite", color: "646CFF" },
  webpack: { slug: "webpack", color: "8DD6F9" },
  turbopack: { slug: "turbo", color: "000000" },
  bun: { slug: "bun", color: "000000" },
  deno: { slug: "deno", color: "000000" },
  pnpm: { slug: "pnpm", color: "F69220" },
  yarn: { slug: "yarn", color: "2C8EBB" },
  npm: { slug: "npm", color: "CB3837" },

  // Backend, Frameworks & Languages
  nodejs: { slug: "nodedotjs", color: "339933" },
  node: { slug: "nodedotjs", color: "339933" },
  express: { slug: "express", color: "000000" },
  nestjs: { slug: "nestjs", color: "E0234E" },
  fastify: { slug: "fastify", color: "000000" },
  springboot: { slug: "springboot", color: "6DB33F" },
  spring: { slug: "spring", color: "6DB33F" },
  laravel: { slug: "laravel", color: "FF2D20" },
  php: { slug: "php", color: "777BB4" },
  python: { slug: "python", color: "3776AB" },
  django: { slug: "django", color: "092E20" },
  flask: { slug: "flask", color: "000000" },
  fastapi: { slug: "fastapi", color: "009688" },
  go: { slug: "go", color: "00ADD8" },
  golang: { slug: "go", color: "00ADD8" },
  rust: { slug: "rust", color: "000000" },
  ruby: { slug: "ruby", color: "CC342D" },
  rails: { slug: "rubyonrails", color: "CC0000" },
  csharp: { slug: "csharp", color: "239120" },
  dotnet: { slug: "dotnet", color: "512BD4" },
  cpp: { slug: "cplusplus", color: "00599C" },
  java: { slug: "openjdk", color: "ED8B00" },
  graphql: { slug: "graphql", color: "E10098" },
  apollo: { slug: "apollographql", color: "311C87" },

  // Databases & ORMs
  postgresql: { slug: "postgresql", color: "4169E1" },
  postgres: { slug: "postgresql", color: "4169E1" },
  mysql: { slug: "mysql", color: "4479A1" },
  mongodb: { slug: "mongodb", color: "47A248" },
  redis: { slug: "redis", color: "DC382D" },
  sqlite: { slug: "sqlite", color: "003B57" },
  prisma: { slug: "prisma", color: "2D3748" },
  drizzle: { slug: "drizzle", color: "C5F74F" },
  supabase: { slug: "supabase", color: "3ECF8E" },
  firebase: { slug: "firebase", color: "FFCA28" },
  pocketbase: { slug: "pocketbase", color: "B8DFEC" },
  mariadb: { slug: "mariadb", color: "003545" },
  elasticsearch: { slug: "elasticsearch", color: "005571" },
  dynamodb: { slug: "amazondynamodb", color: "4053F2" },
  oracle: { slug: "oracle", color: "F80000" },

  // DevOps & Cloud
  docker: { slug: "docker", color: "2496ED" },
  kubernetes: { slug: "kubernetes", color: "326CE5" },
  aws: { slug: "amazonservices", color: "232F3E" },
  gcp: { slug: "googlecloud", color: "4285F4" },
  azure: { slug: "microsoftazure", color: "0089D6" },
  vercel: { slug: "vercel", color: "000000" },
  netlify: { slug: "netlify", color: "00C7B7" },
  heroku: { slug: "heroku", color: "430098" },
  digitalocean: { slug: "digitalocean", color: "0080FF" },
  cloudflare: { slug: "cloudflare", color: "F38020" },
  nginx: { slug: "nginx", color: "009639" },
  linux: { slug: "linux", color: "FCC624" },
  ubuntu: { slug: "ubuntu", color: "E95420" },
  git: { slug: "git", color: "F05032" },
  github: { slug: "github", color: "181717" },
  gitlab: { slug: "gitlab", color: "FC6D26" },
  bitbucket: { slug: "bitbucket", color: "0052CC" },

  // AI & Agentic Stack
  openai: { slug: "openai", color: "412991" },
  anthropic: { slug: "anthropic", color: "D97757" },
  claude: { slug: "anthropic", color: "D97757" },
  gemini: { slug: "googlegemini", color: "8E75C2" },
  google: { slug: "google", color: "4285F4" },
  langchain: { slug: "langchain", color: "1C3C3C" },
  huggingface: { slug: "huggingface", color: "FFD21E" },
  pytorch: { slug: "pytorch", color: "EE4C2C" },
  tensorflow: { slug: "tensorflow", color: "FF6F00" },
  ollama: { slug: "ollama", color: "000000" },
};

// Helper to convert PascalCase/camelCase to kebab-case (for Lucide matching)
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "ref"> {
  name: string; // E.g., 'Mail', 'Github', 'nextjs', 'si:react'
  size?: number | string;
  color?: string;
}

export function Icon({ name, size = 20, color, className = "", ...props }: IconProps) {
  const lowerName = name.toLowerCase();
  const kebabName = toKebabCase(name);

  // 1. Check if it's explicitly a Simple Icons brand (e.g. starting with "si:" or "brand:") or in our BRAND_ICON_MAP
  const isBrandPrefix = lowerName.startsWith("si:") || lowerName.startsWith("brand:");
  const brandKey = isBrandPrefix ? lowerName.replace(/^(si:|brand:)/, "") : lowerName;
  const brandInfo = BRAND_ICON_MAP[brandKey] || (isBrandPrefix ? { slug: brandKey, color: "currentColor" } : null);

  if (brandInfo) {
    const iconColor = color || (brandInfo.color === "currentColor" ? undefined : `#${brandInfo.color}`);
    const lightIconUrl = `https://cdn.simpleicons.org/${brandInfo.slug}/${brandInfo.color === "ffffff" ? "000000" : (brandInfo.color || "666666")}`;
    const darkIconUrl = `https://cdn.simpleicons.org/${brandInfo.slug}/${brandInfo.color === "000000" ? "ffffff" : (brandInfo.color || "cccccc")}`;

    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 ${className}`}
        style={{ width: size, height: size, color: iconColor }}
      >
        <img
          src={lightIconUrl}
          alt={name}
          aria-hidden="true"
          className="w-full h-full object-contain dark:hidden"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <img
          src={darkIconUrl}
          alt={name}
          aria-hidden="true"
          className="w-full h-full object-contain hidden dark:block"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </span>
    );
  }

  // 2. Resolve Lucide Icon
  // Match key from dynamicIconImports (it is keyed in kebab-case, e.g. "arrow-up-right")
  const lucideKey = (kebabName in dynamicIconImports)
    ? kebabName
    : (lowerName in dynamicIconImports)
    ? lowerName
    : Object.keys(dynamicIconImports).find(k => k.replace(/-/g, "") === lowerName);

  if (lucideKey) {
    // Dynamically import the specific Lucide component
    const LucideIcon = lazy(
      dynamicIconImports[lucideKey as keyof typeof dynamicIconImports] as any
    );

    return (
      <Suspense fallback={<div style={{ width: size, height: size }} className="animate-pulse bg-muted rounded-md" />}>
        <LucideIcon
          size={size}
          color={color}
          className={className}
          {...(props as LucideProps)}
        />
      </Suspense>
    );
  }

  // 3. Fallback: if nothing matches, render a warning/placeholder icon
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-muted-foreground ${className}`}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}
