"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

interface RotatingRoleProps {
  roles: readonly string[];
}

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function RotatingRole({ roles }: RotatingRoleProps) {
  const prefersReduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => true
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReduced || roles.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [prefersReduced, roles.length]);

  if (prefersReduced) {
    return (
      <p className="mt-1.5 font-mono text-sm font-medium text-[var(--accent)] sm:text-base">
        {roles.join(" · ")}
      </p>
    );
  }

  return (
    <p
      className="mt-1.5 flex min-h-[1.75rem] items-center font-mono text-sm font-medium text-[var(--accent)] sm:text-base"
      aria-live="polite"
    >
      <span key={roles[index]} className="role-fade-in inline-block">
        {roles[index]}
      </span>
    </p>
  );
}
