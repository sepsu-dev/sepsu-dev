import { getIronSession, type IronSession } from "iron-session";
import { cookies } from "next/headers";
import { verifyAdmin } from "@/lib/repo";

function getSessionPassword(): string {
  const password = process.env.SESSION_PASSWORD;
  if (!password) {
    throw new Error(
      "SESSION_PASSWORD environment variable wajib dikonfigurasi. " +
        "Jalankan: openssl rand -base64 32"
    );
  }
  return password;
}

const SESSION_PASSWORD = getSessionPassword();

export interface SessionData {
  email?: string;
  name?: string;
}

export type MySession = IronSession<SessionData>;

export async function getSession(): Promise<MySession> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, {
    password: SESSION_PASSWORD,
    cookieName: "sepsu_admin_session",
  });
}

export async function login(email: string, password: string): Promise<boolean> {
  const ok = await verifyAdmin(email, password);
  if (!ok) return false;
  const session = await getSession();
  session.email = email.toLowerCase().trim();
  session.name = "Sepsu Admin";
  await session.save();
  return true;
}

export async function logout(): Promise<void> {
  const session = await getSession();
  session.destroy();
}