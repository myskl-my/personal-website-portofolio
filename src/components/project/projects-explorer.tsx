"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import type { Category, Project } from "@/lib/data/types";
import { categoryLabel } from "@/lib/project-links";
import { ProjectGrid } from "@/components/project/project-grid";
import { cn } from "@/lib/utils";

/**
 * Daftar project dengan filter kategori dan pencarian.
 *
 * Filter dijalankan di klien sepenuhnya karena situs ini `output: "export"`
 * tanpa server. Jumlah project masih sedikit, jadi tidak perlu virtualisasi.
 */
export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [category, setCategory] = React.useState<Category | "all">("all");
  const [query, setQuery] = React.useState("");

  const categories = React.useMemo(() => {
    const seen = new Set<Category>();
    for (const p of projects) seen.add(p.category);
    return Array.from(seen);
  }, [projects]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [projects, category, query]);

  const filters: Array<{ value: Category | "all"; label: string }> = [
    { value: "all", label: "All" },
    ...categories.map((c) => ({ value: c, label: categoryLabel[c] })),
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Category filter">
          {filters.map((f) => {
            const active = category === f.value;
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(f.value)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-[13px] font-medium transition-all duration-300",
                  active
                    ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                    : "border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:border-[var(--color-line-2)] hover:text-[var(--color-ink)]",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            aria-label="Search projects"
            className="h-10 w-full rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] pr-9 pl-9 text-[14px] text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus-visible:border-[var(--color-primary)]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <p className="mt-5 text-[13px] text-[var(--color-muted)]">
        <span className="font-mono font-semibold text-[var(--color-ink)]">
          {filtered.length}
        </span>        {" "}
        projects found
      </p>

      {filtered.length > 0 ? (
        <ProjectGrid projects={filtered} className="mt-6" />
      ) : (
        <div className="surface mt-6 rounded-3xl px-6 py-20 text-center">
          <p className="text-[15px] font-medium text-[var(--color-ink)]">
            Nothing matches that.
          </p>
          <p className="mt-2 text-[14px] text-[var(--color-muted)]">
            Try a different keyword or another category.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="mt-5 inline-flex min-h-[42px] items-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-5 text-[14px] font-medium text-[var(--color-ink)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
          >
            Show all
          </button>
        </div>
      )}
    </div>
  );
}
