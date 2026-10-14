"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Lapisan partikel ambien di belakang konten sambutan.
 *
 * Sengaja memakai sedikit elemen `span` dengan animasi CSS (bukan canvas atau
 * library) agar ringan dan otomatis berhenti saat overlay dilepas. Jumlah
 * partikel dikurangi di layar kecil, dan seluruh gerakan dimatikan saat
 * `prefers-reduced-motion`.
 *
 * Lapisan ini murni dekoratif: `aria-hidden`, `pointer-events-none`, dan tidak
 * menangkap klik.
 */

type Particle = {
  left: number;
  top: number;
  size: number;
  teal: boolean;
  opacity: number;
  dx: number;
  dy: number;
  dur: number;
  delay: number;
};

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 2 + Math.random() * 3.5,
    teal: Math.random() < 0.22,
    opacity: 0.25 + Math.random() * 0.4,
    dx: (Math.random() - 0.5) * 60,
    dy: -(20 + Math.random() * 60),
    dur: 9 + Math.random() * 10,
    delay: -Math.random() * 14,
  }));
}

export function AmbientParticles({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [count] = React.useState(() =>
    typeof window !== "undefined" && window.innerWidth < 640 ? 12 : 22,
  );
  const [particles] = React.useState(() => makeParticles(count));
  const layerRef = React.useRef<HTMLDivElement>(null);

  // Parallax pointer yang sangat halus (desktop saja). Opsional & murah:
  // satu listener, di-throttle lewat rAF, menulis satu CSS variable.
  React.useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const el = layerRef.current;
    if (!el) return;

    let raf = 0;
    const onMove = (event: PointerEvent) => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        el.style.setProperty("--parallax-x", `${nx * 16}px`);
        el.style.setProperty("--parallax-y", `${ny * 16}px`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <div
      ref={layerRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ transform: "translate3d(var(--parallax-x,0),var(--parallax-y,0),0)" }}
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.teal ? "var(--color-primary)" : "var(--color-muted)",
              opacity: reduce ? p.opacity * 0.7 : undefined,
              animation: reduce
                ? undefined
                : `particle-drift ${p.dur}s linear ${p.delay}s infinite`,
              "--p-x": `${p.dx}px`,
              "--p-y": `${p.dy}px`,
              "--p-opacity": `${p.opacity}`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
