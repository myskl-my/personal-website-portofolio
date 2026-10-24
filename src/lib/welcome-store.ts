"use client";

import * as React from "react";

/**
 * State layar sambutan (welcome experience).
 *
 *   pending  : belum diputuskan (server & render pertama klien) — overlay
 *              tidak dirender, animasi masuk beranda belum boleh jalan.
 *   playing  : layar sambutan sedang tampil, menunggu klik pengunjung.
 *   entering : pengunjung sudah menekan tombol; overlay mulai keluar dan
 *              animasi masuk beranda mulai berjalan bersamaan.
 *   done     : selesai. Overlay dilepas, beranda tampil normal.
 *
 * Kenapa disimpan di modul, bukan React state?
 *   Layar sambutan hidup di `layout` (overlay) sedangkan animasi masuk ada di
 *   `Hero` (halaman). Keduanya perlu membaca status yang sama. Dengan
 *   `useSyncExternalStore`, keduanya berlangganan satu sumber tanpa memaksa
 *   `setState` di dalam effect (dilarang oleh aturan lint proyek ini).
 *
 * Semua akses `window`/`sessionStorage` dijaga supaya tidak berjalan saat SSR.
 */

export type WelcomeStatus = "pending" | "playing" | "entering" | "done";

/** Kunci sessionStorage — layar sambutan paling banyak sekali per sesi. */
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
 * Menentukan sekali (client-only) apakah layar sambutan perlu diputar.
 * Dipanggil dari effect overlay, bukan saat render, agar aman untuk SSR.
 */
export function initWelcome(pathname: string): void {
  if (initialized) return;
  initialized = true;
  if (typeof window === "undefined") return;

  // Hanya di beranda. Halaman lain (mis. /projects) langsung dianggap selesai.
  // Kalau ada hash (mis. `/#kontak` dari link "Hubungi saya"), intro dilewati
  // supaya browser bisa langsung menggulir ke target tanpa ditahan overlay.
  const hasHash = typeof window !== "undefined" && window.location.hash.length > 1;
  const eligible = pathname === "/" && !hasHash;

  let seen = false;
  try {
    seen = window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    seen = false;
  }

  if (eligible && !seen) {
    // Tandai sejak awal tampil supaya refresh di tengah intro tidak
    // memutar ulang animasi dari nol.
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* sessionStorage bisa diblokir; intro tetap jalan sekali per mount */
    }
    status = "playing";
  } else {
    status = "done";
  }
  emit();
}

/** Pengunjung menekan tombol → mulai fase keluar. Idempoten. */
export function enterWelcome(): void {
  if (status === "playing") {
    status = "entering";
    emit();
  }
}

/** Overlay selesai keluar → bersihkan. Idempoten. */
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
 * `true` saat beranda boleh menjalankan animasi masuknya. Dipakai `Hero`
 * supaya animasi fade-in yang sudah ada berjalan tepat saat overlay membuka,
 * bukan sebelumnya (yang membuat animasinya terbuang di balik overlay).
 */
export function useIntroComplete(): boolean {
  const current = useWelcomeStatus();
  return current === "entering" || current === "done";
}
