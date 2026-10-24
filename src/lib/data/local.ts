import type { Profile, Project } from "./types";
import { site } from "@/lib/site";

/**
 * Seed lokal — dibundel ke dalam build, jadi situs selalu bisa jalan
 * tanpa database apa pun.
 *
 * Isi project di bawah ini masih PLACEHOLDER. Ganti satu per satu saat
 * project siap dipamerkan; tidak ada perubahan kode yang diperlukan.
 *
 * Konvensi isi:
 *   - slug        : unik, huruf kecil + tanda hubung. Tidak diubah setelah publish.
 *   - status      : hanya `published` yang tampil di halaman publik.
 *   - order       : kecil tampil lebih dulu.
 *   - tautan      : hapus baris yang tidak dipakai, jangan diisi string kosong.
 *
 * Catatan tombol:
 *   UI tidak memakai enum untuk menentukan tombol. Dia membaca `platforms`
 *   dan tautan yang ada, lalu merender tombolnya sendiri. Kombinasi bebas —
 *   satu project bisa memunculkan tombol live + download + video sekaligus.
 *
 * Catatan studi kasus:
 *   `caseStudy` bersifat opsional. Halaman detail hanya menampilkan bagian
 *   yang terisi, jadi project tetap tampil rapi walau belum lengkap. Isi teks
 *   di sini apa adanya, jangan mengarang angka atau hasil yang belum terukur.
 */

