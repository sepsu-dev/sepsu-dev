import PROJECTS from "@/data/projects.json";
import type { ProjectItem, PaginatedResult } from "@/types/projects";

export async function getProjects(
  page: number = 1,
  limit: number = 6
): Promise<PaginatedResult<ProjectItem>> {
  const startIndex = (page - 1) * limit;
  const paginatedProjects = PROJECTS.slice(startIndex, startIndex + limit);

  return {
    data: paginatedProjects,
    pagination: {
      total: PROJECTS.length,
      page,
      limit,
      totalPages: Math.ceil(PROJECTS.length / limit),
    },
  };
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  const project = PROJECTS.find((p) => p.slug === slug);
  return project || null;
}
