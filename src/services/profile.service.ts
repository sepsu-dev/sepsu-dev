import { apiClient } from "./api-client";
import { Profile } from "@/types/api";

export const profileService = {
    get: async () => {
        return apiClient.get<Profile>("/profile") as any as Promise<Profile>;
    },

    update: async (data: Partial<Profile>) => {
        return apiClient.put<Profile>("/profile", data) as any as Promise<Profile>;
    },

    changePassword: async (data: any) => {
        return apiClient.put("/profile/change-password", data);
    },
};
