"use client";

import { ArrowUp } from "lucide-react";
import { scrollToElement } from "@/lib/smooth-scroll";

/**
 * Tombol "kembali ke atas" yang berfungsi di halaman mana pun.
 *
 * Memakai animasi scroll sendiri (`scrollToElement`) supaya konsisten dengan
 * navigasi navbar, dan tidak bergantung pada keberadaan elemen `#top` — di
 * halaman /projects pun tombol ini tetap bekerja.
 */
export function ScrollTopButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => scrollToElement(window, { duration: 800 })}
      className={className}
    >
      Kembali ke atas
      <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
