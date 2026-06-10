"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services";
import { toast } from "sonner";
import { parseErrorMessage } from "@/lib/error-utils";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authService.login(formData);
            router.push("/admin");
        } catch (error) {
            const parsed = parseErrorMessage(error, "Login gagal");
            toast.error(parsed.title, { description: parsed.description });
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        padding: "8px",
        border: "1px solid #777",
        borderRadius: "4px",
        backgroundColor: "#f0f0f0",
        width: "100%",
        boxSizing: "border-box" as const
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            fontFamily: "sans-serif"
        }}>
            <div style={{ width: "300px" }}>
                <form onSubmit={handleSubmit}>
                    <p>Email:<br />
                        <input
                            type="email"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            style={inputStyle}
                        />
                    </p>
                    <p>Password:<br />
                        <input
                            type="password"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            style={inputStyle}
                        />
                    </p>
                    <p>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: "100%",
                                padding: "10px",
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                        >
                            {loading ? "..." : "Sign In"}
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}