"use client";

import * as React from "react";

/**
 * Melacak section mana yang sedang terlihat (scroll spy).
 *
 * Kenapa tidak pakai `usePathname`? Halaman ini satu halaman penuh —
 * menggulir tidak mengubah route, sehingga `pathname` selalu sama dan tab
 * aktif tidak pernah ikut berubah. Sumber kebenaran yang tepat adalah posisi
 * scroll. Cara kerjanya dijelaskan di efek `compute` di bawah.
 */

type ScrollSpyValue = {
  activeId: string;
  /** Diregistrasi ulang saat section berubah (mis. setelah data masuk). */
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

  // Simpan element per id di state (bukan ref) supaya Provider ikut re-render
  // saat section baru muncul — Observer baru lalu dipasang ulang.
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

  const present = sections.filter((id) => nodes[id]);
  const presentKey = present.join("|");

  /**
   * Menentukan section aktif dari POSISI SCROLL, bukan dari rasio
   * perpotongan.
   *
   * Kenapa tidak IntersectionObserver?
   *   Observer membandingkan "seberapa banyak tiap section terlihat" dengan
   *   `rootMargin` tipis (±45%). Section yang sangat tinggi — seperti hero —
   *   tetap dianggap aktif sangat lama setelah section berikutnya mulai
   *   terlihat, sehingga indikator navbar terlambat berpindah.
   *
   * Aturannya sekarang jauh sederhana dan lebih bisa diprediksi:
   *   satu garis imajiner di 35% tinggi viewport. Section terakhir yang
   *   puncaknya sudah melewati garis itu adalah section aktif.
   *
   * Efeknya persis seperti yang diharapkan pengguna: begitu area Projects
   *   masuk ke bagian atas layar, indikator langsung pindah ke Projects.
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

      // Saat halaman sudah hampir habis digulir, section terakhir yang aktif.
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