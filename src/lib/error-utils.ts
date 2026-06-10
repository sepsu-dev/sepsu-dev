import React from "react";
import { getLastApiMessage } from "@/services/api-client";

// ─── Parsed error result for toast display ───────────────────────────────

export interface ParsedError {
    /** Main error message (e.g. "Validation failed") */
    title: string;
    /** Optional detail lines (field-level errors), rendered as multiline JSX */
    description?: React.ReactNode;
}

// ─── Helpers ─────────────────────────────────────────────────────────────

interface ApiErrorItem {
    path?: string;
    message?: string;
}

function getErrorResponseData(error: unknown): {
    message?: string;
    error?: ApiErrorItem[];
} | null {
    if (!error || typeof error !== "object") return null;
    const e = error as any;
    return e?.response?.data ?? null;
}

// ─── Public API ──────────────────────────────────────────────────────────

/**
 * Parses an API error into a toast-friendly format.
 *
 * Backend format:
 *   { message: "Validation failed", error: [{ path: "body.email", message: "Invalid email" }] }
 *
 * - `title` = top-level `message`
 * - `description` = field-level error messages, each on a new line
 */
export function parseErrorMessage(error: unknown, fallback = "Terjadi kesalahan"): ParsedError {
    const data = getErrorResponseData(error);

    if (data) {
        const title = data.message ?? fallback;
        const details = data.error
            ?.map((e) => {
                const label = e.path ? e.path.replace(/^body\./, "") : null;
                return label ? `${label} : ${e.message}` : (e.message ?? null);
            })
            .filter(Boolean) as string[] | undefined;

        if (details && details.length > 0) {
            return {
                title,
                description: React.createElement(
                    React.Fragment,
                    null,
                    ...details.flatMap((line, i) => [
                        i > 0 ? React.createElement("br", { key: `br-${i}` }) : null,
                        `- ${line}`,
                    ].filter(Boolean)),
                ),
            };
        }

        return { title };
    }

    // Standard Error.message
    if (error instanceof Error && error.message) {
        return { title: error.message };
    }

    return { title: fallback };
}

/**
 * Convenience: extracts a single-line error string (for non-toast usage).
 */
export function extractErrorMessage(error: unknown, fallback = "Terjadi kesalahan"): string {
    return parseErrorMessage(error, fallback).title;
}

/**
 * Extracts field-level validation errors from the API response.
 * Backend format: response.data.error = [{ path: "body.email", message: "Invalid email" }]
 *
 * Returns a Record mapping field names (e.g. "email") to error messages.
 */
export function extractFieldErrors(error: unknown): Record<string, string> | undefined {
    if (!error || typeof error !== "object") return undefined;

    const apiError = error as any;
    const errorArray: Array<{ path?: string; message?: string }> | undefined =
        apiError?.response?.data?.error;

    if (!Array.isArray(errorArray) || errorArray.length === 0) return undefined;

    const result: Record<string, string> = {};
    for (const item of errorArray) {
        if (item.message) {
            // Use full path as field key (e.g. "body.email")
            const field = item.path || "_form";
            result[field] = item.message;
        }
    }
    return Object.keys(result).length > 0 ? result : undefined;
}

/**
 * Formats field-level errors into a single string for toast display.
 */
export function formatFieldErrorsForToast(fieldErrors: Record<string, string> | undefined): string {
    if (!fieldErrors || Object.keys(fieldErrors).length === 0) return "";
    return Object.entries(fieldErrors)
        .map(([field, msg]) => `${field}: ${msg}`)
        .join("\n");
}

/**
 * Extracts the success message from an API response.
 * For object responses, checks `_message` injected by the interceptor.
 * For null/primitive responses (e.g. DELETE), uses `getLastApiMessage()`.
 * Falls back to the provided default.
 */
export function extractSuccessMessage(result: unknown, fallback?: string): string {
    if (result && typeof result === "object" && "_message" in (result as Record<string, unknown>)) {
        return (result as any)._message as string;
    }

    const lastMessage = getLastApiMessage();
    if (lastMessage) return lastMessage;

    return fallback || "Berhasil";
}