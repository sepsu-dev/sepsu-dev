import { apiClient } from "./api-client";
import { AuthResponse } from "@/types/api";

import Cookies from "js-cookie";

export const authService = {
    login: async (credentials: any) => {
        const data = (await apiClient.post<AuthResponse>("/auth/login", credentials)) as any as AuthResponse;
        if (data.token) {
            Cookies.set("admin_token", data.token, { expires: 7 }); // Expires in 7 days
        }
        return data;
    },

    logout: () => {
        Cookies.remove("admin_token");
    },

    isAuthenticated: () => {
        if (typeof window === "undefined") return false;
        return !!Cookies.get("admin_token");
    },
};
