import type { Project, ProjectLink } from "./data/types";

/**
 * Determines which buttons should appear for a project.
 *
 * Principle: DON'T use enum or flag to determine display. Just read
 * existing data, which platforms are used, and which links are filled.
 * That way adding a new project only requires filling fields, no need
 * to touch code.
 *
 * Example valid combinations that are automatically fulfilled:
 *   { platforms: ["Web", "Android"], liveUrl, downloadUrl, videoUrl }
 *   → 3 buttons appear at once.
 */
export function getProjectLinks(project: Project): ProjectLink[] {
  const links: ProjectLink[] = [];

  // Download label adjusts to platform so it's not ambiguous:
  // "Download" alone makes people not know what file they'll get.
  const isAndroid = project.platforms.includes("Android");
  const isWindows = project.platforms.includes("Windows");
  const isLinux = project.platforms.includes("Linux");
  const isMac = project.platforms.includes("macOS");

  if (project.downloadUrl) {
    let label = "Download";
    if (isAndroid) label = "Download APK";
    else if (isWindows) label = "Download .exe";
    else if (isLinux) label = "Download .deb";
    else if (isMac) label = "Download .dmg";

    links.push({ label, href: project.downloadUrl, kind: "external", icon: "download" });
  }

  if (project.liveUrl) {
    links.push({
      label: "Open Live Site",
      href: project.liveUrl,
      kind: "external",
      icon: "external",
    });
  }

  if (project.videoUrl) {
    links.push({
      label: "Watch Demo",
      href: project.videoUrl,
      kind: "external",
      icon: "play",
    });
  }

  if (project.repoUrl) {
    links.push({
      label: "Source",
      href: project.repoUrl,
      kind: "external",
      icon: "github",
    });
  }

  return links;
}

/** Detail page always exists, so the first button is never empty. */
export function getDetailHref(project: Project): string {
  return `/projects/${project.slug}`;
}

/** Accent color per category, used for badge and cover gradient. */
export const categoryAccent: Record<Project["category"], string> = {
  web: "var(--color-primary)",
  mobile: "var(--color-accent)",
  desktop: "var(--color-mauve)",
  backend: "var(--color-primary-2)",
  infrastructure: "var(--color-accent-2)",
};

export const categoryLabel: Record<Project["category"], string> = {
  web: "Web",
  mobile: "Mobile",
  desktop: "Desktop",
  backend: "Backend",
  infrastructure: "Infrastructure",
};