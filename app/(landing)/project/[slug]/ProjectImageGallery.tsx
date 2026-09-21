"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

interface ProjectImageGalleryProps {
  title: string;
  images: string[];
}

export default function ProjectImageGallery({ title, images }: ProjectImageGalleryProps) {
  // Filter out any empty/undefined image strings
  const validImages = images.filter(Boolean);
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Safety fallback if no valid images
  if (validImages.length === 0) return null;

  const activeImage = validImages[selectedIdx] || validImages[0];
  const hasMultipleImages = validImages.length > 1;

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      {/* Main Large Preview Image (Left) */}
      <div className="flex-1 rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#181818] shadow-xs relative aspect-[16/10]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.22,
              ease: "easeInOut",
            }}
            className="relative w-full h-full"
          >
            <Image
              src={activeImage}
              alt={`${title} main view`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails Stacked Vertically on the Right (Only shown if more than 1 image) */}
      {hasMultipleImages && (
        <div className="flex sm:flex-col gap-2.5 sm:w-28 shrink-0">
          {validImages.slice(0, 3).map((img, idx) => {
            const isActive = selectedIdx === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`relative aspect-[16/10] sm:aspect-auto sm:flex-1 rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "border-[#0099ff] ring-2 ring-[#0099ff]/30 opacity-100 shadow-xs"
                    : "border-stone-200/80 dark:border-stone-800 opacity-60 hover:opacity-90"
                }`}
                title={`Preview image ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`${title} thumbnail ${idx + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
