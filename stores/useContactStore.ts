import { create } from "zustand";
import { ContactMessageInput, ContactMessageRecord } from "@/app/(backend)/api/contact/schema";

interface ContactState {
  messages: ContactMessageRecord[];
  isSubmitting: boolean;
  isLoading: boolean;
  submitResult: { type: "success" | "error"; text: string } | null;

  fetchMessages: () => Promise<void>;
  sendMessage: (input: ContactMessageInput) => Promise<boolean>;
  clearSubmitResult: () => void;
}

export const useContactStore = create<ContactState>((set) => ({
  messages: [],
  isSubmitting: false,
  isLoading: false,
  submitResult: null,

  fetchMessages: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/contact");
      const json = await res.json();
      if (res.ok && json.status === "success" && json.data) {
        set({ messages: json.data, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },

  sendMessage: async (input: ContactMessageInput) => {
    set({ isSubmitting: true, submitResult: null });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const json = await res.json();
      if (res.ok && json.status === "success") {
        set((state) => ({
          isSubmitting: false,
          submitResult: {
            type: "success",
            text: json.message || "Message sent successfully!",
          },
          messages: json.data ? [json.data, ...state.messages] : state.messages,
        }));
        return true;
      } else {
        set({
          isSubmitting: false,
          submitResult: {
            type: "error",
            text: json.message || "Failed to send message.",
          },
        });
        return false;
      }
    } catch {
      set({
        isSubmitting: false,
        submitResult: {
          type: "error",
          text: "Network error. Please try again later.",
        },
      });
      return false;
    }
  },

  clearSubmitResult: () => set({ submitResult: null }),
}));
