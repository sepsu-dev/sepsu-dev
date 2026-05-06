import { projects } from "@/content/projects";
import type { Project } from "@/types";

export interface PaginatedProjects {
  data: Project[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export async function getPaginatedProjects(page = 1, limit = 3): Promise<PaginatedProjects> {
  // Simulate network delay if needed (optional for direct service calls)
  // await new Promise((resolve) => setTimeout(resolve, 100));

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const paginatedData = projects.slice(startIndex, endIndex);
  const totalPages = Math.ceil(projects.length / limit);

  return {
    data: paginatedData,
    meta: {
      total: projects.length,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    }
  };
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  return projects.find((p) => p.id === id);
}
