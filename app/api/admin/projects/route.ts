import { NextResponse } from "next/server";
import { getProjects, upsertProject, getProject } from "@/lib/repo";
import { requireAdmin } from "@/lib/auth-check";

export async function GET() {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const projects = await getProjects();
  return NextResponse.json({ projects });
}

export async function POST(req: Request) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const uid = String(body?.uid ?? "").trim();
  const title = String(body?.title ?? "").trim();
  const description = String(body?.description ?? "");
  const image_url = String(body?.image_url ?? "");
  const tags = Array.isArray(body?.tags) ? body.tags.map(String) : [];
  const sort_order = Number(body?.sort_order ?? 0);

  if (!uid || !title) {
    return NextResponse.json(
      { error: "uid dan title wajib diisi" },
      { status: 400 }
    );
  }

  await upsertProject({ uid, title, description, image_url, tags, sort_order });
  const project = await getProject(uid);
  return NextResponse.json({ project });
}