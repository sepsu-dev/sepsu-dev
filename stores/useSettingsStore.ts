import { create } from "zustand";
import { LandingSettings } from "@/types/settings";
import { INITIAL_LANDING_SETTINGS } from "@/app/(backend)/api/settings/query";

interface SettingsState {
  settings: LandingSettings;
  isLoading: boolean;
  error: string | null;
  fetchSettings: () => Promise<void>;
  updateSettings: (newSettings: Partial<LandingSettings>) => Promise<boolean>;
  setSettingsLocally: (settings: LandingSettings | ((prev: LandingSettings) => LandingSettings)) => void;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: INITIAL_LANDING_SETTINGS,
  isLoading: false,
  error: null,

  fetchSettings: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/settings");
      const json = await res.json();
      if (res.ok && json.status === "success" && json.data) {
        set({ settings: json.data, isLoading: false });
      } else {
        set({ error: json.message || "Failed to load settings", isLoading: false });
      }
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Network error",
        isLoading: false,
      });
    }
  },

  updateSettings: async (partialSettings: Partial<LandingSettings>) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partialSettings),
      });
      const json = await res.json();
      if (res.ok && json.status === "success" && json.data) {
        set({ settings: json.data, isLoading: false });
        return true;
      } else {
        set({ error: json.message || "Failed to update settings", isLoading: false });
        return false;
      }
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Network error",
        isLoading: false,
      });
      return false;
    }
  },

  setSettingsLocally: (updater) => {
    if (typeof updater === "function") {
      set({ settings: updater(get().settings) });
    } else {
      set({ settings: updater });
    }
  },
}));
