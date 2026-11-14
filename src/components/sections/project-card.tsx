"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/data/types";
import { categoryAccent, categoryLabel } from "@/lib/project-links";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Project card.
 *
 * Shows category badge, project title, and a "Go to Project" button that
 * opens the live site in a new tab. No cover image or screenshot.
 */
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const accent = categoryAccent[project.category];

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
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="min-w-0">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: accent }}
            >
              {categoryLabel[project.category]}
            </p>
            <h3 className="mt-1.5 truncate text-[17px] font-semibold tracking-tight text-[var(--color-ink)] sm:text-[18px]">
              {project.title}
            </h3>
          </div>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "mt-4 inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-5 text-[14px] font-medium text-[var(--color-ink)] transition-all duration-300",
                "hover:-translate-y-0.5 hover:border-[var(--color-line-2)] hover:text-[var(--color-primary)] hover:shadow-[var(--shadow-card)]",
                "active:scale-95",
              )}
            >
              Go to Project
              <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
