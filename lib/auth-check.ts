import { getSession } from "@/lib/auth";

export async function isAdmin(): Promise<boolean> {
  const session = await getSession();
  return Boolean(session.email);
}

export async function requireAdmin(): Promise<boolean> {
  return isAdmin();
}