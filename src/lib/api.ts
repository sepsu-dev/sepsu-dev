import type { Project } from "@/types";
import type { SiteConfig } from "@/config/site";

const API_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function getProjects(page = 1, limit = 3): Promise<{ 
  data: Project[]; 
  meta: { totalPages: number; page: number; hasNextPage: boolean; hasPrevPage: boolean } 
}> {
  try {
    const res = await fetch(`${API_URL}/api/projects?page=${page}&limit=${limit}`, {
      cache: "no-store",
    });
    
    if (!res.ok) throw new Error("Failed to fetch projects");
    
    return res.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { data: [], meta: { totalPages: 0, page: 1, hasNextPage: false, hasPrevPage: false } };
  }
}

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const res = await fetch(`${API_URL}/api/config`, {
      next: { revalidate: 3600 }, // Cache config for an hour
    });
    
    if (!res.ok) throw new Error("Failed to fetch config");
    
    return res.json();
  } catch (error) {
    console.error("Error fetching config:", error);
    // Fallback to local config if API fails
    const { siteConfig } = await import("@/config/site");
    return siteConfig;
  }
}
