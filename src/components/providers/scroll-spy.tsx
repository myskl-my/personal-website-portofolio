"use client";

import * as React from "react";

/**
 * Tracks which section is currently visible (scroll spy).
 *
 * Why not use `usePathname`? This page is one full page - scrolling doesn't
 * change route, so `pathname` is always the same and active tab never
 * changes. The right source of truth is scroll position. How it works is
 * explained in the `compute` effect below.
 */

type ScrollSpyValue = {
  activeId: string;
  /** Re-registered when section changes (e.g. after data arrives). */
  register: (id: string, el: HTMLElement | null) => void;
};

const ScrollSpyContext = React.createContext<ScrollSpyValue>({
  activeId: "",
  register: () => {},
});

export function useScrollSpy() {
  return React.useContext(ScrollSpyContext);
}

export function ScrollSpyProvider({
  sections,
  children,
}: {
  sections: string[];
  children: React.ReactNode;
}) {
  const [activeId, setActiveId] = React.useState(sections[0] ?? "");
  const [nodes, setNodes] = React.useState<Record<string, HTMLElement>>({});

  // Stored per id in state (not ref) so Provider re-renders when new
  // section appears, Observer is then re-installed.
  const register = React.useCallback((id: string, el: HTMLElement | null) => {
    setNodes((prev) => {
      if (el) {
        if (prev[id] === el) return prev;
        return { ...prev, [id]: el };
      }
      if (!(id in prev)) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  // Memoized based on nodes: without this a new array is formed every
  // render and the effect below installs/uninstalls scroll listener
  // pointlessly.
  const present = React.useMemo(
    () => sections.filter((id) => nodes[id]),
    [sections, nodes],
  );
  const presentKey = present.join("|");

  /**
   * Determines active section from SCROLL POSITION, not from intersection
   * ratio.
   *
   * Why not IntersectionObserver?
   *   Observer compares "how much of each section is visible" with thin
   *   `rootMargin` (±45%). Very tall section, like hero - still considered
   *   active long after next section starts to appear, so navbar indicator
   *   is late to switch.
   *
   * The rule is now much simpler and more predictable: one imaginary line
   *   at 35% of viewport height. The last section whose top has passed that
   *   line is the active section.
   *
   * Effect is exactly what user expects: as soon as Projects area enters
   *   top of screen, indicator immediately moves to Projects.
   */
  React.useEffect(() => {
    if (present.length === 0) return;

    const compute = () => {
      const line = window.innerHeight * 0.35;
      let current = present[0];

      for (const id of present) {
        const el = nodes[id];
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = id;
      }

      // When page is almost scrolled to bottom, last active section.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = present[present.length - 1];

      setActiveId((prev) => (prev === current ? prev : current));
    };

    compute();

    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);

    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [presentKey, present, nodes]);

  const value = React.useMemo(() => ({ activeId, register }), [activeId, register]);

  return <ScrollSpyContext.Provider value={value}>{children}</ScrollSpyContext.Provider>;
}