/**
 * Tipe data tunggal untuk seluruh situs.
 *
 * Kontrak ini dipakai bersama oleh dua sumber data:
 *   - `local.ts`    : seed statis yang dibundel ke build (default, selalu jalan)
 *   - `supabase.ts` : query Postgres, dipakai otomatis kalau kredensial tersedia
 *
 * Karena keduanya harus mengembalikan bentuk yang sama, seluruh field yang
 * dipakai komponen UI dideklarasikan di sini. Kalau nanti ada kolom database
 * baru, tambahkan di sini lebih dulu sebelum dipakai di komponen.
 */

/** Platform tempat project bisa dijalankan — menentukan tombol mana yang muncul. */
export type Platform = "Web" | "Android" | "Windows" | "Linux" | "macOS";

/** Kategori project untuk filter. */
export type Category =
  | "web"
  | "mobile"
  | "desktop"
  | "backend"
  | "infrastructure";

/** Status publikasi. Hanya `published` yang tampil di situs publik. */
export type ProjectStatus = "draft" | "published" | "archived";

export interface ProjectLink {
  /** Label tombol, mis. "Buka Live Site", "Download APK". */
  label: string;
  href: string;
  /** `internal` = halaman kita sendiri, `external` = keluar ke domain lain. */
  kind: "internal" | "external";
  /** Ikon kunci di `components/icons` atau lucide, opsional. */
  icon?: string;
}

export interface ProjectMedia {
  src: string;
  alt: string;
  caption?: string;
}

/**
 * Blok studi kasus terstruktur.
 *
 * Semua field opsional: halaman detail hanya merender bagian yang terisi,
 * jadi project yang belum punya data lengkap tetap tampil rapi.
 */
export interface ProjectCaseStudy {
  /** Ringkasan singkat, satu paragraf pembuka. */
  overview?: string;
  /** Masalah yang melatarbelakangi project. */
  problem?: string;
  /** Pendekatan solusi yang diambil. */
  solution?: string;
  /** Daftar fitur utama. */
  features?: string[];
  /** Langkah alur kerja berbantuan AI yang dipakai di project ini. */
  aiWorkflow?: string[];
  /** Tantangan teknis yang dihadapi dan bagaimana diselesaikan. */
  challenges?: string[];
}

/**
 * Satu project di portofolio.
 *
 * Catatan soal tautan: field tautan sengaja nullable dan bebas. UI membaca
 * mana saja yang terisi lalu menampilkan tombolnya — bukan lewat enum.
 * Contoh: satu project bisa punya `liveUrl` (web) sekaligus `downloadUrl`
 * (APK) sekaligus `videoUrl` (demo), dan keempat tombol itu muncul bersamaan.
 */
export interface Project {
  /** URL segment, unik dan stabil: /projects/<slug> */
  slug: string;
  title: string;
  /** Satu kalimat singkat, tampil di kartu. */
  tagline: string;
  /** Ringkasan 2–3 kalimat untuk meta description dan preview. */
  summary: string;
  /** Deskripsi ringkas project (cadangan; belum dirender di UI). */
  description: string;
  /** Studi kasus terstruktur, dipakai halaman detail bila terisi. */
  caseStudy?: ProjectCaseStudy;

  /** Penulis project ini, mis. "Backend, Android, DevOps". */
  role: string;
  /** Contoh: "2025 — 2026" atau "2026 — sekarang". */
  timeline: string;

  /** Platform project — dipakai untuk badge dan label tombol download.
   * Lihat `lib/project-links.ts`. */
  platforms: Platform[];
  category: Category;

  /** Nama teknologi yang tampil sebagai badge. */
  techStack: string[];

  /** Poin-poin pencapaian, tampil sebagai daftar bullet. */
  highlights: string[];

  /** Tautan — semua opsional, tidak semuanya perlu diisi. */
  liveUrl?: string;
  downloadUrl?: string;
  repoUrl?: string;
  /** YouTube (atau platform lain) untuk demo video. */
  videoUrl?: string;

  coverImage?: string;
  gallery: ProjectMedia[];

  featured: boolean;
  status: ProjectStatus;
  /** Urutan tampil, kecil lebih dulu. */
  order: number;
}

/** Profil Minimal: fokus ke kontak, bukan biodata panjang. */
export interface Profile {
  name: string;
  tagline: string;
  email: string;
  github: string;
  whatsapp: string;
  whatsappLink: string;
  avatarUrl?: string;
  location?: string;
  availability?: string;
}

/** Bentuk hasil filter, dipakai komponen filter di halaman projects. */
export interface ProjectFilter {
  category?: Category | "all";
  platform?: Platform | "all";
  query?: string;
}