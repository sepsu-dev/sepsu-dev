"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { useProjectsStore } from "@/stores";

const ITEMS_PER_PAGE = 3;

export default function ProjectsList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { projects: PROJECTS } = useProjectsStore();

  const totalPages = Math.ceil(PROJECTS.length / ITEMS_PER_PAGE);

  // Parse page from query param "?page=X", fallback to 1 if missing or invalid
  const rawPage = searchParams.get("page");
  const parsedPage = rawPage ? parseInt(rawPage, 10) : 1;
  const currentPage = !isNaN(parsedPage) && parsedPage >= 1 && parsedPage <= totalPages ? parsedPage : 1;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = PROJECTS.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page === 1) {
      router.push("/projects");
    } else {
      router.push(`/projects?page=${page}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="w-full min-h-screen bg-[#fafafa] dark:bg-[#121212] text-stone-900 dark:text-stone-100 overflow-y-auto px-4 py-12 md:py-20 pb-36">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-200/90 dark:border-stone-800 bg-white/90 dark:bg-[#1c1c1c]/90 text-xs font-mono text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:border-stone-300 dark:hover:border-stone-700 shadow-2xs hover:shadow-xs hover:-translate-x-0.5 active:translate-x-0 transition-all duration-200 group"
        >
          <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to home</span>
        </Link>

        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            Selected Projects
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-300 max-w-xl leading-relaxed">
            Software, web applications, and developer tooling built with clean architecture and modern engineering.
          </p>
        </div>

        {/* Projects Grid: Clean, consistent card presentation with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {currentProjects.map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-full flex"
            >
              <Link
                href={`/project/${project.slug}`}
                className="group flex flex-col w-full rounded-2xl bg-white dark:bg-[#181818] border border-stone-200/80 dark:border-stone-800/80 overflow-hidden shadow-xs hover:border-stone-400 dark:hover:border-stone-700 transition-all duration-300"
              >
                {/* Project Image */}
                <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100 dark:bg-stone-900 relative">
                  <Image
                    src={project.mainImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {/* Project Details */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-3.5">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100 group-hover:text-[#0099ff] transition-colors">
                        {project.title}
                      </h2>
                      <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#0099ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/60 dark:border-stone-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200/80 dark:border-stone-800/80">
          <p className="text-xs font-mono font-medium text-stone-600 dark:text-stone-400">
            {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, PROJECTS.length)} of {PROJECTS.length} projects
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#181818] text-xs font-mono text-stone-700 dark:text-stone-300 disabled:opacity-40 disabled:cursor-not-allowed hover:not-disabled:text-stone-950 dark:hover:not-disabled:text-white hover:not-disabled:border-stone-300 dark:hover:not-disabled:border-stone-700 hover:not-disabled:shadow-2xs hover:not-disabled:-translate-y-0.5 active:not-disabled:translate-y-0 active:not-disabled:scale-95 transition-all duration-150 cursor-pointer disabled:pointer-events-none"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-7 h-7 rounded-md text-xs font-mono transition-all duration-150 cursor-pointer ${
                    currentPage === page
                      ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold shadow-xs scale-105"
                      : "text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/80 hover:-translate-y-0.5 active:scale-95"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#181818] text-xs font-mono text-stone-600 dark:text-stone-400 disabled:opacity-40 disabled:cursor-not-allowed hover:not-disabled:text-stone-950 dark:hover:not-disabled:text-white hover:not-disabled:border-stone-300 dark:hover:not-disabled:border-stone-700 hover:not-disabled:shadow-2xs hover:not-disabled:-translate-y-0.5 active:not-disabled:translate-y-0 active:not-disabled:scale-95 transition-all duration-150 cursor-pointer disabled:pointer-events-none"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

