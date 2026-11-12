import type { Transition } from "framer-motion";

/**
 * Motion tokens, 3 consistent springs used throughout the app.
 * snap  : press button, toggle
 * soft  : hover, appear/disappear
 * bounce: success, confirmation
 */
export const spring = {
  snap: { type: "spring", stiffness: 400, damping: 30 } as Transition,
  soft: { type: "spring", stiffness: 200, damping: 26 } as Transition,
  bounce: { type: "spring", stiffness: 350, damping: 15 } as Transition,
} as const;

/** Smooth easing for non-spring transitions. */
export const ease = [0.4, 0, 0.2, 1] as const;