/**
 * Profil kontak — sumber kebenaran tunggal ada di `lib/site.ts`.
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
  availability: "Terbuka untuk proyek baru",
};

export const projects: Project[] = [
  {
    slug: "project-placeholder-1",
    title: "Project Placeholder 1",
    tagline: "Satu kalimat singkat yang menjelaskan project ini.",
    summary:
      "Ringkasan dua sampai tiga kalimat untuk meta description dan preview di media sosial.",
    description: "Placeholder studi kasus project pertama.",
    caseStudy: {
      overview:
        "Placeholder. Bagian ini diisi ringkasan singkat project: apa yang dibangun dan untuk siapa.",
      problem:
        "Placeholder. Jelaskan masalah nyata yang melatarbelakangi project ini.",
      solution:
        "Placeholder. Jelaskan pendekatan dan keputusan teknis yang diambil untuk menyelesaikannya.",
      features: [
        "Fitur utama pertama.",
        "Fitur utama kedua.",
        "Fitur utama ketiga.",
      ],
      aiWorkflow: [
        "Menyusun rencana dan memecah masalah bersama AI.",
        "Implementasi bertahap, ditinjau ulang tiap langkah.",
        "Debugging dengan bantuan AI, lalu diuji secara manual.",
      ],
      challenges: [
        "Tantangan teknis pertama dan cara mengatasinya.",
        "Tantangan teknis kedua dan cara mengatasinya.",
      ],
    },

    role: "Peran kamu di project ini",
    timeline: "2026 — sekarang",

    platforms: ["Web", "Android"],
    category: "web",

    techStack: ["Placeholder", "Stack", "Teknologi"],
    highlights: [
      "Poin pencapaian pertama.",
      "Poin pencapaian kedua.",
      "Poin pencapaian ketiga.",
    ],

    // liveUrl: "https://contoh.my.id",
    // downloadUrl: "https://drive.google.com/file/d/<FILE_ID>/view?usp=sharing",
    // repoUrl: "https://github.com/myskl-my/nama-repo",
    // videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID",

    coverImage: undefined,
    gallery: [],

    featured: true,
    status: "published",
    order: 1,
  },
  {
    slug: "project-placeholder-2",
    title: "Project Placeholder 2",
    tagline: "Satu kalimat singkat yang menjelaskan project ini.",
    summary:
      "Ringkasan dua sampai tiga kalimat untuk meta description dan preview di media sosial.",
    description: "Placeholder studi kasus project kedua.",
    caseStudy: {
      overview: "Placeholder. Ringkasan singkat project kedua.",
      problem: "Placeholder. Masalah yang diangkat project ini.",
      solution: "Placeholder. Solusi dan arsitektur yang dipilih.",
      features: ["Fitur utama pertama.", "Fitur utama kedua."],
      aiWorkflow: [
        "Riset dan perencanaan bersama AI.",
        "Implementasi lalu pengujian bertahap.",
      ],
      challenges: ["Tantangan teknis utama dan penyelesaiannya."],
    },

    role: "Peran kamu di project ini",
    timeline: "2026",

    platforms: ["Web"],
    category: "web",

    techStack: ["Placeholder"],
    highlights: ["Poin pencapaian pertama.", "Poin pencapaian kedua."],

    // liveUrl: "https://contoh.my.id",
    // repoUrl: "https://github.com/myskl-my/nama-repo",

    coverImage: undefined,
    gallery: [],

    featured: true,
    status: "published",
    order: 2,
  },
  {
    slug: "project-placeholder-3",
    title: "Project Placeholder 3",
    tagline: "Satu kalimat singkat yang menjelaskan project ini.",
    summary:
      "Ringkasan dua sampai tiga kalimat untuk meta description dan preview di media sosial.",
    description: "Placeholder studi kasus project ketiga.",
    caseStudy: {
      overview: "Placeholder. Ringkasan singkat project ketiga.",
      problem: "Placeholder. Masalah yang diangkat project ini.",
      solution: "Placeholder. Solusi dan keputusan teknisnya.",
      features: ["Fitur utama pertama.", "Fitur utama kedua."],
      aiWorkflow: [
        "Perencanaan bersama AI.",
        "Implementasi dan pengujian.",
      ],
      challenges: ["Tantangan teknis dan cara mengatasinya."],
    },

    role: "Peran kamu di project ini",
    timeline: "2026",

    platforms: ["Android"],
    category: "mobile",

    techStack: ["Placeholder"],
    highlights: ["Poin pencapaian pertama."],

    // downloadUrl: "https://drive.google.com/file/d/<FILE_ID>/view?usp=sharing",
    // videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID",

    coverImage: undefined,
    gallery: [],

    featured: true,
    status: "published",
    order: 3,
  },
  {
    slug: "project-placeholder-4",
    title: "Project Placeholder 4",
    tagline: "Satu kalimat singkat yang menjelaskan project ini.",
    summary:
      "Ringkasan dua sampai tiga kalimat untuk meta description dan preview di media sosial.",
    description: "Placeholder studi kasus project keempat.",
    caseStudy: {
      overview: "Placeholder. Ringkasan singkat project keempat.",
      problem: "Placeholder. Masalah yang diangkat project ini.",
      solution: "Placeholder. Solusi dan keputusan teknisnya.",
      features: ["Fitur utama pertama."],
      aiWorkflow: ["Perencanaan dan implementasi bersama AI."],
    },

    role: "Peran kamu di project ini",
    timeline: "2026",

    platforms: ["Windows"],
    category: "desktop",

    techStack: ["Placeholder"],
    highlights: ["Poin pencapaian pertama."],

    // downloadUrl: "https://drive.google.com/file/d/<FILE_ID>/view?usp=sharing",
    // videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID",

    coverImage: undefined,
    gallery: [],

    featured: false,
    status: "published",
    order: 4,
  },
  {
    slug: "project-placeholder-5",
    title: "Project Placeholder 5",
    tagline: "Satu kalimat singkat yang menjelaskan project ini.",
    summary:
      "Ringkasan dua sampai tiga kalimat untuk meta description dan preview di media sosial.",
    description: "Placeholder studi kasus project kelima.",
    caseStudy: {
      overview: "Placeholder. Ringkasan singkat project kelima.",
      problem: "Placeholder. Masalah yang diangkat project ini.",
      solution: "Placeholder. Solusi dan keputusan teknisnya.",
      features: ["Fitur utama pertama."],
      aiWorkflow: ["Perencanaan dan implementasi bersama AI."],
    },

    role: "Peran kamu di project ini",
    timeline: "2026",

    platforms: ["Web"],
    category: "web",

    techStack: ["Placeholder"],
    highlights: ["Poin pencapaian pertama."],

    // liveUrl: "https://contoh.my.id",
    // repoUrl: "https://github.com/myskl-my/nama-repo",

    coverImage: undefined,
    gallery: [],

    featured: false,
    status: "published",
    order: 5,
  },
];
