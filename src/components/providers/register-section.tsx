"use client";

import * as React from "react";
import { useScrollSpy } from "@/components/providers/scroll-spy";

/**
 * Wraps a section and registers its element to ScrollSpy
 * so the navbar knows which section is currently visible.
 *
 * `id` is attached directly to the wrapper element, not to the element
 * inside. ScrollSpy measures wrapper position against viewport, so wrapper
 * MUST have an id; without it the section cannot be tracked and active tab
 * does not change.
 */
export function RegisterSection({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { register } = useScrollSpy();
  const ref = React.useCallback(
    (el: HTMLDivElement | null) => register(id, el),
    [id, register],
  );

  return (
    <div id={id} ref={ref} className={className}>
      {children}
    </div>
  );
}