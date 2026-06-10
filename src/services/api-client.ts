import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/api";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
    },
});

import Cookies from "js-cookie";

// Interceptor for Auth Token
apiClient.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = Cookies.get("admin_token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Stores the last API message for cases where data is null/primitive
 * (e.g. DELETE returns { message, data: null }).
 */
let lastApiMessage: string | undefined;

export function getLastApiMessage(): string | undefined {
    return lastApiMessage;
}

// Interceptor for Response Data Extraction
// Backend returns { success, message, data }
// We extract .data and preserve .message via _message injection
apiClient.interceptors.response.use(
    (response) => {
        if (response.data && Object.prototype.hasOwnProperty.call(response.data, "data")) {
            const apiMessage: string | undefined = response.data.message;
            if (apiMessage) {
                lastApiMessage = apiMessage;
            }

            const returnedData = response.data.data;

            // Inject _message into object data for easy access
            if (apiMessage && returnedData !== null && typeof returnedData === 'object') {
                returnedData._message = apiMessage;
            }

            const meta = response.data.meta || (returnedData && typeof returnedData === 'object' && !Array.isArray(returnedData) ? returnedData.meta : undefined);
            if (meta && returnedData !== null && typeof returnedData === 'object') {
                returnedData._meta = meta;
            }
            return returnedData;
        }
        return response.data;
    },
    (error) => {
        console.error("API Error:", {
            status: error.response?.status,
            message: error.response?.data?.message || error.message,
            url: error.config?.url,
        });

        if (error.response?.status === 401) {
            if (typeof window !== "undefined") {
                Cookies.remove("admin_token");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);