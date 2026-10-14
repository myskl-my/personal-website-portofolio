"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Download, ExternalLink, Play } from "lucide-react";
import { GithubIcon } from "@/components/icons/github";
import type { ProjectLink } from "@/lib/data/types";
import { cn } from "@/lib/utils";

function LinkIcon({ name }: { name?: string }) {
  switch (name) {
    case "download":
      return <Download className="h-3.5 w-3.5" />;
    case "external":
      return <ExternalLink className="h-3.5 w-3.5" />;
    case "play":
      return <Play className="h-3.5 w-3.5" />;
    case "github":
      return <GithubIcon className="h-3.5 w-3.5" />;
    default:
      return null;
  }
}

/**
 * Deretan tombol tautan. Dipakai di kartu project maupun halaman detail.
 * `external` membuka tab baru, `internal` memakai routing Next.js.
 */
export function ProjectLinkButtons({
  links,
  size = "sm",
  className,
}: {
  links: ProjectLink[];
  size?: "sm" | "md";
  className?: string;
}) {
  if (links.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {links.map((link) => {
        const isExternal = link.kind === "external";
        const classes = cn(
          "inline-flex items-center gap-1.5 rounded-full border font-medium",
          "transition-[box-shadow,transform,border-color,background-color] duration-300",
          "hover:-translate-y-0.5 active:scale-[0.97]",
          size === "sm" ? "min-h-[34px] px-3 text-[12.5px]" : "min-h-[44px] px-4 text-[14px]",
        );

        const inner = (
          <>
            <LinkIcon name={link.icon} />
            {link.label}
            {isExternal && (
              <ExternalLink
                aria-hidden
                className="h-3 w-3 opacity-50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            )}
          </>
        );

        return (
          <motion.li key={`${link.label}-${link.href}`} whileTap={{ scale: 0.97 }}>
            {isExternal ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  classes,
                  "group border-[var(--color-line)] bg-[var(--color-surface)]",
                  "text-[var(--color-ink-2)] hover:border-[var(--color-line-2)]",
                  "hover:shadow-[var(--shadow-card)]",
                )}
              >
                {inner}
              </a>
            ) : (
              <Link
                href={link.href}
                className={cn(
                  classes,
                  "group border-[var(--color-line)] bg-[var(--color-surface)]",
                  "text-[var(--color-ink-2)] hover:border-[var(--color-line-2)]",
                  "hover:shadow-[var(--shadow-card)]",
                )}
              >
                {inner}
              </Link>
            )}
          </motion.li>
        );
      })}
    </ul>
  );
}