"use client";

import { X, ExternalLink, GitBranch, Calendar, Tag, Layers, Globe } from "lucide-react";
import { ProjectImages } from "./project-images";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!project || !mounted) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 transition-all duration-500",
        isOpen ? "visible" : "invisible"
      )}
    >
      {/* Backdrop with elegant blur */}
      <div
        className={cn(
          "absolute inset-0 bg-background/60 backdrop-blur-xl transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={cn(
          "relative w-full max-w-4xl max-h-[85vh] bg-card border border-border rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col transition-all duration-500 ease-out",
          isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-12 opacity-0"
        )}
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between px-6 py-4 bg-card border-b border-border/50 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Layers className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold tracking-tight text-foreground truncate max-w-[200px] sm:max-w-none">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            
            {/* Left: Project Media */}
            <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-border/50 bg-muted/10">
              <div className="sticky top-0">
                <ProjectImages 
                  images={project.images || (project.imageUrl ? [project.imageUrl] : [])} 
                  title={project.title} 
                />
              </div>
            </div>

            {/* Right: Project Details */}
            <div className="p-6 sm:p-8 space-y-10">
              {/* About Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-1 bg-primary rounded-full" />
                  <h3 className="text-xs font-bold font-mono uppercase tracking-[0.2em] text-foreground">Overview</h3>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
                  <p>{project.description}</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </section>

              {/* Technologies Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-1 bg-primary rounded-full" />
                  <h3 className="text-xs font-bold font-mono uppercase tracking-[0.2em] text-foreground">Technology Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2.5 py-1 rounded-md border border-border bg-muted/20 text-[11px] font-medium text-muted-foreground hover:border-primary/40 hover:text-primary transition-all cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              {/* Links Section */}
              <section className="pt-6 border-t border-border/50">
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href={project.href} 
                    target="_blank"
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
                  >
                    <Globe className="w-4 h-4" />
                    <span>LIVE DEMO</span>
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center justify-center gap-2 p-3 rounded-xl border border-border bg-card hover:bg-muted text-xs font-bold transition-all active:scale-95"
                  >
                    <GitBranch className="w-4 h-4" />
                    <span>SOURCE</span>
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
