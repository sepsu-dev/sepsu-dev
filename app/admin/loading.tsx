import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center gap-4 bg-background animate-in fade-in duration-300">
      <div className="relative flex items-center justify-center">
        {/* Glow behind loader */}
        <div className="absolute h-10 w-10 rounded-full bg-primary/20 blur-md animate-pulse"></div>
        <Loader2 className="h-8 w-8 animate-spin text-primary relative z-10" />
      </div>
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-sm font-semibold tracking-tight text-foreground font-sans">Loading...</h3>
        <p className="text-xs text-muted-foreground font-mono">Please wait</p>
      </div>
    </div>
  );
}
