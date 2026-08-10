import { Link } from "react-router-dom";
import { Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/30 bg-transparent mt-20 relative z-10 py-8">
      <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
        {/* Left Column: Branding matching the Navbar brand logo */}
        <Link
          to="/"
          className="group flex items-center gap-1.5 font-bold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          <div className="p-1 bg-primary/10 rounded-md text-primary group-hover:scale-105 transition-transform">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <span>
            sepsu<span className="text-primary group-hover:animate-pulse">.dev</span>
          </span>
        </Link>

        {/* Right Column: Clean High-Contrast Copyright */}
        <p className="text-xs text-muted-foreground font-medium">
          © {new Date().getFullYear()} Sepsu Dev. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
