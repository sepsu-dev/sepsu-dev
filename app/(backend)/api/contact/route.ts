import { createContactMessage, getContactMessages } from "./query";
import { ContactMessageInput } from "./schema";
import { successResponse, errorResponse } from "@/lib/response";

export async function GET() {
  const messages = await getContactMessages();
  return successResponse(messages);
}

export async function POST(request: Request) {
  try {
    const body: ContactMessageInput = await request.json();
    const { email, message } = body;

    if (!email || !message) {
      return errorResponse("Email and message are required fields.", {
        status: 400,
      });
    }

    const savedMessage = await createContactMessage(body);

    return successResponse(savedMessage, {
      message: "Message received successfully. We will get back to you soon!",
      status: 200,
    });
  } catch {
    return errorResponse("Invalid request body.", { status: 400 });
  }
}
