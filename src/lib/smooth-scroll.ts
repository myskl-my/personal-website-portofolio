"use client";

import * as React from "react";

/**
 * Smooth scroll animation for single-page navigation.
 *
 * This site is one full page:
 *   #top      : hero, top
 *   #projects : project grid, middle
 *   #contact  : footer, bottom
 *
 * Navbar never changes pages. Its buttons only call
 * `useScrollToSection()` here, which scrolls smoothly like
 * manual scrolling.
 *
 * Why not use browser's native `scrollTo({ behavior: "smooth" })`?
 *   1. Native smooth scroll duration follows distance and can't be controlled.
 *      For short distances like on this site, it often feels
 *      "sudden", or if the distance is far, actually too slow.
 *   2. `scroll-behavior: smooth` in CSS makes every manual step
 *      below re-trigger native animation, so they collide.
 *      That's why the CSS rule was deliberately removed from globals.css, and
 *      `scroll-behavior` is forced to `auto` while animation runs.
 *
 * Respects `prefers-reduced-motion`: all repeating decorative animations
 * are disabled via CSS, and scroll navigation uses a very short duration
 * (260ms) instead of jumping instantly, so it still feels flowing without
 * long distracting movement.
 *
 * URL note: this scroll deliberately does NOT write `#top` / `#projects` /
 * `#contact` to the address bar. The site is one page, so URL stays clean
 * at domain root only.
 */

export const NAV_OFFSET = 72;

/** Ease-in-out cubic curve: starts slow, fast in the middle, slows at the end. */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Temporary style that forces `scroll-behavior: auto`.
 *
 * Used `!important` via a <style> element, not just
 * `element.style.scrollBehavior`. Reason: another party (Next.js
 * transitioning, browser extension, or site CSS) may write that rule
 * back while animation is running. `!important` ensures the browser
 * never starts a native animation that could collide with our
 * manual step.
 */
const LOCK_STYLE_ID = "__scroll_animation_lock__";

function lockNativeSmoothScroll() {
  if (document.getElementById(LOCK_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = LOCK_STYLE_ID;
  style.textContent =
    "html{scroll-behavior:auto !important;}html[data-scroll-behavior]{scroll-behavior:auto !important;}";
  document.head.appendChild(style);
}

function unlockNativeSmoothScroll() {
  document.getElementById(LOCK_STYLE_ID)?.remove();
}

type Options = {
  /** Navbar height, so target isn't covered by header. */
  offset?: number;
  /** Animation duration in milliseconds. */
  duration?: number;
};

/**
 * Scroll animation currently running (if any).
 *
 * Automatically cancelled when `scrollToElement` is called again; without this,
 * quickly clicking nav buttons makes two `requestAnimationFrame` loops
 * overwrite `window.scrollTo` and the result jitters.
 */
let activeCancel: (() => void) | null = null;

export function scrollToElement(
  target: HTMLElement | Window,
  { offset = 0, duration = 900 }: Options = {},
): void {
  // Cancel previous animation first so it doesn't fight the new one.
  activeCancel?.();

  const isWindowTarget = target === window;
  const el = isWindowTarget ? null : (target as HTMLElement);

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const currentY = window.scrollY;

  const destination = isWindowTarget
    ? 0
    : el!.getBoundingClientRect().top + window.scrollY - offset;
  const clamped = Math.max(0, Math.min(destination, maxScroll));

  const distance = clamped - currentY;

  // Less than 1px: nothing to animate.
  if (Math.abs(distance) < 1) {
    window.scrollTo(0, clamped);
    return;
  }

  // `prefers-reduced-motion` does not mean "no animation at all".
  //
  // What is disabled below is repeating decorative movement
  // that can cause nausea for some people: floating mesh, pulse ring,
  // particles, and long transitions. All of those stay disabled via
  // `@media (prefers-reduced-motion: reduce)` in globals.css.
  //
  // For navigation scrolling, jumping instantly actually feels worse than
  // a short scroll: users think the button isn't responding, or page
  // content shifts without context. So here a very short animation
  // (~260ms) is used, enough to feel "flowing", without long movement
  // that could disturb comfort.
  const reduced = prefersReducedMotion();
  const effectiveDuration = reduced ? Math.min(duration, 260) : duration;

  lockNativeSmoothScroll();

  const startTime = performance.now();

  // If user touches scroll wheel / screen mid-animation,
  // hand control back to browser so it doesn't feel "tugging" against intent.
  // Cleanup is called from cancel() as well as from step() when done -
  // idempotent, so safe to call more than once.
  let cancelled = false;
  let cleaned = false;
  const cancel = () => {
    if (cleaned) return;
    cleaned = true;
    cancelled = true;
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    unlockNativeSmoothScroll();
    if (activeCancel === cancel) activeCancel = null;
  };
  activeCancel = cancel;
  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });

  const step = (now: number) => {
    if (cancelled) {
      cancel();
      return;
    }

    const elapsed = now - startTime;
    const progress = Math.min(elapsed / effectiveDuration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, currentY + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      // Ensure final position is exactly right (no 1px drift).
      window.scrollTo(0, clamped);
      cancel();
    }
  };

  requestAnimationFrame(step);
}

/** Ensures default browser anchor navigation also feels smooth. */
export function useScrollToSection() {
  const scrollToSection = React.useCallback((id: string) => {
    if (id === "top") {
      scrollToElement(window, { duration: 800 });
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;

    scrollToElement(el, { offset: NAV_OFFSET, duration: 900 });
  }, []);

  return scrollToSection;
}
