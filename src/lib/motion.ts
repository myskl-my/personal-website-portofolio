import type { Transition } from "framer-motion";

/**
 * Token gerak — 3 spring konsisten dipakai di seluruh aplikasi.
 * snap  : tekan tombol, toggle
 * soft  : hover, muncul/hilang
 * bounce: sukses, konfirmasi
 */
export const spring = {
  snap: { type: "spring", stiffness: 400, damping: 30 } as Transition,
  soft: { type: "spring", stiffness: 200, damping: 26 } as Transition,
  bounce: { type: "spring", stiffness: 350, damping: 15 } as Transition,
} as const;

/** Durasi easing halus untuk transisi non-spring. */
export const ease = [0.4, 0, 0.2, 1] as const;
