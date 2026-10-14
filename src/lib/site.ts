export const site = {
  name: "Diki Candra",
  shortName: "DC",
  role: "AI-Assisted Full-Stack Developer",
  tagline: "Where Ideas Become Reality.",
  headline: "Building Digital Products With AI",
  description:
    "Portofolio Diki Candra, AI-Assisted Full-Stack Developer. Saya merancang, membangun, menguji, dan merilis produk digital dengan alur kerja yang diperkuat AI, dari ide sampai bisa dipakai.",
  email: "dikicandra121204@gmail.com",
  github: "https://github.com/myskl-my",
  githubHandle: "myskl-my",
  whatsapp: "+62 813-1343-9307",
  whatsappLink: "https://wa.me/6281313439307",
  domain: "socialbooster.my.id",
} as const;

/**
 * Navigasi utama.
 *
 * Situs ini satu halaman utuh: hero di atas, project dan penjelasan alur kerja
 * di tengah, kontak di bawah. Karena itu semua tautan memakai anchor `#id`,
 * bukan route. Tombol navbar hanya menggulir, tidak pernah berpindah halaman.
 *
 * `id` harus sama persis dengan `sectionIds` di bawah.
 */
export const navLinks = [
  { id: "top", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "workflow", label: "Workflow" },
  { id: "capabilities", label: "Skills" },
  { id: "about", label: "About" },
  { id: "kontak", label: "Kontak" },
] as const;

/**
 * Section yang dipantau untuk menentukan tab aktif.
 *
 * Boleh lebih banyak daripada `navLinks` (mis. section yang tidak punya tombol
 * navbar sendiri tetap dipantau supaya indikator tidak "nyangkut").
 */
export const sectionIds = [
  "top",
  "projects",
  "workflow",
  "capabilities",
  "about",
  "kontak",
] as const;
