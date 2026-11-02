"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data/types";
import { categoryAccent, categoryLabel, getDetailHref } from "@/lib/project-links";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Kartu project.
 *
 * Cover memakai `coverImage` bila ada, kalau tidak dipakai gradient
 * dari warna kategori.
 */
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
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
        {/* cover: gambar kalau ada, gradient kalau belum, seluruh area
            adalah link ke halaman detail supaya klik cover tidak mati. */}
        <Link
          href={getDetailHref(project)}
          className="relative block aspect-[16/9] w-full overflow-hidden border-b border-[var(--color-line)]"
          aria-label={`View details for ${project.title}`}
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
        </div>
      </div>
    </motion.article>
  );
}

