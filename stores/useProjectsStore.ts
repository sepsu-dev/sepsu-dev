import { create } from "zustand";
import { ProjectItem } from "@/types/projects";
import { DUMMY_PROJECTS } from "@/types/projects";

interface ProjectsState {
  projects: ProjectItem[];
  isLoading: boolean;
  error: string | null;
  selectedProject: ProjectItem | null;

  fetchProjects: (page?: number, limit?: number) => Promise<void>;
  fetchProjectBySlug: (slug: string) => Promise<ProjectItem | null>;
  addProject: (project: ProjectItem) => void;
  updateProject: (slug: string, updated: Partial<ProjectItem>) => void;
  deleteProject: (slug: string) => void;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: DUMMY_PROJECTS,
  isLoading: false,
  error: null,
  selectedProject: null,

  fetchProjects: async (page = 1, limit = 10) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`/api/projects?page=${page}&limit=${limit}`);
      const json = await res.json();
      if (res.ok && json.status === "success" && json.data) {
        set({ projects: json.data, isLoading: false });
      } else {
        set({ error: json.message || "Failed to load projects", isLoading: false });
      }
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Network error",
        isLoading: false,
      });
    }
  },

  fetchProjectBySlug: async (slug: string) => {
    // Check locally first
    const existing = get().projects.find((p) => p.slug === slug);
    if (existing) {
      set({ selectedProject: existing });
      return existing;
    }

    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`/api/projects/${slug}`);
      const json = await res.json();
      if (res.ok && json.status === "success" && json.data) {
        set({ selectedProject: json.data, isLoading: false });
        return json.data;
      } else {
        set({ error: json.message || "Project not found", isLoading: false });
        return null;
      }
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Network error",
        isLoading: false,
      });
      return null;
    }
  },

  addProject: (project) => {
    set((state) => ({
      projects: [project, ...state.projects],
    }));
  },

  updateProject: (slug, updated) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.slug === slug ? { ...p, ...updated } : p
      ),
      selectedProject:
        state.selectedProject?.slug === slug
          ? { ...state.selectedProject, ...updated }
          : state.selectedProject,
    }));
  },

  deleteProject: (slug) => {
    set((state) => ({
      projects: state.projects.filter((p) => p.slug !== slug),
      selectedProject:
        state.selectedProject?.slug === slug ? null : state.selectedProject,
    }));
  },
}));
