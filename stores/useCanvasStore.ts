import { create } from "zustand";

export interface ItemState {
  x: number;
  y: number;
  rotate: number;
  zIndex: number;
}

interface CanvasState {
  // Panning & Zooming
  pan: { x: number; y: number };
  scale: number;
  isPanning: boolean;
  showZoomHud: boolean;

  // Items State (Draggable desk cards)
  items: Record<string, ItemState>;
  activeDragId: string | null;
  maxZIndex: number;

  // Actions
  setPan: (pan: { x: number; y: number } | ((prev: { x: number; y: number }) => { x: number; y: number })) => void;
  setScale: (scale: number | ((prev: number) => number)) => void;
  setIsPanning: (isPanning: boolean) => void;
  setShowZoomHud: (show: boolean) => void;
  setItems: (items: Record<string, ItemState> | ((prev: Record<string, ItemState>) => Record<string, ItemState>)) => void;
  updateItemPosition: (id: string, x: number, y: number) => void;
  bringToFront: (id: string) => void;
  setActiveDragId: (id: string | null) => void;
  resetCanvas: () => void;
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  pan: { x: 0, y: 0 },
  scale: 1,
  isPanning: false,
  showZoomHud: false,
  items: {},
  activeDragId: null,
  maxZIndex: 25,

  setPan: (updater) => {
    set((state) => ({
      pan: typeof updater === "function" ? updater(state.pan) : updater,
    }));
  },

  setScale: (updater) => {
    set((state) => ({
      scale: typeof updater === "function" ? updater(state.scale) : updater,
    }));
  },

  setIsPanning: (isPanning) => set({ isPanning }),
  setShowZoomHud: (showZoomHud) => set({ showZoomHud }),

  setItems: (updater) => {
    set((state) => ({
      items: typeof updater === "function" ? updater(state.items) : updater,
    }));
  },

  updateItemPosition: (id, x, y) => {
    set((state) => ({
      items: {
        ...state.items,
        [id]: {
          ...(state.items[id] || { rotate: 0, zIndex: 10 }),
          x,
          y,
        },
      },
    }));
  },

  bringToFront: (id) => {
    const nextZ = get().maxZIndex + 1;
    set((state) => ({
      maxZIndex: nextZ,
      items: {
        ...state.items,
        [id]: {
          ...(state.items[id] || { x: 0, y: 0, rotate: 0 }),
          zIndex: nextZ,
        },
      },
    }));
  },

  setActiveDragId: (id) => set({ activeDragId: id }),

  resetCanvas: () => {
    set({
      pan: { x: 0, y: 0 },
      scale: 1,
      showZoomHud: true,
    });
  },
}));
