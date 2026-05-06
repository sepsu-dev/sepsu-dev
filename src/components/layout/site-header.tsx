"use client";

import Link from "next/link";
import { Moon, Sun, Coffee } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  name: string;
}

export function SiteHeader({ name }: SiteHeaderProps) {
  const [isDark, setIsDark] = useState(false);

  // Load initial theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      // Default to light mode
      setIsDark(false);
      localStorage.setItem("theme", "light");
    }
  }, []);

  // Apply theme class and save to localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto max-w-3xl px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 text-foreground/90 hover:text-foreground transition-all duration-300"
        >
          <div className="p-2 rounded-lg bg-primary/5 border border-primary/10 group-hover:bg-primary/10 transition-colors">
            <Coffee className="h-4 w-4 text-primary" strokeWidth={2} />
          </div>
          <span className="text-sm font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
            {name.toLowerCase().replace(/\s+/g, ".")}
          </span>
        </Link>

        {/* Theme Toggle */}
        <button
          aria-label="Toggle theme"
          onClick={() => setIsDark((prev) => !prev)}
          className="p-2.5 rounded-lg border border-border/40 hover:border-border hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all duration-300"
        >
          {isDark ? (
            <Sun className="h-4 w-4" strokeWidth={2} />
          ) : (
            <Moon className="h-4 w-4" strokeWidth={2} />
          )}
        </button>
      </div>
    </header>
  );
}
