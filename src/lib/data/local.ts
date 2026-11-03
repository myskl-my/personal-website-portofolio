import type { Profile, Project } from "./types";
import { site } from "@/lib/site";

/**
 * Seed lokal, dibundel ke dalam build, jadi situs selalu bisa jalan
 * tanpa database apa pun.
 *
 * Ganti / tambah project di bawah saat siap dipamerkan; tidak ada
 * perubahan kode yang diperlukan.
 *
 * Konvensi isi:
 *   - slug        : unik, huruf kecil + tanda hubung. Tidak diubah setelah publish.
 *   - status      : hanya `published` yang tampil di halaman publik.
 *   - order       : kecil tampil lebih dulu.
 *   - tautan      : hapus baris yang tidak dipakai, jangan diisi string kosong.
 *
 * Catatan tombol:
 *   UI tidak memakai enum untuk menentukan tombol. Dia membaca `platforms`
 *   dan tautan yang ada, lalu merender tombolnya sendiri. Kombinasi bebas;
 *   satu project bisa memunculkan tombol live + download + video sekaligus.
 *
 * Catatan studi kasus:
 *   `caseStudy` bersifat opsional. Halaman detail hanya menampilkan bagian
 *   yang terisi, jadi project tetap tampil rapi walau belum lengkap.
 */

/**
 * Profil kontak, sumber kebenaran tunggal ada di `lib/site.ts`.
 * Field tambahan (availability) hanya diisi di sini karena tidak dipakai
 * oleh komponen lain.
 */
export const profile: Profile = {
  name: site.name,
  tagline: site.tagline,
  email: site.email,
  github: site.github,
  whatsapp: site.whatsapp,
  whatsappLink: site.whatsappLink,
  availability: "Open for new projects",
};

export const projects: Project[] = [
  {
    slug: "coffeshop-menu",
    title: "Coffeshop Menu",
    tagline: "Menu lengkap dalam 1 halaman",
    summary:
      "Website menu digital untuk kedai kopi. Menampilkan seluruh menu (kopi, non-kopi, sampai makanan) dalam satu halaman yang ringkas dan mudah dibuka dari HP maupun desktop.",
    description:
      "Website menu digital kedai kopi. Seluruh menu tersaji rapi dalam satu halaman responsif, siap diakses lewat tautan langsung.",

    role: "Full-Stack Developer",
    timeline: "2026",

    platforms: ["Web"],
    category: "web",

    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "framer-motion",
      "Cloudflare Pages",
      "Node.js",
    ],
    highlights: [
      "Menu lengkap tersaji dalam satu halaman.",
      "Responsif dan nyaman dibuka dari perangkat apa pun.",
      "Deploy cepat di Cloudflare Pages.",
    ],

    liveUrl: "https://mystorymenu.pages.dev",

    coverImage: "/projects/coffeshop-menu/cover.webp",
    gallery: [
      {
        src: "/projects/coffeshop-menu/screenshot-1.webp",
        alt: "Tampilan halaman menu Coffeshop Menu",
        caption: "Halaman utama menu",
      },
      {
        src: "/projects/coffeshop-menu/screenshot-2.webp",
        alt: "Detail daftar menu Coffeshop Menu",
        caption: "Daftar menu",
      },
    ],

    featured: true,
    status: "published",
    order: 1,
  },
  {
    slug: "reservasi-barbershop",
    title: "Reservasi/Booking Barbershop",
    tagline: "Sistem reservasi online untuk barbershop",
    summary:
      "Sistem pemesanan antrian dan layanan potong rambut secara online. Pelanggan bisa memilih layanan, tanggal, dan waktuAntrian langsung dari browser tanpa perlu telepon.",
    description:
      "Website reservasi barbershop dengan 2 panel: panel customer untuk pemesanan layanan dan waktu antrian, serta panel admin untuk mengoperasikan dashboard dan mengelola reservasi. Antarmuka sederhana dan responsif.",
    role: "Full-Stack Developer",
    timeline: "2026",

    platforms: ["Web"],
    category: "web",

    techStack: [
      "PHP",
      "Laravel",
      "MySQL",
      "Tailwind CSS",
    ],
    highlights: [
      "Pemesanan layanan dan waktu antrian secara online (panel customer).",
      "Manajemen antrian dan jadwal booking dari panel admin.",
      "Antarmuka responsif untuk pelanggan dan admin.",
    ],

    liveUrl: "https://reservasionline.pages.dev",

    coverImage: "/projects/reservasi-barbershop/cover.png",
    gallery: [
      {
        src: "/projects/reservasi-barbershop/screenshot-1.png",
        alt: "Tampilan halaman utama Reservasi Barbershop",
        caption: "Halaman utama reservasi",
      },
      {
        src: "/projects/reservasi-barbershop/screenshot-2.png",
        alt: "Tampilan pemilihan layanan dan waktu",
        caption: "Pilih layanan dan waktu",
      },
      {
        src: "/projects/reservasi-barbershop/screenshot-3.png",
        alt: "Tampilan konfirmasi booking",
        caption: "Konfirmasi pesanan",
      },
    ],

    featured: true,
    status: "published",
    order: 2,
  },
];
