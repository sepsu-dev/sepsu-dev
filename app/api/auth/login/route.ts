import { NextResponse } from "next/server";
import { login } from "@/lib/auth";
import { isRateLimited } from "@/lib/rate-limit";

const RATE_LIMIT_HEADERS = {
  "Retry-After": "600",
} as const;

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Terlalu banyak percobaan. Coba lagi 10 menit lagi." },
      { status: 429, headers: RATE_LIMIT_HEADERS }
    );
  }

  const body = await req.json().catch(() => null);
  const email = String(body?.email ?? "").trim();
  const password = String(body?.password ?? "");

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email dan password wajib diisi" },
      { status: 400 }
    );
  }

  const ok = await login(email, password);
  if (!ok) {
    return NextResponse.json(
      { error: "Email atau password salah" },
      { status: 401 }
    );
  }

  return NextResponse.json({ success: true });
}