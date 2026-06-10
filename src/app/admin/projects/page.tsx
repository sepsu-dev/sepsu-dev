"use client";

import React, { useEffect, useState, useCallback } from "react";
import { projectsService } from "@/services";
import { Project } from "@/types/api";
import Link from "next/link";
import { toast } from "sonner";
import { extractErrorMessage, extractSuccessMessage, parseErrorMessage } from "@/lib/error-utils";
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteTarget, setDeleteTarget] = useState<{ uid: string; title: string } | null>(null);
    const [deleting, setDeleting] = useState(false);

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
            const data = await projectsService.getAll({ page: 1, limit: 5 });
            const projectsArray = Array.isArray(data) ? data : (data as any).items || (data as any).projects || [];
            setProjects(projectsArray);
        } catch (error) {
            const parsed = parseErrorMessage(error, "Gagal mengambil data projects");
            toast.error(parsed.title, { description: parsed.description });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await projectsService.delete(deleteTarget.uid);
            toast.success(extractSuccessMessage(null, "Project berhasil dihapus"));
            setDeleteTarget(null);
            fetchProjects();
        } catch (error) {
            const parsed2 = parseErrorMessage(error, "Gagal menghapus project");
            toast.error(parsed2.title, { description: parsed2.description });
        } finally {
            setDeleting(false);
        }
    };

    if (loading) return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px", fontFamily: "sans-serif", color: "#888" }}>
            <span style={{ fontSize: "15px" }}>Memuat data projects...</span>
        </div>
    );

    const buttonStyle = {
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
                <h1 style={{ margin: 0, fontSize: "20px" }}>Projects</h1>
                <Link href="/admin/projects/new" style={buttonStyle}>
                    + New Project
                </Link>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd", fontSize: "14px" }}>
                <thead style={{ background: "#f8f8f8" }}>
                    <tr>
                        <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Title</th>
                        <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Subtitle</th>
                        <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #ddd" }}>Status</th>
                        <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #ddd" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.uid} style={{ borderBottom: "1px solid #eee" }}>
                            <td style={{ padding: "10px 12px" }}>{project.title}</td>
                            <td style={{ padding: "10px 12px", color: "#666", fontSize: "13px" }}>{project.subtitle}</td>
                            <td style={{ padding: "10px 12px", textAlign: "center" }}>
                                <span style={{
                                    fontSize: "11px",
                                    padding: "2px 8px",
                                    borderRadius: "10px",
                                    background: project.is_public ? "#e6f4ea" : "#f1f3f4",
                                    color: project.is_public ? "#1e7e34" : "#5f6368"
                                }}>
                                    {project.is_public ? "Public" : "Private"}
                                </span>
                            </td>
                            <td style={{ padding: "10px 12px", textAlign: "right" }}>
                                <Link href={`/admin/projects/${project.uid}/edit`} style={{ color: "#0066cc", marginRight: "10px", textDecoration: "none", fontSize: "13px" }}>Edit</Link>
                                <button
                                    onClick={() => setDeleteTarget({ uid: project.uid, title: project.title })}
                                    style={{ color: "#d93025", border: "none", background: "none", cursor: "pointer", padding: 0, fontSize: "13px" }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {projects.length === 0 && (
                        <tr>
                            <td colSpan={4} style={{ padding: "40px", textAlign: "center", color: "#999" }}>
                                No projects found. Start by creating one.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <DeleteConfirmDialog
                open={!!deleteTarget}
                onOpenChange={(open: boolean) => { if (!open) setDeleteTarget(null); }}
                itemName={deleteTarget?.title ?? ""}
                itemLabel="Project"
                onConfirm={handleDelete}
                loading={deleting}
            />
        </div>
    );
}