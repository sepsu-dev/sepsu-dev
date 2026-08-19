import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/repo";
import { requireAdmin } from "@/lib/auth-check";

const ALLOWED_KEYS = [
  "site_name",
  "role",
  "bio",
  "email",
  "github_url",
  "location",
  "hero_badge",
  "focus_1",
  "focus_2",
  "focus_3",
  "focus_4",
];

export async function GET() {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const settings = await getSettings();
  return NextResponse.json({ settings });
}

export async function POST(req: Request) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const values = body?.settings;
  if (!values || typeof values !== "object" || Array.isArray(values)) {
    return NextResponse.json(
      { error: "Format settings tidak valid" },
      { status: 400 }
    );
  }

  const sanitized: Record<string, string> = {};
  for (const key of ALLOWED_KEYS) {
    if (values[key] !== undefined) {
      sanitized[key] = String(values[key]);
    }
  }
  if (Object.keys(sanitized).length === 0) {
    return NextResponse.json({ error: "Tidak ada data settings" }, { status: 400 });
  }

  await updateSettings(sanitized);
  const settings = await getSettings();
  return NextResponse.json({ settings });
}