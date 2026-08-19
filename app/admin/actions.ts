"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-check";
import {
  getSettings,
  updateSettings,
  upsertProject,
  deleteProject,
  replaceTechStack,
  getProjects,
  getTechStack,
} from "@/lib/repo";

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

export async function saveSettingsAction(values: Record<string, string>) {
  const ok = await requireAdmin();
  if (!ok) throw new Error("Unauthorized");

  const sanitized: Record<string, string> = {};
  for (const key of ALLOWED_KEYS) {
    if (values[key] !== undefined) {
      sanitized[key] = String(values[key]);
    }
  }

  if (Object.keys(sanitized).length === 0) {
    throw new Error("No settings data to update");
  }

  await updateSettings(sanitized);
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/settings");
  
  const settings = await getSettings();
  return { settings };
}

export async function upsertProjectAction(p: {
  uid: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  sort_order: number;
}) {
  const ok = await requireAdmin();
  if (!ok) throw new Error("Unauthorized");

  const uid = String(p.uid ?? "").trim();
  const title = String(p.title ?? "").trim();
  if (!uid || !title) {
    throw new Error("UID and Title are required");
  }

  await upsertProject({
    uid,
    title,
    description: String(p.description ?? ""),
    image_url: String(p.image_url ?? ""),
    tags: Array.isArray(p.tags) ? p.tags.map(String) : [],
    sort_order: Number(p.sort_order ?? 0),
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");

  const projects = await getProjects();
  return { projects };
}

export async function deleteProjectAction(uid: string) {
  const ok = await requireAdmin();
  if (!ok) throw new Error("Unauthorized");

  await deleteProject(uid);

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");

  const projects = await getProjects();
  return { projects };
}

export async function saveTechStackAction(categories: any[], items: any[]) {
  const ok = await requireAdmin();
  if (!ok) throw new Error("Unauthorized");

  if (!Array.isArray(categories) || !Array.isArray(items)) {
    throw new Error("Invalid data format. Categories and items must be arrays.");
  }

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

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/tech");
  revalidatePath("/admin/tech-category");

  const tech = await getTechStack();
  return { tech };
}
