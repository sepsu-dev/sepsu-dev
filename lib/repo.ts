import { query, execute, pool } from "@/lib/db";
import { verifyPassword, hashPassword, isScryptHash } from "@/lib/password";

export interface Settings {
  key: string;
  value: string;
}

export interface ProjectRow {
  uid: string;
  title: string;
  description: string;
  image_url: string;
  demo_url: string;
  github_url: string;
  tags: string[];
  sort_order: number;
}

export interface TechCategoryRow {
  id: number;
  name: string;
  icon: string;
  sort_order: number;
}

export interface TechItemRow {
  id: number;
  category_id: number;
  name: string;
  icon: string;
}

// ─── Settings ────────────────────────────────────────────────
export async function getSettings(): Promise<Record<string, string>> {
  const rows = await query<Settings>("SELECT key, value FROM settings");
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export async function updateSettings(values: Record<string, string>): Promise<void> {
  for (const [key, value] of Object.entries(values)) {
    await execute(
      `INSERT INTO settings (key, value) VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
      [key, value]
    );
  }
}

// ─── Projects ────────────────────────────────────────────────
export async function getProjects(): Promise<ProjectRow[]> {
  return query<ProjectRow>(
    "SELECT uid, title, description, image_url, demo_url, github_url, tags, sort_order FROM projects ORDER BY sort_order ASC, uid ASC"
  );
}

export async function getProject(uid: string): Promise<ProjectRow | null> {
  const rows = await query<ProjectRow>(
    "SELECT uid, title, description, image_url, demo_url, github_url, tags, sort_order FROM projects WHERE uid = $1",
    [uid]
  );
  return rows[0] ?? null;
}

export async function upsertProject(p: {
  uid: string;
  title: string;
  description: string;
  image_url: string;
  demo_url: string;
  github_url: string;
  tags: string[];
  sort_order: number;
}): Promise<void> {
  await execute(
    `INSERT INTO projects (uid, title, description, image_url, demo_url, github_url, tags, sort_order)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     ON CONFLICT (uid) DO UPDATE SET
       title = EXCLUDED.title,
       description = EXCLUDED.description,
       image_url = EXCLUDED.image_url,
       demo_url = EXCLUDED.demo_url,
       github_url = EXCLUDED.github_url,
       tags = EXCLUDED.tags,
       sort_order = EXCLUDED.sort_order`,
    [p.uid, p.title, p.description, p.image_url, p.demo_url, p.github_url, p.tags, p.sort_order]
  );
}

export async function deleteProject(uid: string): Promise<void> {
  await execute("DELETE FROM projects WHERE uid = $1", [uid]);
}

// ─── Tech Stack ──────────────────────────────────────────────
export async function getTechCategories(): Promise<TechCategoryRow[]> {
  return query<TechCategoryRow>(
    "SELECT id, name, icon, sort_order FROM tech_categories ORDER BY sort_order ASC"
  );
}

export async function getTechItems(): Promise<TechItemRow[]> {
  return query<TechItemRow>(
    "SELECT id, category_id, name, icon FROM tech_items ORDER BY id ASC"
  );
}

export async function getTechStack(): Promise<{
  categories: TechCategoryRow[];
  items: TechItemRow[];
}> {
  const categories = await getTechCategories();
  const items = await getTechItems();
  return { categories, items };
}

export async function replaceTechStack(
  categories: { name: string; icon: string; sort_order: number }[],
  items: { category_name: string; name: string; icon: string }[]
): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM tech_items");
    await client.query("DELETE FROM tech_categories");
    for (const cat of categories) {
      const catRows = await client.query<{ id: number }>(
        "INSERT INTO tech_categories (name, icon, sort_order) VALUES ($1, $2, $3) RETURNING id",
        [cat.name, cat.icon, cat.sort_order]
      );
      const catId = catRows.rows[0].id;
      const catItems = items.filter((i) => i.category_name === cat.name);
      for (const item of catItems) {
        await client.query(
          "INSERT INTO tech_items (category_id, name, icon) VALUES ($1, $2, $3)",
          [catId, item.name, item.icon]
        );
      }
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

// ─── Admin auth ──────────────────────────────────────────────
export async function verifyAdmin(
  email: string,
  password: string
): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim();
  const rows = await query<{ id: number; password_hash: string }>(
    "SELECT id, password_hash FROM admins WHERE email = $1",
    [normalizedEmail]
  );
  if (rows.length === 0) return false;
  const { password_hash, id } = rows[0];
  if (!verifyPassword(password, password_hash)) return false;
  // Auto-upgrade legacy SHA-256 hash to scrypt on successful login
  if (!isScryptHash(password_hash)) {
    await execute("UPDATE admins SET password_hash = $1 WHERE id = $2", [
      hashPassword(password),
      id,
    ]);
  }
  return true;
}
