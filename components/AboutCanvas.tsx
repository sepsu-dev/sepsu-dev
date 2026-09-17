"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { JOTTER_SETTINGS } from "@/lib/jotter-data";

interface ItemState {
  x: number;
  y: number;
  rotate: number;
  zIndex: number;
}

export default function AboutCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  // Canvas pan offset
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

  // Items positions on the desk canvas
  const [items, setItems] = useState<Record<string, ItemState>>({});
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState<number>(25);

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

  // Ref for individual item drag tracking (Charizard, MacBook, iPhone, Polaroid, Photo, Type Specimen)
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
        // 1. Center About Me Card (Fixed desk card - NOT draggable)
        "about-card": {
          x: cx - 200,
          y: cy - 260,
          rotate: 0,
          zIndex: 10,
        },
        // 2. Old Trafford Card (Individually Draggable) - Top Left
        charizard: {
          x: cx - 510,
          y: cy - 330,
          rotate: -5,
          zIndex: 4,
        },
        // 4. Spotify Player (Individually Draggable) - Top Right
        spotify: {
          x: cx + 110,
          y: cy - 390,
          rotate: -3,
          zIndex: 3,
        },
        // 5. ThinkPad Laptop (Individually Draggable) - Mid Right
        macbook: {
          x: cx + 300,
          y: cy - 140,
          rotate: -7,
          zIndex: 5,
        },
        // 6. Debian Card (Individually Draggable) - Mid Left
        iphone: {
          x: cx - 490,
          y: cy - 100,
          rotate: 4,
          zIndex: 6,
        },
        // 6b. GNOME Card (Individually Draggable) - Near Debian
        gnome: {
          x: cx - 390,
          y: cy - 130,
          rotate: -4,
          zIndex: 7,
        },
        // 6c. Ubuntu Card (Individually Draggable) - Near Debian & GNOME
        ubuntu: {
          x: cx - 440,
          y: cy - 10,
          rotate: 3,
          zIndex: 8,
        },
        // 7. Senne Lammens - MU Goalkeeper (Individually Draggable) - Bottom Left
        profilePhoto: {
          x: cx - 380,
          y: cy + 130,
          rotate: -3,
          zIndex: 7,
        },
        // 8. Nanas / Pineapple Fruit Card (Individually Draggable) - Bottom Right
        pineapple: {
          x: cx + 180,
          y: cy + 130,
          rotate: 4,
          zIndex: 7,
        },
      });
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
  // 1. Canvas Pan handlers (dragging background or fixed items)
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

  // ========================================================
  // 2. Individual Item Drag handlers (for draggable desk toys)
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

    // Boundary for card dragging: slightly beyond the outermost cards ("lebih dikit saja")
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const scale = Math.max(0.8, Math.min(1.1, window.innerWidth / 1500));

    const margin = 80;
    const minCardX = cx - 500 * scale - margin;
    const maxCardX = cx + 420 * scale + margin;
    const minCardY = cy - 460 - margin;
    const maxY = cy + 320 + margin;

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

  const handleLinkClick = (e: React.MouseEvent) => {
    if (canvasPanRef.current.hasMoved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (!mounted || !items["about-card"]) {
    return (
      <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#fafafa] dark:bg-[#121212] jotter-dot-grid" />
    );
  }

  const aboutCard = items["about-card"];
  const charizard = items["charizard"];
  const spotify = items["spotify"];
  const macbook = items["macbook"];
  const iphone = items["iphone"];
  const gnome = items["gnome"] || { x: 0, y: 0, rotate: 0, zIndex: 7 };
  const ubuntu = items["ubuntu"] || { x: 0, y: 0, rotate: 0, zIndex: 8 };
  const profilePhoto = items["profilePhoto"];
  const pineapple = items["pineapple"] || { x: 0, y: 0, rotate: 0, zIndex: 7 };

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
      {/* Desk Canvas Layer */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${scale})`,
          transformOrigin: "0 0",
          willChange: "transform",
        }}
      >
        {/* ======================================================== */}
        {/* 1. CENTER ABOUT CARD (Fixed note - NOT draggable)        */}
        {/* ======================================================== */}
        <div
          style={{
            transform: `translate3d(${aboutCard.x}px, ${aboutCard.y}px, 0)`,
            zIndex: aboutCard.zIndex,
          }}
          className="absolute top-0 left-0 w-[390px] pointer-events-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="w-full p-8 rounded-2xl bg-white dark:bg-[#1c1c1c] border border-stone-200/90 dark:border-stone-800 shadow-[0_16px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
          >
            {/* Available for work */}
            <div className="flex items-center gap-2 mb-4 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-stone-600 dark:text-stone-400">
                {JOTTER_SETTINGS.status}
              </span>
            </div>

            {/* Heading & Subtitle */}
            <div className="mb-5 pointer-events-none">
              <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                {JOTTER_SETTINGS.name}
              </h1>
              <p className="text-xs sm:text-sm font-medium text-stone-500 dark:text-stone-400 mt-1">
                {JOTTER_SETTINGS.role}
              </p>
            </div>

            {/* Bio Copy */}
            <div className="space-y-4 text-xs sm:text-[13px] text-stone-600 dark:text-stone-300 leading-relaxed pointer-events-none">
              <p>{JOTTER_SETTINGS.bio}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-6">
              <a
                href={`mailto:${JOTTER_SETTINGS.email}`}
                onPointerDown={(e) => e.stopPropagation()}
                className="px-5 py-2.5 rounded-full bg-[#121212] text-white dark:bg-[#ededed] dark:text-[#121212] text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs cursor-pointer relative z-10"
              >
                Email me
              </a>
              <Link
                href="/"
                onPointerDown={(e) => e.stopPropagation()}
                className="px-5 py-2.5 rounded-full bg-[#fafafa] dark:bg-[#252525] hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-colors border border-stone-200 dark:border-stone-700 cursor-pointer relative z-10"
              >
                Back home
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 2. MANCHESTER UNITED / OLD TRAFFORD CARD (Draggable)     */}
        {/* ======================================================== */}
        <div
          role="presentation"
          onPointerDown={(e) => handleItemPointerDown(e, "charizard")}
          onPointerMove={(e) => handleItemPointerMove(e, "charizard")}
          onPointerUp={(e) => handleItemPointerUp(e, "charizard")}
          onPointerCancel={(e) => handleItemPointerUp(e, "charizard")}
          style={{
            transform: `translate3d(${charizard.x}px, ${charizard.y}px, 0) rotate(${charizard.rotate}deg)`,
            zIndex: charizard.zIndex,
            cursor: activeDragId === "charizard" ? "grabbing" : "grab",
          }}
          className="absolute top-0 left-0 w-[260px] select-none pointer-events-auto touch-none group hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`rounded-2xl overflow-hidden bg-white dark:bg-[#1c1c1c] shadow-[0_16px_36px_rgba(0,0,0,0.14)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.45)] border border-stone-200/90 dark:border-stone-800 p-2.5 pointer-events-none transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeDragId === "charizard"
                  ? ""
                  : "group-hover:scale-[1.04] group-hover:-rotate-3 group-hover:-translate-y-2"
              }`}
            >
              {/* Old Trafford Stadium Photo (Clean, no text) */}
              <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-stone-900 pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80"
                  alt="Old Trafford"
                  draggable={false}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
            </div>
          </motion.div>
        </div>


        {/* ======================================================== */}
        {/* 4. SPOTIFY PLAYER (Individually Draggable)                */}
        {/* ======================================================== */}
        <div
          role="presentation"
          onPointerDown={(e) => handleItemPointerDown(e, "spotify")}
          onPointerMove={(e) => handleItemPointerMove(e, "spotify")}
          onPointerUp={(e) => handleItemPointerUp(e, "spotify")}
          onPointerCancel={(e) => handleItemPointerUp(e, "spotify")}
          style={{
            transform: `translate3d(${spotify.x}px, ${spotify.y}px, 0) rotate(${spotify.rotate}deg)`,
            zIndex: spotify.zIndex,
            cursor: activeDragId === "spotify" ? "grabbing" : "grab",
          }}
          className="absolute top-0 left-0 w-[300px] select-none pointer-events-auto touch-none group hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full rounded-2xl overflow-hidden bg-[#282828] shadow-[0_16px_36px_rgba(0,0,0,0.22)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.50)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              activeDragId === "spotify"
                ? ""
                : "group-hover:scale-[1.03] group-hover:-rotate-2 group-hover:-translate-y-1"
            }`}
          >
            {/* Spotify Embed Player Container */}
            <div className="w-full h-[80px] relative">
              <iframe
                style={{ height: "100%", width: "100%" }}
                src="https://open.spotify.com/embed/track/0gSLaX91J2Cs9cWXqsRc4X?theme=0"
                frameBorder="0"
                allow="encrypted-media"
              />
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 5. CUTE CAT CARD (Individually Draggable, No text)       */}
        {/* ======================================================== */}
        <div
          role="presentation"
          onPointerDown={(e) => handleItemPointerDown(e, "macbook")}
          onPointerMove={(e) => handleItemPointerMove(e, "macbook")}
          onPointerUp={(e) => handleItemPointerUp(e, "macbook")}
          onPointerCancel={(e) => handleItemPointerUp(e, "macbook")}
          style={{
            transform: `translate3d(${macbook.x}px, ${macbook.y}px, 0) rotate(${macbook.rotate}deg)`,
            zIndex: macbook.zIndex,
            cursor: activeDragId === "macbook" ? "grabbing" : "grab",
          }}
          className="absolute top-0 left-0 w-[230px] select-none pointer-events-auto touch-none group hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`p-2.5 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-stone-200/90 dark:border-stone-800 shadow-[0_16px_36px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.45)] pointer-events-none transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeDragId === "macbook"
                  ? ""
                  : "group-hover:scale-[1.04] group-hover:-rotate-3 group-hover:-translate-y-2"
              }`}
            >
              <div className="aspect-[3/2] w-full rounded-xl overflow-hidden bg-stone-900 pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/cat.jpg"
                  alt="Tiger"
                  draggable={false}
                  className="w-full h-full object-cover object-center pointer-events-none"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 6a. DEBIAN OS CARD (Individually Draggable, No text)      */}
        {/* ======================================================== */}
        <div
          role="presentation"
          onPointerDown={(e) => handleItemPointerDown(e, "iphone")}
          onPointerMove={(e) => handleItemPointerMove(e, "iphone")}
          onPointerUp={(e) => handleItemPointerUp(e, "iphone")}
          onPointerCancel={(e) => handleItemPointerUp(e, "iphone")}
          style={{
            transform: `translate3d(${iphone.x}px, ${iphone.y}px, 0) rotate(${iphone.rotate}deg)`,
            zIndex: iphone.zIndex,
            cursor: activeDragId === "iphone" ? "grabbing" : "grab",
          }}
          className="absolute top-0 left-0 w-[100px] select-none pointer-events-auto touch-none group hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`p-2 rounded-2xl bg-white dark:bg-[#18181b] border border-stone-200/90 dark:border-stone-800 shadow-[0_16px_36px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.45)] pointer-events-none transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeDragId === "iphone"
                  ? ""
                  : "group-hover:scale-[1.04] group-hover:rotate-3 group-hover:-translate-y-2"
              }`}
            >
              <div className="aspect-square w-full rounded-xl bg-stone-50 dark:bg-[#111113] border border-stone-200/60 dark:border-stone-800/80 flex items-center justify-center p-3 pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/debian.svg"
                  alt="Debian"
                  draggable={false}
                  className="w-full h-full object-contain pointer-events-none"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 6b. GNOME CARD (Individually Draggable, No text)          */}
        {/* ======================================================== */}
        <div
          role="presentation"
          onPointerDown={(e) => handleItemPointerDown(e, "gnome")}
          onPointerMove={(e) => handleItemPointerMove(e, "gnome")}
          onPointerUp={(e) => handleItemPointerUp(e, "gnome")}
          onPointerCancel={(e) => handleItemPointerUp(e, "gnome")}
          style={{
            transform: `translate3d(${gnome.x}px, ${gnome.y}px, 0) rotate(${gnome.rotate}deg)`,
            zIndex: gnome.zIndex,
            cursor: activeDragId === "gnome" ? "grabbing" : "grab",
          }}
          className="absolute top-0 left-0 w-[100px] select-none pointer-events-auto touch-none group hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`p-2 rounded-2xl bg-white dark:bg-[#18181b] border border-stone-200/90 dark:border-stone-800 shadow-[0_16px_36px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.45)] pointer-events-none transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeDragId === "gnome"
                  ? ""
                  : "group-hover:scale-[1.04] group-hover:-rotate-3 group-hover:-translate-y-2"
              }`}
            >
              <div className="aspect-square w-full rounded-xl bg-[#4a86cf]/10 dark:bg-[#4a86cf]/20 border border-[#4a86cf]/20 flex items-center justify-center p-3 pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/gnome.svg"
                  alt="GNOME"
                  draggable={false}
                  className="w-full h-full object-contain pointer-events-none [filter:brightness(0)_saturate(100%)_invert(44%)_sepia(49%)_saturate(763%)_hue-rotate(175deg)_brightness(94%)_contrast(91%)] dark:[filter:brightness(0)_saturate(100%)_invert(76%)_sepia(25%)_saturate(1039%)_hue-rotate(185deg)_brightness(98%)_contrast(92%)]"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 6c. UBUNTU CARD (Individually Draggable, No text)         */}
        {/* ======================================================== */}
        <div
          role="presentation"
          onPointerDown={(e) => handleItemPointerDown(e, "ubuntu")}
          onPointerMove={(e) => handleItemPointerMove(e, "ubuntu")}
          onPointerUp={(e) => handleItemPointerUp(e, "ubuntu")}
          onPointerCancel={(e) => handleItemPointerUp(e, "ubuntu")}
          style={{
            transform: `translate3d(${ubuntu.x}px, ${ubuntu.y}px, 0) rotate(${ubuntu.rotate}deg)`,
            zIndex: ubuntu.zIndex,
            cursor: activeDragId === "ubuntu" ? "grabbing" : "grab",
          }}
          className="absolute top-0 left-0 w-[100px] select-none pointer-events-auto touch-none group hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`p-2 rounded-2xl bg-white dark:bg-[#18181b] border border-stone-200/90 dark:border-stone-800 shadow-[0_16px_36px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.45)] pointer-events-none transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeDragId === "ubuntu"
                  ? ""
                  : "group-hover:scale-[1.04] group-hover:rotate-4 group-hover:-translate-y-2"
              }`}
            >
              <div className="aspect-square w-full rounded-xl bg-[#E95420]/10 dark:bg-[#E95420]/20 border border-[#E95420]/20 flex items-center justify-center p-3 pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/ubuntu-simple.svg"
                  alt="Ubuntu"
                  draggable={false}
                  className="w-full h-full object-contain pointer-events-none [filter:brightness(0)_saturate(100%)_invert(40%)_sepia(97%)_saturate(1487%)_hue-rotate(352deg)_brightness(94%)_contrast(95%)] dark:[filter:brightness(0)_saturate(100%)_invert(57%)_sepia(97%)_saturate(1487%)_hue-rotate(352deg)_brightness(102%)_contrast(98%)]"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 7. SENNE LAMMENS - MANCHESTER UNITED GOALKEEPER CARD     */}
        {/* ======================================================== */}
        <div
          role="presentation"
          onPointerDown={(e) => handleItemPointerDown(e, "profilePhoto")}
          onPointerMove={(e) => handleItemPointerMove(e, "profilePhoto")}
          onPointerUp={(e) => handleItemPointerUp(e, "profilePhoto")}
          onPointerCancel={(e) => handleItemPointerUp(e, "profilePhoto")}
          style={{
            transform: `translate3d(${profilePhoto.x}px, ${profilePhoto.y}px, 0) rotate(${profilePhoto.rotate}deg)`,
            zIndex: profilePhoto.zIndex,
            cursor: activeDragId === "profilePhoto" ? "grabbing" : "grab",
          }}
          className="absolute top-0 left-0 w-[275px] select-none pointer-events-auto touch-none group hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`w-full p-2.5 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-stone-200/90 dark:border-stone-800 shadow-[0_16px_36px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.45)] space-y-2 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeDragId === "profilePhoto"
                  ? ""
                  : "group-hover:scale-[1.04] group-hover:-rotate-3 group-hover:-translate-y-2"
              }`}
            >
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-stone-950 pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/senne-lammens.jpg"
                  alt="Senne Lammens"
                  draggable={false}
                  className="w-full h-full object-cover object-center pointer-events-none"
                />
              </div>
            </div>
          </motion.div>
        </div>


        {/* ======================================================== */}
        {/* 9. PINEAPPLE FRUIT CARD (Individually Draggable, No text) */}
        {/* ======================================================== */}
        <div
          role="presentation"
          onPointerDown={(e) => handleItemPointerDown(e, "pineapple")}
          onPointerMove={(e) => handleItemPointerMove(e, "pineapple")}
          onPointerUp={(e) => handleItemPointerUp(e, "pineapple")}
          onPointerCancel={(e) => handleItemPointerUp(e, "pineapple")}
          style={{
            transform: `translate3d(${pineapple.x}px, ${pineapple.y}px, 0) rotate(${pineapple.rotate}deg)`,
            zIndex: pineapple.zIndex,
            cursor: activeDragId === "pineapple" ? "grabbing" : "grab",
          }}
          className="absolute top-0 left-0 w-[180px] select-none pointer-events-auto touch-none group hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`w-full p-2.5 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-stone-200/90 dark:border-stone-800 shadow-[0_16px_36px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.45)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeDragId === "pineapple"
                  ? ""
                  : "group-hover:scale-[1.04] group-hover:rotate-3 group-hover:-translate-y-2"
              }`}
            >
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-stone-900 pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/pineapple.jpg"
                  alt="Pineapple"
                  draggable={false}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Zoom Indicator HUD: only appears during / after Ctrl+Scroll activity, auto-fades */}
      <AnimatePresence>
        {showZoomHud && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-1 p-1 bg-white/90 dark:bg-[#181818]/90 backdrop-blur-md border border-stone-200/90 dark:border-stone-800 rounded-full shadow-xl pointer-events-auto text-xs font-mono text-stone-600 dark:text-stone-300"
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
