"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data/types";
import { categoryAccent, categoryLabel, getDetailHref, getProjectLinks } from "@/lib/project-links";
import { ProjectLinkButtons } from "@/components/project/project-link-buttons";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Warna badge platform. Mapping eksplisit supaya warna/platform konsisten,
 * dengan fallback bersiklus untuk platform baru yang belum dipetakan.
 */
const PLATFORM_ACCENTS: Record<string, string> = {
  Web: "var(--color-primary)",
  Android: "var(--color-jade)",
  Windows: "var(--color-accent)",
  Linux: "var(--color-amber)",
  macOS: "var(--color-mauve)",
  Desktop: "var(--color-mauve)",
};

const ACCENT_CYCLE = [
  "var(--color-primary)",
  "var(--color-jade)",
  "var(--color-accent)",
  "var(--color-amber)",
  "var(--color-mauve)",
];

function platformAccent(platform: string, index: number): string {
  return (
    PLATFORM_ACCENTS[platform] ?? ACCENT_CYCLE[index % ACCENT_CYCLE.length]
  );
}

/**
 * Kartu project.
 *
 * Belum ada cover image di seed placeholder, jadi sementara dipakai gradient
 * dari warna kategori. Begitu `coverImage` diisi, gambar otomatis dipakai
 * tanpa perubahan kode.
 */
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const links = getProjectLinks(project);
  const accent = categoryAccent[project.category];

  // Spotlight: tulis posisi kursor ke CSS custom property, consumed oleh
  // kelas `.spotlight` di globals.css. Dipisah dari React state supaya
  // tidak memicu re-render tiap mousemove.
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...spring.soft, delay: Math.min(index * 0.07, 0.28) }}
      className="h-full"
    >
      <div
        ref={ref}
        onPointerMove={onPointerMove}
        className={cn(
          "group surface spotlight relative flex h-full flex-col overflow-hidden rounded-2xl",
          "transition-[box-shadow,border-color] duration-400",
          "hover:-translate-y-1.5 hover:shadow-[var(--shadow-float)]",
          "hover:border-[var(--color-line-2)]",
        )}
      >
        {/* cover: gambar kalau ada, gradient kalau belum — seluruh area
            adalah link ke halaman detail supaya klik cover tidak mati. */}
        <Link
          href={getDetailHref(project)}
          className="relative block aspect-[16/9] w-full overflow-hidden border-b border-[var(--color-line)]"
          aria-label={`${project.title} — view detail`}
        >
          {project.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.coverImage}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-smooth)] group-hover:scale-[1.05]"
            />
          ) : (
            <div
              className="h-full w-full transition-transform duration-700 ease-[var(--ease-smooth)] group-hover:scale-105"
              style={{
                background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 26%, var(--color-surface)), color-mix(in srgb, ${accent} 6%, var(--color-surface-2)))`,
              }}
            >
              <div
                aria-hidden
                className="h-full w-full opacity-[0.35]"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 25%, color-mix(in srgb, ${accent} 55%, transparent) 0%, transparent 55%), radial-gradient(circle at 78% 80%, color-mix(in srgb, var(--color-mauve) 42%, transparent) 0%, transparent 58%)`,
                }}
              />
            </div>
          )}

          {/* badge platform */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {project.platforms.map((p, pi) => (
              <span
                key={p}
                className="rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-tight backdrop-blur-md"
                style={{
                  background: `color-mix(in srgb, ${platformAccent(p, pi)} 20%, var(--color-surface))`,
                  borderColor: `color-mix(in srgb, ${platformAccent(p, pi)} 40%, transparent)`,
                  color: platformAccent(p, pi),
                }}
              >
                {p}
              </span>
            ))}
          </div>

          {/* overlay hover */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-end justify-center bg-[var(--color-bg)]/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-400 group-hover:opacity-100"
          >
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-surface)] px-4 py-2 text-[13px] font-semibold text-[var(--color-ink)] shadow-[var(--shadow-card)]">
              View Detail
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </Link>

        {/* isi */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: accent }}
              >
                {categoryLabel[project.category]}
              </p>
              <h3 className="mt-1.5 truncate text-[17px] font-semibold tracking-tight text-[var(--color-ink)] sm:text-[18px]">
                <Link
                  href={getDetailHref(project)}
                  className="outline-none transition-colors hover:text-[var(--color-primary)] focus-visible:text-[var(--color-primary)]"
                >
                  {project.title}
                </Link>
              </h3>
            </div>
            {project.featured && (
              <span className="mt-0.5 shrink-0 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                Unggulan
              </span>
            )}
          </div>

          <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-[var(--color-muted)]">
            {project.tagline}
          </p>

          {/* tech stack */}
          {project.techStack.length > 0 && (
            <ul className="mt-3.5 flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 4).map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-[var(--color-line)] bg-[var(--color-bg-2)] px-2 py-0.5 font-mono text-[11px] text-[var(--color-muted)]"
                >
                  {tech}
                </li>
              ))}
              {project.techStack.length > 4 && (
                <li className="px-1 py-0.5 font-mono text-[11px] text-[var(--color-muted)]">
                  +{project.techStack.length - 4}
                </li>
              )}
            </ul>
          )}

          {/* meta + tautan, didorong ke bawah */}
          <div className="mt-auto pt-4">
            <p className="mb-3 font-mono text-[11px] text-[var(--color-muted)]">
              {project.role}
            </p>
            {links.length > 0 ? (
              <ProjectLinkButtons links={links} />
            ) : (
              <Link
                href={getDetailHref(project)}
                className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-3 text-[12.5px] font-medium text-[var(--color-ink-2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
              >
                View Detail
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}