import { apiClient } from "./api-client";
import { Skill, SkillGroup } from "@/types/api";

export const skillsService = {
    getAll: async () => {
        return apiClient.get<SkillGroup>("/skills") as any as Promise<SkillGroup>;
    },

    getById: async (uid: string) => {
        return apiClient.get<Skill>(`/skills/${uid}`) as any as Promise<Skill>;
    },

    create: async (data: Partial<Skill>) => {
        return apiClient.post<Skill>("/skills", data) as any as Promise<Skill>;
    },

    update: async (uid: string, data: Partial<Skill>) => {
        return apiClient.put<Skill>(`/skills/${uid}`, data) as any as Promise<Skill>;
    },

    delete: async (uid: string) => {
        return apiClient.delete(`/skills/${uid}`);
    },
};
