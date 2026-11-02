import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Judul section yang dipakai ulang di seluruh halaman.
 *
 * Hanya eyebrow (label kategori) yang ditampilkan; deskripsi opsional.
 * Eyebrow sudah cukup menjelaskan isi bagian tersebut.
 */
export function SectionHeading({
  eyebrow,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title?: React.ReactNode;
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
        <p className="text-[clamp(1.35rem,3.5vw,2rem)] font-bold uppercase tracking-[0.12em] text-[var(--color-primary)]">
          {eyebrow}
        </p>
      )}
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
