"use client";

import React, { useEffect, useState, useCallback } from "react";
import { skillsService } from "@/services";
import { Skill } from "@/types/api";
import { toast } from "sonner";
import { extractErrorMessage, extractSuccessMessage, parseErrorMessage } from "@/lib/error-utils";
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";

export default function AdminSkillsPage() {
    const [skillsCategories, setSkillsCategories] = useState<{ category: string; skills: Skill[] }[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteTarget, setDeleteTarget] = useState<{ uid: string; name: string } | null>(null);
    const [deleting, setDeleting] = useState(false);

    const fetchSkills = useCallback(async () => {
        setLoading(true);
        try {
            const data = await skillsService.getAll();
            // Response is already { category_name: Skill[], ... } grouped by category
            const source = data || {};
            const normalized = Object.entries(source).map(([category, skills]) => ({
                category,
                skills: Array.isArray(skills) ? skills : [],
            }));
            setSkillsCategories(normalized);
        } catch (error) {
            const parsed = parseErrorMessage(error, "Gagal mengambil data skills");
            toast.error(parsed.title, { description: parsed.description });
            setSkillsCategories([]); // Reset on error
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSkills();
    }, [fetchSkills]);

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await skillsService.delete(deleteTarget.uid);
            toast.success(extractSuccessMessage(null, "Skill berhasil dihapus"));
            setDeleteTarget(null);
            fetchSkills();
        } catch (error) {
            const parsed2 = parseErrorMessage(error, "Gagal menghapus skill");
            toast.error(parsed2.title, { description: parsed2.description });
        } finally {
            setDeleting(false);
        }
    };

    if (loading) return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px", fontFamily: "sans-serif", color: "#888" }}>
            <span style={{ fontSize: "15px" }}>Memuat data skills...</span>
        </div>
    );

    const linkStyle = {
        padding: "6px 12px",
        background: "#f0f0f0",
        border: "1px solid #ccc",
        borderRadius: "4px",
        color: "#333",
        textDecoration: "none",
        fontSize: "13px",
        cursor: "pointer",
        display: "inline-block"
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h1 style={{ margin: 0, fontSize: "20px" }}>Skills</h1>
                <a href="/admin/skills/new" style={linkStyle}>
                    + New Skill
                </a>
            </div>

            {skillsCategories.map(({ category, skills }) => (
                <div key={category} style={{ marginBottom: "28px" }}>
                    <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px", color: "#555" }}>{category}</h2>
                    <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd", fontSize: "14px" }}>
                        <thead style={{ background: "#f8f8f8" }}>
                            <tr>
                                <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Name</th>
                                <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #ddd" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {skills.map((skill) => (
                                <tr key={skill.uid} style={{ borderBottom: "1px solid #eee" }}>
                                    <td style={{ padding: "10px 12px" }}>{skill.name}</td>
                                    <td style={{ padding: "10px 12px", textAlign: "right" }}>
                                        <a href={`/admin/skills/${skill.uid}/edit`} style={{ color: "#0066cc", marginRight: "10px", textDecoration: "none", fontSize: "13px" }}>Edit</a>
                                        <button
                                            onClick={() => setDeleteTarget({ uid: skill.uid, name: skill.name })}
                                            style={{ color: "#d93025", border: "none", background: "none", cursor: "pointer", padding: 0, fontSize: "13px" }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {skills.length === 0 && (
                                <tr>
                                    <td colSpan={2} style={{ padding: "20px", textAlign: "center", color: "#999" }}>
                                        No skills in this category.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ))}

            <DeleteConfirmDialog
                open={!!deleteTarget}
                onOpenChange={(open: boolean) => { if (!open) setDeleteTarget(null); }}
                itemName={deleteTarget?.name ?? ""}
                itemLabel="Skill"
                onConfirm={handleDelete}
                loading={deleting}
            />
        </div>
    );
}