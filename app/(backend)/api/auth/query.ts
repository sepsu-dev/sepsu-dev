import type { LoginCredentials, AuthUser } from "./schema";
import { authConfigured, verifyPassword } from "@/lib/auth";

export async function verifyUserCredentials(
  credentials: LoginCredentials
): Promise<AuthUser | null> {
  if (
    authConfigured() &&
    credentials.email === process.env.ADMIN_EMAIL &&
    verifyPassword(credentials.password)
  ) {
    return { name: "Sepsu Dev", email: credentials.email, role: "Administrator" };
  }
  return null;
}
