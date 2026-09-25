import { LandingSettings } from "./schema";

export const INITIAL_LANDING_SETTINGS: LandingSettings = {
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

// In-memory dummy data store
let currentSettings: LandingSettings = { ...INITIAL_LANDING_SETTINGS };

export async function getLandingSettings(): Promise<LandingSettings> {
  return currentSettings;
}

export async function updateLandingSettings(
  partial: Partial<LandingSettings>
): Promise<LandingSettings> {
  currentSettings = {
    ...currentSettings,
    ...partial,
    profile: {
      ...currentSettings.profile,
      ...(partial.profile || {}),
    },
    locationWidget: {
      ...currentSettings.locationWidget,
      ...(partial.locationWidget || {}),
      flagColors: {
        ...currentSettings.locationWidget.flagColors,
        ...(partial.locationWidget?.flagColors || {}),
      },
    },
    sportsWidget: {
      ...currentSettings.sportsWidget,
      ...(partial.sportsWidget || {}),
    },
  };

  return currentSettings;
}
