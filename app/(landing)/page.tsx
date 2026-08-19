import { HomePage, type HomeContent } from "@/components/modules/home-page";
import { getSettings, getProjects, getTechStack } from "@/lib/repo";
import { pool } from "@/lib/db";

export const dynamic = "force-dynamic";

const FALLBACK_SETTINGS: Record<string, string> = {
  site_name: "Sepsu Dev",
  role: "Full-stack Engineer",
  hero_badge: "portfolio.sh",
  location: "Jakarta, Indonesia",
  email: "sepsu.dev@gmail.com",
  github_url: "https://github.com/sepsu-dev",
  bio: "",
};

export default async function Home() {
  let content: HomeContent;
  try {
    // Cek koneksi DB dulu — kalau gagal, fallback ke konten statis ringan
    await pool.query("SELECT 1");
    const [settings, projects, techStack] = await Promise.all([
      getSettings(),
      getProjects(),
      getTechStack(),
    ]);
    content = {
      settings: { ...FALLBACK_SETTINGS, ...settings },
      projects: projects.map((p) => ({
        uid: p.uid,
        title: p.title,
        description: p.description,
        image_url: p.image_url,
        tags: p.tags,
      })),
      techStack: techStack.categories.map((c) => ({
        category: c.name,
        icon: c.icon || c.name,
        items: techStack.items
          .filter((i) => i.category_id === c.id)
          .map((i) => ({ name: i.name, icon: i.icon })),
      })),
    };
  } catch {
    content = {
      settings: FALLBACK_SETTINGS,
      projects: [],
      techStack: [],
    };
  }
  return <HomePage content={content} />;
}