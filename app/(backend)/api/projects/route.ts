import { NextResponse } from "next/server";
import { DUMMY_PROJECTS } from "@/types/projects";
export type { ProjectItem } from "@/types/projects";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "6", 10);

  const startIndex = (page - 1) * limit;
  const paginatedProjects = DUMMY_PROJECTS.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    status: "success",
    data: paginatedProjects,
    pagination: {
      total: DUMMY_PROJECTS.length,
      page,
      limit,
      totalPages: Math.ceil(DUMMY_PROJECTS.length / limit),
    },
  });
}
