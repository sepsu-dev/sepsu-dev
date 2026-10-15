import { verifyUserCredentials } from "./query";
import type { LoginCredentials } from "./schema";
import { successResponse, errorResponse } from "@/lib/response";
import { authConfigured, createSession, isSameOrigin, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth";
import { rateLimited } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return errorResponse("Forbidden", { status: 403 });
  if (!authConfigured()) return errorResponse("Admin login is disabled", { status: 503 });
  if (rateLimited("login", 10, 60_000)) return errorResponse("Too many attempts. Try again later.", { status: 429 });
  try {
    const body: LoginCredentials = await request.json();
    if (!body || typeof body.email !== "string" || typeof body.password !== "string" ||
      !body.email.trim() || !body.password || body.email.length > 254 || body.password.length > 1024) {
      return errorResponse("Invalid credentials payload", { status: 400 });
    }
    const user = await verifyUserCredentials(body);

    if (user) {
      const response = successResponse(user, {
        message: "Authentication successful",
      });

      // Set cookie session for admin dashboard access
      response.cookies.set(SESSION_COOKIE, createSession(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: SESSION_MAX_AGE,
        path: "/",
      });

      return response;
    }

    return errorResponse("Email atau password salah.", { status: 401 });
  } catch {
    return errorResponse("Invalid request payload", { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!isSameOrigin(request)) return errorResponse("Forbidden", { status: 403 });
  // Logout endpoint
  const response = successResponse(null, {
    message: "Logged out successfully",
  });

  response.cookies.delete(SESSION_COOKIE);
  return response;
}
