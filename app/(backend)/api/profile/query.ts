import type { ProfileData } from "@/types/profile";
import DEFAULT_PROFILE from "@/data/profile.json";

export async function getProfile(): Promise<ProfileData> {
  return DEFAULT_PROFILE;
}
