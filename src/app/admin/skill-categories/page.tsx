"use client";

import React, { useEffect, useState, useCallback } from "react";
import { skillCategoriesService, SkillCategory } from "@/services/skill-categories.service";
import { toast } from "sonner";
import { extractErrorMessage, extractSuccessMessage, parseErrorMessage } from "@/lib/error-utils";
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";

export default function AdminSkillCategoriesPage() {
    const [categories, setCategories] = useState<SkillCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteTarget, setDeleteTarget] = useState<{ uid: string; name: string } | null>(null);
    const [deleting, setDeleting] = useState(false);

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        try {
            const data = await skillCategoriesService.getAll();
            setCategories(Array.isArray(data) ? data : []);
        } catch (error) {
            const parsed = parseErrorMessage(error, "Gagal mengambil data kategori skill");
            toast.error(parsed.title, { description: parsed.description });
            setCategories([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await skillCategoriesService.delete(deleteTarget.uid);
            toast.success(extractSuccessMessage(null, "Kategori berhasil dihapus"));
            setDeleteTarget(null);
            fetchCategories();
        } catch (error) {
            const parsed2 = parseErrorMessage(error, "Gagal menghapus kategori");
            toast.error(parsed2.title, { description: parsed2.description });
        } finally {
            setDeleting(false);
        }
    };

    if (loading) return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px", fontFamily: "sans-serif", color: "#888" }}>
            <span style={{ fontSize: "15px" }}>Memuat data kategori skill...</span>
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
                <h1 style={{ margin: 0, fontSize: "20px" }}>Skill Categories</h1>
                <a href="/admin/skill-categories/new" style={linkStyle}>
                    + New Category
                </a>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd", fontSize: "14px" }}>
                <thead style={{ background: "#f8f8f8" }}>
                    <tr>
                        <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Name</th>
                        <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Icon</th>
                        <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #ddd" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat) => (
                        <tr key={cat.uid} style={{ borderBottom: "1px solid #eee" }}>
                            <td style={{ padding: "10px 12px" }}>{cat.name}</td>
                            <td style={{ padding: "10px 12px" }}>{cat.icon || "-"}</td>
                            <td style={{ padding: "10px 12px", textAlign: "right" }}>
                                <a href={`/admin/skill-categories/${cat.uid}/edit`} style={{ color: "#0066cc", marginRight: "10px", textDecoration: "none", fontSize: "13px" }}>Edit</a>
                                <button
                                    onClick={() => setDeleteTarget({ uid: cat.uid, name: cat.name })}
                                    style={{ color: "#d93025", border: "none", background: "none", cursor: "pointer", padding: 0, fontSize: "13px" }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {categories.length === 0 && (
                        <tr>
                            <td colSpan={3} style={{ padding: "20px", textAlign: "center", color: "#999" }}>
                                No skill categories found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <DeleteConfirmDialog
                open={!!deleteTarget}
                onOpenChange={(open: boolean) => { if (!open) setDeleteTarget(null); }}
                itemName={deleteTarget?.name ?? ""}
                itemLabel="Category"
                onConfirm={handleDelete}
                loading={deleting}
            />
        </div>
    );
}