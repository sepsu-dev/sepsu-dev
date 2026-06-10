"use client";

import React, { useState, useEffect } from "react";
import { Skill } from "@/types/api";
import { useRouter } from "next/navigation";
import { skillCategoriesService } from "@/services";

interface SkillFormProps {
    initialData?: Partial<Skill>;
    onSubmit: (data: Partial<Skill>) => Promise<void>;
    title: string;
}

export function SkillForm({ initialData = {}, onSubmit, title }: SkillFormProps) {
    const router = useRouter();
    const [categories, setCategories] = useState<{ uid: string; name: string }[]>([]);
    const [formData, setFormData] = useState<Record<string, any>>({
        name: "",
        category_uid: "",
        icon: "",
        ...initialData,
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const cats = await skillCategoriesService.getAll();
                setCategories(Array.isArray(cats) ? cats : []);
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        }
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await onSubmit(formData);
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
        <div style={{ maxWidth: "500px" }}>
            <h1 style={{ marginBottom: "20px" }}>{title}</h1>

            <form onSubmit={handleSubmit} style={{ background: "#fdfdfd", padding: "20px", border: "1px solid #eee", borderRadius: "8px" }}>
                <h3 style={{ fontSize: "14px", color: "#888", borderBottom: "1px solid #eee", paddingBottom: "10px", marginBottom: "20px" }}>Skill Details</h3>

                <label style={{ fontSize: "13px", color: "#666" }}>
                    Skill Name
                    <input type="text" value={formData.name || ""} style={inputStyle} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </label>

                <label style={{ fontSize: "13px", color: "#666" }}>
                    Category
                    <select value={formData.category_uid || ""} style={inputStyle} onChange={(e) => setFormData({ ...formData, category_uid: e.target.value })}>
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                            <option key={cat.uid} value={cat.uid}>
                                {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                            </option>
                        ))}
                    </select>
                </label>

                <label style={{ fontSize: "13px", color: "#666" }}>
                    Icon (Emoji or URL)
                    <input type="text" value={formData.icon || ""} style={inputStyle} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} />
                </label>

                <div style={{ borderTop: "1px solid #eee", paddingTop: "20px", marginTop: "10px" }}>
                    <button type="submit" disabled={saving} style={buttonStyle}>
                        {saving ? "Saving..." : (formData.uid ? "Save Changes" : "Register Skill")}
                    </button>
                    <button type="button" onClick={() => router.push("/admin/skills")} style={{ ...buttonStyle, background: "none", border: "none", color: "#999" }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}