"use client";

import Link from "next/link";
import { Moon, Sun, Coffee } from "lucide-react";
import { useEffect, useState } from "react";
import { Highlighter } from "./highlighter";

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
          className="flex items-center gap-2.5 transition-all duration-300"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 transition-all duration-300">
            <Coffee className="h-4 w-4 text-primary" strokeWidth={2.5} />
          </div>
          <span className="relative inline-block text-base font-bold tracking-tighter transition-all duration-300">
            <span className="relative z-10">
              <span className="text-foreground">sepsu</span>
              <span className="text-primary">.dev</span>
            </span>
            <Highlighter variant={1} className="-rotate-1 scale-y-150" />
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
