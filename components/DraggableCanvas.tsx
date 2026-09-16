"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, Moon, Sun, MapPin, Clock } from "lucide-react";
import { motion } from "motion/react";
import { JOTTER_PROJECTS, JOTTER_SETTINGS } from "@/lib/jotter-data";

interface ItemState {
  x: number;
  y: number;
  rotate: number;
  zIndex: number;
}

export default function DraggableCanvas() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  // Canvas pan offset (panning the whole desk)
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);

  // Individual cards state
  const [items, setItems] = useState<Record<string, ItemState>>({});
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState<number>(25);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    // Check initial dark mode status
    const isDark = document.documentElement.classList.contains("dark") ||
      localStorage.getItem("theme") === "dark";
    setIsDarkMode(isDark);

    // Live Jakarta time update
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Ref for canvas background pan tracking
  const canvasPanRef = useRef<{
    startX: number;
    startY: number;
    startPanX: number;
    startPanY: number;
    hasMoved: boolean;
  }>({
    startX: 0,
    startY: 0,
    startPanX: 0,
    startPanY: 0,
    hasMoved: false,
  });

  // Ref for individual item drag tracking
  const itemDragRef = useRef<{
    id: string | null;
    startClientX: number;
    startClientY: number;
    itemStartX: number;
    itemStartY: number;
    hasMoved: boolean;
  }>({
    id: null,
    startClientX: 0,
    startClientY: 0,
    itemStartX: 0,
    itemStartY: 0,
    hasMoved: false,
  });

  useEffect(() => {
    function computeInitialPositions() {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const scale = Math.max(0.8, Math.min(1.1, window.innerWidth / 1500));

      setItems({
        // 1. Center Card: firmly anchored slightly higher up on the desk
        "center-card": {
          x: cx - 185,
          y: cy - 240,
          rotate: 0,
          zIndex: 10,
        },
        // 2. Clause Card: top-left, peeking from upper edge above cryptix
        clause: {
          x: cx - 490 * scale,
          y: cy - 455,
          rotate: 0,
          zIndex: 4,
        },
        // 3. Graph Widget: top-center, fine-tuned slightly right and slightly down
        graph: {
          x: cx - 40,
          y: cy - 500,
          rotate: -2.5,
          zIndex: 3,
        },
        // 4. Cryptix: mid-left, to the left of center card
        cryptix: {
          x: cx - 580 * scale,
          y: cy - 110,
          rotate: -2,
          zIndex: 5,
        },
        // 5. SignFlow: bottom-left, shifted slightly lower and to the left
        signflow: {
          x: cx - 480 * scale,
          y: cy + 230,
          rotate: 0,
          zIndex: 7,
        },
        // 6. Novera: top-right, tilted, right of center card
        novera: {
          x: cx + 270 * scale,
          y: cy - 240,
          rotate: 2,
          zIndex: 5,
        },
        // 7. Oscar Bergman Cursor: mid-right, pointing to right edge of center card
        cursor: {
          x: cx + 205 * scale,
          y: cy - 40,
          rotate: 0,
          zIndex: 15,
        },
        // 8. Ask Contract Generator: mid-right, below cursor
        generator: {
          x: cx + 360 * scale,
          y: cy + 80,
          rotate: 0,
          zIndex: 8,
        },
        // 9. Pitlane: bottom-right, peeking lower down from bottom right corner
        pitlane: {
          x: cx + 230 * scale,
          y: cy + 340,
          rotate: 2.5,
          zIndex: 6,
        },
      });
      setMounted(true);
    }

    computeInitialPositions();

    window.addEventListener("resize", computeInitialPositions);

    const preventScroll = (e: TouchEvent | WheelEvent) => {
      e.preventDefault();
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      window.removeEventListener("resize", computeInitialPositions);
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  // ========================================================
  // 1. Canvas Pan handlers (dragging background or project card)
  // ========================================================
  const handleCanvasPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;

    canvasPanRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPanX: pan.x,
      startPanY: pan.y,
      hasMoved: false,
    };

    setIsPanning(true);
  };

  const handleCanvasPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPanning) return;

    const dx = e.clientX - canvasPanRef.current.startX;
    const dy = e.clientY - canvasPanRef.current.startY;

    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
      if (!canvasPanRef.current.hasMoved) {
        canvasPanRef.current.hasMoved = true;
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }
      e.preventDefault();
    }

    if (!canvasPanRef.current.hasMoved) return;

    const rawPanX = canvasPanRef.current.startPanX + dx;
    const rawPanY = canvasPanRef.current.startPanY + dy;

    // Boundary for canvas panning: stop slightly past the edge cards ("lebih dikit saja")
    const maxPanX = Math.max(180, window.innerWidth * 0.18);
    const maxPanY = Math.max(220, window.innerHeight * 0.32);

    setPan({
      x: Math.max(-maxPanX, Math.min(maxPanX, rawPanX)),
      y: Math.max(-maxPanY, Math.min(maxPanY, rawPanY)),
    });
  };

  const handleCanvasPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isPanning) {
      setIsPanning(false);
      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // ignore
      }
    }
  };

  // Dedicated project card click & pointer trackers
  const projectPointerRef = useRef<{ startX: number; startY: number; time: number }>({
    startX: 0,
    startY: 0,
    time: 0,
  });

  const handleProjectPointerDown = (e: React.PointerEvent) => {
    projectPointerRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      time: Date.now(),
    };
  };

  const handleProjectCardClick = (e: React.MouseEvent, href: string) => {
    const dx = Math.abs(e.clientX - projectPointerRef.current.startX);
    const dy = Math.abs(e.clientY - projectPointerRef.current.startY);
    if (canvasPanRef.current.hasMoved || dx > 8 || dy > 8) {
      e.preventDefault();
      return;
    }
    router.push(href);
  };

  const handleProjectPointerUp = (e: React.PointerEvent, href: string) => {
    const dx = Math.abs(e.clientX - projectPointerRef.current.startX);
    const dy = Math.abs(e.clientY - projectPointerRef.current.startY);
    const dt = Date.now() - projectPointerRef.current.time;
    if (!canvasPanRef.current.hasMoved && dx < 8 && dy < 8 && dt < 800) {
      router.push(href);
    }
  };

  // ========================================================
  // 2. Individual Item Drag handlers (for non-project cards)
  // ========================================================
  const handleItemPointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    itemId: string
  ) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    // Stop propagation so the canvas does NOT pan while dragging this specific card
    e.stopPropagation();
    e.preventDefault();

    const newZ = maxZIndex + 1;
    setMaxZIndex(newZ);

    const currentItem = items[itemId];
    itemDragRef.current = {
      id: itemId,
      startClientX: e.clientX,
      startClientY: e.clientY,
      itemStartX: currentItem.x,
      itemStartY: currentItem.y,
      hasMoved: false,
    };

    setActiveDragId(itemId);
    setItems((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        zIndex: newZ,
      },
    }));

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handleItemPointerMove = (
    e: React.PointerEvent<HTMLDivElement>,
    itemId: string
  ) => {
    if (activeDragId !== itemId) return;
    e.stopPropagation();
    e.preventDefault();

    const dx = e.clientX - itemDragRef.current.startClientX;
    const dy = e.clientY - itemDragRef.current.startClientY;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      itemDragRef.current.hasMoved = true;
    }

    const rawX = itemDragRef.current.itemStartX + dx;
    const rawY = itemDragRef.current.itemStartY + dy;

    // Boundary for card dragging: slightly beyond the edge cards ("lebih dikit saja")
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const scale = Math.max(0.8, Math.min(1.1, window.innerWidth / 1500));

    const margin = 80;
    const minCardX = cx - 620 * scale - margin;
    const maxCardX = cx + 450 * scale + margin;
    const minCardY = cy - 530 - margin;
    const maxY = cy + 420 + margin;

    setItems((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        x: Math.max(minCardX, Math.min(maxCardX, rawX)),
        y: Math.max(minCardY, Math.min(maxY, rawY)),
      },
    }));
  };

  const handleItemPointerUp = (
    e: React.PointerEvent<HTMLDivElement>,
    itemId: string
  ) => {
    if (activeDragId === itemId) {
      e.stopPropagation();
      setActiveDragId(null);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };


  const cryptixData = JOTTER_PROJECTS.find((p) => p.slug === "cryptix")!;
  const noveraData = JOTTER_PROJECTS.find((p) => p.slug === "novera")!;
  const pitlaneData = JOTTER_PROJECTS.find((p) => p.slug === "pitlane")!;

  if (!mounted || !items["center-card"]) {
    return (
      <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#fafafa] dark:bg-[#121212] jotter-dot-grid" />
    );
  }

  const centerCard = items["center-card"];
  const cryptix = items["cryptix"];
  const novera = items["novera"];
  const pitlane = items["pitlane"];
  const clause = items["clause"];
  const graph = items["graph"];
  const signflow = items["signflow"];
  const generator = items["generator"];
  const cursor = items["cursor"];

  return (
    <div
      ref={containerRef}
      onPointerDown={handleCanvasPointerDown}
      onPointerMove={handleCanvasPointerMove}
      onPointerUp={handleCanvasPointerUp}
      onPointerCancel={handleCanvasPointerUp}
      className="fixed inset-0 w-screen h-screen overflow-hidden select-none bg-[#fafafa] dark:bg-[#121212] jotter-dot-grid touch-none"
      style={{
        cursor: isPanning ? "grabbing" : "grab",
        backgroundPosition: `${pan.x}px ${pan.y}px`,
      }}
    >
      {/* Desk Canvas Layer (panned as a whole) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          transform: `translate3d(${pan.x}px, ${pan.y}px, 0)`,
          willChange: "transform",
        }}
      >
        {/* ======================================================== */}
        {/* 1. CENTER INTRO CARD (Fixed desk card - NOT draggable)   */}
        {/* ======================================================== */}
        {/* ======================================================== */}
        {/* 1. CENTER INTRO CARD (Fixed desk card - NOT draggable)   */}
        {/* ======================================================== */}
        <div
          style={{
            transform: `translate3d(${centerCard.x}px, ${centerCard.y}px, 0)`,
            zIndex: centerCard.zIndex,
          }}
          className="absolute top-0 left-0 w-[380px] pointer-events-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="w-full p-7 rounded-2xl bg-white dark:bg-[#1c1c1c] border-2 border-[#199af2] shadow-[0_16px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.45)] relative"
          >
            {/* 4 Selection corner handles */}
            <div className="w-2.5 h-2.5 bg-white border-2 border-[#199af2] rounded-xs absolute -top-1.5 -left-1.5 pointer-events-none" />
            <div className="w-2.5 h-2.5 bg-white border-2 border-[#199af2] rounded-xs absolute -top-1.5 -right-1.5 pointer-events-none" />
            <div className="w-2.5 h-2.5 bg-white border-2 border-[#199af2] rounded-xs absolute -bottom-1.5 -left-1.5 pointer-events-none" />
            <div className="w-2.5 h-2.5 bg-white border-2 border-[#199af2] rounded-xs absolute -bottom-1.5 -right-1.5 pointer-events-none" />

            {/* Profile Photo */}
            <div className="w-12 h-12 rounded-lg overflow-hidden mb-5 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={JOTTER_SETTINGS.avatarUrl}
                alt={JOTTER_SETTINGS.name}
                draggable={false}
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>

            <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight mb-3 pointer-events-none">
              Hey, I&apos;m {JOTTER_SETTINGS.name}.
            </h1>

            <div className="space-y-3.5 text-sm text-stone-600 dark:text-stone-300 leading-relaxed pointer-events-none">
              <p>
                This page works a bit like my desk. Projects, notes and half
                finished thoughts, all within reach. Drag things around, open
                whatever catches your eye.
              </p>
              <p>
                Want the longer story? That&apos;s what the about page is for.
              </p>
              <p className="font-medium text-stone-500 dark:text-stone-400">
                P.S. Yes, everything on this page is draggable. Might as well try
                it.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-5">
              <a
                href={`mailto:${JOTTER_SETTINGS.email}`}
                onPointerDown={(e) => e.stopPropagation()}
                className="px-5 py-2.5 rounded-full bg-[#121212] text-white dark:bg-[#ededed] dark:text-[#121212] text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs cursor-pointer relative z-10"
              >
                Get in touch
              </a>
              <Link
                href="/about"
                onPointerDown={(e) => e.stopPropagation()}
                className="px-5 py-2.5 rounded-full bg-[#fafafa] dark:bg-[#252525] hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-colors border border-stone-200 dark:border-stone-700 cursor-pointer relative z-10"
              >
                About me
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 2. CRYPTIX PROJECT CARD (Project Card - Link on Desk)    */}
        {/* ======================================================== */}
        <div
          style={{
            transform: `translate3d(${cryptix.x}px, ${cryptix.y}px, 0) rotate(${cryptix.rotate}deg)`,
            zIndex: cryptix.zIndex,
          }}
          className="absolute top-0 left-0 w-[270px] group select-none pointer-events-auto hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/project/cryptix"
              onPointerDown={handleProjectPointerDown}
              onPointerUp={(e) => handleProjectPointerUp(e, "/project/cryptix")}
              onClick={(e) => handleProjectCardClick(e, "/project/cryptix")}
              draggable={false}
              className="block cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:-rotate-3 group-hover:-translate-y-2"
            >
              <div className="aspect-[16/11] rounded-2xl overflow-hidden bg-white dark:bg-[#1f1f1f] border border-stone-200/90 dark:border-stone-800 shadow-[0_16px_36px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.45)] pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cryptixData.mainImage}
                  alt="Cryptix"
                  draggable={false}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
              <div className="flex items-center gap-2 mt-2.5 px-1 pointer-events-none">
                <span className="font-semibold text-sm text-stone-900 dark:text-stone-100">
                  Cryptix
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-[11px] text-stone-600 dark:text-stone-400 font-medium border border-stone-200/70 dark:border-stone-700/60">
                  {cryptixData.tagline}
                </span>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 3. NOVERA PROJECT CARD (Project Card - Link on Desk)     */}
        {/* ======================================================== */}
        <div
          style={{
            transform: `translate3d(${novera.x}px, ${novera.y}px, 0) rotate(${novera.rotate}deg)`,
            zIndex: novera.zIndex,
          }}
          className="absolute top-0 left-0 w-[270px] group select-none pointer-events-auto hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/project/novera"
              onPointerDown={handleProjectPointerDown}
              onPointerUp={(e) => handleProjectPointerUp(e, "/project/novera")}
              onClick={(e) => handleProjectCardClick(e, "/project/novera")}
              draggable={false}
              className="block cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:rotate-3 group-hover:-translate-y-2"
            >
              <div className="aspect-[16/11] rounded-2xl overflow-hidden bg-white dark:bg-[#1f1f1f] border border-stone-200/90 dark:border-stone-800 shadow-[0_16px_36px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.45)] pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={noveraData.mainImage}
                  alt="Novera"
                  draggable={false}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
              <div className="flex items-center gap-2 mt-2.5 px-1 pointer-events-none">
                <span className="font-semibold text-sm text-stone-900 dark:text-stone-100">
                  Novera
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-[11px] text-stone-600 dark:text-stone-400 font-medium border border-stone-200/70 dark:border-stone-700/60">
                  {noveraData.tagline}
                </span>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 4. PITLANE PROJECT CARD (Project Card - Link on Desk)    */}
        {/* ======================================================== */}
        <div
          style={{
            transform: `translate3d(${pitlane.x}px, ${pitlane.y}px, 0) rotate(${pitlane.rotate}deg)`,
            zIndex: pitlane.zIndex,
          }}
          className="absolute top-0 left-0 w-[270px] group select-none pointer-events-auto hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/project/pitlane"
              onPointerDown={handleProjectPointerDown}
              onPointerUp={(e) => handleProjectPointerUp(e, "/project/pitlane")}
              onClick={(e) => handleProjectCardClick(e, "/project/pitlane")}
              draggable={false}
              className="block cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:-rotate-3 group-hover:-translate-y-2"
            >
              <div className="aspect-[16/11] rounded-2xl overflow-hidden bg-white dark:bg-[#1f1f1f] border border-stone-200/90 dark:border-stone-800 shadow-[0_16px_36px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.45)] pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pitlaneData.mainImage}
                  alt="Pitlane"
                  draggable={false}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
              <div className="flex items-center gap-2 mt-2.5 px-1 pointer-events-none">
                <span className="font-semibold text-sm text-stone-900 dark:text-stone-100">
                  Pitlane
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-[11px] text-stone-600 dark:text-stone-400 font-medium border border-stone-200/70 dark:border-stone-700/60">
                  {pitlaneData.tagline}
                </span>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 5. LOCATION & LOCAL TIME (Individually Draggable)        */}
        {/* ======================================================== */}
        <div
          role="presentation"
          onPointerDown={(e) => handleItemPointerDown(e, "clause")}
          onPointerMove={(e) => handleItemPointerMove(e, "clause")}
          onPointerUp={(e) => handleItemPointerUp(e, "clause")}
          onPointerCancel={(e) => handleItemPointerUp(e, "clause")}
          style={{
            transform: `translate3d(${clause.x}px, ${clause.y}px, 0) rotate(${clause.rotate}deg)`,
            zIndex: clause.zIndex,
            cursor: activeDragId === "clause" ? "grabbing" : "grab",
          }}
          className="absolute top-0 left-0 w-[230px] pointer-events-auto touch-none group hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`w-full p-4 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-stone-200/90 dark:border-stone-800 shadow-[0_12px_30px_rgba(0,0,0,0.10)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.45)] space-y-3 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeDragId === "clause"
                  ? ""
                  : "group-hover:scale-[1.04] group-hover:-rotate-3 group-hover:-translate-y-2"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between pointer-events-none">
                <span className="text-[9px] font-mono uppercase tracking-wider text-stone-400 dark:text-stone-500">
                  Location & Time
                </span>
                <span className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Online</span>
                </span>
              </div>

              {/* City with Indonesian Flag & Live Clock (without heavy bold) */}
              <div className="pointer-events-none space-y-1">
                <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300 text-xs font-normal">
                  <span className="inline-flex items-center justify-center w-4 h-3 rounded-[2px] overflow-hidden border border-stone-200 dark:border-stone-700 shadow-2xs shrink-0" title="Indonesia">
                    <span className="w-full h-full flex flex-col">
                      <span className="w-full h-1/2 bg-[#ff0000]" />
                      <span className="w-full h-1/2 bg-white" />
                    </span>
                  </span>
                  <span>Jakarta, Indonesia</span>
                </div>
                <div className="flex items-baseline gap-1.5 pt-0.5">
                  <span className="font-mono text-2xl font-normal tracking-tight text-stone-800 dark:text-stone-200">
                    {currentTime || "00:00:00"}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400 dark:text-stone-500">
                    WIB · GMT+7
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 6. GRAPH WIDGET (Individually Draggable)                 */}
        {/* ======================================================== */}
        <div
          role="presentation"
          onPointerDown={(e) => handleItemPointerDown(e, "graph")}
          onPointerMove={(e) => handleItemPointerMove(e, "graph")}
          onPointerUp={(e) => handleItemPointerUp(e, "graph")}
          onPointerCancel={(e) => handleItemPointerUp(e, "graph")}
          style={{
            transform: `translate3d(${graph.x}px, ${graph.y}px, 0) rotate(${graph.rotate}deg)`,
            zIndex: graph.zIndex,
            cursor: activeDragId === "graph" ? "grabbing" : "grab",
          }}
          className="absolute top-0 left-0 w-[320px] pointer-events-auto touch-none group hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`w-full p-4 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-stone-200/90 dark:border-stone-800 shadow-[0_12px_30px_rgba(0,0,0,0.10)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.45)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeDragId === "graph"
                  ? ""
                  : "group-hover:scale-[1.04] group-hover:rotate-3 group-hover:-translate-y-2"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1.5 pointer-events-none">
                <span className="font-mono text-[10px]">250</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-0.5 bg-[#e53e3e]" />
                  <span className="w-2 h-0.5 bg-[#cbd5e0]" />
                </div>
              </div>
              <svg
                viewBox="0 0 360 80"
                className="w-full h-14 stroke-current pointer-events-none"
              >
                <path
                  d="M 0 65 Q 90 10 180 35 T 360 15"
                  fill="none"
                  stroke="#121212"
                  strokeWidth="1.5"
                  className="dark:stroke-white opacity-80"
                />
                <path
                  d="M 0 50 Q 100 55 190 20 T 360 45"
                  fill="none"
                  stroke="#3182ce"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              </svg>
              <div className="flex items-center justify-between text-[10px] text-stone-400 mt-1 border-t border-stone-100 dark:border-stone-800/80 pt-1 pointer-events-none">
                <span>0</span>
                <span>120</span>
                <span>240</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 7. SIGNFLOW INTEGRATION (Individually Draggable)         */}
        {/* ======================================================== */}
        <div
          role="presentation"
          onPointerDown={(e) => handleItemPointerDown(e, "signflow")}
          onPointerMove={(e) => handleItemPointerMove(e, "signflow")}
          onPointerUp={(e) => handleItemPointerUp(e, "signflow")}
          onPointerCancel={(e) => handleItemPointerUp(e, "signflow")}
          style={{
            transform: `translate3d(${signflow.x}px, ${signflow.y}px, 0) rotate(${signflow.rotate}deg)`,
            zIndex: signflow.zIndex,
            cursor: activeDragId === "signflow" ? "grabbing" : "grab",
          }}
          className="absolute top-0 left-0 w-[200px] pointer-events-auto touch-none group hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`w-full p-3.5 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-stone-200/90 dark:border-stone-800 shadow-[0_12px_30px_rgba(0,0,0,0.10)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.45)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeDragId === "signflow"
                  ? ""
                  : "group-hover:scale-[1.04] group-hover:-rotate-3 group-hover:-translate-y-2"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 pointer-events-none">
                  <div className="w-6 h-6 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300">
                    {isDarkMode ? (
                      <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    ) : (
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-normal text-stone-800 dark:text-stone-200">
                      {isDarkMode ? "Dark theme" : "Light theme"}
                    </p>
                    <p className="text-[9px] font-mono text-stone-400 dark:text-stone-500">
                      Workspace
                    </p>
                  </div>
                </div>

                {/* Minimalist Switch */}
                <button
                  type="button"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDarkMode();
                  }}
                  aria-label="Toggle Dark Mode"
                  className={`w-8 h-4.5 rounded-full transition-colors flex items-center p-0.5 cursor-pointer relative z-10 ${
                    isDarkMode
                      ? "bg-indigo-600 justify-end"
                      : "bg-stone-200 dark:bg-stone-700 justify-start"
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-white shadow-2xs pointer-events-none transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 8. TECH STACK & TOOLS (Individually Draggable)           */}
        {/* ======================================================== */}
        <div
          role="presentation"
          onPointerDown={(e) => handleItemPointerDown(e, "generator")}
          onPointerMove={(e) => handleItemPointerMove(e, "generator")}
          onPointerUp={(e) => handleItemPointerUp(e, "generator")}
          onPointerCancel={(e) => handleItemPointerUp(e, "generator")}
          style={{
            transform: `translate3d(${generator.x}px, ${generator.y}px, 0) rotate(${generator.rotate}deg)`,
            zIndex: generator.zIndex,
            cursor: activeDragId === "generator" ? "grabbing" : "grab",
          }}
          className="absolute top-0 left-0 w-[240px] pointer-events-auto touch-none group hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`w-full p-3 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-stone-200/90 dark:border-stone-800 shadow-[0_12px_30px_rgba(0,0,0,0.10)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.45)] space-y-2 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeDragId === "generator"
                  ? ""
                  : "group-hover:scale-[1.04] group-hover:rotate-3 group-hover:-translate-y-2"
              }`}
            >
              <div className="flex items-center justify-between pointer-events-none">
                <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                  Tech Stack & Tools ...
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-stone-200/60 dark:border-stone-800 pointer-events-none">
                <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                  {/* TypeScript */}
                  <span
                    title="TypeScript"
                    className="w-5 h-5 rounded-md bg-[#3178c6]/10 dark:bg-[#3178c6]/20 text-[#3178c6] text-[9px] font-bold flex items-center justify-center"
                  >
                    TS
                  </span>
                  {/* React */}
                  <span
                    title="React.js"
                    className="w-5 h-5 rounded-md bg-[#00d8ff]/10 dark:bg-[#00d8ff]/20 text-[#00d8ff] flex items-center justify-center p-0.5"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="-11.5 -10.23174 23 20.46348">
                      <circle cx="0" cy="0" r="2.05" />
                      <g stroke="currentColor" strokeWidth="1" fill="none">
                        <ellipse rx="11" ry="4.2" />
                        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                      </g>
                    </svg>
                  </span>
                  {/* Next.js */}
                  <span
                    title="Next.js"
                    className="w-5 h-5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-100 text-[9px] font-bold flex items-center justify-center"
                  >
                    N
                  </span>
                  {/* Node.js */}
                  <span
                    title="Node.js"
                    className="w-5 h-5 rounded-md bg-[#5fa04e]/10 dark:bg-[#5fa04e]/20 text-[#5fa04e] text-[8px] font-bold flex items-center justify-center"
                  >
                    JS
                  </span>
                  {/* Docker */}
                  <span
                    title="Docker"
                    className="w-5 h-5 rounded-md bg-[#2496ed]/10 dark:bg-[#2496ed]/20 text-[10px] flex items-center justify-center"
                  >
                    🐳
                  </span>
                  {/* Database */}
                  <span
                    title="PostgreSQL / SQL"
                    className="w-5 h-5 rounded-md bg-[#4169e1]/10 dark:bg-[#4169e1]/20 text-[#4169e1] text-[8px] font-bold flex items-center justify-center"
                  >
                    SQL
                  </span>
                </div>

                <div className="w-5 h-5 rounded-full bg-[#121212] dark:bg-white text-white dark:text-black flex items-center justify-center text-[10px] font-bold">
                  ↑
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 9. OSCAR BERGMAN CURSOR PILL (Individually Draggable)    */}
        {/* ======================================================== */}
        <div
          role="presentation"
          onPointerDown={(e) => handleItemPointerDown(e, "cursor")}
          onPointerMove={(e) => handleItemPointerMove(e, "cursor")}
          onPointerUp={(e) => handleItemPointerUp(e, "cursor")}
          onPointerCancel={(e) => handleItemPointerUp(e, "cursor")}
          style={{
            transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0) rotate(${cursor.rotate}deg)`,
            zIndex: cursor.zIndex,
            cursor: activeDragId === "cursor" ? "grabbing" : "grab",
          }}
          className="absolute top-0 left-0 w-auto select-none pointer-events-auto touch-none group hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`flex items-start gap-1 ${
                activeDragId === "cursor" ? "" : "animate-cursor-float"
              }`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#0099ff"
                className="shrink-0 -mt-1 -ml-1 drop-shadow-xs pointer-events-none"
              >
                <path d="M4 0l16 12-7 2-4 8z" />
              </svg>
              <span className="px-2.5 py-1 rounded-md bg-[#0099ff] text-white text-[11px] font-medium shadow-md whitespace-nowrap pointer-events-none">
                {JOTTER_SETTINGS.name}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
