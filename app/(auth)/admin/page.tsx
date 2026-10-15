import type { Metadata } from "next";
import AdminDashboard from "./AdminDashboard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin - Static Portfolio",
  description: "Static portfolio content configuration.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  if (!verifySession((await cookies()).get(SESSION_COOKIE)?.value)) redirect("/login");
  return <AdminDashboard />;
}
