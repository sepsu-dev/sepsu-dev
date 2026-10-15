"use client";

import { motion, AnimatePresence } from "motion/react";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface Props {
  scale: number;
  showZoomHud: boolean;
  onScaleChange: (scale: number) => void;
  onResetPan: () => void;
}

export default function CanvasZoomControls({ scale, showZoomHud, onScaleChange, onResetPan }: Props) {
  return (
    <AnimatePresence>
      {showZoomHud && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.2 }}
          className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-1 p-1 bg-white/90 dark:bg-[#181818]/90 backdrop-blur-md border border-stone-200/90 dark:border-stone-800 rounded-full shadow-xl pointer-events-auto text-xs font-mono text-stone-600 dark:text-stone-300"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const next = Math.max(0.4, Number((scale - 0.1).toFixed(2)));
              onScaleChange(next);
            }}
            aria-label="Zoom Out"
            title="Zoom Out"
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onScaleChange(1);
              onResetPan();
            }}
            aria-label="Reset Zoom and Pan"
            title="Reset View (100%)"
            className="px-2 py-0.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-1 font-sans text-[11px]"
          >
            <span>{Math.round(scale * 100)}%</span>
            {scale !== 1 && <RotateCcw className="w-2.5 h-2.5 opacity-60" />}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const next = Math.min(2.0, Number((scale + 0.1).toFixed(2)));
              onScaleChange(next);
            }}
            aria-label="Zoom In"
            title="Zoom In"
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
