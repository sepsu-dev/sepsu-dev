export interface Project {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string | "Present";
  tags: string[];
  imageUrl?: string;
  images?: string[];
  href?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "twitter" | "email" | "rss";
}
