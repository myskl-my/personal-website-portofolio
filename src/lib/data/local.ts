import type { Profile, Project } from "./types";
import { site } from "@/lib/site";

/**
 * Local seed, bundled into the build so the site always works
 * without any database.
 *
 * Replace / add projects below when ready to showcase; no code
 * changes required.
 *
 * Fill conventions:
 *   - slug        : unique, lowercase + hyphen. Do not change after publish.
 *   - status      : only `published` shows on the public page.
 *   - order       : smaller appears first.
 *   - links       : remove unused lines, do not fill empty strings.
 *
 * Button notes:
 *   UI does not use enum to determine buttons. It reads `platforms`
 *   and existing links, then renders the buttons itself. Free combination;
 *   one project can show live + download + video buttons at once.
 *
 * Case study notes:
 *   `caseStudy` is optional. Detail page only displays filled parts,
 *   so project still looks neat even if incomplete.
 */

/**
 * Contact profile, single source of truth is in `lib/site.ts`.
 * Extra field (availability) is only filled here because it's not used
 * by other components.
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
    tagline: "Full menu in one page",
    summary:
      "Digital menu website for a coffee shop. Displays the entire menu (coffee, non-coffee, up to food) in one compact page that's easy to open from mobile or desktop.",
    description:
      "Digital coffee shop menu website. The entire menu is neatly presented in one responsive page, ready to access via direct link.",

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
      "Full menu presented in one page.",
      "Responsive and comfortable to open from any device.",
      "Fast deployment on Cloudflare Pages.",
    ],

    liveUrl: "https://mystorymenu.pages.dev",

    coverImage: "/projects/coffeshop-menu/cover.webp",
    gallery: [
      {
        src: "/projects/coffeshop-menu/screenshot-1.webp",
        alt: "Coffeshop Menu menu page view",
        caption: "Main menu page",
      },
      {
        src: "/projects/coffeshop-menu/screenshot-2.webp",
        alt: "Coffeshop Menu menu list detail",
        caption: "Menu list",
      },
    ],

    featured: true,
    status: "published",
    order: 1,
  },
  {
    slug: "reservasi-barbershop",
    title: "Reservasi/Booking Barbershop",
    tagline: "Online reservation system for barbershop",
    summary:
      "Online queue and haircut service ordering system. Customers can choose service, date, and queue time directly from the browser without needing a phone.",
    description:
      "Barbershop reservation website with 2 panels: customer panel for service and queue time booking, and admin panel for operating the dashboard and managing reservations. Simple and responsive interface.",
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
      "Online service and queue time booking (customer panel).",
      "Queue and booking schedule management from admin panel.",
      "Responsive interface for customers and admin.",
    ],

    liveUrl: "https://reservasionline.pages.dev",

    coverImage: "/projects/reservasi-barbershop/cover.png",
    gallery: [
      {
        src: "/projects/reservasi-barbershop/screenshot-1.png",
        alt: "Reservasi Barbershop home page view",
        caption: "Main reservation page",
      },
      {
        src: "/projects/reservasi-barbershop/screenshot-2.png",
        alt: "Service and time selection view",
        caption: "Choose service and time",
      },
      {
        src: "/projects/reservasi-barbershop/screenshot-3.png",
        alt: "Booking confirmation view",
        caption: "Order confirmation",
      },
    ],

    featured: true,
    status: "published",
    order: 2,
  },
];
