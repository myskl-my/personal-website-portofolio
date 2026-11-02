"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { spring, ease } from "@/lib/motion";
import { LittleBlob, type BlobPose } from "@/components/welcome/little-blob";
import { AmbientParticles } from "@/components/welcome/ambient-particles";
import {
  enterWelcome,
  finishWelcome,
  initWelcome,
  useWelcomeStatus,
} from "@/lib/welcome-store";
import { cn } from "@/lib/utils";

/**
 * Layar sambutan interaktif.
 *
 * Alur: begitu dipasang ia memutuskan sekali (per sesi) apakah intro harus
 * diputar. Jika ya, overlay muncul penuh, blob masuk, lalu beridle sambil
 * sesekali menunjuk tombol. Tombol baru aktif setelah font & dokumen siap dan
 * animasi masuk selesai. Klik â†’ blob gembira, aksen teal mengembang, overlay
 * memudar, dan animasi masuk beranda (di `Hero`) mulai bersamaan.
 */

const MIN_INTRO_MS = 1100;
const PREP_TIMEOUT_MS = 5000;

export function WelcomeExperience() {
  const pathname = usePathname();
  const status = useWelcomeStatus();
  const shouldRender = status === "playing";
  const active = status === "playing" || status === "entering";

  // Putuskan sekali apakah intro diputar (aman SSR: baca sessionStorage hanya
  // di dalam effect).
  React.useEffect(() => {
    initWelcome(pathname);
  }, [pathname]);

  // Kunci scroll selama overlay masih ada.
  React.useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);

  // Konten di belakang dibuat `inert` supaya fokus keyboard tidak bocor ke
  // beranda; dilepas saat fase masuk supaya beranda langsung bisa dipakai.
  React.useEffect(() => {
    const root = document.getElementById("site-root");
    if (!root) return;
    if (active && status !== "entering") root.setAttribute("inert", "");
    else root.removeAttribute("inert");
    return () => root.removeAttribute("inert");
  }, [active, status]);

  return (
    <AnimatePresence onExitComplete={finishWelcome}>
      {shouldRender && <WelcomeOverlay key="welcome" />}
    </AnimatePresence>
  );
}

