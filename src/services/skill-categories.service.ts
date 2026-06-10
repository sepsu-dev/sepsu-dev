import { apiClient } from "./api-client";

export interface SkillCategory {
    uid: string;
    name: string;
    icon: string;
    created_at?: string;
    updated_at?: string;
}

export const skillCategoriesService = {
    getAll: async () => {
        return apiClient.get<SkillCategory[]>("/skill-categories") as any as Promise<SkillCategory[]>;
    },
};