export const site = {
  name: "Diki Candra",
  shortName: "DC",
  role: "AI-Powered Full-Stack Developer",
  tagline: "I build your dreams",
  description:
    "Portfolio of Diki Candra, a full-stack developer. I design, build, test, and ship digital products, from raw idea to production-ready.",
  email: "dikicandra121204@gmail.com",
  github: "https://github.com/myskl-my",
  githubHandle: "myskl-my",
  whatsapp: "+62 813-1343-9307",
  whatsappLink: "https://wa.me/6281313439307",
  domain: "dikicandra.pages.dev",
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
  { id: "contact", label: "Contact" },
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
  "contact",
] as const;


