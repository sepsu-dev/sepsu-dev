import { NextResponse } from "next/server";
import { LandingSettings } from "@/types/settings";
export type { LandingSettings };

// In-memory persistent object for runtime (or fallback)
let currentSettings: LandingSettings = {
  profile: {
    avatarUrl: "/avatar.webp",
    greeting: "Hello, I'm Sepsu.",
    name: "Sepsu Dev",
    bioParagraph1:
      "Welcome to my interactive workbench. Here you can explore selected projects, engineering experiments, and tech stack — feel free to drag cards and rearrange things.",
    bioParagraph2:
      "Want to know more about my experience and journey? Check out the about page.",
    ctaEmail: "sepsu.dev@gmail.com",
    ctaText: "Get in touch",
  },
  locationWidget: {
    city: "Jakarta",
    countryCode: "ID",
    countryName: "Indonesia",
    flagColors: {
      top: "#ff0000",
      bottom: "#ffffff",
    },
    timeZoneLabel: "WIB · GMT+7",
  },
  sportsWidget: {
    show: true,
    title: "Next Match",
    teamName: "Man United",
    opponentName: "Spurs",
    badgeRank: "#12",
    badgePoints: "5 pts",
    venue: "Old Trafford",
    matchDate: "10 Oct · 23.30",
  },
  techStack: [
    "TypeScript",
    "React",
    "Next.js",
    "Vue.js",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "NestJS",
    "Go",
    "Java Spring",
    "PHP Native",
    "Laravel",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Docker",
  ],
};

export async function GET() {
  return NextResponse.json({
    status: "success",
    data: currentSettings,
  });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    currentSettings = {
      ...currentSettings,
      ...body,
      profile: {
        ...currentSettings.profile,
        ...(body.profile || {}),
      },
      locationWidget: {
        ...currentSettings.locationWidget,
        ...(body.locationWidget || {}),
        flagColors: {
          ...currentSettings.locationWidget.flagColors,
          ...(body.locationWidget?.flagColors || {}),
        },
      },
      sportsWidget: {
        ...currentSettings.sportsWidget,
        ...(body.sportsWidget || {}),
      },
    };

    return NextResponse.json({
      status: "success",
      message: "Landing settings updated successfully",
      data: currentSettings,
    });
  } catch {
    return NextResponse.json(
      { status: "error", message: "Failed to update landing settings" },
      { status: 400 }
    );
  }
}
