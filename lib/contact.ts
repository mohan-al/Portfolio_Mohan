export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string; // honeypot
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<"name" | "email" | "subject" | "message", string>>;
  data?: Omit<ContactPayload, "website">;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactPayload(input: unknown): ContactValidationResult {
  if (!input || typeof input !== "object") {
    return {
      valid: false,
      errors: { message: "Invalid request payload." },
    };
  }

  const raw = input as Record<string, unknown>;
  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const subject = typeof raw.subject === "string" ? raw.subject.trim() : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";

  const errors: ContactValidationResult["errors"] = {};

  if (name.length < 2 || name.length > 100) {
    errors.name = "Please enter your name (2–100 characters).";
  }
  if (!EMAIL_RE.test(email) || email.length > 160) {
    errors.email = "Please enter a valid email address.";
  }
  if (subject.length > 140) {
    errors.subject = "Subject must be 140 characters or fewer.";
  }
  if (message.length < 10 || message.length > 3000) {
    errors.message = "Please enter a message (10–3000 characters).";
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    data: {
      name,
      email,
      subject: subject || "Portfolio inquiry",
      message,
    },
  };
}
