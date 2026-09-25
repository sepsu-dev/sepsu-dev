import { getProjectBySlug } from "../query";
import { successResponse, errorResponse } from "@/lib/response";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return errorResponse("Project not found", { status: 404 });
  }

  return successResponse(project);
}
