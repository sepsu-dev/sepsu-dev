"use client";

import React, { useState } from "react";
import { skillCategoriesService } from "@/services/skill-categories.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { extractSuccessMessage, parseErrorMessage } from "@/lib/error-utils";

export default function NewSkillCategoryPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: "", icon: "" });
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await skillCategoriesService.create(formData);
            toast.success(extractSuccessMessage(null, "Kategori berhasil dibuat"));
            router.push("/admin/skill-categories");
        } catch (error) {
            const parsed = parseErrorMessage(error, "Gagal membuat kategori");
            toast.error(parsed.title, { description: parsed.description });
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
            <h1 style={{ marginBottom: "20px", fontSize: "20px" }}>New Skill Category</h1>

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
                        {saving ? "Saving..." : "Create Category"}
                    </button>
                    <button type="button" onClick={() => router.push("/admin/skill-categories")} style={{ ...buttonStyle, background: "none", border: "none", color: "#999" }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}