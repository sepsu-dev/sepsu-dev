import { createContactMessage, getContactMessages } from "./query";
import type { ContactMessageInput } from "@/types/contact";
import { successResponse, errorResponse } from "@/lib/response";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession, isSameOrigin } from "@/lib/auth";
import { rateLimited } from "@/lib/rate-limit";

export async function GET() {
  if (!verifySession((await cookies()).get(SESSION_COOKIE)?.value)) {
    return errorResponse("Unauthorized", { status: 401 });
  }
  const messages = await getContactMessages();
  return successResponse(messages, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return errorResponse("Forbidden", { status: 403 });
  if (rateLimited("contact", 20, 60_000)) return errorResponse("Too many messages. Try again later.", { status: 429 });
  try {
    const body: ContactMessageInput = await request.json();
    if (
      !body ||
      typeof body.email !== "string" || typeof body.message !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim()) || body.email.length > 254 ||
      !body.message.trim() || body.message.length > 5000 ||
      (body.name !== undefined && (typeof body.name !== "string" || body.name.length > 100)) ||
      (body.subject !== undefined && (typeof body.subject !== "string" || body.subject.length > 200))
    ) {
      return errorResponse("Invalid contact fields.", {
        status: 400,
      });
    }

    const savedMessage = await createContactMessage({
      email: body.email.trim(), message: body.message.trim(),
      name: body.name?.trim(), subject: body.subject?.trim(),
    });

    return successResponse(savedMessage, {
      message: "Message received successfully. We will get back to you soon!",
      status: 200,
    });
  } catch {
    return errorResponse("Invalid request body.", { status: 400 });
  }
}
