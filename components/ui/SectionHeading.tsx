interface SectionHeadingProps {
  index: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({
  index,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs font-medium tracking-wider text-[var(--accent)]">
          {index}
        </span>
        <span
          className="h-px flex-1 max-w-12 bg-[var(--border-strong)]"
          aria-hidden="true"
        />
      </div>
      <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-2xl text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
