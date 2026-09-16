"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
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
      const scale = Math.max(0.8, Math.min(1.1, window.innerWidth / 1500));

      setItems({
        // 1. Center Note Card: firmly anchored slightly higher up on the desk
        "about-card": {
          x: cx - 195,
          y: cy - 275,
          rotate: 0,
          zIndex: 10,
        },
        // 2. Charizard Pokemon Card (Individually Draggable)
        charizard: {
          x: cx - 440 * scale,
          y: cy - 350,
          rotate: -5,
          zIndex: 4,
        },
        // 3. Type Specimen "Aa Inter Display" (Individually Draggable)
        typeSpecimen: {
          x: cx - 210 * scale,
          y: cy - 420,
          rotate: -10,
          zIndex: 3,
        },
        // 4. Spotify Player (Fixed on desk, cannot be dragged individually)
        spotify: {
          x: cx + 80 * scale,
          y: cy - 410,
          rotate: -4,
          zIndex: 3,
        },
        // 5. MacBook Pro Lid (Individually Draggable)
        macbook: {
          x: cx + 320 * scale,
          y: cy - 140,
          rotate: -26,
          zIndex: 5,
        },
        // 6. iPhone Device Mock (Individually Draggable)
        iphone: {
          x: cx - 430 * scale,
          y: cy + 60,
          rotate: 14,
          zIndex: 6,
        },
        // 7. Profile Photo Print (Individually Draggable)
        profilePhoto: {
          x: cx - 310 * scale,
          y: cy + 240,
          rotate: 5,
          zIndex: 7,
        },
        // 8. Polaroid Card with Bulgaria Photo (Individually Draggable)
        polaroid: {
          x: cx + 260 * scale,
          y: cy + 130,
          rotate: 3,
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

    // Boundary for canvas panning: stop slightly past the edge cards ("lebih dikit saja")
    const maxPanX = Math.max(180, window.innerWidth * 0.18);
    const maxPanY = Math.max(160, window.innerHeight * 0.25);

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
  const typeSpecimen = items["typeSpecimen"];
  const spotify = items["spotify"];
  const macbook = items["macbook"];
  const iphone = items["iphone"];
  const profilePhoto = items["profilePhoto"];
  const polaroid = items["polaroid"];

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
          transform: `translate3d(${pan.x}px, ${pan.y}px, 0)`,
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

            {/* Heading */}
            <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 mb-5 pointer-events-none">
              {JOTTER_SETTINGS.name}
            </h1>

            {/* Bio Copy */}
            <div className="space-y-4 text-xs sm:text-[13px] text-stone-600 dark:text-stone-300 leading-relaxed pointer-events-none">
              <p>
                I&apos;m Oscar. I&apos;ve spent the last six years designing products
                for teams who take their craft seriously, fintech, legal and
                developer tools mostly, the kind of places where a confusing
                interface actually costs someone something.
              </p>
              <p>
                I don&apos;t believe in flashy for the sake of flashy. Good design,
                to me, is mostly about restraint: knowing what to leave out, what to
                say once, what to let breathe. The projects on this site are less
                about the pixels and more about the decisions behind them.
              </p>
              <p>
                Based in Stockholm, usually working with one or two teams at a time,
                always with a notebook nearby even though everything ends up in
                Figma eventually.
              </p>
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
        {/* 2. CHARIZARD TRADING CARD (Individually Draggable)        */}
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
          className="absolute top-0 left-0 w-[185px] select-none pointer-events-auto touch-none group hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`rounded-2xl overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.16)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.45)] border border-stone-200/50 pointer-events-none transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeDragId === "charizard"
                  ? ""
                  : "group-hover:scale-[1.04] group-hover:-rotate-3 group-hover:-translate-y-2"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://framerusercontent.com/images/zivJ5C6BJfrXx1qXFvPd0jGlVM.png"
                alt="Oscar Bergman Trading Card"
                draggable={false}
                className="w-full h-auto object-cover pointer-events-none"
              />
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 3. TYPE SPECIMEN "Aa Inter Display" (Draggable)          */}
        {/* ======================================================== */}
        <div
          role="presentation"
          onPointerDown={(e) => handleItemPointerDown(e, "typeSpecimen")}
          onPointerMove={(e) => handleItemPointerMove(e, "typeSpecimen")}
          onPointerUp={(e) => handleItemPointerUp(e, "typeSpecimen")}
          onPointerCancel={(e) => handleItemPointerUp(e, "typeSpecimen")}
          style={{
            transform: `translate3d(${typeSpecimen.x}px, ${typeSpecimen.y}px, 0) rotate(${typeSpecimen.rotate}deg)`,
            zIndex: typeSpecimen.zIndex,
            cursor: activeDragId === "typeSpecimen" ? "grabbing" : "grab",
          }}
          className="absolute top-0 left-0 w-[115px] select-none pointer-events-auto touch-none group hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`w-full p-4 rounded-2xl bg-white dark:bg-[#1c1c1c] border border-stone-200/90 dark:border-stone-800 shadow-[0_14px_30px_rgba(0,0,0,0.11)] dark:shadow-[0_14px_30px_rgba(0,0,0,0.40)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeDragId === "typeSpecimen"
                  ? ""
                  : "group-hover:scale-[1.04] group-hover:rotate-3 group-hover:-translate-y-2"
              }`}
            >
              <h2 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 pointer-events-none">
                Aa
              </h2>
              <p className="text-[10px] font-medium text-stone-500 dark:text-stone-400 mt-1 pointer-events-none">
                Inter Display
              </p>
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 4. SPOTIFY PLAYER (Fixed on desk - NOT draggable)        */}
        {/* ======================================================== */}
        <div
          style={{
            transform: `translate3d(${spotify.x}px, ${spotify.y}px, 0) rotate(${spotify.rotate}deg)`,
            zIndex: spotify.zIndex,
          }}
          className="absolute top-0 left-0 w-[290px] h-[80px] select-none pointer-events-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full rounded-2xl overflow-hidden shadow-[0_14px_32px_rgba(0,0,0,0.18)] dark:shadow-[0_14px_32px_rgba(0,0,0,0.45)]"
          >
            <iframe
              style={{ height: "100%", width: "100%" }}
              src="https://open.spotify.com/embed/track/0gSLaX91J2Cs9cWXqsRc4X?theme=0"
              frameBorder="0"
              allow="encrypted-media"
            />
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 5. MACBOOK PRO LID (Individually Draggable)              */}
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
          className="absolute top-0 left-0 w-[250px] select-none pointer-events-auto touch-none group hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`drop-shadow-[0_20px_32px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_20px_32px_rgba(0,0,0,0.55)] pointer-events-none transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeDragId === "macbook"
                  ? ""
                  : "group-hover:scale-[1.04] group-hover:-rotate-3 group-hover:-translate-y-2"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://framerusercontent.com/images/EQzY5FH98ov3nqo9co607dry8.png"
                alt="MacBook Pro"
                draggable={false}
                className="w-full h-auto object-cover pointer-events-none"
              />
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 6. IPHONE DEVICE MOCK (Individually Draggable)            */}
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
          className="absolute top-0 left-0 w-[95px] select-none pointer-events-auto touch-none group hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`drop-shadow-[0_18px_28px_rgba(0,0,0,0.22)] dark:drop-shadow-[0_18px_28px_rgba(0,0,0,0.50)] pointer-events-none transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeDragId === "iphone"
                  ? ""
                  : "group-hover:scale-[1.04] group-hover:rotate-3 group-hover:-translate-y-2"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://framerusercontent.com/images/OvtWqHArnwUDJ7xv9wA3btBTyJI.png"
                alt="iPhone"
                draggable={false}
                className="w-full h-auto object-cover pointer-events-none"
              />
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 7. PROFILE PHOTO PRINT (Individually Draggable)          */}
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
          className="absolute top-0 left-0 w-[115px] select-none pointer-events-auto touch-none group hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`w-full p-1.5 rounded-2xl bg-white dark:bg-[#252525] border border-stone-200 dark:border-stone-700 shadow-[0_14px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_14px_30px_rgba(0,0,0,0.40)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeDragId === "profilePhoto"
                  ? ""
                  : "group-hover:scale-[1.04] group-hover:-rotate-3 group-hover:-translate-y-2"
              }`}
            >
              <div className="aspect-square w-full rounded-xl overflow-hidden pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://framerusercontent.com/images/adCSELRcqpcgk3XZb5PlodjPsM.jpg"
                  alt="Oscar Bergman"
                  draggable={false}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 8. POLAROID CARD - BULGARIA (Individually Draggable)     */}
        {/* ======================================================== */}
        <div
          role="presentation"
          onPointerDown={(e) => handleItemPointerDown(e, "polaroid")}
          onPointerMove={(e) => handleItemPointerMove(e, "polaroid")}
          onPointerUp={(e) => handleItemPointerUp(e, "polaroid")}
          onPointerCancel={(e) => handleItemPointerUp(e, "polaroid")}
          style={{
            transform: `translate3d(${polaroid.x}px, ${polaroid.y}px, 0) rotate(${polaroid.rotate}deg)`,
            zIndex: polaroid.zIndex,
            cursor: activeDragId === "polaroid" ? "grabbing" : "grab",
          }}
          className="absolute top-0 left-0 w-[240px] select-none pointer-events-auto touch-none group hover:z-30"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`w-full p-3 pb-5 rounded-2xl bg-white dark:bg-[#1c1c1c] border border-stone-200/90 dark:border-stone-800 shadow-[0_16px_36px_rgba(0,0,0,0.14)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.45)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeDragId === "polaroid"
                  ? ""
                  : "group-hover:scale-[1.04] group-hover:rotate-3 group-hover:-translate-y-2"
              }`}
            >
              <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 mb-3 pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://framerusercontent.com/images/n3H51i3cAzn9ZHVAnFJYeEtNQQg.jpg"
                  alt="Bulgaria"
                  draggable={false}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
              <p
                className="text-center text-sm sm:text-base text-stone-700 dark:text-stone-300 font-medium pointer-events-none"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                Last trip, Bulgaria, 2026
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
