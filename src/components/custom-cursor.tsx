"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button"
      );
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>

      {/* Main Cursor Dot */}
      <div
        className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[100] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x - 6}px, ${position.y - 6}px, 0) scale(${isPointer ? 1.5 : 1})`,
        }}
      />
      {/* Trailing Ring */}
      <div
        className="fixed top-0 left-0 w-10 h-10 border border-primary/40 rounded-full pointer-events-none z-[99] transition-all duration-300 ease-out hidden sm:block shadow-[0_0_15px_rgba(var(--primary),0.2)]"
        style={{
          transform: `translate3d(${position.x - 20}px, ${position.y - 20}px, 0) scale(${isPointer ? 1.5 : 1})`,
          opacity: isPointer ? 0.3 : 1,
        }}
      />
    </>
  );
}
