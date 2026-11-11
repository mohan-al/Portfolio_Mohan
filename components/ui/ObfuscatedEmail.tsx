"use client";

import { Check, Copy, Mail } from "lucide-react";
import { useState, useSyncExternalStore } from "react";

interface ObfuscatedEmailProps {
  user: string;
  domain: string;
  variant?: "icon" | "card";
}

const noopSubscribe = () => () => {};

export function ObfuscatedEmail({
  user,
  domain,
  variant = "icon",
}: ObfuscatedEmailProps) {
  const address = useSyncExternalStore(
    noopSubscribe,
    () => `${user}@${domain}`,
    () => ""
  );
  const [copied, setCopied] = useState(false);

  const handleOpenMail = () => {
    const resolved = `${user}@${domain}`;
    window.location.href = `mailto:${resolved}`;
  };

  const handleCopy = async () => {
    const resolved = `${user}@${domain}`;
    try {
      await navigator.clipboard.writeText(resolved);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      handleOpenMail();
    }
  };

  if (variant === "icon") {
    return (
      <a
        href={address ? `mailto:${address}` : "#contact"}
        onClick={(e) => {
          if (!address) {
            e.preventDefault();
            handleOpenMail();
          }
        }}
        aria-label="Send email to Mohan A L"
        title="Email Mohan A L"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
      </a>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
          Direct Email
        </p>
        <p className="mt-1 truncate font-mono text-sm text-[var(--text-primary)]">
          {address || `${user} [at] ${domain}`}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={handleOpenMail}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-3 py-2 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)]"
        >
          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
          Open Mail
        </button>
        <button
          type="button"
          onClick={handleCopy}
          aria-live="polite"
          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}
