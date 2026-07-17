"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Terminal, ArrowUpRight, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const navItems: NavItem[] = [
  { label: "About", href: "/#about", id: "about" },
  { label: "Stack", href: "/#tech-stack", id: "tech-stack" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Monitor scroll to add shadow/background intensity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync theme safely avoiding hydration warning
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Intersection Observer for scroll spy
  useEffect(() => {
    const observers = navItems.map((item) => {
      const el = document.getElementById(item.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(item.id);
          }
        },
        { rootMargin: "-30% 0px -60% 0px" } // Adjust trigger area
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      setIsOpen(false);
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
      setActiveSection(id);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled
          ? "py-3 bg-background/75 backdrop-blur-md border-b border-border/40 shadow-sm"
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-3xl mx-auto px-4 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-1.5 font-mono text-sm font-bold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          <div className="p-1 bg-primary/10 rounded-md text-primary group-hover:scale-105 transition-transform">
            <Terminal className="w-4 h-4" />
          </div>
          <span>
            sepsu<span className="text-primary group-hover:animate-pulse">.dev</span>
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-muted/30 border border-border/30 rounded-xl p-1 backdrop-blur-sm">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.id)}
              className={cn(
                "px-4 py-1.5 rounded-xl text-xs font-sans font-medium transition-all duration-300 relative",
                activeSection === item.id
                  ? "text-primary-foreground font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {activeSection === item.id && (
                <div className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-md shadow-primary/20 animate-in fade-in zoom-in duration-300" />
              )}
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action CTA Block */}
        <div className="hidden md:flex items-center gap-3">
          {/* Hydration-safe Dark Mode Switch */}
          {!mounted ? (
            <div className="w-8 h-8 rounded-lg border border-border/50 bg-card/50 animate-pulse"></div>
          ) : (
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-border/50 bg-card/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all flex items-center justify-center size-8 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-yellow-500 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-primary" />
              )}
            </button>
          )}

          {/* GitHub link */}
          <a
            href="https://github.com/sepsu-dev"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border bg-card/50 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all h-8"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-xl border border-border/50 md:hidden bg-card/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-x-0 top-[57px] bg-background/95 backdrop-blur-lg border-b border-border/50 transition-all duration-300 md:hidden shadow-lg overflow-hidden flex flex-col z-40",
          isOpen ? "max-h-screen opacity-100 py-6 px-6" : "max-h-0 opacity-0 py-0 px-6 pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.id)}
              className={cn(
                "py-2.5 px-4 rounded-xl text-sm font-mono font-medium border transition-all",
                activeSection === item.id
                  ? "bg-primary/10 border-primary/20 text-primary font-bold shadow-sm"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
              )}
            >
              {item.label}
            </a>
          ))}
          <div className="h-px bg-border/50 my-2" />

          {/* Mobile Theme Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-card/50">
            <span className="text-xs font-mono text-muted-foreground">Dark Appearance</span>
            {!mounted ? (
              <div className="w-8 h-8 rounded-xl bg-muted/40 animate-pulse"></div>
            ) : (
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-xl border border-border/50 bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-all flex items-center justify-center size-8"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-primary" />}
              </button>
            )}
          </div>

          {/* Mobile GitHub link */}
          <a
            href="https://github.com/sepsu-dev"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-muted/30 text-xs font-mono font-semibold"
          >
            <span>View GitHub Portfolio</span>
            <ArrowUpRight className="w-4 h-4 text-primary" />
          </a>
        </div>
      </div>
    </header>
  );
}
