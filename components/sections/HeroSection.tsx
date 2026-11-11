import { ArrowRight, Download, MapPin } from "lucide-react";
import Image from "next/image";
import { featureFlags, profile } from "@/data/content";
import { ObfuscatedEmail } from "@/components/ui/ObfuscatedEmail";
import {
  GitHubIcon,
  InstagramIcon,
  LeetCodeIcon,
  LinkedInIcon,
} from "@/components/ui/SocialIcons";

export function HeroSection() {
  const { heroPhoto, showEmployerBadge, showInstagram } = featureFlags;

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[var(--border-subtle)] bg-tech-grid"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-page)]/60 to-[var(--bg-page)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)]">
                <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
                {profile.location}
              </span>
              {showEmployerBadge ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3 py-1 font-mono text-xs font-medium text-[var(--accent)]">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
                    aria-hidden="true"
                  />
                  {profile.employerBadge}
                </span>
              ) : null}
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl">
              {profile.name}
            </h1>

            <p className="mt-3 font-mono text-sm font-medium text-[var(--accent)] sm:text-base">
              {profile.headline}
            </p>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              {profile.pitch}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={profile.resumePath}
                download="Mohan_A_L_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-solid)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--accent-solid-hover)]"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download Resume
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-subtle)]"
              >
                View Projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-lg border border-[var(--border-subtle)] bg-transparent px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              >
                Contact
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                title="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                title="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                href={profile.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode profile"
                title="LeetCode"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
              >
                <LeetCodeIcon className="h-4 w-4" />
              </a>
              {showInstagram ? (
                <a
                  href={profile.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram profile"
                  title="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
              ) : null}
              <ObfuscatedEmail
                user={profile.emailUser}
                domain={profile.emailDomain}
                variant="icon"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-[300px] sm:max-w-[340px] lg:ml-auto lg:mr-0">
              <div
                className="absolute -inset-2 rounded-3xl border border-[var(--accent-border)] bg-[var(--accent-soft)]/50"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-white p-1.5 shadow-sm dark:bg-zinc-900">
                <Image
                  src={heroPhoto.webpSrc}
                  width={heroPhoto.width}
                  height={heroPhoto.height}
                  alt={heroPhoto.alt}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 640px) 300px, 340px"
                  className="aspect-square w-full rounded-xl object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
