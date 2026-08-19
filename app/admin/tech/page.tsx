import { getTechStack } from "@/lib/repo";
import { TechClient } from "./tech-client";

export const dynamic = "force-dynamic";

export default async function TechPage() {
  const tech = await getTechStack();
  
  return <TechClient initialCategories={tech.categories} initialItems={tech.items} />;
}