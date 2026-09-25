import { verifyUserCredentials } from "./query";
import { LoginCredentials } from "./schema";
import { successResponse, errorResponse } from "@/lib/response";

export async function POST(request: Request) {
  try {
    const body: LoginCredentials = await request.json();
    const user = await verifyUserCredentials(body);

    if (user) {
      const response = successResponse(user, {
        message: "Authentication successful",
      });

      // Set cookie session for admin dashboard access
      response.cookies.set("admin_session", "authenticated_sepsu_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return response;
    }

    return errorResponse("Email atau password salah.", { status: 401 });
  } catch {
    return errorResponse("Invalid request payload", { status: 400 });
  }
}

export async function DELETE() {
  // Logout endpoint
  const response = successResponse(null, {
    message: "Logged out successfully",
  });

  response.cookies.delete("admin_session");
  return response;
}
