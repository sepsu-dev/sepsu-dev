import { cn } from "@/utils";

interface HighlighterProps {
  variant?: 1 | 2 | 3;
  className?: string;
}

export const Highlighter = ({ variant = 1, className }: HighlighterProps) => {
  const paths = {
    1: "M4,18 C25,14 55,20 96,16",
    2: "M3,16 C30,20 70,14 97,18",
    3: "M2,19 C20,15 40,22 60,16 C80,10 90,20 98,17",
  };

  return (
    <svg 
      className={cn(
        "absolute top-1/2 left-0 w-full h-full -translate-y-1/2 text-primary/20 -z-10 scale-110",
        className
      )} 
      viewBox="0 0 100 24" 
      preserveAspectRatio="none"
    >
      <path 
        d={paths[variant]} 
        stroke="currentColor" 
        strokeWidth="8" 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};
