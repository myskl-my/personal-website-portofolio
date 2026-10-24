"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { useScrollToSection } from "@/lib/smooth-scroll";
import { spring } from "@/lib/motion";
import { useIntroComplete } from "@/lib/welcome-store";
import { CodeWindow } from "@/components/sections/code-window";

/**
 * Hero dua kolom.
 *
 * Desktop: teks di kiri, kartu kode di kanan, sejajar tengah.
 * Mobile : satu kolom, kartu kode berada di bawah teks.
 *
 * Semua animasi masuk menghormati `prefers-reduced-motion` (dilewati kalau
 * dikurangi). Tombol memakai animasi scroll sendiri dari `lib/smooth-scroll`.
 *
 * Animasi fade-in masuk ditahan sampai layar sambutan selesai
 * (`useIntroComplete`), supaya stagger yang ada berjalan tepat saat overlay
 * membuka — bukan terbuang di baliknya. Kalau intro tidak diputar (sudah
 * pernah dalam sesi ini / reduced motion), animasi berjalan seperti biasa.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const scrollTo = useScrollToSection();
  const introComplete = useIntroComplete();
  const show = Boolean(reduce) || introComplete;

  const fade = (delay: number, y = 18) => ({
    initial: reduce ? false : { opacity: 0, y, filter: "blur(8px)" as const },
    animate: show
      ? { opacity: 1, y: 0, filter: "blur(0px)" as const }
      : { opacity: 0, y, filter: "blur(8px)" as const },
    transition: { ...spring.soft, delay },
  });

  return (
    <section className="mesh-bg grain relative overflow-hidden">
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 pt-28 pb-16 sm:px-6 sm:pt-32 md:pt-40 md:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* kolom teks */}
        <div className="max-w-2xl">
          <motion.p
            {...fade(0.05, 14)}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/80 py-1.5 pr-4 pl-2 backdrop-blur-md"
          >
            <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary-soft)]">
              <span className="absolute inset-0 rounded-full bg-[var(--color-primary)] opacity-30 animate-[pulse-ring_2.4s_ease-out_infinite]" />
              <Sparkles className="relative h-3 w-3 text-[var(--color-primary)]" />
            </span>
            <span className="text-[12.5px] font-medium tracking-tight text-[var(--color-ink-2)]">
              {site.role}
            </span>
          </motion.p>

          <motion.h1
            {...fade(0.12, 22)}
            className="mt-6 text-[clamp(2.3rem,8.5vw,4.5rem)] leading-[1.03] font-semibold tracking-[-0.035em] text-balance text-[var(--color-ink)]"
          >
            {/* Potong dua bagian terakhir ("With AI") untuk gradient —
                kalau teks headline berubah, sisanya tetap terbaca utuh. */}
            {site.headline.replace(/\sWith AI$/, "")}{" "}
            <span className="text-gradient">With AI</span>
          </motion.h1>

          <motion.p
            {...fade(0.22, 16)}
            className="mt-5 text-[clamp(1.05rem,3.6vw,1.4rem)] leading-snug font-medium tracking-[-0.01em] text-[var(--color-muted)]"
          >
            {site.tagline}
          </motion.p>

          <motion.p
            {...fade(0.32, 16)}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted)] sm:text-base"
          >
            Saya merancang, membangun, menguji, dan merilis produk digital
            dengan alur kerja yang diperkuat AI. AI jadi metode kerja, hasilnya
            tetap produk yang benar-benar berjalan.
          </motion.p>

          <motion.div
            {...fade(0.42, 16)}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="group relative inline-flex min-h-[52px] items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--color-primary)] px-7 text-[15px] font-semibold text-[var(--color-on-primary)] shadow-[var(--shadow-card)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-float)] active:scale-[0.97]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Explore Projects</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo("kontak")}
              className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-7 text-[15px] font-semibold text-[var(--color-ink)] transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-[var(--color-line-2)] hover:shadow-[var(--shadow-card)] active:scale-[0.97]"
            >
              <MessageCircle className="h-4 w-4 text-[var(--color-primary)]" />
              <span>Contact Me</span>
            </button>
          </motion.div>
        </div>

        {/* kolom kartu kode */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={
            show
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 28, filter: "blur(10px)" }
          }
          transition={{ ...spring.soft, delay: 0.3 }}
          className="relative w-full"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_70%_30%,color-mix(in_srgb,var(--color-primary)_22%,transparent),transparent_70%)] blur-2xl"
          />
          <CodeWindow />
        </motion.div>
      </div>

      {/* pemisah lembut ke section berikutnya */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-px h-16 bg-gradient-to-b from-transparent to-[var(--color-bg)]"
      />
    </section>
  );
}
