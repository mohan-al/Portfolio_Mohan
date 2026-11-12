import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { featureFlags, profile } from "@/data/content";
import { ObfuscatedEmail } from "@/components/ui/ObfuscatedEmail";
import {
  GitHubIcon,
  InstagramIcon,
  LeetCodeIcon,
  LinkedInIcon,
} from "@/components/ui/SocialIcons";

const QUICK_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#dsa", label: "DSA" },
  { href: "/#achievements", label: "Achievements" },
  { href: "/#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-10 print:hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="space-y-2">
            <Link
              href="/#top"
              className="inline-flex items-center gap-2.5 text-sm font-semibold tracking-tight text-[var(--text-primary)]"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)] font-mono text-[11px] font-semibold text-[var(--accent)]">
                {profile.monogram}
              </span>
              <span>{profile.name}</span>
            </Link>
            <p className="font-mono text-xs text-[var(--text-muted)]">
              {profile.location}
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              Built with Next.js, TypeScript &amp; Tailwind CSS.
            </p>
          </div>

          <nav aria-label="Footer quick links" className="flex flex-wrap gap-x-5 gap-y-2">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              title="GitHub"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              title="LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <a
              href={profile.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode profile"
              title="LeetCode"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
            >
              <LeetCodeIcon className="h-4 w-4" />
            </a>
            {featureFlags.showInstagram ? (
              <a
                href={profile.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
                title="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            ) : null}
            <ObfuscatedEmail
              user={profile.emailUser}
              domain={profile.emailDomain}
              variant="icon"
            />
            <Link
              href="/#top"
              className="ml-1 inline-flex h-9 items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] px-3 font-mono text-xs font-medium text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
            >
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              Top
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
