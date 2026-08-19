import { NextResponse } from "next/server";
import { getSettings, getProjects, getTechStack } from "@/lib/repo";

export const dynamic = "force-dynamic";

export async function GET() {
  const [settings, projects, techStack] = await Promise.all([
    getSettings(),
    getProjects(),
    getTechStack(),
  ]);
  return NextResponse.json({ settings, projects, techStack });
}
