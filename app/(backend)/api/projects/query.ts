import { DUMMY_PROJECTS } from "@/types/projects";
import { ProjectItem, PaginatedResult } from "./schema";

export async function getProjects(
  page: number = 1,
  limit: number = 6
): Promise<PaginatedResult<ProjectItem>> {
  const startIndex = (page - 1) * limit;
  const paginatedProjects = DUMMY_PROJECTS.slice(startIndex, startIndex + limit);

  return {
    data: paginatedProjects,
    pagination: {
      total: DUMMY_PROJECTS.length,
      page,
      limit,
      totalPages: Math.ceil(DUMMY_PROJECTS.length / limit),
    },
  };
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  const project = DUMMY_PROJECTS.find((p) => p.slug === slug);
  return project || null;
}
