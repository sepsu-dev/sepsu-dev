"use client";

import React from "react";
import { ProjectForm } from "@/components/admin/project-form";
import { projectsService } from "@/services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Project } from "@/types/api";
import { extractErrorMessage, extractSuccessMessage, parseErrorMessage } from "@/lib/error-utils";

export default function NewProjectPage() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (data: Partial<Project> & { skill_uids: string[] }) => {
        setLoading(true);
        try {
            const { skill_uids, ...projectData } = data;
            const newProject: any = await projectsService.create(projectData);

            const projectUid = newProject.uid;

            if (skill_uids.length > 0) {
                await Promise.all(skill_uids.map(skillUid => projectsService.addSkill(projectUid, skillUid)));
            }

            toast.success(extractSuccessMessage(newProject, "Project berhasil dibuat"));
            router.push("/admin/projects");
        } catch (error) {
            const parsed = parseErrorMessage(error, "Gagal membuat project");
            toast.error(parsed.title, { description: parsed.description });
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {loading && (
                <div style={{ display: "flex", justifyContent: "center", padding: "20px", fontFamily: "sans-serif", color: "#888" }}>
                    <span>Menyimpan...</span>
                </div>
            )}
            <ProjectForm onSubmit={handleSubmit} title="Create New Project" />
        </div>
    );
}