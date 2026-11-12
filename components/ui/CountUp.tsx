"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: number;
  durationMs?: number;
  suffix?: string;
}

export function CountUp({
  value,
  durationMs = 900,
  suffix = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);
  const [display, setDisplay] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => {
        setDisplay(value);
        setReady(true);
      });
      return () => cancelAnimationFrame(id);
    }

    let frameId = 0;

    const startAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;
      setReady(true);

      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / durationMs);
        // Cubic ease-out
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(Math.round(eased * value));

        if (t < 1) {
          frameId = requestAnimationFrame(tick);
        } else {
          setDisplay(value);
        }
      };

      frameId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            startAnimation();
            break;
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span aria-hidden="true">
        {ready ? display : value}
        {suffix}
      </span>
    </span>
  );
}
