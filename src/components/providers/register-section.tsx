"use client";

import * as React from "react";
import { useScrollSpy } from "@/components/providers/scroll-spy";

/**
 * Membungkus sebuah section lalu mendaftarkan elemennya ke ScrollSpy
 * supaya navbar tahu section mana yang sedang terlihat.
 *
 * `id` dipasang langsung pada elemen wrapper, bukan pada elemen di dalam.
 * ScrollSpy mengukur posisi wrapper terhadap viewport, jadi wrapper WAJIB
 * punya id; tanpa itu section tak bisa dilacak dan tab aktif tak berganti.
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