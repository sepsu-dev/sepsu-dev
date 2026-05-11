interface SiteFooterProps {
  author: string;
}

export function SiteFooter({ author }: SiteFooterProps) {
  return (
    <footer className="border-t border-border/50 mt-16 font-mono">
      <div className="mx-auto max-w-3xl px-4 py-8 flex flex-col items-center justify-center gap-2">
        <div className="text-[10px] sm:text-xs text-muted-foreground">
          © {new Date().getFullYear()} {author}
        </div>
      </div>
    </footer>
  );
}
