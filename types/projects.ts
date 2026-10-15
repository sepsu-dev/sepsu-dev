import type { PaginationMeta } from "@/lib/response";

export interface ProjectItem {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  year: string;
  role: string;
  stack: string[];
  description: string;
  mainImage: string;
  problemStatement: string;
  outcome: string;
  objectives: string[];
  kpiLabel: string;
  kpiValue: string;
  liveUrl: string;
  secondaryImages: string[];
  tags: string[];
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationMeta;
}
