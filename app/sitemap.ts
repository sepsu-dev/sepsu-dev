import { MetadataRoute } from "next";
import { JOTTER_PROJECTS } from "@/lib/jotter-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sepsu.dev";
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const projectPages: MetadataRoute.Sitemap = JOTTER_PROJECTS.map((project) => ({
    url: `${baseUrl}/project/${project.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages];
}

