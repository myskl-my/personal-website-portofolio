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
 * Main navigation.
 *
 * This site is one full page: hero on top, projects and workflow explanation
 * in the middle, contact at the bottom. That's why all links use anchor `#id`,
 * not route. Navbar buttons only scroll, never change pages.
 *
 * `id` must match exactly `sectionIds` below.
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
 * Sections monitored to determine active tab.
 *
 * May be more than `navLinks` (e.g. section without its own navbar
 * button is still monitored so indicator doesn't get "stuck").
 */
export const sectionIds = [
  "top",
  "projects",
  "workflow",
  "capabilities",
  "about",
  "contact",
] as const;


