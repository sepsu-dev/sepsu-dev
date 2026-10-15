import { create } from "zustand";
import type { LandingSettings } from "@/types/settings";
import DEFAULT_SETTINGS from "@/data/settings.json";

interface SettingsState {
  settings: LandingSettings;
  isLoading: boolean;
  error: string | null;
  fetchSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: DEFAULT_SETTINGS,
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
}));
