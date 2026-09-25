export interface ProfileSkillCategory {
  category: string;
  items: string[];
}

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  bio: string;
  status: string;
  email: string;
  github: string;
  skills: ProfileSkillCategory[];
}
