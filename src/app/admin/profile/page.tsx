"use client";

import React, { useEffect, useState } from "react";
import { profileService } from "@/services";
import { Profile } from "@/types/api";
import { toast } from "sonner";
import { parseErrorMessage, extractSuccessMessage } from "@/lib/error-utils";

export default function AdminProfilePage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const data = await profileService.get();
                setProfile(data);
            } catch (error) {
                const parsed = parseErrorMessage(error, "Gagal mengambil profile");
                toast.error(parsed.title, { description: parsed.description });
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile) return;
        try {
            const result = await profileService.update(profile);
            toast.success(extractSuccessMessage(result, "Profile berhasil diperbarui"));
        } catch (error) {
            const parsed = parseErrorMessage(error, "Gagal memperbarui profile");
            toast.error(parsed.title, { description: parsed.description });
        }
    };

    if (loading) return <p>Loading profile...</p>;
    if (!profile) return <p>No profile record found.</p>;

    const inputStyle = {
        width: "100%",
        padding: "8px",
        marginTop: "4px",
        marginBottom: "16px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxSizing: "border-box" as const,
        fontWeight: "normal" as const
    };

    const buttonStyle = {
        padding: "10px 24px",
        background: "#f0f0f0",
        border: "1px solid #ccc",
        borderRadius: "4px",
        color: "#333",
        fontSize: "14px",
        cursor: "pointer",
        fontWeight: "bold" as const
    };

    return (
        <div style={{ maxWidth: "600px" }}>
            <h1 style={{ marginBottom: "20px", fontSize: "20px" }}>Edit Profile</h1>
            <form onSubmit={handleUpdate} style={{ background: "#fdfdfd", padding: "20px", border: "1px solid #eee", borderRadius: "8px" }}>
                <label style={{ fontSize: "13px", color: "#666" }}>
                    Name
                    <input
                        type="text"
                        value={profile.name || ""}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        style={inputStyle}
                    />
                </label>

                <label style={{ fontSize: "13px", color: "#666" }}>
                    Title
                    <input
                        type="text"
                        value={profile.title || ""}
                        onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                        style={inputStyle}
                    />
                </label>

                <label style={{ fontSize: "13px", color: "#666" }}>
                    Bio
                    <textarea
                        value={profile.bio || ""}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        rows={6}
                        style={{ ...inputStyle, resize: "vertical" }}
                    />
                </label>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <label style={{ fontSize: "13px", color: "#666" }}>
                        Email
                        <input
                            type="email"
                            value={profile.email || ""}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            style={inputStyle}
                        />
                    </label>
                    <label style={{ fontSize: "13px", color: "#666" }}>
                        Location
                        <input
                            type="text"
                            value={profile.location || ""}
                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                            style={inputStyle}
                        />
                    </label>
                </div>

                {/* Current Focus Management */}
                <div style={{ background: "#fdfdfd", padding: "20px", border: "1px solid #eee", borderRadius: "8px", marginTop: "20px" }}>
                    <h3 style={{ fontSize: "14px", color: "#333", borderBottom: "1px solid #eee", paddingBottom: "10px", marginBottom: "20px", marginTop: 0 }}>Current Focus (Terminal Display)</h3>
                    <div>
                        {(profile.focus || []).map((item, idx) => (
                            <div key={idx} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                <input
                                    type="text"
                                    value={item}
                                    style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
                                    onChange={(e) => {
                                        const newFocus = [...(profile.focus || [])];
                                        newFocus[idx] = e.target.value;
                                        setProfile({ ...profile, focus: newFocus });
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newFocus = (profile.focus || []).filter((_, i) => i !== idx);
                                        setProfile({ ...profile, focus: newFocus });
                                    }}
                                    style={{
                                        padding: "0 15px",
                                        background: "none",
                                        border: "1px solid #ff4d4f",
                                        color: "#ff4d4f",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        fontSize: "12px"
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            setProfile({ ...profile, focus: [...(profile.focus || []), ""] });
                        }}
                        style={{
                            padding: "6px 15px",
                            fontSize: "11px",
                            background: "#fff",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            cursor: "pointer",
                            marginTop: "10px"
                        }}
                    >
                        + Add Focus Item
                    </button>
                </div>

                <div style={{ marginTop: "30px" }}>
                    <button type="submit" style={buttonStyle}>
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
