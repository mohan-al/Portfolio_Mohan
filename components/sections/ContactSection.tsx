"use client";

import { Mail, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { featureFlags, profile } from "@/data/content";
import { validateContactPayload } from "@/lib/contact";
import { ObfuscatedEmail } from "@/components/ui/ObfuscatedEmail";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  GitHubIcon,
  InstagramIcon,
  LeetCodeIcon,
  LinkedInIcon,
} from "@/components/ui/SocialIcons";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // honeypot
}

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

export function ContactSection() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<"name" | "email" | "subject" | "message", string>>
  >({});
  const [status, setStatus] = useState<{
    type: "idle" | "submitting" | "success" | "error";
    message?: string;
    showMailtoFallback?: boolean;
  }>({ type: "idle" });

  const openMailtoFallback = () => {
    const email = `${profile.emailUser}@${profile.emailDomain}`;
    const subject = encodeURIComponent(
      form.subject.trim() || `Message from ${form.name.trim() || "Portfolio visitor"}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\n${form.message.trim()}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateContactPayload(form);
    if (!validation.valid) {
      setFieldErrors(validation.errors);
      setStatus({
        type: "error",
        message: "Please fix the highlighted fields before sending.",
      });
      return;
    }

    setFieldErrors({});
    setStatus({ type: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        fallback?: boolean;
        errors?: Partial<Record<"name" | "email" | "subject" | "message", string>>;
      };

      if (!response.ok) {
        if (data.errors) setFieldErrors(data.errors);
        setStatus({
          type: "error",
          message:
            data.message ||
            "Could not send your message right now. You can use the direct email option instead.",
          showMailtoFallback: Boolean(data.fallback),
        });
        return;
      }

      setForm(INITIAL_FORM);
      setStatus({
        type: "success",
        message:
          data.message || "Message sent. Thanks for reaching out — I'll reply soon.",
      });
    } catch {
      setStatus({
        type: "error",
        message:
          "Network error while sending the message. You can send directly via email instead.",
        showMailtoFallback: true,
      });
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            index="06 // CONTACT"
            title="Get in Touch"
            subtitle="Open to engineering discussions, project collaborations, and technical networking."
          />

          <div className="grid gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <ObfuscatedEmail
                user={profile.emailUser}
                domain={profile.emailDomain}
                variant="card"
              />

              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  Profiles
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a
                      href={profile.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg px-2.5 py-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-subtle)] hover:text-[var(--accent)]"
                    >
                      <span className="inline-flex items-center gap-2.5">
                        <GitHubIcon className="h-4 w-4" />
                        GitHub
                      </span>
                      <span className="font-mono text-xs text-[var(--text-muted)]">
                        @mohan-al
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={profile.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg px-2.5 py-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-subtle)] hover:text-[var(--accent)]"
                    >
                      <span className="inline-flex items-center gap-2.5">
                        <LinkedInIcon className="h-4 w-4" />
                        LinkedIn
                      </span>
                      <span className="font-mono text-xs text-[var(--text-muted)]">
                        Mohan A L
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={profile.socials.leetcode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg px-2.5 py-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-subtle)] hover:text-[var(--accent)]"
                    >
                      <span className="inline-flex items-center gap-2.5">
                        <LeetCodeIcon className="h-4 w-4" />
                        LeetCode
                      </span>
                      <span className="font-mono text-xs text-[var(--text-muted)]">
                        Mohan_0728
                      </span>
                    </a>
                  </li>
                  {featureFlags.showInstagram ? (
                    <li>
                      <a
                        href={profile.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-lg px-2.5 py-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-subtle)] hover:text-[var(--accent)]"
                      >
                        <span className="inline-flex items-center gap-2.5">
                          <InstagramIcon className="h-4 w-4" />
                          Instagram
                        </span>
                        <span className="font-mono text-xs text-[var(--text-muted)]">
                          @mxhxn.al
                        </span>
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 lg:col-span-7">
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, website: e.target.value }))
                    }
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-xs font-medium text-[var(--text-secondary)]"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      maxLength={100}
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                      aria-invalid={Boolean(fieldErrors.name)}
                      aria-describedby={
                        fieldErrors.name ? "contact-name-error" : undefined
                      }
                      placeholder="Your name"
                      className="mt-1.5 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg-page)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                    />
                    {fieldErrors.name ? (
                      <p
                        id="contact-name-error"
                        className="mt-1 text-xs text-red-600 dark:text-red-400"
                      >
                        {fieldErrors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-xs font-medium text-[var(--text-secondary)]"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      maxLength={160}
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, email: e.target.value }))
                      }
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={
                        fieldErrors.email ? "contact-email-error" : undefined
                      }
                      placeholder="you@example.com"
                      className="mt-1.5 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg-page)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                    />
                    {fieldErrors.email ? (
                      <p
                        id="contact-email-error"
                        className="mt-1 text-xs text-red-600 dark:text-red-400"
                      >
                        {fieldErrors.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block font-mono text-xs font-medium text-[var(--text-secondary)]"
                  >
                    Subject <span className="text-[var(--text-muted)]">(optional)</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    maxLength={140}
                    value={form.subject}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, subject: e.target.value }))
                    }
                    aria-invalid={Boolean(fieldErrors.subject)}
                    aria-describedby={
                      fieldErrors.subject ? "contact-subject-error" : undefined
                    }
                    placeholder="Project inquiry / Networking"
                    className="mt-1.5 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg-page)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                  />
                  {fieldErrors.subject ? (
                    <p
                      id="contact-subject-error"
                      className="mt-1 text-xs text-red-600 dark:text-red-400"
                    >
                      {fieldErrors.subject}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-xs font-medium text-[var(--text-secondary)]"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    maxLength={3000}
                    value={form.message}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, message: e.target.value }))
                    }
                    aria-invalid={Boolean(fieldErrors.message)}
                    aria-describedby={
                      fieldErrors.message ? "contact-message-error" : undefined
                    }
                    placeholder="Write your message..."
                    className="mt-1.5 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg-page)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                  />
                  {fieldErrors.message ? (
                    <p
                      id="contact-message-error"
                      className="mt-1 text-xs text-red-600 dark:text-red-400"
                    >
                      {fieldErrors.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={status.type === "submitting"}
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-solid)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-solid-hover)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    {status.type === "submitting" ? "Sending..." : "Send Message"}
                  </button>

                  {status.showMailtoFallback ? (
                    <button
                      type="button"
                      onClick={openMailtoFallback}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3.5 py-2 text-xs font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent-solid)] hover:text-white"
                    >
                      <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                      Send via Email Client
                    </button>
                  ) : null}
                </div>

                <div aria-live="polite" className="min-h-5">
                  {status.type === "success" ? (
                    <p
                      role="status"
                      className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-700 dark:text-emerald-300"
                    >
                      {status.message}
                    </p>
                  ) : null}
                  {status.type === "error" ? (
                    <p
                      role="alert"
                      className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-700 dark:text-red-300"
                    >
                      {status.message}
                    </p>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
