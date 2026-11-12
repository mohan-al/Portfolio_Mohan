import { Award, Code2, ExternalLink, Flame } from "lucide-react";
import { dsaStats, sectionHeadings } from "@/data/content";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GitHubIcon, LeetCodeIcon } from "@/components/ui/SocialIcons";

export function DsaSection() {
  const total = Math.max(1, dsaStats.totalSolved);
  const easyPct = Math.round((dsaStats.easy / total) * 100);
  const mediumPct = Math.round((dsaStats.medium / total) * 100);
  const hardPct = Math.max(0, 100 - easyPct - mediumPct);

  // SVG Donut geometry
  const size = 160;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const easyLen = (dsaStats.easy / total) * circumference;
  const mediumLen = (dsaStats.medium / total) * circumference;
  const hardLen = (dsaStats.hard / total) * circumference;

  const easyOffset = 0;
  const mediumOffset = -easyLen;
  const hardOffset = -(easyLen + mediumLen);

  const difficultyBreakdown = [
    {
      label: "Easy",
      count: dsaStats.easy,
      pct: easyPct,
      colorVar: "var(--chart-easy)",
    },
    {
      label: "Medium",
      count: dsaStats.medium,
      pct: mediumPct,
      colorVar: "var(--chart-medium)",
    },
    {
      label: "Hard",
      count: dsaStats.hard,
      pct: hardPct,
      colorVar: "var(--chart-hard)",
    },
  ];

  return (
    <section
      id="dsa"
      className="border-b border-[var(--border-subtle)] bg-[var(--bg-page)] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <SectionHeading
              index={sectionHeadings.dsa.index}
              title={sectionHeadings.dsa.title}
              subtitle={dsaStats.focusNote}
            />
            <p className="mb-10 font-mono text-xs text-[var(--text-muted)]">
              Last updated: {dsaStats.lastUpdated}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            <div className="flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-card)] transition-all duration-200 hover:border-[var(--accent-border)] hover:shadow-[var(--shadow-card-hover)] lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  Difficulty Breakdown ({dsaStats.language})
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--accent-border)] bg-[var(--accent-soft)] px-2.5 py-1 font-mono text-xs font-medium text-[var(--accent)]">
                  <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                  100% in {dsaStats.language}
                </span>
              </div>

              <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
                <div className="relative flex h-40 w-40 shrink-0 items-center justify-center">
                  <svg
                    viewBox={`0 0 ${size} ${size}`}
                    className="h-40 w-40 -rotate-90"
                    role="img"
                    aria-label={`Difficulty breakdown: ${dsaStats.totalSolved} total solved — ${dsaStats.easy} Easy (${easyPct}%), ${dsaStats.medium} Medium (${mediumPct}%), ${dsaStats.hard} Hard (${hardPct}%)`}
                  >
                    <circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      fill="none"
                      stroke="var(--chart-track)"
                      strokeWidth={strokeWidth}
                    />
                    <circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      fill="none"
                      stroke="var(--chart-easy)"
                      strokeWidth={strokeWidth}
                      strokeDasharray={`${easyLen} ${circumference}`}
                      strokeDashoffset={easyOffset}
                      strokeLinecap="butt"
                    />
                    <circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      fill="none"
                      stroke="var(--chart-medium)"
                      strokeWidth={strokeWidth}
                      strokeDasharray={`${mediumLen} ${circumference}`}
                      strokeDashoffset={mediumOffset}
                      strokeLinecap="butt"
                    />
                    <circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      fill="none"
                      stroke="var(--chart-hard)"
                      strokeWidth={strokeWidth}
                      strokeDasharray={`${hardLen} ${circumference}`}
                      strokeDashoffset={hardOffset}
                      strokeLinecap="butt"
                    />
                  </svg>
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-mono text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                      <CountUp value={dsaStats.totalSolved} />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                      Solved
                    </span>
                  </div>
                </div>

                <dl className="grid w-full flex-1 gap-3 sm:grid-cols-1">
                  {difficultyBreakdown.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/65 px-4 py-2.5"
                    >
                      <dt className="flex items-center gap-2.5 font-mono text-xs text-[var(--text-secondary)]">
                        <span
                          className="inline-block h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: item.colorVar }}
                          aria-hidden="true"
                        />
                        <span>{item.label}</span>
                        <span className="text-[11px] text-[var(--text-muted)]">
                          ({item.pct}%)
                        </span>
                      </dt>
                      <dd className="font-mono text-base font-semibold text-[var(--text-primary)]">
                        <CountUp value={item.count} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--border-subtle)] pt-4">
                <a
                  href={dsaStats.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-solid)] px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent-solid-hover)]"
                >
                  <LeetCodeIcon className="h-3.5 w-3.5" />
                  LeetCode Profile
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
                <a
                  href={dsaStats.solutionsRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-2 text-xs font-medium text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-border)] hover:bg-[var(--bg-subtle)]"
                >
                  <GitHubIcon className="h-3.5 w-3.5" />
                  LeetCode Solutions
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-card)] transition-all duration-200 hover:border-[var(--accent-border)] hover:shadow-[var(--shadow-card-hover)] lg:col-span-5">
              <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 p-3.5 lg:flex-row lg:items-center">
                  <dt className="font-mono text-xs text-[var(--text-muted)]">
                    Past-Year Submissions
                  </dt>
                  <dd className="mt-1 font-mono text-xl font-semibold text-[var(--text-primary)] lg:mt-0">
                    <CountUp value={dsaStats.submissionsPastYear} />
                  </dd>
                </div>
                <div className="flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 p-3.5 lg:flex-row lg:items-center">
                  <dt className="font-mono text-xs text-[var(--text-muted)]">
                    Active Days
                  </dt>
                  <dd className="mt-1 font-mono text-xl font-semibold text-[var(--text-primary)] lg:mt-0">
                    <CountUp value={dsaStats.activeDays} />
                  </dd>
                </div>
                <div className="flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 p-3.5 lg:flex-row lg:items-center">
                  <dt className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)]">
                    <Flame
                      className="h-3.5 w-3.5 text-[var(--accent)]"
                      aria-hidden="true"
                    />
                    Max Streak
                  </dt>
                  <dd className="mt-1 font-mono text-xl font-semibold text-[var(--text-primary)] lg:mt-0">
                    <CountUp value={dsaStats.maxStreakDays} suffix=" days" />
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
