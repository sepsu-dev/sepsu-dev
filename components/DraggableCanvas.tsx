"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  SlidersHorizontal,
  Moon,
  Sun,
  MapPin,
  Clock,
  TrendingUp,
  Eye,
  Activity,
  CloudSun,
  CloudMoon,
  CloudRain,
  Cloud,
  Thermometer,
  Shield,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { JOTTER_PROJECTS, JOTTER_SETTINGS } from "@/lib/jotter-data";
import {
  TypeScript,
  React as ReactIcon,
  NextJs,
  NodeJs,
  Docker,
  PostgreSQL,
  Laravel,
  NestJS,
  TailwindCSS,
  Redis,
  MongoDB,
  MySQL,
  VueJs,
} from "developer-icons";

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
  const [scale, setScale] = useState<number>(1);
  const [showZoomHud, setShowZoomHud] = useState<boolean>(false);
  const scaleRef = useRef<number>(1);
  const panRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const zoomHudTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  useEffect(() => {
    panRef.current = pan;
  }, [pan]);

  // Individual cards state
  const [items, setItems] = useState<Record<string, ItemState>>({});
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState<number>(25);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  // Weather state (Jakarta)
  const [weather, setWeather] = useState<{
    temp: number;
    isDay: boolean;
    weatherCode: number;
  }>({
    temp: 29,
    isDay: true,
    weatherCode: 1,
  });

  useEffect(() => {
    // Fetch real-time weather for Jakarta via Open-Meteo
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-6.2088&longitude=106.8456&current=temperature_2m,is_day,weather_code&timezone=Asia%2FJakarta"
        );
        if (res.ok) {
          const data = await res.json();
          if (data.current) {
            setWeather({
              temp: Math.round(data.current.temperature_2m),
              isDay: Boolean(data.current.is_day),
              weatherCode: data.current.weather_code,
            });
          }
        }
      } catch {
        const hour = new Date().getHours();
        setWeather((prev) => ({
          ...prev,
          isDay: hour >= 6 && hour < 18,
        }));
      }
    };

    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 300000);

    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    const syncTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      clearInterval(weatherInterval);
      clearInterval(clockInterval);
      observer.disconnect();
    };
  }, []);

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
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

      setItems({
        // 1. Center Card: firmly anchored slightly higher up on the desk
        "center-card": {
          x: cx - 185,
          y: cy - 240,
          rotate: 0,
          zIndex: 10,
        },
        // 2. Clause Card (Location & Time): top-left, peeking from upper edge above cryptix
        clause: {
          x: cx - 490,
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
          x: cx - 580,
          y: cy - 110,
          rotate: -2,
          zIndex: 5,
        },
        // 5. SignFlow (Dark mode): bottom-left, shifted slightly lower and to the left
        signflow: {
          x: cx - 480,
          y: cy + 230,
          rotate: 0,
          zIndex: 7,
        },
        // 6. Novera: top-right, tilted, right of center card
        novera: {
          x: cx + 270,
          y: cy - 240,
          rotate: 2,
          zIndex: 5,
        },
        // 7. Cursor Pill: mid-right, pointing to right edge of center card
        cursor: {
          x: cx + 205,
          y: cy - 40,
          rotate: 0,
          zIndex: 15,
        },
        // 8. Ask Contract Generator (Tech stack): mid-right, below cursor
        generator: {
          x: cx + 360,
          y: cy + 80,
          rotate: 0,
          zIndex: 8,
        },
        // 9. Pitlane: bottom-right, peeking lower down from bottom right corner
        pitlane: {
          x: cx + 230,
          y: cy + 340,
          rotate: 2.5,
          zIndex: 6,
        },
      });

      // Default zoom: 90% (0.9) for mobile / small screens, 100% (1) for desktop
      const isMobile = window.innerWidth < 768;
      const initialScale = isMobile ? 0.9 : 1;
      setScale(initialScale);
      scaleRef.current = initialScale;

      setMounted(true);
    }

    computeInitialPositions();

    window.addEventListener("resize", computeInitialPositions);

    const triggerZoomHud = () => {
      setShowZoomHud(true);
      if (zoomHudTimeoutRef.current) {
        clearTimeout(zoomHudTimeoutRef.current);
      }
      zoomHudTimeoutRef.current = setTimeout(() => {
        setShowZoomHud(false);
      }, 2200);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        triggerZoomHud();
        const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
        const currentScale = scaleRef.current;
        const targetScale = Math.min(2.0, Math.max(0.4, Number((currentScale * zoomFactor).toFixed(3))));

        if (targetScale === currentScale) return;

        // Zoom centered around cursor focal point
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const currentPan = panRef.current;

        const newPanX = mouseX - (mouseX - currentPan.x) * (targetScale / currentScale);
        const newPanY = mouseY - (mouseY - currentPan.y) * (targetScale / currentScale);

        setScale(targetScale);
        setPan({ x: Math.round(newPanX), y: Math.round(newPanY) });
      } else {
        // Normal scroll pans the canvas
        setPan((prev) => ({
          x: Math.round(prev.x - e.deltaX * 0.8),
          y: Math.round(prev.y - e.deltaY * 0.8),
        }));
      }
    };

    // Touch Pinch-to-zoom for Mobile & Tablet (2 fingers)
    let initialPinchDistance = 0;
    let initialPinchScale = 1;
    let initialPinchPan = { x: 0, y: 0 };
    let initialPinchCenter = { x: 0, y: 0 };

    const getTouchDistance = (t1: Touch, t2: Touch) => {
      const dx = t1.clientX - t2.clientX;
      const dy = t1.clientY - t2.clientY;
      return Math.hypot(dx, dy);
    };

    const getTouchCenter = (t1: Touch, t2: Touch) => {
      return {
        x: (t1.clientX + t2.clientX) / 2,
        y: (t1.clientY + t2.clientY) / 2,
      };
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        triggerZoomHud();
        initialPinchDistance = getTouchDistance(e.touches[0], e.touches[1]);
        initialPinchScale = scaleRef.current;
        initialPinchPan = { ...panRef.current };
        initialPinchCenter = getTouchCenter(e.touches[0], e.touches[1]);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && initialPinchDistance > 0) {
        e.preventDefault();
        triggerZoomHud();
        const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
        const scaleRatio = currentDistance / initialPinchDistance;
        const targetScale = Math.min(2.0, Math.max(0.4, Number((initialPinchScale * scaleRatio).toFixed(3))));

        // Zoom relative to the center between the 2 fingers
        const cx = initialPinchCenter.x;
        const cy = initialPinchCenter.y;
        const newPanX = cx - (cx - initialPinchPan.x) * (targetScale / initialPinchScale);
        const newPanY = cy - (cy - initialPinchPan.y) * (targetScale / initialPinchScale);

        setScale(targetScale);
        setPan({ x: Math.round(newPanX), y: Math.round(newPanY) });
      } else {
        // Prevent browser native pull-to-refresh & screen pinch
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        initialPinchDistance = 0;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      window.removeEventListener("resize", computeInitialPositions);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
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

    // Boundary for canvas panning: ample room so mobile/tablet users can pan freely across the full desktop desk
    const maxPanX = Math.max(500, window.innerWidth * 0.45);
    const maxPanY = Math.max(450, window.innerHeight * 0.45);

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
  const projectPointerRef = useRef<{
    startX: number;
    startY: number;
    time: number;
    hasDragged: boolean;
  }>({
    startX: 0,
    startY: 0,
    time: 0,
    hasDragged: false,
  });

  const handleProjectCardClick = (e: React.MouseEvent, href: string) => {
    // If the card was dragged more than 5px, suppress the navigation click
    if (itemDragRef.current.hasMoved || projectPointerRef.current.hasDragged) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    router.push(href);
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

    const margin = 100;
    const minCardX = cx - 620 - margin;
    const maxCardX = cx + 450 + margin;
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
  const novera = items["novera"];/*  */
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
          transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${scale})`,
          transformOrigin: "0 0",
          willChange: "transform",
        }}
      >
        {/* ======================================================== */}
        {/* 1. CENTER INTRO CARD (Fixed note - NOT draggable)        */}
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
            className="w-full p-7 rounded-2xl bg-white dark:bg-[#1c1c1c] border border-stone-200/90 dark:border-stone-800 shadow-[0_16px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
          >
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
              Hello, I&apos;m {JOTTER_SETTINGS.short_name}.
            </h1>

            <div className="space-y-3 text-sm text-stone-600 dark:text-stone-300 leading-relaxed pointer-events-none">
              <p>
                Welcome to my interactive workspace. Here you&apos;ll find selected projects, experiments, and technical highlights — feel free to explore and rearrange things.
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Looking for details on my background and experience? Check out the about page.
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
        {/* 2. CRYPTIX PROJECT CARD (Individually Draggable Project) */}
        {/* ======================================================== */}
        <div
          role="presentation"
          onPointerDown={(e) => handleItemPointerDown(e, "cryptix")}
          onPointerMove={(e) => handleItemPointerMove(e, "cryptix")}
          onPointerUp={(e) => handleItemPointerUp(e, "cryptix")}
          onPointerCancel={(e) => handleItemPointerUp(e, "cryptix")}
          style={{
            transform: `translate3d(${cryptix.x}px, ${cryptix.y}px, 0) rotate(${cryptix.rotate}deg)`,
            zIndex: cryptix.zIndex,
            cursor: activeDragId === "cryptix" ? "grabbing" : "grab",
          }}
          className="absolute top-0 left-0 w-[270px] group select-none pointer-events-auto touch-none hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              onClick={(e) => handleProjectCardClick(e, "/project/cryptix")}
              className={`block transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeDragId === "cryptix"
                ? ""
                : "group-hover:scale-[1.04] group-hover:-rotate-3 group-hover:-translate-y-2"
                }`}
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
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 3. NOVERA PROJECT CARD (Individually Draggable Project)  */}
        {/* ======================================================== */}
        <div
          role="presentation"
          onPointerDown={(e) => handleItemPointerDown(e, "novera")}
          onPointerMove={(e) => handleItemPointerMove(e, "novera")}
          onPointerUp={(e) => handleItemPointerUp(e, "novera")}
          onPointerCancel={(e) => handleItemPointerUp(e, "novera")}
          style={{
            transform: `translate3d(${novera.x}px, ${novera.y}px, 0) rotate(${novera.rotate}deg)`,
            zIndex: novera.zIndex,
            cursor: activeDragId === "novera" ? "grabbing" : "grab",
          }}
          className="absolute top-0 left-0 w-[270px] group select-none pointer-events-auto touch-none hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              onClick={(e) => handleProjectCardClick(e, "/project/novera")}
              className={`block transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeDragId === "novera"
                ? ""
                : "group-hover:scale-[1.04] group-hover:rotate-3 group-hover:-translate-y-2"
                }`}
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
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 4. PITLANE PROJECT CARD (Individually Draggable Project) */}
        {/* ======================================================== */}
        <div
          role="presentation"
          onPointerDown={(e) => handleItemPointerDown(e, "pitlane")}
          onPointerMove={(e) => handleItemPointerMove(e, "pitlane")}
          onPointerUp={(e) => handleItemPointerUp(e, "pitlane")}
          onPointerCancel={(e) => handleItemPointerUp(e, "pitlane")}
          style={{
            transform: `translate3d(${pitlane.x}px, ${pitlane.y}px, 0) rotate(${pitlane.rotate}deg)`,
            zIndex: pitlane.zIndex,
            cursor: activeDragId === "pitlane" ? "grabbing" : "grab",
          }}
          className="absolute top-0 left-0 w-[270px] group select-none pointer-events-auto touch-none hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              onClick={(e) => handleProjectCardClick(e, "/project/pitlane")}
              className={`block transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeDragId === "pitlane"
                ? ""
                : "group-hover:scale-[1.04] group-hover:-rotate-3 group-hover:-translate-y-2"
                }`}
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
            </div>
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
              className={`w-full p-4 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-stone-200/90 dark:border-stone-800 shadow-[0_12px_30px_rgba(0,0,0,0.10)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.45)] space-y-2.5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeDragId === "clause"
                ? ""
                : "group-hover:scale-[1.04] group-hover:-rotate-3 group-hover:-translate-y-2"
                }`}
            >
              {/* Header: Location on Left & Real-time Weather/Temp on Right */}
              <div className="flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300 text-xs font-normal">
                  <span
                    className="inline-flex items-center justify-center w-4 h-3 rounded-[2px] overflow-hidden border border-stone-200 dark:border-stone-700 shadow-2xs shrink-0"
                    title="Indonesia"
                  >
                    <span className="w-full h-full flex flex-col">
                      <span className="w-full h-1/2 bg-[#ff0000]" />
                      <span className="w-full h-1/2 bg-white" />
                    </span>
                  </span>
                  <span>Jakarta, ID</span>
                </div>

                {/* Real-time Weather & Day/Night Icon */}
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800/80 text-[10px] font-mono text-stone-600 dark:text-stone-300">
                  {weather.isDay ? (
                    weather.weatherCode >= 51 ? (
                      <CloudRain className="w-3 h-3 text-sky-500" />
                    ) : weather.weatherCode >= 1 && weather.weatherCode <= 3 ? (
                      <CloudSun className="w-3 h-3 text-amber-500" />
                    ) : (
                      <Sun className="w-3 h-3 text-amber-500" />
                    )
                  ) : weather.weatherCode >= 51 ? (
                    <CloudRain className="w-3 h-3 text-sky-400" />
                  ) : weather.weatherCode >= 1 && weather.weatherCode <= 3 ? (
                    <CloudMoon className="w-3 h-3 text-indigo-400" />
                  ) : (
                    <Moon className="w-3 h-3 text-indigo-400" />
                  )}
                  <span>{weather.temp}°C</span>
                </div>
              </div>

              {/* Live Clock */}
              <div className="pointer-events-none flex items-baseline justify-between pt-0.5">
                <span className="font-mono text-2xl font-normal tracking-tight text-stone-900 dark:text-stone-100">
                  {currentTime || "00:00:00"}
                </span>
                <span className="text-[10px] font-mono text-stone-400 dark:text-stone-500">
                  WIB · GMT+7
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 6. MAN UNITED FIXTURE WIDGET (Individually Draggable)   */}
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
          className="absolute top-0 left-0 w-[246px] pointer-events-auto touch-none group hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`w-full p-3.5 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-stone-200/90 dark:border-stone-800 shadow-[0_12px_30px_rgba(0,0,0,0.10)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.45)] space-y-2.5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeDragId === "graph"
                  ? ""
                  : "group-hover:scale-[1.04] group-hover:rotate-2 group-hover:-translate-y-2"
              }`}
            >
              {/* Header: MU Crest + Next Match + Standings Badge */}
              <div className="flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/mu-logo.png"
                      alt="Manchester United Crest"
                      className="w-full h-full object-contain drop-shadow-xs"
                      draggable={false}
                    />
                  </div>
                  <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 tracking-tight">
                    Next Match
                  </span>
                </div>

                {/* Table Standings Badge: 13th • 4 pts */}
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-[10px] font-mono text-stone-600 dark:text-stone-300">
                  <span className="font-semibold text-stone-900 dark:text-stone-100">#13</span>
                  <span className="text-stone-400">•</span>
                  <span>4 pts</span>
                </div>
              </div>

              {/* Matchup Banner: Fulham vs Man United (Away) */}
              <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-100 dark:border-stone-800/80 pointer-events-none">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                    Fulham
                  </span>
                  <span className="text-[9px] font-mono text-stone-400">Home</span>
                </div>
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 text-stone-400">
                  vs
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-[#DA291C] dark:text-red-400">
                    Man United
                  </span>
                  <span className="text-[9px] font-mono text-stone-400">Away</span>
                </div>
              </div>

              {/* Footer Info: Venue & League */}
              <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 dark:text-stone-400 px-0.5 pointer-events-none">
                <span className="truncate">Craven Cottage</span>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DA291C] animate-pulse" />
                  <span className="text-[#DA291C] dark:text-red-400 font-medium">EPL Away</span>
                </div>
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
              className={`w-full p-3.5 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-stone-200/90 dark:border-stone-800 shadow-[0_12px_30px_rgba(0,0,0,0.10)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.45)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeDragId === "signflow"
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
                  className={`w-8 h-4.5 rounded-full transition-colors flex items-center p-0.5 cursor-pointer relative z-10 ${isDarkMode
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
          className="absolute top-0 left-0 w-[250px] pointer-events-auto touch-none group hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`w-full p-3 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-stone-200/90 dark:border-stone-800 shadow-[0_12px_30px_rgba(0,0,0,0.10)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.45)] space-y-2 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeDragId === "generator"
                ? ""
                : "group-hover:scale-[1.04] group-hover:rotate-3 group-hover:-translate-y-2"
                }`}
            >
              <div className="flex items-center pointer-events-none">
                <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                  Tech Stack & Tools
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-1 pointer-events-none">
                {/* TypeScript */}
                <span title="TypeScript" className="flex items-center justify-center">
                  <TypeScript size={19} />
                </span>

                {/* React */}
                <span title="React.js" className="flex items-center justify-center">
                  <ReactIcon size={19} />
                </span>

                {/* Next.js */}
                <span title="Next.js" className="flex items-center justify-center">
                  <NextJs size={19} />
                </span>

                {/* Vue.js */}
                <span title="Vue.js" className="flex items-center justify-center">
                  <VueJs size={19} />
                </span>

                {/* Tailwind CSS */}
                <span title="Tailwind CSS" className="flex items-center justify-center">
                  <TailwindCSS size={19} />
                </span>

                {/* Node.js */}
                <span title="Node.js" className="flex items-center justify-center">
                  <NodeJs size={19} />
                </span>

                {/* NestJS */}
                <span title="NestJS" className="flex items-center justify-center">
                  <NestJS size={19} />
                </span>

                {/* Laravel */}
                <span title="Laravel" className="flex items-center justify-center">
                  <Laravel size={19} />
                </span>

                {/* Docker */}
                <span title="Docker" className="flex items-center justify-center">
                  <Docker size={19} />
                </span>

                {/* PostgreSQL */}
                <span title="PostgreSQL" className="flex items-center justify-center">
                  <PostgreSQL size={19} />
                </span>

                {/* MySQL */}
                <span title="MySQL" className="flex items-center justify-center">
                  <MySQL size={19} />
                </span>

                {/* MongoDB */}
                <span title="MongoDB" className="flex items-center justify-center">
                  <MongoDB size={19} />
                </span>

                {/* Redis */}
                <span title="Redis" className="flex items-center justify-center">
                  <Redis size={19} />
                </span>
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
              className={`flex items-start gap-1 ${activeDragId === "cursor" ? "" : "animate-cursor-float"
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

      {/* Zoom Indicator HUD: only appears on desktop during/after Ctrl+Scroll activity, auto-fades */}
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
                setScale(next);
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
                setScale(1);
                setPan({ x: 0, y: 0 });
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
                setScale(next);
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
    </div>
  );
}
