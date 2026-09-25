import { create } from "zustand";
import { ProfileData } from "@/app/(backend)/api/profile/schema";
import { DUMMY_PROFILE } from "@/app/(backend)/api/profile/query";

interface ProfileState {
  profile: ProfileData;
  isLoading: boolean;
  error: string | null;

  fetchProfile: () => Promise<void>;
  updateProfileLocally: (updater: Partial<ProfileData> | ((prev: ProfileData) => ProfileData)) => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: DUMMY_PROFILE,
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/profile");
      const json = await res.json();
      if (res.ok && json.status === "success" && json.data) {
        set({ profile: json.data, isLoading: false });
      } else {
        set({ error: json.message || "Failed to load profile", isLoading: false });
      }
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Network error",
        isLoading: false,
      });
    }
  },

  updateProfileLocally: (updater) => {
    if (typeof updater === "function") {
      set({ profile: updater(get().profile) });
    } else {
      set((state) => ({
        profile: { ...state.profile, ...updater },
      }));
    }
  },
}));
