import { Profile } from "@/types/api";

// ── Dummy data ──────────────────────────────────────────────
let profile: Profile = {
    uid: "prof-001",
    name: "Sepsu Dev",
    email: "sepsu.dev@gmail.com",
    title: "Full-stack Engineer | Open Source Contributor",
    location: "Jakarta, Indonesia",
    bio: "Full-stack engineer with 3+ years of experience building reliable backends and modern web applications. Focused on delivering clean, maintainable code with pragmatic architecture. Experienced in end-to-end product development, from API design to frontend deployment.",
    image_url: "/profile-sketch.png",
    github_url: "https://github.com/sepsu-dev",
    focus: [
        "⚡ Building performant APIs and backend services with Go and Node.js",
        "⚛️ Developing interactive web applications with React and Next.js",
        "🐳 Deploying and managing applications with Docker and CI/CD pipelines",
    ],
};

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const profileService = {
    get: async (): Promise<Profile> => {
        await sleep(50);
        return { ...profile };
    },
    update: async (data: Partial<Profile>): Promise<Profile> => {
        await sleep(100);
        profile = { ...profile, ...data, uid: profile.uid };
        const result = { ...profile };
        (result as any)._message = "Profile updated successfully";
        return result;
    },
    changePassword: async (data: any): Promise<any> => {
        await sleep(100);
        return { _message: "Password changed successfully" };
    },
};