"use client";

import Link from "next/link";
import { ArrowUpRight, Terminal } from "lucide-react";
import { cn, type Project } from "@/lib/utils";
import { TechBadge } from "./tech-badge";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const { title, description, tags, imageUrl } = project;

  return (
    <Link
      href={`/project/${project.project_id}`}
      className={cn(
        "group relative flex flex-col sm:flex-row gap-6 p-5 sm:p-6 rounded-lg border border-border/50 bg-card/25 backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:bg-card hover:border-primary/30 items-stretch",
        className
      )}
    >
      {/* Decorative gradient light that fades in on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/3 to-purple-500/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Image Thumbnail Container */}
      <div className="flex-shrink-0 w-full sm:w-52 md:w-56 aspect-[16/10] bg-muted/50 rounded-lg overflow-hidden border border-border/20 relative z-10 shadow-sm transition-transform duration-500 group-hover:scale-[1.01] group-hover:border-primary/20">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-muted/30 border border-dashed border-border/40 text-muted-foreground/45 gap-1.5">
            <Terminal className="w-5 h-5 opacity-60 text-primary animate-pulse-soft" />
            <span className="text-[8px] font-mono tracking-widest uppercase font-bold">No Preview</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 min-w-0 flex-1 relative z-10">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight transition-colors group-hover:text-primary flex items-center gap-1">
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">{title}</span>
            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-primary flex-shrink-0" />
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed font-medium">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {tags.map((tag: string) => (
            <TechBadge key={tag} tag={tag} className="px-2 py-1 text-[10px]" />
          ))}
        </div>
      </div>
    </Link>
  );
}