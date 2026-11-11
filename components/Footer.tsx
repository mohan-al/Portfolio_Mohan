import { ArrowUp } from "lucide-react";
import { profile } from "@/data/content";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-[var(--text-primary)]">
            {profile.name}
          </p>
          <p className="font-mono text-xs text-[var(--text-muted)]">
            {profile.location} · Built with Next.js &amp; Tailwind CSS
          </p>
        </div>

        <a
          href="#top"
          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] px-3.5 py-2 font-mono text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
        >
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          Back to top
        </a>
      </div>
    </footer>
  );
}
