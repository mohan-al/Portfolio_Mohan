"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function subscribeTheme(callback: () => void) {
  window.addEventListener("theme-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("theme-change", callback);
    window.removeEventListener("storage", callback);
  };
}

function getThemeSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
    return true;
  }
  return target.isContentEditable;
}

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme | null>(
    subscribeTheme,
    getThemeSnapshot,
    () => null
  );

  const toggleTheme = useCallback(() => {
    const current = getThemeSnapshot();
    const next: Theme = current === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Ignore storage errors in restricted contexts
    }
    window.dispatchEvent(new Event("theme-change"));
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() !== "t" ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.shiftKey ||
        event.repeat
      ) {
        return;
      }
      if (isTypingTarget(event.target)) return;
      toggleTheme();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleTheme]);

  const label =
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <div className="group relative inline-flex">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`${label} (Shortcut: T)`}
        aria-keyshortcuts="t"
        title={`${label} (Press T)`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Moon className="h-4 w-4" aria-hidden="true" />
        )}
      </button>

      <span
        role="tooltip"
        className="pointer-events-none absolute right-0 top-full z-50 mt-2 hidden whitespace-nowrap rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)] opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 sm:inline-flex sm:items-center sm:gap-1.5"
      >
        <span>Theme</span>
        <kbd className="rounded border border-[var(--border-strong)] bg-[var(--bg-subtle)] px-1 py-0.5 text-[10px] font-semibold text-[var(--text-primary)]">
          T
        </kbd>
      </span>
    </div>
  );
}
