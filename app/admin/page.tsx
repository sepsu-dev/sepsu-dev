import Link from "next/link";
import { FolderKanban, Layers, ArrowUpRight, Settings2, Sparkles } from "lucide-react";
import { getProjects, getTechStack, getSettings } from "@/lib/repo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [projects, techStack, settings] = await Promise.all([
    getProjects(),
    getTechStack(),
    getSettings(),
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Console Management System
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Welcome to {settings.site_name ?? "Sepsu Dev"}
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

      {/* Quick Actions Card */}
      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
          <CardDescription>Shortcut menu for managing system content.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3 pt-2">
          <Link 
            href="/admin/projects" 
            className="flex items-center justify-between rounded-xl border border-border/80 bg-card p-4 text-sm font-medium hover:border-primary/40 hover:bg-muted/40 transition-all duration-200 group"
          >
            <span className="flex items-center gap-2.5">
              <FolderKanban className="h-4 w-4 text-blue-500" />
              Manage Projects
            </span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <Link 
            href="/admin/tech" 
            className="flex items-center justify-between rounded-xl border border-border/80 bg-card p-4 text-sm font-medium hover:border-primary/40 hover:bg-muted/40 transition-all duration-200 group"
          >
            <span className="flex items-center gap-2.5">
              <Layers className="h-4 w-4 text-emerald-500" />
              Manage Tech Stack
            </span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <Link 
            href="/admin/settings" 
            className="flex items-center justify-between rounded-xl border border-border/80 bg-card p-4 text-sm font-medium hover:border-primary/40 hover:bg-muted/40 transition-all duration-200 group"
          >
            <span className="flex items-center gap-2.5">
              <Settings2 className="h-4 w-4 text-purple-500" />
              Edit Settings
            </span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}