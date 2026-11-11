import { ArrowRight } from "lucide-react";
import type { ArchitectureNode } from "@/lib/types";

interface ArchitectureDiagramProps {
  title: string;
  nodes: ArchitectureNode[];
  compact?: boolean;
}

export function ArchitectureDiagram({
  title,
  nodes,
  compact = false,
}: ArchitectureDiagramProps) {
  if (compact) {
    return (
      <div
        aria-label={`${title} overview`}
        className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/70 px-3 py-2.5"
      >
        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
          {title}
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          {nodes.map((node, idx) => (
            <div key={node.label} className="flex items-center gap-1.5">
              <span className="rounded border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2 py-0.5 font-mono text-[11px] font-medium text-[var(--text-primary)]">
                {node.label}
              </span>
              {idx < nodes.length - 1 ? (
                <ArrowRight
                  className="h-3 w-3 shrink-0 text-[var(--accent)]"
                  aria-hidden="true"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label={`${title} diagram`}
      className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/60 p-4"
    >
      <p className="mb-3 font-mono text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
        {title}
      </p>
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {nodes.map((node, idx) => (
          <div key={node.label} className="relative flex items-stretch gap-2">
            <div className="flex-1 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] p-3">
              <span className="font-mono text-[10px] text-[var(--accent)]">
                0{idx + 1}
              </span>
              <p className="mt-1 text-xs font-semibold text-[var(--text-primary)]">
                {node.label}
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-[var(--text-muted)]">
                {node.sublabel}
              </p>
            </div>
            {idx < nodes.length - 1 ? (
              <div
                className="hidden items-center justify-center lg:flex"
                aria-hidden="true"
              >
                <ArrowRight className="h-3.5 w-3.5 text-[var(--accent)]" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
