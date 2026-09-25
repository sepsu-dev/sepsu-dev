"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  FolderGit2,
  Sliders,
  Mail,
  User,
  Check,
  Save,
  Trash2,
  Plus,
  ArrowUpRight,
  Code2,
} from "lucide-react";
import TechIcon, { AVAILABLE_TECH_ICONS } from "@/components/TechIcon";
import { useSettingsStore, useProjectsStore, useProfileStore } from "@/stores";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"projects" | "brand" | "widgets" | "stack" | "contact">("projects");
  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  // Zustand Stores
  const {
    settings: landingSettings,
    fetchSettings,
    updateSettings,
    setSettingsLocally: setLandingSettings,
  } = useSettingsStore();

  const {
    projects: projectsList,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
  } = useProjectsStore();

  const {
    profile,
    fetchProfile,
    updateProfileLocally,
  } = useProfileStore();

  useEffect(() => {
    fetchSettings();
    fetchProjects();
    fetchProfile();
  }, [fetchSettings, fetchProjects, fetchProfile]);

  const saveLandingSettings = async (customMsg?: string) => {
    const success = await updateSettings(landingSettings);
    if (success) {
      triggerSaveNotification(customMsg || "Pengaturan landing page berhasil disimpan!");
    } else {
      triggerSaveNotification("Gagal menyimpan pengaturan");
    }
  };

  // Editable Brand / Profile State
  const brand = {
    name: profile.name,
    tagline: profile.title,
    bio: profile.bio,
    location: profile.location,
    statusText: profile.status,
  };

  const setBrand = (newBrand: Partial<typeof brand>) => {
    updateProfileLocally({
      ...(newBrand.name ? { name: newBrand.name } : {}),
      ...(newBrand.tagline ? { title: newBrand.tagline } : {}),
      ...(newBrand.bio ? { bio: newBrand.bio } : {}),
      ...(newBrand.location ? { location: newBrand.location } : {}),
      ...(newBrand.statusText ? { status: newBrand.statusText } : {}),
    });
  };

  // Editable Contact Info
  const contact = {
    email: profile.email,
    github: profile.github,
  };

  const setContact = (newContact: Partial<typeof contact>) => {
    updateProfileLocally({
      ...(newContact.email ? { email: newContact.email } : {}),
      ...(newContact.github ? { github: newContact.github } : {}),
    });
  };

  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editProjectData, setEditProjectData] = useState<{
    slug: string;
    title: string;
    category: string;
    year: string;
    liveUrl: string;
  } | null>(null);

  const [newProject, setNewProject] = useState({
    slug: "",
    title: "",
    category: "",
    year: "2024",
    liveUrl: "https://",
  });

  const triggerSaveNotification = (msg: string) => {
    setSavedStatus(msg);
    setTimeout(() => setSavedStatus(null), 2500);
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/login");
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.slug || !newProject.title) return;
    addProject({
      ...newProject,
      tagline: newProject.category,
      role: "Software Engineer",
      stack: ["React", "TypeScript"],
      description: `${newProject.title} project.`,
      mainImage: "/projects/cryptix-main.webp",
      problemStatement: "",
      outcome: "",
      objectives: [],
      kpiLabel: "Result",
      kpiValue: "Complete",
      secondaryImages: [],
      tags: [newProject.category],
    });
    setNewProject({ slug: "", title: "", category: "", year: "2024", liveUrl: "https://" });
    triggerSaveNotification("Project added successfully!");
  };

  const startEditProject = (p: typeof projectsList[0]) => {
    setEditingSlug(p.slug);
    setEditProjectData({
      slug: p.slug,
      title: p.title,
      category: p.category,
      year: p.year,
      liveUrl: p.liveUrl,
    });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProjectData || !editingSlug) return;
    updateProject(editingSlug, editProjectData);
    setEditingSlug(null);
    setEditProjectData(null);
    triggerSaveNotification("Project berhasil diperbarui!");
  };

  const handleCancelEdit = () => {
    setEditingSlug(null);
    setEditProjectData(null);
  };

  const handleDeleteProject = (slug: string) => {
    if (editingSlug === slug) {
      handleCancelEdit();
    }
    deleteProject(slug);
    triggerSaveNotification("Project deleted");
  };

  return (
    <main className="w-full min-h-screen bg-white dark:bg-[#121212] text-stone-900 dark:text-stone-100 px-4 py-8 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <span className="text-base font-semibold">#####</span>
        </div>

        <div className="flex items-center gap-3">
          {savedStatus && (
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
              {savedStatus}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="text-xs font-mono text-stone-500 hover:text-red-500 transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 text-xs font-mono border-b border-stone-100 dark:border-stone-800/60 pb-2">
        <button
          onClick={() => setActiveTab("projects")}
          className={`cursor-pointer pb-1 transition-colors ${activeTab === "projects"
            ? "font-semibold text-stone-900 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100"
            : "text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
            }`}
        >
          Projects ({projectsList.length})
        </button>
        <button
          onClick={() => setActiveTab("brand")}
          className={`cursor-pointer pb-1 transition-colors ${activeTab === "brand"
            ? "font-semibold text-stone-900 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100"
            : "text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
            }`}
        >
          Landing Bio & Intro
        </button>
        <button
          onClick={() => setActiveTab("widgets")}
          className={`cursor-pointer pb-1 transition-colors ${activeTab === "widgets"
            ? "font-semibold text-stone-900 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100"
            : "text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
            }`}
        >
          Widgets (Bendera, Lokasi & Match)
        </button>
        <button
          onClick={() => setActiveTab("stack")}
          className={`cursor-pointer pb-1 transition-colors ${activeTab === "stack"
            ? "font-semibold text-stone-900 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100"
            : "text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
            }`}
        >
          Tech Stack ({landingSettings.techStack?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab("contact")}
          className={`cursor-pointer pb-1 transition-colors ${activeTab === "contact"
            ? "font-semibold text-stone-900 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100"
            : "text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
            }`}
        >
          Kontak
        </button>
      </div>

      {/* TAB 1: PROJECTS */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          {/* Projects List */}
          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {projectsList.map((p) => {
              const isEditing = editingSlug === p.slug;

              if (isEditing && editProjectData) {
                return (
                  <form
                    key={p.slug}
                    onSubmit={handleSaveEdit}
                    className="py-3 space-y-2 bg-stone-50/50 dark:bg-stone-900/20 p-3 rounded-lg border border-stone-200 dark:border-stone-800 my-1"
                  >
                    <div className="text-xs font-mono font-medium text-stone-500">
                      Edit Proyek: {p.title}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        required
                        value={editProjectData.title}
                        onChange={(e) =>
                          setEditProjectData({ ...editProjectData, title: e.target.value })
                        }
                        placeholder="Nama Proyek"
                        className="px-2.5 py-1.5 rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs focus:outline-none"
                      />
                      <input
                        type="text"
                        required
                        value={editProjectData.slug}
                        onChange={(e) =>
                          setEditProjectData({ ...editProjectData, slug: e.target.value })
                        }
                        placeholder="Slug"
                        className="px-2.5 py-1.5 rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs font-mono focus:outline-none"
                      />
                      <input
                        type="text"
                        value={editProjectData.category}
                        onChange={(e) =>
                          setEditProjectData({ ...editProjectData, category: e.target.value })
                        }
                        placeholder="Kategori"
                        className="px-2.5 py-1.5 rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="submit"
                        className="py-1 px-2.5 rounded-md bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer"
                      >
                        Simpan
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="py-1 px-2.5 rounded-md text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                );
              }

              return (
                <div key={p.slug} className="py-2.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{p.title}</span>
                    <span className="text-xs text-stone-400 font-mono">({p.category})</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => startEditProject(p)}
                      className="text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <a
                      href={`/project/${p.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                    >
                      Buka ↗
                    </a>
                    <button
                      onClick={() => handleDeleteProject(p.slug)}
                      className="text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Project */}
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-mono">
              Tambah Proyek
            </h2>
            <form onSubmit={handleAddProject} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                required
                placeholder="Nama Proyek (e.g. Acme)"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    title: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                  })
                }
                className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-xs focus:outline-none focus:border-stone-400"
              />
              <input
                type="text"
                required
                placeholder="Slug (e.g. acme)"
                value={newProject.slug}
                onChange={(e) => setNewProject({ ...newProject, slug: e.target.value })}
                className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-xs font-mono focus:outline-none focus:border-stone-400"
              />
              <input
                type="text"
                placeholder="Kategori (e.g. Web App)"
                value={newProject.category}
                onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-xs focus:outline-none focus:border-stone-400"
              />
              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="py-1.5 px-3 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer"
                >
                  + Tambah Proyek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: BRAND & PROFIL */}
      {activeTab === "brand" && (
        <div className="space-y-4 max-w-lg">
          <div className="space-y-1">
            <label className="text-xs text-stone-500">Avatar Photo URL / Path</label>
            <input
              type="text"
              value={landingSettings.profile.avatarUrl}
              onChange={(e) =>
                setLandingSettings({
                  ...landingSettings,
                  profile: { ...landingSettings.profile, avatarUrl: e.target.value },
                })
              }
              placeholder="/avatar.webp"
              className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-xs font-mono focus:outline-none focus:border-stone-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-stone-500">Greeting / Headline</label>
            <input
              type="text"
              value={landingSettings.profile.greeting}
              onChange={(e) =>
                setLandingSettings({
                  ...landingSettings,
                  profile: { ...landingSettings.profile, greeting: e.target.value },
                })
              }
              placeholder="Hello, I'm Sepsu."
              className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-xs focus:outline-none focus:border-stone-400 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-stone-500">Nama Lengkap / Brand</label>
            <input
              type="text"
              value={landingSettings.profile.name}
              onChange={(e) =>
                setLandingSettings({
                  ...landingSettings,
                  profile: { ...landingSettings.profile, name: e.target.value },
                })
              }
              className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-xs focus:outline-none focus:border-stone-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-stone-500">Paragraf Bio 1</label>
            <textarea
              rows={3}
              value={landingSettings.profile.bioParagraph1}
              onChange={(e) =>
                setLandingSettings({
                  ...landingSettings,
                  profile: { ...landingSettings.profile, bioParagraph1: e.target.value },
                })
              }
              className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-xs focus:outline-none focus:border-stone-400 resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-stone-500">Paragraf Bio 2 (Link ajakan)</label>
            <textarea
              rows={2}
              value={landingSettings.profile.bioParagraph2}
              onChange={(e) =>
                setLandingSettings({
                  ...landingSettings,
                  profile: { ...landingSettings.profile, bioParagraph2: e.target.value },
                })
              }
              className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-xs focus:outline-none focus:border-stone-400 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-stone-500">Teks Tombol CTA</label>
              <input
                type="text"
                value={landingSettings.profile.ctaText}
                onChange={(e) =>
                  setLandingSettings({
                    ...landingSettings,
                    profile: { ...landingSettings.profile, ctaText: e.target.value },
                  })
                }
                className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-xs focus:outline-none focus:border-stone-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-stone-500">Email CTA</label>
              <input
                type="email"
                value={landingSettings.profile.ctaEmail}
                onChange={(e) =>
                  setLandingSettings({
                    ...landingSettings,
                    profile: { ...landingSettings.profile, ctaEmail: e.target.value },
                  })
                }
                className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-xs font-mono focus:outline-none focus:border-stone-400"
              />
            </div>
          </div>

          <button
            onClick={() => saveLandingSettings("Intro & bio landing page berhasil disimpan!")}
            className="py-1.5 px-3 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer"
          >
            Simpan Intro & Bio
          </button>
        </div>
      )}

      {/* TAB 3: WIDGETS (BENDERA, LOKASI & MATCH) */}
      {activeTab === "widgets" && (
        <div className="space-y-6 max-w-lg">
          {/* Location & Flag Widget */}
          <div className="space-y-3 pb-5 border-b border-stone-100 dark:border-stone-800">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-mono">
              Widget Lokasi & Bendera
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-stone-500">Kota</label>
                <input
                  type="text"
                  value={landingSettings.locationWidget.city}
                  onChange={(e) =>
                    setLandingSettings({
                      ...landingSettings,
                      locationWidget: { ...landingSettings.locationWidget, city: e.target.value },
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-xs focus:outline-none focus:border-stone-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-stone-500">Kode Negara (e.g. ID)</label>
                <input
                  type="text"
                  value={landingSettings.locationWidget.countryCode}
                  onChange={(e) =>
                    setLandingSettings({
                      ...landingSettings,
                      locationWidget: {
                        ...landingSettings.locationWidget,
                        countryCode: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-xs font-mono focus:outline-none focus:border-stone-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-stone-500">Warna Bendera Atas</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={landingSettings.locationWidget.flagColors.top}
                    onChange={(e) =>
                      setLandingSettings({
                        ...landingSettings,
                        locationWidget: {
                          ...landingSettings.locationWidget,
                          flagColors: {
                            ...landingSettings.locationWidget.flagColors,
                            top: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-7 h-7 rounded border border-stone-200 dark:border-stone-700 cursor-pointer bg-transparent"
                  />
                  <span className="text-xs font-mono">
                    {landingSettings.locationWidget.flagColors.top}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-stone-500">Warna Bendera Bawah</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={landingSettings.locationWidget.flagColors.bottom}
                    onChange={(e) =>
                      setLandingSettings({
                        ...landingSettings,
                        locationWidget: {
                          ...landingSettings.locationWidget,
                          flagColors: {
                            ...landingSettings.locationWidget.flagColors,
                            bottom: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-7 h-7 rounded border border-stone-200 dark:border-stone-700 cursor-pointer bg-transparent"
                  />
                  <span className="text-xs font-mono">
                    {landingSettings.locationWidget.flagColors.bottom}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-stone-500">Label Zona Waktu</label>
              <input
                type="text"
                value={landingSettings.locationWidget.timeZoneLabel}
                onChange={(e) =>
                  setLandingSettings({
                    ...landingSettings,
                    locationWidget: {
                      ...landingSettings.locationWidget,
                      timeZoneLabel: e.target.value,
                    },
                  })
                }
                placeholder="WIB · GMT+7"
                className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-xs font-mono focus:outline-none focus:border-stone-400"
              />
            </div>
          </div>

          {/* Sports Match Widget */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-mono">
              Widget Pertandingan Olahraga
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-stone-500">Judul Widget</label>
                <input
                  type="text"
                  value={landingSettings.sportsWidget.title}
                  onChange={(e) =>
                    setLandingSettings({
                      ...landingSettings,
                      sportsWidget: { ...landingSettings.sportsWidget, title: e.target.value },
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-xs focus:outline-none focus:border-stone-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-stone-500">Peringkat & Poin</label>
                <div className="grid grid-cols-2 gap-1.5">
                  <input
                    type="text"
                    value={landingSettings.sportsWidget.badgeRank}
                    onChange={(e) =>
                      setLandingSettings({
                        ...landingSettings,
                        sportsWidget: {
                          ...landingSettings.sportsWidget,
                          badgeRank: e.target.value,
                        },
                      })
                    }
                    placeholder="#12"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-xs font-mono focus:outline-none focus:border-stone-400"
                  />
                  <input
                    type="text"
                    value={landingSettings.sportsWidget.badgePoints}
                    onChange={(e) =>
                      setLandingSettings({
                        ...landingSettings,
                        sportsWidget: {
                          ...landingSettings.sportsWidget,
                          badgePoints: e.target.value,
                        },
                      })
                    }
                    placeholder="5 pts"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-xs font-mono focus:outline-none focus:border-stone-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-stone-500">Tim Tuan Rumah (Home)</label>
                <input
                  type="text"
                  value={landingSettings.sportsWidget.teamName}
                  onChange={(e) =>
                    setLandingSettings({
                      ...landingSettings,
                      sportsWidget: { ...landingSettings.sportsWidget, teamName: e.target.value },
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-xs focus:outline-none focus:border-stone-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-stone-500">Tim Tamu (Away)</label>
                <input
                  type="text"
                  value={landingSettings.sportsWidget.opponentName}
                  onChange={(e) =>
                    setLandingSettings({
                      ...landingSettings,
                      sportsWidget: {
                        ...landingSettings.sportsWidget,
                        opponentName: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-xs focus:outline-none focus:border-stone-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-stone-500">Stadion / Venue</label>
                <input
                  type="text"
                  value={landingSettings.sportsWidget.venue}
                  onChange={(e) =>
                    setLandingSettings({
                      ...landingSettings,
                      sportsWidget: { ...landingSettings.sportsWidget, venue: e.target.value },
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-xs focus:outline-none focus:border-stone-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-stone-500">Jadwal / Waktu</label>
                <input
                  type="text"
                  value={landingSettings.sportsWidget.matchDate}
                  onChange={(e) =>
                    setLandingSettings({
                      ...landingSettings,
                      sportsWidget: { ...landingSettings.sportsWidget, matchDate: e.target.value },
                    })
                  }
                  placeholder="10 Oct · 23.30"
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-xs font-mono focus:outline-none focus:border-stone-400"
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => saveLandingSettings("Widget lokasi & match berhasil disimpan!")}
            className="py-1.5 px-3 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer"
          >
            Simpan Pengaturan Widget
          </button>
        </div>
      )}

      {/* TAB 4: TECH STACK (Master Icon Selector) */}
      {activeTab === "stack" && (
        <div className="space-y-4 max-w-lg">
          <div className="space-y-1">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-mono">
              Pilih Icon Tech Stack
            </h3>
            <p className="text-xs text-stone-500">
              Klik icon untuk mengaktifkan atau menonaktifkan tampilan icon di kartu tech stack landing page.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
            {AVAILABLE_TECH_ICONS.map((techName) => {
              const isActive = (landingSettings.techStack || []).includes(techName);
              return (
                <button
                  type="button"
                  key={techName}
                  onClick={() => {
                    const current = landingSettings.techStack || [];
                    const next = isActive
                      ? current.filter((t) => t !== techName)
                      : [...current, techName];
                    setLandingSettings({ ...landingSettings, techStack: next });
                  }}
                  className={`flex items-center gap-2 p-2 rounded-lg border text-xs text-left cursor-pointer transition-colors ${isActive
                    ? "border-stone-900 dark:border-stone-100 bg-stone-100/80 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium"
                    : "border-stone-200/70 dark:border-stone-800 bg-transparent text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
                    }`}
                >
                  <TechIcon name={techName} size={16} />
                  <span className="truncate">{techName}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={() => saveLandingSettings("Tech stack icon berhasil disimpan!")}
              className="py-1.5 px-3 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer"
            >
              Simpan Pilihan Tech Stack
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: KONTAK */}
      {activeTab === "contact" && (
        <div className="space-y-4 max-w-lg">
          <div className="space-y-1">
            <label className="text-xs text-stone-500">Email Utama</label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-xs font-mono focus:outline-none focus:border-stone-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-stone-500">Link GitHub</label>
            <input
              type="url"
              value={contact.github}
              onChange={(e) => setContact({ ...contact, github: e.target.value })}
              className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-transparent text-xs font-mono focus:outline-none focus:border-stone-400"
            />
          </div>

          <button
            onClick={() => triggerSaveNotification("Kontak berhasil disimpan!")}
            className="py-1.5 px-3 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer"
          >
            Simpan Kontak
          </button>
        </div>
      )}
    </main>
  );
}
