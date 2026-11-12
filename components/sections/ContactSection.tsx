"use client";

import { ArrowUpRight, Check, Copy, Download } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { contactContent, featureFlags, profile } from "@/data/content";
import { ObfuscatedEmail } from "@/components/ui/ObfuscatedEmail";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  GitHubIcon,
  InstagramIcon,
  LeetCodeIcon,
  LinkedInIcon,
} from "@/components/ui/SocialIcons";

const noopSubscribe = () => () => {};

export function ContactSection() {
  const [copiedToast, setCopiedToast] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const address = useSyncExternalStore(
    noopSubscribe,
    () => `${profile.emailUser}@${profile.emailDomain}`,
    () => ""
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopyEmail = async () => {
    const resolved = `${profile.emailUser}@${profile.emailDomain}`;
    try {
      await navigator.clipboard.writeText(resolved);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = resolved;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopiedToast(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopiedToast(false), 2600);
  };

  const socialCards = [
    {
      name: "LinkedIn",
      handle: "Mohan A L",
      href: profile.socials.linkedin,
      icon: LinkedInIcon,
    },
    {
      name: "GitHub",
      handle: "@mohan-al",
      href: profile.socials.github,
      icon: GitHubIcon,
    },
    {
      name: "LeetCode",
      handle: "Mohan_0728",
      href: profile.socials.leetcode,
      icon: LeetCodeIcon,
    },
    ...(featureFlags.showInstagram
      ? [
          {
            name: "Instagram",
            handle: "@mxhxn.al",
            href: profile.socials.instagram,
            icon: InstagramIcon,
          },
        ]
      : []),
  ];

  return (
    <section id="contact" className="bg-[var(--bg-page)] py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            index={contactContent.heading.index}
            title={contactContent.heading.title}
          />

          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-card)] sm:p-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-xl space-y-2">
                <p className="text-base leading-relaxed text-[var(--text-primary)] sm:text-lg">
                  {contactContent.availability}
                </p>
                <p className="font-mono text-xs text-[var(--text-muted)]">
                  {address || `${profile.emailUser} [at] ${profile.emailDomain}`}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <ObfuscatedEmail
                  user={profile.emailUser}
                  domain={profile.emailDomain}
                  variant="button"
                  label="Email Me"
                />

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-page)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-border)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
                >
                  {copiedToast ? (
                    <>
                      <Check
                        className="h-4 w-4 text-[var(--accent)]"
                        aria-hidden="true"
                      />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" aria-hidden="true" />
                      <span>Copy email</span>
                    </>
                  )}
                </button>

                <a
                  href={profile.resumePath}
                  download="Mohan_A_L_Resume.pdf"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>

            <div
              className={`mt-8 grid gap-3 border-t border-[var(--border-subtle)] pt-6 sm:grid-cols-2 ${
                socialCards.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
              }`}
            >
              {socialCards.map((card) => {
                const Icon = card.icon;
                return (
                  <a
                    key={card.name}
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-page)] p-4 shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-border)] hover:shadow-[var(--shadow-card-hover)]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors group-hover:border-[var(--accent-border)] group-hover:bg-[var(--accent-soft)] group-hover:text-[var(--accent)]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                          {card.name}
                        </p>
                        <p className="font-mono text-xs text-[var(--text-muted)]">
                          {card.handle}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 text-[var(--text-muted)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Accessible toast notification for Copy email */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed bottom-5 left-1/2 z-50 -translate-x-1/2 print:hidden"
      >
        {copiedToast ? (
          <div
            role="status"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--bg-surface)] px-4 py-2 text-xs font-medium text-[var(--text-primary)] shadow-lg"
          >
            <Check
              className="h-3.5 w-3.5 text-[var(--accent)]"
              aria-hidden="true"
            />
            <span>Email copied</span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
