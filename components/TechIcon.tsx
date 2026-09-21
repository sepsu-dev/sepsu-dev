import React from "react";
import {
  TypeScript,
  React as ReactIcon,
  NextJs,
  NodeJs,
  Docker,
  PostgreSQL,
  Laravel,
  NestJS,
  TailwindCSS,
  Redis,
  MongoDB,
  MySQL,
  VueJs,
  Bootstrap5,
  ExpressJsDark,
  ExpressJsLight,
  MicrosoftSQLServer,
  PHP,
  Spring,
  Go,
  Elastic,
  CodeIgniter,
  Kubernetes,
} from "developer-icons";
import { Cpu } from "lucide-react";

export type TechIconName =
  | "TypeScript"
  | "React"
  | "Next.js"
  | "Vue.js"
  | "Tailwind CSS"
  | "Bootstrap"
  | "Node.js"
  | "Express.js"
  | "NestJS"
  | "Go"
  | "Java Spring"
  | "PHP Native"
  | "Laravel"
  | "CodeIgniter"
  | "PostgreSQL"
  | "MySQL"
  | "SQL Server"
  | "MongoDB"
  | "Redis"
  | "Elasticsearch"
  | "Docker"
  | string;

interface TechIconProps {
  name: TechIconName;
  size?: number;
  className?: string;
  showTitle?: boolean;
}

/**
 * Master Tech Icon Component
 * Single source of truth for rendering tech icons dynamically across the portfolio and admin.
 */
export default function TechIcon({
  name,
  size = 19,
  className = "",
  showTitle = true,
}: TechIconProps) {
  const normalized = name.toLowerCase().trim();

  let IconContent: React.ReactNode = null;

  switch (normalized) {
    case "typescript":
    case "ts":
      IconContent = <TypeScript size={size} />;
      break;

    case "react":
      IconContent = <ReactIcon size={size} />;
      break;

    case "next.js":
    case "nextjs":
    case "next":
      IconContent = (
        <span className="text-stone-900 dark:text-stone-100 flex items-center justify-center">
          <NextJs size={size} />
        </span>
      );
      break;

    case "vue.js":
    case "vuejs":
    case "vue":
      IconContent = <VueJs size={size} />;
      break;

    case "tailwind css":
    case "tailwindcss":
    case "tailwind":
      IconContent = <TailwindCSS size={size} />;
      break;

    case "bootstrap":
    case "bootstrap5":
      IconContent = <Bootstrap5 size={size} />;
      break;

    case "node.js":
    case "nodejs":
    case "node":
      IconContent = <NodeJs size={size} />;
      break;

    case "express.js":
    case "expressjs":
    case "express":
      IconContent = (
        <>
          <span className="dark:hidden flex items-center justify-center">
            <ExpressJsDark size={size} />
          </span>
          <span className="hidden dark:flex items-center justify-center">
            <ExpressJsLight size={size} />
          </span>
        </>
      );
      break;

    case "nestjs":
    case "nest.js":
    case "nest":
      IconContent = <NestJS size={size} />;
      break;

    case "go":
    case "golang":
      IconContent = <Go size={size} />;
      break;

    case "java spring":
    case "spring":
    case "springboot":
      IconContent = <Spring size={size} />;
      break;

    case "php native":
    case "php":
      IconContent = <PHP size={size} />;
      break;

    case "laravel":
      IconContent = <Laravel size={size} />;
      break;

    case "codeigniter":
    case "ci":
      IconContent = <CodeIgniter size={size} />;
      break;

    case "postgresql":
    case "postgres":
      IconContent = <PostgreSQL size={size} />;
      break;

    case "mysql":
      IconContent = <MySQL size={size} />;
      break;

    case "sql server":
    case "mssql":
      IconContent = <MicrosoftSQLServer size={size} />;
      break;

    case "mongodb":
    case "mongo":
      IconContent = <MongoDB size={size} />;
      break;

    case "redis":
      IconContent = <Redis size={size} />;
      break;

    case "elasticsearch":
    case "elastic":
      IconContent = <Elastic size={size} />;
      break;

    case "docker":
      IconContent = <Docker size={size} />;
      break;

    case "kubernetes":
    case "k8s":
      IconContent = <Kubernetes size={size} />;
      break;

    default:
      // Fallback icon for unmapped technologies
      return (
        <span
          title={showTitle ? name : undefined}
          className={`inline-flex items-center gap-1 shrink-0 ${className}`}
        >
          <Cpu style={{ width: size, height: size }} className="text-stone-400 shrink-0" />
        </span>
      );
  }

  return (
    <span
      title={showTitle ? name : undefined}
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
    >
      {IconContent}
    </span>
  );
}

/**
 * Predefined master catalog of all available tech icons
 */
export const AVAILABLE_TECH_ICONS: TechIconName[] = [
  "TypeScript",
  "React",
  "Next.js",
  "Vue.js",
  "Tailwind CSS",
  "Bootstrap",
  "Node.js",
  "Express.js",
  "NestJS",
  "Go",
  "Java Spring",
  "PHP Native",
  "Laravel",
  "CodeIgniter",
  "PostgreSQL",
  "MySQL",
  "SQL Server",
  "MongoDB",
  "Redis",
  "Elasticsearch",
  "Docker",
];
