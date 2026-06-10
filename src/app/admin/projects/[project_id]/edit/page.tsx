"use client";

import React, { useEffect, useState } from "react";
import { ProjectForm } from "@/components/admin/project-form";
import { projectsService } from "@/services";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import { Project } from "@/types/api";
import { extractErrorMessage, extractSuccessMessage, parseErrorMessage } from "@/lib/error-utils";

export default function EditProjectPage() {
    const router = useRouter();
    const params = useParams();
    const project_id = params.project_id as string;
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        async function fetchProject() {
            try {
                const data = await projectsService.getById(project_id);
                setProject(data);
            } catch (error) {
                const parsed = parseErrorMessage(error, "Gagal mengambil detail project");
                toast.error(parsed.title, { description: parsed.description });
                router.push("/admin/projects");
            } finally {
                setLoading(false);
            }
        }
        fetchProject();
    }, [project_id, router]);

    const handleSubmit = async (data: Partial<Project> & { skill_uids: string[] }) => {
        if (!project) return;
        setSubmitting(true);
        try {
            const { skill_uids, ...projectData } = data;
            const result = await projectsService.update(project.uid, projectData);

            // Sync skills
            const currentSkillUids = project.skills?.map(s => s.uid) || [];
            const toAdd = skill_uids.filter(uid => !currentSkillUids.includes(uid));
            const toRemove = currentSkillUids.filter(uid => !skill_uids.includes(uid));

            await Promise.all([
                ...toAdd.map(uid => projectsService.addSkill(project.uid, uid)),
                ...toRemove.map(uid => projectsService.removeSkill(project.uid, uid))
            ]);

            toast.success(extractSuccessMessage(result, "Project berhasil diperbarui"));
            router.push("/admin/projects");
        } catch (error) {
            const parsed2 = parseErrorMessage(error, "Gagal memperbarui project");
            toast.error(parsed2.title, { description: parsed2.description });
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px", fontFamily: "sans-serif", color: "#888" }}>
            <span style={{ fontSize: "15px" }}>Memuat data project...</span>
        </div>
    );
    if (!project) return null;

    return (
        <div className="max-w-4xl mx-auto">
            {submitting && (
                <div style={{ display: "flex", justifyContent: "center", padding: "20px", fontFamily: "sans-serif", color: "#888" }}>
                    <span>Menyimpan...</span>
                </div>
            )}
            <ProjectForm initialData={project} onSubmit={handleSubmit} title={`Edit: ${project.title}`} />
        </div>
    );
}