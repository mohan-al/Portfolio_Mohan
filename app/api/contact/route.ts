import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContactPayload } from "@/lib/contact";

const MAX_BODY_BYTES = 16_384; // 16 KB hard limit
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const rateLimitMap = new Map<string, number[]>();

// Best-effort in-memory limiter; fails open (never throws) on serverless cold starts/isolated instances.
function isRateLimited(ip: string): boolean {
  try {
    const now = Date.now();
    const recent = (rateLimitMap.get(ip) ?? []).filter(
      (timestamp) => now - timestamp < RATE_WINDOW_MS
    );
    if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
      rateLimitMap.set(ip, recent);
      return true;
    }
    recent.push(now);
    rateLimitMap.set(ip, recent);

    if (rateLimitMap.size > 500) {
      for (const [key, timestamps] of rateLimitMap.entries()) {
        if (timestamps.every((t) => now - t >= RATE_WINDOW_MS)) {
          rateLimitMap.delete(key);
        }
      }
    }

    return false;
  } catch {
    return false;
  }
}

function getClientIp(request: Request): string {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {
      const first = forwarded.split(",")[0]?.trim();
      if (first) return first;
    }
    return request.headers.get("x-real-ip")?.trim() || "unknown";
  } catch {
    return "unknown";
  }
}

export async function POST(request: Request) {
  const contentLengthHeader = request.headers.get("content-length");
  if (contentLengthHeader) {
    const declaredBytes = Number(contentLengthHeader);
    if (Number.isFinite(declaredBytes) && declaredBytes > MAX_BODY_BYTES) {
      return NextResponse.json(
        { ok: false, message: "Request payload exceeds maximum allowed size." },
        { status: 413 }
      );
    }
  }

  let rawText = "";
  try {
    rawText = await request.text();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to read request body." },
      { status: 400 }
    );
  }

  if (Buffer.byteLength(rawText, "utf8") > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, message: "Request payload exceeds maximum allowed size." },
      { status: 413 }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = JSON.parse(rawText);
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  // Honeypot check: silently accept bot submissions without sending mail
  if (
    rawBody &&
    typeof rawBody === "object" &&
    typeof (rawBody as Record<string, unknown>).website === "string" &&
    ((rawBody as Record<string, unknown>).website as string).trim().length > 0
  ) {
    return NextResponse.json({
      ok: true,
      message: "Message received.",
    });
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      {
        ok: false,
        fallback: true,
        message:
          "Too many messages sent recently. Please try again later or email directly.",
      },
      { status: 429 }
    );
  }

  const validation = validateContactPayload(rawBody);
  if (!validation.valid || !validation.data) {
    return NextResponse.json(
      {
        ok: false,
        errors: validation.errors,
        message: "Please review the form fields and try again.",
      },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim();
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    return NextResponse.json(
      {
        ok: false,
        fallback: true,
        message:
          "Contact form email delivery is not configured yet. Please send directly via email below.",
      },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { name, email, subject, message } = validation.data;

    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
    });

    if (result.error) {
      return NextResponse.json(
        {
          ok: false,
          fallback: true,
          message:
            "Unable to deliver message right now. Please use the direct email option.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Thanks for reaching out — your message has been sent.",
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        fallback: true,
        message:
          "Unable to deliver message right now. Please use the direct email option.",
      },
      { status: 502 }
    );
  }
}
