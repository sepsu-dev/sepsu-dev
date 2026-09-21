import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "online",
    name: "Sepsu Dev API",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      projects: "/api/projects",
      projectDetail: "/api/projects/:slug",
      profile: "/api/profile",
      settings: "/api/settings",
      contact: "/api/contact",
    },
    timestamp: new Date().toISOString(),
  });
}
