import { LoginCredentials, AuthUser } from "./schema";

// Dummy admin credentials
export const DUMMY_ADMIN_USER: AuthUser = {
  name: "Sepsu Dev",
  email: "admin@sepsu.dev",
  role: "Administrator",
};

export async function verifyUserCredentials(
  credentials: LoginCredentials
): Promise<AuthUser | null> {
  if (
    credentials.email === "admin@sepsu.dev" &&
    credentials.password === "admin123"
  ) {
    return DUMMY_ADMIN_USER;
  }
  return null;
}
