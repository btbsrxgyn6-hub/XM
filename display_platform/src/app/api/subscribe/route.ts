import { NextResponse } from "next/server";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  let email = "";
  try {
    if (contentType.includes("application/json")) {
      const body = (await request.json()) as { email?: unknown };
      email = typeof body.email === "string" ? body.email : "";
    } else {
      const form = await request.formData();
      const raw = form.get("email");
      email = typeof raw === "string" ? raw : "";
    }
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request payload." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Thanks! You’re on the list (stub)."
  });
}

