import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!email || !message) {
      return NextResponse.json(
        {
          status: "error",
          message: "Email and message are required fields.",
        },
        { status: 400 }
      );
    }

    // Future hook: Send email via Resend, Sendgrid, or save to database
    return NextResponse.json({
      status: "success",
      message: "Message received successfully. We will get back to you soon!",
      data: {
        name: name || "Anonymous",
        email,
        subject: subject || "No Subject",
        receivedAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        status: "error",
        message: "Invalid request body.",
      },
      { status: 400 }
    );
  }
}
