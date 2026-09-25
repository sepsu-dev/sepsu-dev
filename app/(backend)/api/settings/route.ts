import { getLandingSettings, updateLandingSettings } from "./query";
import { successResponse, errorResponse } from "@/lib/response";

export async function GET() {
  const data = await getLandingSettings();
  return successResponse(data);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = await updateLandingSettings(body);

    return successResponse(updated, {
      message: "Landing settings updated successfully",
    });
  } catch {
    return errorResponse("Failed to update landing settings", { status: 400 });
  }
}
