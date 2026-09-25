import { successResponse } from "@/lib/response";

export async function GET() {
  return successResponse(
    {
      name: "Sepsu Dev API",
      version: "1.0.0",
      status: "online",
      endpoints: {
        auth: "/api/auth",
        projects: "/api/projects",
        projectDetail: "/api/projects/:slug",
        profile: "/api/profile",
        settings: "/api/settings",
        contact: "/api/contact",
      },
      timestamp: new Date().toISOString(),
    },
    { message: "Sepsu Dev API is operational" }
  );
}