function WelcomeOverlay() {
  const reduce = useReducedMotion();
  const status = useWelcomeStatus();
  const entering = status === "entering";

  const [ready, setReady] = React.useState(false);
  const [pose, setPose] = React.useState<BlobPose>("idle");
  const [excited, setExcited] = React.useState(false);
  const enteringRef = React.useRef(false);

  // Callback ref: tombol hanya ter-render pada cabang `ready`, jadi saat node-nya
  // muncul kita langsung memberi fokus (tanpa menggeser halaman).
  const registerButton = React.useCallback((el: HTMLButtonElement | null) => {
    if (el) window.requestAnimationFrame(() => el.focus({ preventScroll: true }));
  }, []);

  // --- Kesiapan: font + dokumen + durasi animasi masuk, dengan pengaman. ---
  React.useEffect(() => {
    let settled = false;
    const settle = () => {
      if (settled) return;
      settled = true;
      setReady(true);
    };

    const minDelay = new Promise<void>((resolve) =>
      window.setTimeout(resolve, reduce ? 250 : MIN_INTRO_MS),
    );
    const fonts =
      typeof document !== "undefined" && "fonts" in document
        ? document.fonts.ready.then(() => undefined)
        : Promise.resolve();
    const loaded =
      typeof document !== "undefined" && document.readyState !== "loading"
        ? Promise.resolve()
        : new Promise<void>((resolve) =>
            window.addEventListener("load", () => resolve(), { once: true }),
          );

    Promise.all([minDelay, fonts, loaded]).then(settle).catch(settle);
    // Pengaman: apa pun yang terjadi (mis. font gagal), tombol tetap aktif.
    const failsafe = window.setTimeout(settle, PREP_TIMEOUT_MS);

    return () => window.clearTimeout(failsafe);
  }, [reduce]);

  // Siklus ajakan: menunjuk â†’ menatap pengunjung â†’ rileks, lalu jeda.
  // Saat reduced motion, gestur ajakan tetap ditampilkan secara statis (lihat
  // `basePose`) tanpa siklus.
  React.useEffect(() => {
    if (reduce) return;
    let t1 = 0;
    let t2 = 0;
    let t3 = 0;
    const cycle = () => {
      setPose("invite");
      t1 = window.setTimeout(() => {
        setPose("viewer");
        t2 = window.setTimeout(() => {
          setPose("idle");
          t3 = window.setTimeout(cycle, 2600);
        }, 1200);
      }, 2200);
    };
    t1 = window.setTimeout(cycle, 1500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [reduce]);

  const basePose: BlobPose = reduce ? "invite" : pose;
  const shownPose: BlobPose = entering ? "happy" : excited ? "alert" : basePose;

  const handleEnter = React.useCallback(() => {
    if (enteringRef.current || !ready) return;
    enteringRef.current = true;
    setPose("happy");
    window.setTimeout(enterWelcome, reduce ? 0 : 140);
  }, [ready, reduce]);

  // Escape = cara alternatif melewati intro (perilaku dialog yang diharapkan).
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleEnter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleEnter]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio welcome screen"
      className="fixed inset-0 z-[100] overflow-hidden bg-[var(--color-bg)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.15 : 0.55, ease }}
    >
      {/* latar lembut agar tidak terasa datar */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 38%, color-mix(in srgb, var(--color-primary) 10%, transparent), transparent 72%)",
        }}
      />

      <AmbientParticles />

      {/* aksen yang mengembang saat masuk */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 rounded-full"
        style={{
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 55%, transparent), transparent 68%)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={entering ? { scale: 16, opacity: 0.4 } : { scale: 0, opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0.2 : 0.7, ease }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring.soft, delay: 0.15 }}
          className="text-center"
        >
          <p className="text-[clamp(1.6rem,5vw,2.4rem)] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
            {site.name}
          </p>
          <p className="mt-3 max-w-md text-balance text-[clamp(1.4rem,5vw,2.1rem)] leading-tight font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
            {site.tagline}
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.85, y: 26 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ ...spring.soft, delay: 0.28 }}
          className="mt-2"
        >
          <LittleBlob
            pose={shownPose}
            className="h-36 w-36 drop-shadow-[0_24px_40px_var(--blob-shadow)] sm:h-44 sm:w-44"
          />
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring.soft, delay: 0.42 }}
          className="mt-2 flex min-h-[56px] items-center justify-center"
        >
          <AnimatePresence mode="wait" initial={false}>
            {ready ? (
              <motion.button
                key="enter"
                ref={registerButton}
                type="button"
                onClick={handleEnter}
                onPointerEnter={() => setExcited(true)}
                onPointerLeave={() => setExcited(false)}
                onFocus={() => setExcited(true)}
                onBlur={() => setExcited(false)}
                whileTap={entering ? undefined : { scale: 0.96 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={spring.snap}
                className={cn(
                  "group relative inline-flex min-h-[56px] min-w-[228px] items-center justify-center gap-2 overflow-hidden rounded-full",
                  "border border-[var(--color-primary-2)] bg-[var(--color-primary)] px-8 text-[15px] font-semibold text-[var(--color-on-primary)]",
                  "shadow-[var(--shadow-float)] transition-[transform,box-shadow,background] duration-300",
                  "hover:-translate-y-0.5 hover:shadow-[var(--shadow-float)] active:translate-y-0",
                  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-primary)]",
                )}
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">Let&rsquo;s Explore</span>
                <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>
            ) : (
              <motion.div
                key="prep"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                aria-live="polite"
                className="inline-flex min-h-[56px] min-w-[228px] items-center justify-center gap-2.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/70 px-8 text-[14px] font-medium text-[var(--color-muted)]"
              >
                <motion.span
                  aria-hidden
                  className="h-2 w-2 rounded-full bg-[var(--color-primary)]"
                  animate={reduce ? undefined : { opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
                  Prepping the good stuff
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}




