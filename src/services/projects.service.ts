import { apiClient } from "./api-client";
import { Project } from "@/types/api";

export const projectsService = {
    getAll: async (params?: { page?: number; limit?: number }) => {
        return apiClient.get<Project[]>("/projects", { params }) as any as Promise<Project[]>;
    },

    getById: async (uid: string) => {
        return apiClient.get<Project>(`/projects/${uid}`) as any as Promise<Project>;
    },

    create: async (data: Partial<Project>) => {
        return apiClient.post<Project>("/projects", data) as any as Promise<Project>;
    },

    update: async (uid: string, data: Partial<Project>) => {
        return apiClient.put<Project>(`/projects/${uid}`, data) as any as Promise<Project>;
    },

    delete: async (uid: string) => {
        return apiClient.delete(`/projects/${uid}`);
    },

    addSkill: async (uid: string, skillUid: string) => {
        return apiClient.post(`/projects/${uid}/skills`, { skill_uid: skillUid });
    },

    removeSkill: async (uid: string, skillUid: string) => {
        return apiClient.delete(`/projects/${uid}/skills/${skillUid}`);
    },
};
