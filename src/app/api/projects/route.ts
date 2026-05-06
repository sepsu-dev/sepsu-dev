import { NextRequest, NextResponse } from "next/server";
import { getPaginatedProjects } from "@/lib/services/projects";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "3");
  
  const result = await getPaginatedProjects(page, limit);

  return NextResponse.json(result);
}
