import { NextResponse } from "next/server";
import { getTechStack, replaceTechStack } from "@/lib/repo";
import { requireAdmin } from "@/lib/auth-check";

export async function GET() {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const tech = await getTechStack();
  return NextResponse.json({ tech });
}

export async function POST(req: Request) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const categories = body?.categories;
  const items = body?.items;

  if (!Array.isArray(categories) || !Array.isArray(items)) {
    return NextResponse.json(
      { error: "Format data tidak valid. Harus menyertakan categories dan items sebagai array." },
      { status: 400 }
    );
  }

  try {
    const cleanedCategories = categories
      .map((cat: any) => ({
        name: String(cat.name).trim().toLowerCase(),
        icon: String(cat.icon ?? "").trim(),
        sort_order: Number(cat.sort_order) || 0,
      }))
      .filter((c) => c.name !== "");

    const cleanedItems = items
      .map((item: any) => ({
        category_name: String(item.category_name).trim().toLowerCase(),
        name: String(item.name).trim(),
        icon: String(item.icon ?? "").trim(),
      }))
      .filter((i) => i.name !== "" && i.category_name !== "");

    await replaceTechStack(cleanedCategories, cleanedItems);
    const tech = await getTechStack();
    return NextResponse.json({ tech });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Gagal menyimpan" }, { status: 500 });
  }
}