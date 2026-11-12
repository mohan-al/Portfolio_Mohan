"use client";

import { ExternalLink, Layers } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { projects, sectionHeadings } from "@/data/content";
import type { ProjectItem } from "@/lib/types";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GitHubIcon } from "@/components/ui/SocialIcons";

const PROJECT_FILTERS = [
  { id: "All", label: "All" },
  { id: "Java", label: "Java" },
  { id: "Spring Boot", label: "Spring Boot" },
  { id: "React", label: "React" },
  { id: "TypeScript", label: "TypeScript" },
  { id: "ML", label: "ML" },
] as const;

type ProjectFilterId = (typeof PROJECT_FILTERS)[number]["id"];

const ML_STACK_TERMS = new Set([
  "Whisper ASR",
  "Sentence-BERT",
  "MediaPipe",
  "Unity",
]);

function matchesFilter(project: ProjectItem, filter: ProjectFilterId): boolean {
  if (filter === "All") return true;
  if (filter === "ML") {
    return project.stack.some((tech) => ML_STACK_TERMS.has(tech));
  }
  return project.stack.some(
    (tech) => tech.toLowerCase() === filter.toLowerCase()
  );
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const [activeFilter, setActiveFilter] = useState<ProjectFilterId>("All");
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);

  const filteredProjects = projects.filter((project) =>
    matchesFilter(project, activeFilter)
  );

  return (
    <section
      id="projects"
      className="border-b border-[var(--border-subtle)] bg-[var(--bg-section-alt)] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            index={sectionHeadings.projects.index}
            title={sectionHeadings.projects.title}
            subtitle={sectionHeadings.projects.subtitle}
          />

          <div
            role="group"
            aria-label="Filter projects by technology"
            className="mb-8 flex flex-wrap items-center gap-2"
          >
            {PROJECT_FILTERS.map((chip) => {
              const active = activeFilter === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveFilter(chip.id)}
                  className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all duration-200 ${
                    active
                      ? "border-[var(--accent-solid)] bg-[var(--accent-solid)] font-medium text-white shadow-sm"
                      : "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--accent-border)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => {
              const originalIndex = projects.findIndex(
                (p) => p.id === project.id
              );
              return (
                <article
                  key={`${activeFilter}-${project.id}`}
                  className="project-card-enter flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-border)] hover:shadow-[var(--shadow-card-hover)]"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs text-[var(--text-muted)]">
                        0{originalIndex + 1} · {project.period}
                      </span>
                      {project.status ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-2.5 py-0.5 font-mono text-[11px] font-medium text-[var(--accent)]">
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
                            aria-hidden="true"
                          />
                          {project.status}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-3 text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {project.oneLineProblem}
                    </p>

                    <div className="mt-4">
                      {project.screenshot ? (
                        <div className="overflow-hidden rounded-lg border border-[var(--border-subtle)]">
                          <Image
                            src={project.screenshot}
                            alt={`${project.title} screenshot`}
                            width={1200}
                            height={675}
                            loading="lazy"
                            unoptimized={project.screenshot.startsWith("http")}
                            className="aspect-video w-full object-cover"
                          />
                        </div>
                      ) : (
                        <ArchitectureDiagram
                          title={project.detail.architectureTitle}
                          nodes={project.detail.architectureNodes}
                          compact
                        />
                      )}
                    </div>

                    <ul className="mt-4 space-y-1.5">
                      {project.outcomes.slice(0, 3).map((outcome) => (
                        <li
                          key={outcome}
                          className="flex items-start gap-2 text-xs leading-relaxed text-[var(--text-secondary)]"
                        >
                          <span
                            className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
                            aria-hidden="true"
                          />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-2 py-0.5 font-mono text-[11px] text-[var(--text-primary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-[var(--border-subtle)] pt-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        activeTriggerRef.current = e.currentTarget;
                        setSelectedProject(project);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--accent)] transition-all duration-200 hover:bg-[var(--accent-solid)] hover:text-white"
                    >
                      <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                      Architecture &amp; Details
                    </button>

                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                      >
                        <GitHubIcon className="h-3.5 w-3.5" />
                        GitHub
                      </a>
                    ) : null}

                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                      >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        Live Demo
                      </a>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        triggerRef={activeTriggerRef}
      />
    </section>
  );
}
