"use client";

import React, { useState, useEffect } from "react";
import { skillCategoriesService, SkillCategory } from "@/services/skill-categories.service";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { extractSuccessMessage, parseErrorMessage } from "@/lib/error-utils";

export default function EditSkillCategoryPage() {
    const router = useRouter();
    const params = useParams();
    const categoryId = params.category_id as string;

    const [formData, setFormData] = useState({ name: "", icon: "" });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function loadCategory() {
            try {
                const categories = await skillCategoriesService.getAll();
                const found = categories.find((c) => c.uid === categoryId);
                if (found) {
                    setFormData({ name: found.name, icon: found.icon || "" });
                } else {
                    toast.error("Kategori tidak ditemukan");
                    router.push("/admin/skill-categories");
                }
            } catch (error) {
                const parsed = parseErrorMessage(error, "Gagal memuat data kategori");
                toast.error(parsed.title, { description: parsed.description });
            } finally {
                setLoading(false);
            }
        }
        loadCategory();
    }, [categoryId, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await skillCategoriesService.update(categoryId, formData);
            toast.success(extractSuccessMessage(null, "Kategori berhasil diperbarui"));
            router.push("/admin/skill-categories");
        } catch (error) {
            const parsed = parseErrorMessage(error, "Gagal memperbarui kategori");
            toast.error(parsed.title, { description: parsed.description });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px", fontFamily: "sans-serif", color: "#888" }}>
            <span style={{ fontSize: "15px" }}>Memuat data kategori...</span>
        </div>
    );

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
            <h1 style={{ marginBottom: "20px", fontSize: "20px" }}>Edit Skill Category</h1>

            <form onSubmit={handleSubmit} style={{ background: "#fdfdfd", padding: "20px", border: "1px solid #eee", borderRadius: "8px" }}>
                <h3 style={{ fontSize: "14px", color: "#888", borderBottom: "1px solid #eee", paddingBottom: "10px", marginBottom: "20px" }}>Category Details</h3>

                <label style={{ fontSize: "13px", color: "#666" }}>
                    Category Name
                    <input type="text" value={formData.name} style={inputStyle} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </label>

                <label style={{ fontSize: "13px", color: "#666" }}>
                    Icon (Emoji or URL)
                    <input type="text" value={formData.icon} style={inputStyle} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} />
                </label>

                <div style={{ borderTop: "1px solid #eee", paddingTop: "20px", marginTop: "10px" }}>
                    <button type="submit" disabled={saving} style={buttonStyle}>
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                    <button type="button" onClick={() => router.push("/admin/skill-categories")} style={{ ...buttonStyle, background: "none", border: "none", color: "#999" }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}