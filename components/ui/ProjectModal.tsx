"use client";

import { ExternalLink, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { ProjectItem } from "@/lib/types";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { GitHubIcon } from "@/components/ui/SocialIcons";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ProjectModal({
  project,
  onClose,
  triggerRef,
}: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const returnFocusEl = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      returnFocusEl?.focus();
    };
  }, [project, onClose, triggerRef]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${project.id}`}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] p-6 shadow-xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-[var(--text-muted)]">
                {project.period}
              </span>
              {project.status ? (
                <span className="rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-2.5 py-0.5 font-mono text-[11px] font-medium text-[var(--accent)]">
                  {project.status}
                </span>
              ) : null}
            </div>
            <h3
              id={`modal-title-${project.id}`}
              className="mt-1.5 text-xl font-semibold tracking-tight text-[var(--text-primary)]"
            >
              {project.title}
            </h3>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 space-y-5">
          {project.screenshot ? (
            <div className="overflow-hidden rounded-xl border border-[var(--border-subtle)]">
              <Image
                src={project.screenshot}
                alt={`${project.title} preview`}
                width={1200}
                height={675}
                loading="lazy"
                unoptimized={project.screenshot.startsWith("http")}
                className="h-auto w-full object-cover"
              />
            </div>
          ) : null}

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Problem
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
              {project.detail.problem}
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Approach
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
              {project.detail.approach}
            </p>
          </div>

          <ArchitectureDiagram
            title={project.detail.architectureTitle}
            nodes={project.detail.architectureNodes}
          />

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              What I Learned
            </h4>
            <ul className="mt-2 space-y-2">
              {project.detail.whatILearned.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--text-secondary)]"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Stack
            </h4>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-2.5 py-1 font-mono text-xs text-[var(--text-primary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.githubUrl || project.demoUrl ? (
            <div className="flex flex-wrap items-center gap-3 border-t border-[var(--border-subtle)] pt-4">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-subtle)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
                >
                  <GitHubIcon className="h-4 w-4" />
                  View Repository
                </a>
              ) : null}
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-solid)] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--accent-solid-hover)]"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  Live Demo
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
