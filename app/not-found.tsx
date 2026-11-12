import { ArrowLeft, Compass } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main
        id="main-content"
        className="relative flex flex-1 items-center justify-center overflow-hidden bg-[var(--bg-page)] bg-tech-grid px-4 py-20 sm:px-6"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-page)]/65 to-[var(--bg-page)]"
          aria-hidden="true"
        />

        <div className="relative w-full max-w-lg rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 text-center shadow-[var(--shadow-card)] sm:p-10">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3 py-1 font-mono text-xs font-medium text-[var(--accent)]">
            <Compass className="h-3.5 w-3.5" aria-hidden="true" />
            404 // PAGE NOT FOUND
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            This route doesn&apos;t exist
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            The page you requested may have moved or does not exist. You can
            return to the portfolio home page or jump straight to projects.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-solid)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent-solid-hover)] hover:shadow-md"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Home
            </Link>
            <Link
              href="/#projects"
              className="inline-flex items-center rounded-xl border border-[var(--border-strong)] bg-[var(--bg-page)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-border)] hover:bg-[var(--bg-subtle)]"
            >
              View Projects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
