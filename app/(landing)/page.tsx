import { HomePage } from "@/components/modules/home-page";
import { HARDCODED_SETTINGS, HARDCODED_PROJECTS, HARDCODED_TECH_STACK } from "@/components/modules/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const sortedProjects = [...HARDCODED_PROJECTS].sort((a, b) => a.sort_order - b.sort_order);
  const content = {
    settings: HARDCODED_SETTINGS,
    projects: sortedProjects,
    techStack: HARDCODED_TECH_STACK,
  };

  return <HomePage content={content} />;
}