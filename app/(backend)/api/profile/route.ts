import { getProfile } from "./query";
import { successResponse } from "@/lib/response";

export async function GET() {
  const profile = await getProfile();
  return successResponse(profile);
}
