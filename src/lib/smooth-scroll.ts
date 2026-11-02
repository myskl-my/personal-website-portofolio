"use client";

import * as React from "react";

/**
 * Animasi scroll untuk navigasi satu halaman.
 *
 * Situs ini satu halaman utuh:
 *   #top      : hero, paling atas
 *   #projects : grid project, di tengah
 *   #contact  : footer, paling bawah
 *
 * Navbar tidak pernah berpindah halaman. Tombolnya hanya memanggil
 * `useScrollToSection()` yang di sini, hasilnya menggulir halus seperti
 * digulir manual.
 *
 * Kenapa tidak pakai `scrollTo({ behavior: "smooth" })` bawaan browser?
 *   1. Durasi smooth scroll native mengikuti jarak dan tidak bisa dikontrol.
 *      Untuk jarak pendek seperti di situs ini, hasilnya sering terasa
 *      "tiba-tiba", atau kalau jaraknya jauh, malah terlalu lambat.
 *   2. `scroll-behavior: smooth` di CSS akan membuat setiap langkah manual
 *      di bawah memicu ulang animasi native, sehingga keduanya bertabrakan.
 *      Karena itu aturan CSS itu sengaja dihapus dari globals.css, dan
 *      `scroll-behavior` dipaksa `auto` selama animasi berjalan.
 *
 * Menghormati `prefers-reduced-motion`: semua animasi dekoratif yang berulang
 * dimatikan lewat CSS, dan scroll navigasi memakai durasi sangat singkat
 * (260ms) alih-alih lompat instan, supaya tetap terasa mengalir tanpa
 * gerakan panjang yang mengganggu.
 *
 * Catatan URL: scroll ini SENGAJA tidak menulis `#top` / `#projects` /
 * `#contact` ke address bar. Situsnya satu halaman, jadi URL harus tetap
 * bersih di domain root saja.
 */

export const NAV_OFFSET = 72;

/** Kurva ease-in-out cubic: mulai pelan, cepat di tengah, melambat di akhir. */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Style sementara yang memaksa `scroll-behavior: auto`.
 *
 * Dipakai `!important` lewat elemen <style>, bukan cuma
 * `element.style.scrollBehavior`. Alasannya: ada pihak lain (Next.js
 * transitioning, ekstensi browser, atau CSS situs) yang bisa menulis aturan
 * itu kembali saat animasi sedang berjalan. `!important` memastikan browser
 * tidak pernah memulai animasi native yang bisa bertabrakan dengan langkah
 * manual kita.
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
  /** Ketinggian navbar, supaya target tidak tertutup header. */
  offset?: number;
  /** Durasi animasi dalam milidetik. */
  duration?: number;
};

/**
 * Animasi scroll yang sedang berjalan (kalau ada).
 *
 * Dibatalkan otomatis saat `scrollToElement` dipanggil lagi, tanpa ini,
 * klik tombol nav cepat-cepat membuat dua loop `requestAnimationFrame`
 * saling menimpa `window.scrollTo` dan hasilnya bergetar.
 */
let activeCancel: (() => void) | null = null;

export function scrollToElement(
  target: HTMLElement | Window,
  { offset = 0, duration = 900 }: Options = {},
): void {
  // Punahkan animasi sebelumnya dulu supaya tidak bertarung dengan yang baru.
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

  // Kurang dari 1px: tidak ada yang perlu dianimasikan.
  if (Math.abs(distance) < 1) {
    window.scrollTo(0, clamped);
    return;
  }

  // `prefers-reduced-motion` tidak berarti "tanpa animasi sama sekali".
  //
  // Yang dimatikan di bawah ini adalah gerakan DEKORATIF yang berulang dan
  // bisa memicu mual pada sebagian orang: mesh yang melayang, pulse ring,
  // partikel, dan transisi panjang. Semua itu tetap dimatikan lewat
  // `@media (prefers-reduced-motion: reduce)` di globals.css.
  //
  // Untuk scroll navigasi, lompat instan justru terasa lebih buruk daripada
  // scroll singkat: pengguna mengira tombolnya tidak merespons, atau isi
  // halaman bergeser tanpa konteks. Jadi di sini dipakai animasi yang sangat
  // singkat (~260ms), cukup untuk terasa "mengalir", tanpa gerakan lama
  // yang bisa mengganggu kenyamanan.
  const reduced = prefersReducedMotion();
  const effectiveDuration = reduced ? Math.min(duration, 260) : duration;

  lockNativeSmoothScroll();

  const startTime = performance.now();

  // Kalau pengguna menyentuh scroll wheel / layar di tengah animasi,
  // serahkan kendali ke browser supaya tidak terasa "menarik" melawan niat.
  // Cleanup dipanggil dari cancel() maupun dari step() saat selesai -
  // idempoten, jadi aman dipanggil lebih dari sekali.
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
      // Jaga agar posisi akhir benar-benar tepat (tidak meleset 1px).
      window.scrollTo(0, clamped);
      cancel();
    }
  };

  requestAnimationFrame(step);
}

/** Memastikan navigasi anchor bawaan browser ikut terasa mulus. */
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