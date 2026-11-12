"use client";

import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/data/content";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { id: "about", href: "/#about", label: "About" },
  { id: "skills", href: "/#skills", label: "Skills" },
  { id: "projects", href: "/#projects", label: "Projects" },
  { id: "dsa", href: "/#dsa", label: "DSA" },
  { id: "achievements", href: "/#achievements", label: "Achievements" },
  { id: "contact", href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const sectionEls = NAV_LINKS.map((link) =>
      document.getElementById(link.id)
    ).filter((el): el is HTMLElement => el !== null);

    if (sectionEls.length === 0) return;

    const visibleRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleRatios.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleRatios.delete(entry.target.id);
          }
        }

        if (window.scrollY < 120) {
          setActiveId("");
          return;
        }

        let bestId = "";
        let bestRatio = -1;
        for (const link of NAV_LINKS) {
          const ratio = visibleRatios.get(link.id);
          if (ratio !== undefined && ratio > bestRatio) {
            bestRatio = ratio;
            bestId = link.id;
          }
        }

        if (bestId) {
          setActiveId(bestId);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.6],
      }
    );

    for (const el of sectionEls) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-200 print:hidden ${
        scrolled
          ? "border-[var(--border-strong)]/80 bg-[var(--bg-page)]/92 shadow-[var(--nav-shadow)] backdrop-blur-md"
          : "border-[var(--border-subtle)] bg-[var(--bg-page)]/85 backdrop-blur-sm"
      }`}
    >
      <div
        className={`mx-auto flex max-w-5xl items-center justify-between px-4 transition-[height] duration-200 sm:px-6 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        <Link
          href="/#top"
          className="inline-flex items-center gap-2.5 rounded-lg py-1 pr-2 text-sm font-semibold tracking-tight text-[var(--text-primary)]"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)] font-mono text-xs font-semibold text-[var(--accent)]">
            {profile.monogram}
          </span>
          <span>{profile.name}</span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "location" : undefined}
                className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={profile.resumePath}
            download="Mohan_A_L_Resume.pdf"
            className="hidden items-center gap-1.5 rounded-lg bg-[var(--accent-solid)] px-3.5 py-2 text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent-solid-hover)] sm:inline-flex"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Resume
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] md:hidden"
          >
            {menuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-[var(--border-subtle)] bg-[var(--bg-page)] px-4 py-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <a
                href={profile.resumePath}
                download="Mohan_A_L_Resume.pdf"
                onClick={() => setMenuOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent-solid)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-solid-hover)]"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download Resume
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
