import { Award, Code2, ExternalLink, Flame } from "lucide-react";
import { dsaStats } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GitHubIcon, LeetCodeIcon } from "@/components/ui/SocialIcons";

export function DsaSection() {
  const easyPct = Math.round((dsaStats.easy / dsaStats.totalSolved) * 100);
  const mediumPct = Math.round((dsaStats.medium / dsaStats.totalSolved) * 100);
  const hardPct = Math.max(0, 100 - easyPct - mediumPct);

  return (
    <section
      id="dsa"
      className="border-b border-[var(--border-subtle)] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <SectionHeading
              index="04 // DSA"
              title="Problem Solving"
              subtitle={dsaStats.focusNote}
            />
            <p className="mb-8 font-mono text-xs text-[var(--text-muted)]">
              Last updated: {dsaStats.lastUpdated}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-12">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 lg:col-span-7">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Total Problems Solved ({dsaStats.language})
                  </p>
                  <p className="mt-1 font-mono text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
                    {dsaStats.totalSolved}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--accent-border)] bg-[var(--accent-soft)] px-2.5 py-1 font-mono text-xs font-medium text-[var(--accent)]">
                  <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                  100% in {dsaStats.language}
                </span>
              </div>

              <div
                className="mt-5 flex h-2.5 w-full overflow-hidden rounded-full bg-[var(--bg-subtle)]"
                role="img"
                aria-label={`Difficulty breakdown: ${dsaStats.easy} Easy, ${dsaStats.medium} Medium, ${dsaStats.hard} Hard`}
              >
                <div
                  style={{ width: `${easyPct}%` }}
                  className="bg-emerald-600 dark:bg-emerald-400"
                />
                <div
                  style={{ width: `${mediumPct}%` }}
                  className="bg-[var(--accent-solid)] dark:bg-[var(--accent)]"
                />
                <div
                  style={{ width: `${hardPct}%` }}
                  className="bg-zinc-600 dark:bg-zinc-400"
                />
              </div>

              <dl className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/70 p-3">
                  <dt className="font-mono text-xs text-[var(--text-muted)]">
                    Easy
                  </dt>
                  <dd className="mt-1 font-mono text-lg font-semibold text-[var(--text-primary)]">
                    {dsaStats.easy}
                  </dd>
                </div>
                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/70 p-3">
                  <dt className="font-mono text-xs text-[var(--text-muted)]">
                    Medium
                  </dt>
                  <dd className="mt-1 font-mono text-lg font-semibold text-[var(--text-primary)]">
                    {dsaStats.medium}
                  </dd>
                </div>
                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/70 p-3">
                  <dt className="font-mono text-xs text-[var(--text-muted)]">
                    Hard
                  </dt>
                  <dd className="mt-1 font-mono text-lg font-semibold text-[var(--text-primary)]">
                    {dsaStats.hard}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[var(--border-subtle)] pt-4">
                <a
                  href={dsaStats.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-solid)] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--accent-solid-hover)]"
                >
                  <LeetCodeIcon className="h-3.5 w-3.5" />
                  LeetCode Profile
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
                <a
                  href={dsaStats.solutionsRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3.5 py-2 text-xs font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-subtle)]"
                >
                  <GitHubIcon className="h-3.5 w-3.5" />
                  LeetCode Solutions
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 lg:col-span-5">
              <dl className="grid grid-cols-3 gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:gap-4">
                <div className="flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 p-3.5 lg:flex-row lg:items-center">
                  <dt className="font-mono text-xs text-[var(--text-muted)]">
                    Past-Year Submissions
                  </dt>
                  <dd className="mt-1 font-mono text-xl font-semibold text-[var(--text-primary)] lg:mt-0">
                    {dsaStats.submissionsPastYear}
                  </dd>
                </div>
                <div className="flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 p-3.5 lg:flex-row lg:items-center">
                  <dt className="font-mono text-xs text-[var(--text-muted)]">
                    Active Days
                  </dt>
                  <dd className="mt-1 font-mono text-xl font-semibold text-[var(--text-primary)] lg:mt-0">
                    {dsaStats.activeDays}
                  </dd>
                </div>
                <div className="flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 p-3.5 lg:flex-row lg:items-center">
                  <dt className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)]">
                    <Flame className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
                    Max Streak
                  </dt>
                  <dd className="mt-1 font-mono text-xl font-semibold text-[var(--text-primary)] lg:mt-0">
                    {dsaStats.maxStreakDays} days
                  </dd>
                </div>
              </dl>

              <div className="space-y-3 border-t border-[var(--border-subtle)] pt-4">
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  Streak Badges
                </p>
                <div className="flex flex-wrap gap-2">
                  {dsaStats.badges.map((badge) => (
                    <span
                      key={badge.name}
                      className="inline-flex items-center gap-1.5 rounded-md border border-[var(--accent-border)] bg-[var(--accent-soft)] px-2.5 py-1 font-mono text-xs font-medium text-[var(--accent)]"
                    >
                      <Award className="h-3.5 w-3.5" aria-hidden="true" />
                      {badge.name}
                    </span>
                  ))}
                </div>
                <p className="pt-1 text-xs text-[var(--text-secondary)]">
                  Also on the board: {dsaStats.chessNote}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
