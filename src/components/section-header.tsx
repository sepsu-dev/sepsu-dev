import React from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <h2 className="text-xs font-bold uppercase tracking-widest text-primary font-mono">
        // {title}
      </h2>
      {description && (
        <p className="text-xs text-muted-foreground max-w-xl leading-relaxed mt-1.5">
          {description}
        </p>
      )}
    </div>
  );
}
