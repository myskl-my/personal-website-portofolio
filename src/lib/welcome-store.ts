"use client";

import * as React from "react";

/**
 * Welcome screen state (welcome experience).
 *
 *   pending  : not yet decided (server & first client render), overlay
 *              not rendered, homepage entrance animation not yet allowed.
 *   playing  : welcome screen is showing, waiting for visitor click.
 *   entering : visitor has pressed the button; overlay starts exiting and
 *              homepage entrance animation starts at the same time.
 *   done     : finished. Overlay removed, homepage shows normally.
 *
 * Why stored in module, not React state?
 *   Welcome screen lives in `layout` (overlay) while entrance animation is in
 *   `Hero` (page). Both need to read the same status. With
 *   `useSyncExternalStore`, both subscribe to one source without forcing
 *   `setState` inside an effect (forbidden by this project's lint rules).
 *
 * All `window`/`sessionStorage` access guarded so it doesn't run during SSR.
 */

export type WelcomeStatus = "pending" | "playing" | "entering" | "done";

/** sessionStorage key, welcome screen at most once per session. */
const STORAGE_KEY = "dc:welcome:v1";

let status: WelcomeStatus = "pending";
let initialized = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of Array.from(listeners)) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): WelcomeStatus {
  return status;
}

function getServerSnapshot(): WelcomeStatus {
  return "pending";
}

/**
 * Determines once (client-only) whether welcome screen should play.
 * Called from overlay effect, not during render, so safe for SSR.
 */
export function initWelcome(pathname: string): void {
  if (initialized) return;
  initialized = true;
  if (typeof window === "undefined") return;

  // Only on homepage. Other pages (e.g. /projects) considered done immediately.
  // If there's a hash (e.g. `/#contact` from "Contact Me" link), intro is skipped
  // so browser can scroll straight to target without being held by overlay.
  const hasHash = typeof window !== "undefined" && window.location.hash.length > 1;
  const eligible = pathname === "/" && !hasHash;

  let seen = false;
  try {
    seen = window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    seen = false;
  }

  if (eligible && !seen) {
    // Mark since first display so refresh mid-intro doesn't
    // replay animation from zero.
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* sessionStorage may be blocked; intro still runs once per mount */
    }
    status = "playing";
  } else {
    status = "done";
  }
  emit();
}

/** Visitor presses button → start exit phase. Idempotent. */
export function enterWelcome(): void {
  if (status === "playing") {
    status = "entering";
    emit();
  }
}

/** Overlay finished exiting → cleanup. Idempotent. */
export function finishWelcome(): void {
  if (status !== "done") {
    status = "done";
    emit();
  }
}

export function useWelcomeStatus(): WelcomeStatus {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * `true` when homepage may run its entrance animation. Used by `Hero`
 * so the existing fade-in animation runs exactly when overlay opens,
 * not before (which would waste the animation behind the overlay).
 */
export function useIntroComplete(): boolean {
  const current = useWelcomeStatus();
  return current === "entering" || current === "done";
}
