"use client";

import { useState } from "react";
import { skillGroups } from "@/data/content";
import type { SkillLevel } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const LEVEL_FILTERS: Array<"All" | SkillLevel> = [
  "All",
  "Strong",
  "Working",
  "Learning",
];

function getLevelBadgeClass(level: SkillLevel): string {
  switch (level) {
    case "Strong":
      return "border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)] font-medium";
    case "Working":
      return "border-[var(--border-strong)] bg-[var(--bg-subtle)] text-[var(--text-primary)]";
    case "Learning":
      return "border-dashed border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-muted)]";
  }
}

export function SkillsSection() {
  const [filter, setFilter] = useState<"All" | SkillLevel>("All");

  return (
    <section
      id="skills"
      className="border-b border-[var(--border-subtle)] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              index="02 // SKILLS"
              title="Technical Skills"
              subtitle="Grouped by stack with honest self-assessed proficiency across Strong, Working, and Learning."
            />

            <div
              role="group"
              aria-label="Filter skills by proficiency level"
              className="mb-8 flex flex-wrap gap-1.5"
            >
              {LEVEL_FILTERS.map((level) => {
                const active = filter === level;
                return (
                  <button
                    key={level}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(level)}
                    className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors ${
                      active
                        ? "border-[var(--accent-solid)] bg-[var(--accent-solid)] font-medium text-white"
                        : "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)]">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-sm border border-[var(--accent-border)] bg-[var(--accent-soft)]" />
              Strong — daily use &amp; core depth
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-sm border border-[var(--border-strong)] bg-[var(--bg-subtle)]" />
              Working — shipped in projects
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-sm border border-dashed border-[var(--border-strong)] bg-[var(--bg-surface)]" />
              Learning — active exploration
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => {
              const items =
                filter === "All"
                  ? group.items
                  : group.items.filter((item) => item.level === filter);

              if (items.length === 0) return null;

              return (
                <div
                  key={group.category}
                  className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5"
                >
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    {group.category}
                  </h3>
                  <ul className="mt-3.5 flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <li
                        key={skill.name}
                        className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs ${getLevelBadgeClass(
                          skill.level
                        )}`}
                      >
                        <span>{skill.name}</span>
                        <span className="font-mono text-[10px] opacity-80">
                          · {skill.level}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
