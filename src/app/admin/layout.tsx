"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove("token");
        router.replace("/login");
    };

    const linkStyle = (href: string) => ({
        textDecoration: "none",
        color: pathname === href ? "black" : "#0066cc",
        fontWeight: "normal", // Removed bold for active menu
        padding: "4px 8px"
    });

    return (
        <div style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "20px",
            fontFamily: "system-ui, -apple-system, sans-serif",
            lineHeight: "1.5",
            fontSize: "14px",
            color: "#333"
        }}>
            <header style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "2px solid #333",
                paddingBottom: "10px",
                marginBottom: "30px"
            }}>
                <div>
                    <h2 style={{ margin: 0, fontWeight: "bold", fontSize: "18px" }}>Admin Panel</h2>
                </div>
                <nav style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "14px" }}>
                    <Link href="/admin" style={linkStyle("/admin")}>Dashboard</Link>
                    <Link href="/admin/projects" style={linkStyle("/admin/projects")}>Projects</Link>
                    <Link href="/admin/skills" style={linkStyle("/admin/skills")}>Skills</Link>
                    <Link href="/admin/skill-categories" style={linkStyle("/admin/skill-categories")}>Categories</Link>
                    <Link href="/admin/profile" style={linkStyle("/admin/profile")}>Profile</Link>
                    <button
                        onClick={handleLogout}
                        style={{
                            marginLeft: "10px",
                            cursor: "pointer",
                            padding: "4px 12px",
                            background: "#f0f0f0",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            fontSize: "13px"
                        }}
                    >
                        Logout
                    </button>
                </nav>
            </header>

            <main>
                {children}
            </main>
        </div>
    );
}
