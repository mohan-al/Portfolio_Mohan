import { Award, ExternalLink, Trophy } from "lucide-react";
import { achievements, certifications } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="border-b border-[var(--border-subtle)] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            index="05 // ACHIEVEMENTS"
            title="Achievements & Certifications"
            subtitle="Academic honors, project leadership, competitive chess, and verified coursework."
          />

          <div className="grid gap-6 lg:grid-cols-12">
            <div className="space-y-3 lg:col-span-7">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Key Achievements
              </h3>
              {achievements.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4"
                >
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Trophy className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 lg:col-span-5">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Certifications
              </h3>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.title}
                    className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <Award
                          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
                          aria-hidden="true"
                        />
                        <div>
                          <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                            {cert.title}
                          </h4>
                          <p className="mt-0.5 font-mono text-xs text-[var(--text-muted)]">
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
                          <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
