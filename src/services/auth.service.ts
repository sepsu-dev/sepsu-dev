import { AuthResponse } from "@/types/api";
import Cookies from "js-cookie";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const authService = {
    login: async (credentials: any): Promise<AuthResponse> => {
        await sleep(200);
        // Accept any credentials for dummy mode
        const token = "dummy-jwt-token-" + Date.now();
        Cookies.set("token", token, { expires: 7 });

        return {
            token,
            profile: {
                uid: "prof-001",
                name: "Sepsu Dev",
                email: credentials.email || "sepsu.dev@gmail.com",
            },
        };
    },
    logout: () => {
        Cookies.remove("token");
    },
    isAuthenticated: () => {
        if (typeof window === "undefined") return false;
        return !!Cookies.get("token");
    },
};