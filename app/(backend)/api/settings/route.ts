import SETTINGS from "@/data/settings.json";
import type { LandingSettings } from "@/types/settings";
import { successResponse } from "@/lib/response";

export function GET() {
  return successResponse<LandingSettings>(SETTINGS);
}
