"use client";

import React from "react";
import { SkillForm } from "@/components/admin/skill-form";
import { skillsService } from "@/services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Skill } from "@/types/api";
import { extractErrorMessage, extractSuccessMessage, parseErrorMessage } from "@/lib/error-utils";

export default function NewSkillPage() {
    const router = useRouter();

    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (data: Partial<Skill>) => {
        setLoading(true);
        try {
            const result = await skillsService.create(data);
            toast.success(extractSuccessMessage(result, "Skill berhasil dibuat"));
            router.push("/admin/skills");
        } catch (error) {
            const parsed = parseErrorMessage(error, "Gagal membuat skill");
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
            <SkillForm onSubmit={handleSubmit} title="Create New Skill" />
        </div>
    );
}