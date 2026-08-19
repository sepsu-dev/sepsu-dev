import { getTechStack } from "@/lib/repo";
import { CategoryClient } from "./category-client";

export const dynamic = "force-dynamic";

export default async function CategoryTechPage() {
  const tech = await getTechStack();
  
  return <CategoryClient initialCategories={tech.categories} initialItems={tech.items} />;
}
