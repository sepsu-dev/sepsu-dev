import { HomePage } from "@/components/modules/home-page";
import { HARDCODED_SETTINGS, HARDCODED_PROJECTS, HARDCODED_TECH_STACK } from "@/components/modules/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = {
    settings: HARDCODED_SETTINGS,
    projects: HARDCODED_PROJECTS,
    techStack: HARDCODED_TECH_STACK,
  };

  return <HomePage content={content} />;
}