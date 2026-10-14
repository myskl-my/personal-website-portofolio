import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Judul section yang dipakai ulang di seluruh halaman.
 *
 * Satu tempat untuk mengatur hierarki tipografi (eyebrow, judul, deskripsi)
 * supaya setiap section punya ritme yang konsisten tanpa menyalin kelas.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-[12.5px] font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
          {eyebrow}
        </p>
      )}
      <Tag className="mt-3 max-w-3xl text-[clamp(1.6rem,5vw,2.5rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-balance text-[var(--color-ink)]">
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            "mt-3.5 max-w-2xl text-[15px] leading-relaxed text-[var(--color-muted)] sm:text-base",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </header>
  );
}
