"use client";

import { useState } from "react";
import { sectionHeadings, skillGroups } from "@/data/content";
import type { SkillLevel } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

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

function getLevelIndicatorClass(level: SkillLevel): string {
  switch (level) {
    case "Strong":
      return "bg-[var(--accent)]";
    case "Working":
      return "bg-[var(--text-secondary)]";
    case "Learning":
      return "border border-[var(--text-muted)] bg-transparent";
  }
}

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    { key: "All", label: "All" },
    ...skillGroups.map((group) => ({
      key: group.category,
      label: group.tabLabel ?? group.category,
    })),
  ];

  const visibleGroups =
    selectedCategory === "All"
      ? skillGroups
      : skillGroups.filter((group) => group.category === selectedCategory);

  return (
    <section
      id="skills"
      className="border-b border-[var(--border-subtle)] bg-[var(--bg-page)] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            index={sectionHeadings.skills.index}
            title={sectionHeadings.skills.title}
            subtitle={sectionHeadings.skills.subtitle}
          />

          <div
            role="tablist"
            aria-label="Filter skills by category"
            className="mb-6 flex flex-wrap gap-2"
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`rounded-xl border px-3.5 py-1.5 font-mono text-xs transition-all duration-200 ${
                    active
                      ? "border-[var(--accent-solid)] bg-[var(--accent-solid)] font-medium text-white shadow-sm"
                      : "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--accent-border)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-2.5 text-xs text-[var(--text-secondary)]">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
              Level Legend:
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--accent)]"
                aria-hidden="true"
              />
              <span>
                <strong className="font-medium text-[var(--text-primary)]">
                  Strong
                </strong>{" "}
                — daily use &amp; core depth
              </span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--text-secondary)]"
                aria-hidden="true"
              />
              <span>
                <strong className="font-medium text-[var(--text-primary)]">
                  Working
                </strong>{" "}
                — shipped in projects
              </span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full border border-[var(--text-muted)] bg-transparent"
                aria-hidden="true"
              />
              <span>
                <strong className="font-medium text-[var(--text-primary)]">
                  Learning
                </strong>{" "}
                — active exploration
              </span>
            </span>
          </div>

          <div
            className={`grid gap-4 ${
              visibleGroups.length === 1
                ? "max-w-2xl grid-cols-1"
                : "sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {visibleGroups.map((group) => (
              <div
                key={group.category}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-border)] hover:shadow-[var(--shadow-card-hover)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    {group.category}
                  </h3>
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">
                    {group.items.length}
                  </span>
                </div>
                <ul className="mt-3.5 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill.name}
                      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs ${getLevelBadgeClass(
                        skill.level
                      )}`}
                    >
                      <span
                        className={`inline-block h-1.5 w-1.5 rounded-full ${getLevelIndicatorClass(
                          skill.level
                        )}`}
                        aria-hidden="true"
                      />
                      <span>{skill.name}</span>
                      <span className="font-mono text-[10px] opacity-80">
                        · {skill.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
