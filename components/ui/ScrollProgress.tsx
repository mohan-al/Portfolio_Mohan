"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const next = Math.min(1, Math.max(0, scrollTop / docHeight));
      setProgress(next);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      data-scroll-progress
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 top-0 z-50 h-[2.5px] bg-transparent print:hidden"
    >
      <div
        className="h-full origin-left bg-[var(--accent-solid)] transition-transform duration-75 ease-out dark:bg-[var(--accent)]"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
