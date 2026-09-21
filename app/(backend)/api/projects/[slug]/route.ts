import { NextResponse } from "next/server";
import { DUMMY_PROJECTS } from "@/types/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: Props) {
  const { slug } = await params;
  const project = DUMMY_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return NextResponse.json(
      {
        status: "error",
        message: "Project not found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    status: "success",
    data: project,
  });
}
