import { GraduationCap } from "lucide-react";
import Image from "next/image";
import { about, featureFlags, sectionHeadings } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutSection() {
  const { aboutPhoto } = featureFlags;

  return (
    <section
      id="about"
      className="border-b border-[var(--border-subtle)] bg-[var(--bg-section-alt)] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            index={sectionHeadings.about.index}
            title={sectionHeadings.about.title}
            subtitle={sectionHeadings.about.subtitle}
          />

          <div className="grid gap-10 md:grid-cols-12 md:items-start">
            <div className="space-y-4 md:col-span-8">
              {about.lines.map((line) => (
                <p
                  key={line}
                  className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base"
                >
                  {line}
                </p>
              ))}

              <div className="pt-2">
                <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                  Core Strengths
                </h3>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {about.strengths.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 py-1 font-mono text-xs text-[var(--text-primary)] shadow-[var(--shadow-card)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 pt-3 sm:grid-cols-2">
                {about.education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-border)] hover:shadow-[var(--shadow-card-hover)]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <GraduationCap
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
                        aria-hidden="true"
                      />
                      <span className="font-mono text-xs text-[var(--text-muted)]">
                        {edu.period}
                      </span>
                    </div>
                    <h3 className="mt-2.5 text-sm font-semibold text-[var(--text-primary)]">
                      {edu.degree}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                      {edu.institution}
                    </p>
                    {"highlight" in edu && edu.highlight ? (
                      <p className="mt-2 font-mono text-[11px] text-[var(--accent)]">
                        {edu.highlight}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <aside className="md:col-span-4">
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-card)] transition-all duration-200 hover:border-[var(--accent-border)] hover:shadow-[var(--shadow-card-hover)]">
                <div className="mx-auto w-[180px]">
                  <div className="rounded-2xl border-2 border-[var(--accent-border)] bg-[var(--accent-soft)] p-1.5">
                    <Image
                      src={aboutPhoto.webpSrc}
                      width={aboutPhoto.width}
                      height={aboutPhoto.height}
                      alt={aboutPhoto.alt}
                      loading="lazy"
                      sizes="180px"
                      className="aspect-square w-full rounded-xl object-cover object-center ring-1 ring-black/5 dark:ring-white/25"
                    />
                  </div>
                </div>

                <dl className="mt-5 space-y-3 border-t border-[var(--border-subtle)] pt-4 text-xs">
                  <div>
                    <dt className="font-mono uppercase tracking-wider text-[var(--text-muted)]">
                      Languages
                    </dt>
                    <dd className="mt-1 text-[var(--text-primary)]">
                      {about.spokenLanguages.join(" · ")}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono uppercase tracking-wider text-[var(--text-muted)]">
                      Interests
                    </dt>
                    <dd className="mt-1 leading-relaxed text-[var(--text-secondary)]">
                      {about.interests.join(", ")}
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
