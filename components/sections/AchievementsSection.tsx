import { Award, ExternalLink, Trophy } from "lucide-react";
import { achievements, certifications, sectionHeadings } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="border-b border-[var(--border-subtle)] bg-[var(--bg-section-alt)] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            index={sectionHeadings.achievements.index}
            title={sectionHeadings.achievements.title}
            subtitle={sectionHeadings.achievements.subtitle}
          />

          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Key Achievements
              </h3>
              <ol className="relative space-y-4 border-l border-[var(--border-strong)] pl-6">
                {achievements.map((item) => (
                  <li key={item.title} className="relative">
                    <span
                      className="absolute -left-[33px] top-4 inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--bg-section-alt)]"
                      aria-hidden="true"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    </span>

                    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-border)] hover:shadow-[var(--shadow-card-hover)]">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)]">
                            <Trophy className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                                {item.title}
                              </h4>
                              {item.date ? (
                                <span className="rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-2 py-0.5 font-mono text-[11px] font-medium text-[var(--accent)]">
                                  {item.date}
                                </span>
                              ) : null}
                            </div>
                            <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="lg:col-span-5">
              <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Certifications
              </h3>
              <ol className="relative space-y-4 border-l border-[var(--border-strong)] pl-6">
                {certifications.map((cert) => (
                  <li key={cert.title} className="relative">
                    <span
                      className="absolute -left-[33px] top-4 inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--accent-border)] bg-[var(--bg-section-alt)]"
                      aria-hidden="true"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    </span>

                    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-border)] hover:shadow-[var(--shadow-card-hover)]">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--accent)]">
                            <Award className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                                {cert.title}
                              </h4>
                              {cert.date ? (
                                <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-2 py-0.5 font-mono text-[11px] text-[var(--text-muted)]">
                                  {cert.date}
                                </span>
                              ) : null}
                            </div>
                            <p className="mt-1 font-mono text-xs text-[var(--text-muted)]">
                              {cert.issuer}
                              {cert.detail ? ` · ${cert.detail}` : ""}
                            </p>
                          </div>
                        </div>

                        {cert.credentialUrl ? (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Verify ${cert.title} credential`}
                            className="inline-flex shrink-0 items-center gap-1 rounded-md border border-[var(--border-subtle)] px-2 py-1 font-mono text-[11px] text-[var(--accent)] transition-colors hover:border-[var(--accent-border)]"
                          >
                            Verify
                            <ExternalLink
                              className="h-3 w-3"
                              aria-hidden="true"
                            />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
