import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Demo admin credentials for CMS / Management portal
    if (email === "admin@sepsu.dev" && password === "admin123") {
      const response = NextResponse.json({
        status: "success",
        message: "Authentication successful",
        user: {
          name: "Sepsu Dev",
          email: "admin@sepsu.dev",
          role: "Administrator",
        },
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

    return NextResponse.json(
      {
        status: "error",
        message: "Email atau password salah.",
      },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Invalid request payload",
      },
      { status: 400 }
    );
  }
}

export async function DELETE() {
  // Logout endpoint
  const response = NextResponse.json({
    status: "success",
    message: "Logged out successfully",
  });

  response.cookies.delete("admin_session");
  return response;
}
