"use client";

import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn, type Project } from "@/utils";

interface ProjectListProps {
  projects: Project[];
  meta: {
    totalPages: number;
    page: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  title?: string;
}

export function ProjectList({
  projects,
  meta,
  title = "Example Projects Listing",
}: ProjectListProps) {
  return (
    <section className="mt-10">
      {title && (
        <div className="flex items-center justify-between gap-4 mb-8">
          <h2 className="text-xl font-bold text-foreground font-mono flex items-center gap-2">
            {title}
          </h2>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {meta.totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 mt-8 pt-6 border-t border-border/40">
          <div className="flex items-center gap-2">
            <Link
              href={`?page=${meta.page - 1}`}
              aria-label="Previous page"
              className={cn(
                "group flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-card/40 transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-[0_0_15px_rgba(var(--primary),0.1)]",
                !meta.hasPrevPage && "pointer-events-none opacity-20 grayscale"
              )}
              scroll={false}
            >
              <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
            </Link>

            <div className="flex items-center gap-2 mx-1">
              {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`?page=${p}`}
                  aria-label={`Go to page ${p}`}
                  className={cn(
                    "relative w-10 h-10 flex items-center justify-center rounded-lg text-xs font-mono font-bold transition-all duration-300 border overflow-hidden",
                    p === meta.page
                      ? "border-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.2)]"
                      : "border-border/50 bg-card/20 text-muted-foreground hover:border-border hover:bg-card hover:text-foreground"
                  )}
                  scroll={false}
                >
                  {p === meta.page && (
                    <div className="absolute inset-0 bg-primary -z-10 animate-in fade-in zoom-in duration-300" />
                  )}
                  {p.toString().padStart(2, "0")}
                </Link>
              ))}
            </div>

            <Link
              href={`?page=${meta.page + 1}`}
              aria-label="Next page"
              className={cn(
                "group flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-card/40 transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-[0_0_15px_rgba(var(--primary),0.1)]",
                !meta.hasNextPage && "pointer-events-none opacity-20 grayscale"
              )}
              scroll={false}
            >
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
