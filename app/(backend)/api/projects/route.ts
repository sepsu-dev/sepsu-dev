import { getProjects } from "./query";
import { successResponse, errorResponse } from "@/lib/response";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "6");
  if (!Number.isSafeInteger(page) || page < 1 || !Number.isSafeInteger(limit) || limit < 1 || limit > 100 ||
    !Number.isSafeInteger(page * limit)) {
    return errorResponse("page must be a positive integer; limit must be between 1 and 100", { status: 400 });
  }

  const { data, pagination } = await getProjects(page, limit);

  return successResponse(data, {
    pagination,
  });
}
