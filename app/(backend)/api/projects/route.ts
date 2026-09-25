import { getProjects } from "./query";
import { successResponse } from "@/lib/response";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "6", 10);

  const { data, pagination } = await getProjects(page, limit);

  return successResponse(data, {
    pagination,
  });
}
