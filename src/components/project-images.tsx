import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectImagesProps {
  images: string[];
  title: string;
}

export function ProjectImages({ images, title }: ProjectImagesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className="relative aspect-video rounded-xl overflow-hidden border border-border/50 bg-muted flex items-center justify-center">
        <span className="text-muted-foreground font-mono text-xs">IMAGE_NOT_AVAILABLE</span>
      </div>
    );
  }

  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="space-y-4">
      {/* Main Image View */}
      <div className="relative aspect-video rounded-xl overflow-hidden border border-border/50 group font-sans bg-muted/20">
        {isLoading && (
          <div className="absolute inset-0 bg-muted/40 animate-pulse z-20 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-primary/40 border-t-primary animate-spin"></div>
          </div>
        )}

        <img
          src={images[currentIndex]}
          alt={`${title} - image ${currentIndex + 1}`}
          onLoad={() => setIsLoading(false)}
          className={cn(
            "w-full h-full object-cover object-top transition-all duration-500",
            isLoading ? "opacity-0 scale-98" : "opacity-100 scale-100"
          )}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center text-foreground opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-primary hover:text-primary-foreground shadow-lg cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center text-foreground opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-primary hover:text-primary-foreground shadow-lg cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-background/80 backdrop-blur-md border border-border text-[10px] font-mono font-bold select-none">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
}