import Link from "next/link";
import { FolderKanban, Layers, Sparkles } from "lucide-react";
import { getProjects, getTechStack } from "@/lib/repo";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [projects, techStack] = await Promise.all([
    getProjects(),
    getTechStack(),
  ]);

  const techCount = techStack.items.length;
  const categoryCount = techStack.categories.length;

  const stats = [
    { 
      label: "Total Projects", 
      value: projects.length, 
      icon: FolderKanban, 
      href: "/admin/projects",
      description: "Active portfolio projects",
      colorClass: "text-blue-500 bg-blue-500/8 dark:bg-blue-500/15"
    },
    { 
      label: "Tech Items", 
      value: techCount, 
      icon: Layers, 
      href: "/admin/tech",
      description: "Total technology stack items",
      colorClass: "text-emerald-500 bg-emerald-500/8 dark:bg-emerald-500/15"
    },
    { 
      label: "Tech Categories", 
      value: categoryCount, 
      icon: Sparkles, 
      href: "/admin/tech-category",
      description: "Grouped tech categories",
      colorClass: "text-purple-500 bg-purple-500/8 dark:bg-purple-500/15"
    },
  ];

  return (
    <div className="w-full space-y-8 py-2 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-card to-muted/30 p-6 md:p-8">
        <div className="relative z-10 space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Welcome
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl">
            Manage your portfolio content, tech stack lists, skill categories, and system settings in real-time.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-radial-gradient from-primary/5 to-transparent pointer-events-none" />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="group">
            <Card className="h-full border-border/60 hover:border-primary/30 hover:shadow-xs transition-all duration-300 group-hover:-translate-y-0.5">
              <CardContent className="p-6 flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                    {s.label}
                  </p>
                  <div className="text-3xl font-bold tracking-tight">{s.value}</div>
                  <p className="text-[11px] text-muted-foreground">
                    {s.description}
                  </p>
                </div>
                <div className={`p-3 rounded-xl shrink-0 transition-transform group-hover:scale-105 duration-300 ${s.colorClass}`}>
                  <s.icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
