export interface ProfileSettings {
  avatarUrl: string;
  greeting: string;
  name: string;
  bioParagraph1: string;
  bioParagraph2: string;
  ctaEmail: string;
  ctaText: string;
}

export interface LocationWidgetSettings {
  city: string;
  countryCode: string; // e.g. "ID"
  countryName: string;
  flagColors: {
    top: string;
    bottom: string;
  };
  timeZoneLabel: string; // e.g. "WIB · GMT+7"
}

export interface SportsWidgetSettings {
  show: boolean;
  title: string;
  teamName: string;
  opponentName: string;
  badgeRank: string;
  badgePoints: string;
  venue: string;
  matchDate: string;
}

export interface LandingSettings {
  profile: ProfileSettings;
  locationWidget: LocationWidgetSettings;
  sportsWidget: SportsWidgetSettings;
  techStack: string[];
}
