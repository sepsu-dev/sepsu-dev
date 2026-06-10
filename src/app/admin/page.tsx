"use client";

import React, { useEffect, useState } from "react";
import { projectsService, skillsService, profileService } from "@/services";
import { Skill } from "@/types/api";

export default function AdminDashboardPage() {
    const [projectCount, setProjectCount] = useState<number | null>(null);
    const [skillCount, setSkillCount] = useState<number | null>(null);
    const [profileName, setProfileName] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const [projects, skills, profile] = await Promise.all([
                    projectsService.getAll(),
                    skillsService.getAll(),
                    profileService.get(),
                ]);
                const projectsArr = Array.isArray(projects) ? projects : (projects as any).items || (projects as any).projects || [];
                setProjectCount(projectsArr.length);
                const allSkills: Skill[] = Object.values(skills).flat();
                setSkillCount(allSkills.length);
                setProfileName(profile.name);
            } catch (e) { } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (loading) return <p>Loading stats...</p>;

    const statBoxStyle = {
        padding: "20px",
        border: "1px solid #ddd",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        textAlign: "center" as const
    };

    const buttonStyle = {
        padding: "8px 16px",
        background: "#f0f0f0",
        border: "1px solid #ccc",
        borderRadius: "4px",
        color: "#333",
        textDecoration: "none",
        fontSize: "14px",
        cursor: "pointer",
        display: "inline-block"
    };

    return (
        <div>
            <h1 style={{ marginBottom: "5px", fontSize: "20px" }}>Dashboard</h1>
            <p style={{ color: "#666", marginBottom: "30px", fontSize: "14px" }}>Welcome, <strong>{profileName}</strong>. Here is your content overview.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "40px" }}>
                <div style={statBoxStyle}>
                    <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#888", marginBottom: "5px" }}>Projects</div>
                    <div style={{ fontSize: "28px", fontWeight: "bold" }}>{projectCount}</div>
                    <a href="/admin/projects" style={{ fontSize: "12px", color: "#0066cc", textDecoration: "none" }}>Manage →</a>
                </div>
                <div style={statBoxStyle}>
                    <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#888", marginBottom: "5px" }}>Skills</div>
                    <div style={{ fontSize: "28px", fontWeight: "bold" }}>{skillCount}</div>
                    <a href="/admin/skills" style={{ fontSize: "12px", color: "#0066cc", textDecoration: "none" }}>Manage →</a>
                </div>
            </div>

            <div style={{ padding: "20px", border: "1px solid #eee", borderRadius: "8px" }}>
                <h3 style={{ marginTop: 0, fontSize: "14px", color: "#333" }}>Quick Actions</h3>
                <div style={{ display: "flex", gap: "10px" }}>
                    <a href="/admin/projects/new" style={buttonStyle}>Add Project</a>
                    <a href="/admin/skills/new" style={buttonStyle}>Add Skill</a>
                    <a href="/admin/profile" style={buttonStyle}>Edit Profile</a>
                </div>
            </div>
        </div>
    );
}
