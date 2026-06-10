"use client";

import React, { useEffect, useState } from "react";
import { Project, Skill } from "@/types/api";
import { useRouter } from "next/navigation";
import { skillsService } from "@/services";

interface ProjectFormProps {
    initialData?: Partial<Project>;
    onSubmit: (data: Partial<Project> & { skill_uids: string[] }) => Promise<void>;
    title: string;
}

export function ProjectForm({ initialData = {}, onSubmit, title }: ProjectFormProps) {
    const router = useRouter();
    const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>(
        initialData.skills?.map(s => s.uid) || []
    );
    const [formData, setFormData] = useState<Partial<Project>>({
        title: "",
        subtitle: "",
        overview: "",
        architecture: "",
        image_url: "",
        demo_url: "",
        source_url: "",
        is_public: true,
        ...initialData,
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function fetchSkills() {
            try {
                const groups = await skillsService.getAll();
                const all: Skill[] = Object.values(groups)
                .filter((val): val is Skill[] => Array.isArray(val))
                .flat();
                setAvailableSkills(all);
            } catch (error) {
                console.error("Failed to fetch skills", error);
            }
        }
        fetchSkills();
    }, []);

    const toggleSkill = (uid: string) => {
        setSelectedSkills(prev =>
            prev.includes(uid) ? prev.filter(id => id !== uid) : [...prev, uid]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await onSubmit({ ...formData, skill_uids: selectedSkills });
        } finally {
            setSaving(false);
        }
    };

    const inputStyle = {
        width: "100%",
        padding: "8px",
        marginTop: "4px",
        marginBottom: "16px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxSizing: "border-box" as const,
        fontSize: "14px"
    };

    const buttonStyle = {
        padding: "8px 20px",
        background: "#f0f0f0",
        border: "1px solid #ccc",
        borderRadius: "4px",
        color: "#333",
        fontSize: "14px",
        cursor: "pointer",
        marginRight: "10px"
    };

    return (
        <div style={{ maxWidth: "700px" }}>
            <h1 style={{ marginBottom: "20px" }}>{title}</h1>

            <form onSubmit={handleSubmit} style={{ background: "#fdfdfd", padding: "20px", border: "1px solid #eee", borderRadius: "8px" }}>
                <h3 style={{ fontSize: "14px", color: "#888", borderBottom: "1px solid #eee", paddingBottom: "10px", marginBottom: "20px" }}>Basic Information</h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                    <label style={{ fontSize: "13px", color: "#666" }}>
                        Project Title
                        <input type="text" value={formData.title || ""} style={inputStyle} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    </label>
                    <label style={{ fontSize: "13px", color: "#666" }}>
                        Subtitle
                        <input type="text" value={formData.subtitle || ""} style={inputStyle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} />
                    </label>
                </div>

                <label style={{ fontSize: "13px", color: "#666" }}>
                    Overview
                    <textarea rows={4} value={formData.overview || ""} style={{ ...inputStyle, resize: "vertical" }} onChange={(e) => setFormData({ ...formData, overview: e.target.value })} />
                </label>

                <h3 style={{ fontSize: "14px", color: "#888", borderBottom: "1px solid #eee", paddingBottom: "10px", marginBottom: "20px", marginTop: "10px" }}>Skills</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px", padding: "10px", background: "#fff", border: "1px solid #eee", borderRadius: "4px" }}>
                    {availableSkills.map((skill) => {
                        const isSelected = selectedSkills.includes(skill.uid);
                        return (
                            <button
                                key={skill.uid}
                                type="button"
                                onClick={() => toggleSkill(skill.uid)}
                                style={{
                                    padding: "4px 10px",
                                    fontSize: "12px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                    background: isSelected ? "#333" : "#fff",
                                    color: isSelected ? "#fff" : "#333",
                                    cursor: "pointer"
                                }}
                            >
                                {skill.name}
                            </button>
                        );
                    })}
                </div>

                <h3 style={{ fontSize: "14px", color: "#888", borderBottom: "1px solid #eee", paddingBottom: "10px", marginBottom: "20px", marginTop: "10px" }}>Links</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                    <label style={{ fontSize: "13px", color: "#666" }}>
                        Image URL
                        <input type="text" value={formData.image_url || ""} style={inputStyle} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} />
                    </label>
                    <label style={{ fontSize: "13px", color: "#666" }}>
                        Demo URL
                        <input type="text" value={formData.demo_url || ""} style={inputStyle} onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })} />
                    </label>
                    <label style={{ fontSize: "13px", color: "#666" }}>
                        Source URL
                        <input type="text" value={formData.source_url || ""} style={inputStyle} onChange={(e) => setFormData({ ...formData, source_url: e.target.value })} />
                    </label>
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label style={{ fontSize: "13px", color: "#666", display: "flex", alignItems: "center", gap: "8px" }}>
                        <input type="checkbox" checked={!!formData.is_public} onChange={(e) => setFormData({ ...formData, is_public: e.target.checked })} />
                        Make this project public
                    </label>
                </div>

                <div style={{ borderTop: "1px solid #eee", paddingTop: "20px" }}>
                    <button type="submit" disabled={saving} style={buttonStyle}>
                        {saving ? "Saving..." : (formData.uid ? "Save Changes" : "Create Project")}
                    </button>
                    <button type="button" onClick={() => router.push("/admin/projects")} style={{ ...buttonStyle, background: "none", border: "none", color: "#999" }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
