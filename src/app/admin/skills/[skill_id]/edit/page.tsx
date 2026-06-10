"use client";

import React, { useEffect, useState } from "react";
import { SkillForm } from "@/components/admin/skill-form";
import { skillsService } from "@/services";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import { Skill } from "@/types/api";
import { extractErrorMessage, extractSuccessMessage, parseErrorMessage } from "@/lib/error-utils";

export default function EditSkillPage() {
    const router = useRouter();
    const params = useParams();
    const skill_id = params.skill_id as string;
    const [skill, setSkill] = useState<Skill | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        async function fetchSkill() {
            try {
                const data = await skillsService.getById(skill_id);
                setSkill(data);
            } catch (error) {
                const parsed = parseErrorMessage(error, "Gagal mengambil detail skill");
                toast.error(parsed.title, { description: parsed.description });
                router.push("/admin/skills");
            } finally {
                setLoading(false);
            }
        }
        fetchSkill();
    }, [skill_id, router]);

    const handleSubmit = async (data: Partial<Skill>) => {
        setSubmitting(true);
        try {
            const result = await skillsService.update(skill_id, data);
            toast.success(extractSuccessMessage(result, "Skill berhasil diperbarui"));
            router.push("/admin/skills");
        } catch (error) {
            const parsed2 = parseErrorMessage(error, "Gagal memperbarui skill");
            toast.error(parsed2.title, { description: parsed2.description });
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px", fontFamily: "sans-serif", color: "#888" }}>
            <span style={{ fontSize: "15px" }}>Memuat data skill...</span>
        </div>
    );
    if (!skill) return null;

    return (
        <div className="max-w-4xl mx-auto">
            {submitting && (
                <div style={{ display: "flex", justifyContent: "center", padding: "20px", fontFamily: "sans-serif", color: "#888" }}>
                    <span>Menyimpan...</span>
                </div>
            )}
            <SkillForm initialData={skill} onSubmit={handleSubmit} title={`Edit: ${skill.name}`} />
        </div>
    );
}