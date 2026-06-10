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
    create: async (data: Partial<SkillCategory>) => {
        return apiClient.post<SkillCategory>("/skill-categories", data) as any as Promise<SkillCategory>;
    },
    update: async (uid: string, data: Partial<SkillCategory>) => {
        return apiClient.put<SkillCategory>(`/skill-categories/${uid}`, data) as any as Promise<SkillCategory>;
    },
    delete: async (uid: string) => {
        return apiClient.delete(`/skill-categories/${uid}`) as any as Promise<void>;
    },
};
