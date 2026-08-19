import { NextResponse } from "next/server";
import { deleteProject, getProject } from "@/lib/repo";
import { requireAdmin } from "@/lib/auth-check";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { uid } = await params;
  const existing = await getProject(uid);
  if (!existing) {
    return NextResponse.json({ error: "Project tidak ditemukan" }, { status: 404 });
  }
  await deleteProject(uid);
  return NextResponse.json({ success: true });
}