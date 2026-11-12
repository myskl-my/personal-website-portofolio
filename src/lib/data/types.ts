/**
 * Single data type for the whole site.
 *
 * All fields used by UI components are declared here.
 * Data source is in `local.ts` (static seed bundled into build).
 * If there are new columns/data sources later, add them here first
 * before using in components.
 */

/** Platform where project can run, determining which buttons appear. */
export type Platform = "Web" | "Android" | "Windows" | "Linux" | "macOS";

/** Project category for filter. */
export type Category =
  | "web"
  | "mobile"
  | "desktop"
  | "backend"
  | "infrastructure";

/** Publication status. Only `published` shows on the public site. */
export type ProjectStatus = "draft" | "published" | "archived";

export interface ProjectLink {
  /** Button label, e.g. "Open Live Site", "Download APK". */
  label: string;
  href: string;
  /** `internal` = our own page, `external` = out to another domain. */
  kind: "internal" | "external";
  /** Key icon from `components/icons` or lucide, optional. */
  icon?: string;
}

export interface ProjectMedia {
  src: string;
  alt: string;
  caption?: string;
}

/**
 * Structured case study block.
 *
 * All fields optional: detail page only renders filled parts,
 * so project without complete data still looks neat.
 */
export interface ProjectCaseStudy {
  /** Short summary, one opening paragraph. */
  overview?: string;
  /** Problem backgrounding the project. */
  problem?: string;
  /** Solution approach taken. */
  solution?: string;
  /** List of main features. */
  features?: string[];
  /** Development workflow steps used in this project. */
  aiWorkflow?: string[];
  /** Technical challenges faced and how resolved. */
  challenges?: string[];
}

/**
 * One portfolio project.
 *
 * Note on links: link fields intentionally nullable and free. UI reads
 * whichever is filled and displays its button, not via enum.
 * Example: one project can have `liveUrl` (web) plus `downloadUrl`
 * (APK) plus `videoUrl` (demo), and all four buttons appear at once.
 */
export interface Project {
  /** URL segment, unique and stable: /projects/<slug> */
  slug: string;
  title: string;
  /** One short sentence, shows on card. */
  tagline: string;
  /** 2–3 sentence summary for meta description and preview. */
  summary: string;
  /** Short project description (fallback; not rendered in UI yet). */
  description: string;
  /** Structured case study, used by detail page if filled. */
  caseStudy?: ProjectCaseStudy;

  /** Author of this project, e.g. "Backend, Android, DevOps". */
  role: string;
  /** Example: "2025, 2026" or "2026, present". */
  timeline: string;

  /** Project platform, used for badge and download button label.
   * See `lib/project-links.ts`. */
  platforms: Platform[];
  category: Category;

  /** Technology name shown as badge. */
  techStack: string[];

  /** Achievement points, shown as bullet list. */
  highlights: string[];

  /** Links, all optional, not all need to be filled. */
  liveUrl?: string;
  downloadUrl?: string;
  repoUrl?: string;
  /** YouTube (or other platform) for demo video. */
  videoUrl?: string;

  coverImage?: string;
  gallery: ProjectMedia[];

  featured: boolean;
  status: ProjectStatus;
  /** Display order, smaller first. */
  order: number;
}

/** Minimal profile: focus on contact, not long bio. */
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

/** Filter result shape, used by filter component on projects page. */
export interface ProjectFilter {
  category?: Category | "all";
  platform?: Platform | "all";
  query?: string;
}
