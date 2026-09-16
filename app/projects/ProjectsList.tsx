"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { JOTTER_PROJECTS } from "@/lib/jotter-data";

const ITEMS_PER_PAGE = 3;

export default function ProjectsList() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(JOTTER_PROJECTS.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = JOTTER_PROJECTS.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen bg-[#fafafa] dark:bg-[#121212] text-stone-900 dark:text-stone-100 overflow-y-auto px-4 py-12 md:py-20 pb-36">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1c1c] text-xs font-mono text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 shadow-xs transition-colors group"
        >
          <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to desk</span>
        </Link>

        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Selected Projects
          </h1>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
            A curated collection of web applications, platforms, and interactive products built with modern engineering and thoughtful design.
          </p>
        </div>

        {/* Projects Grid: 3 cards per row on lg screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {currentProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/project/${project.slug}`}
              className="group flex flex-col rounded-2xl bg-white dark:bg-[#1c1c1c] border border-stone-200/80 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Project Image */}
              <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100 dark:bg-stone-800 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.mainImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium">
                  {project.category}
                </span>
              </div>

              {/* Project Details */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#0099ff] transition-colors">
                      {project.title}
                    </h2>
                    <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-[#0099ff] transition-colors" />
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-stone-100 dark:border-stone-800/80">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200/80 dark:border-stone-800">
          <p className="text-xs font-mono text-stone-500 dark:text-stone-400">
            Showing <span className="font-semibold text-stone-900 dark:text-stone-100">{startIndex + 1}</span> to{" "}
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              {Math.min(startIndex + ITEMS_PER_PAGE, JOTTER_PROJECTS.length)}
            </span>{" "}
            of <span className="font-semibold text-stone-900 dark:text-stone-100">{JOTTER_PROJECTS.length}</span> projects
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1c1c] text-xs font-mono text-stone-700 dark:text-stone-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors shadow-2xs"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-mono font-medium transition-all ${
                    currentPage === page
                      ? "bg-[#121212] text-white dark:bg-white dark:text-[#121212] shadow-xs"
                      : "bg-white dark:bg-[#1c1c1c] border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1c1c] text-xs font-mono text-stone-700 dark:text-stone-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors shadow-2xs"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

