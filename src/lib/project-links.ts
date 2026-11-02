import type { Project, ProjectLink } from "./data/types";

/**
 * Menentukan tombol mana yang harus muncul untuk sebuah project.
 *
 * Prinsipnya: JANGAN pakai enum atau flag untuk menentukan tampilan. Baca saja
 * data yang ada, platform apa saja yang dipakai, dan tautan mana yang terisi.
 * Dengan begitu menambah satu project baru cukup mengisi field, tidak perlu
 * menyentuh kode.
 *
 * Contoh kombinasi yang sah dan otomatis terpenuhi:
 *   { platforms: ["Web", "Android"], liveUrl, downloadUrl, videoUrl }
 *   → muncul 3 tombol sekaligus.
 */
export function getProjectLinks(project: Project): ProjectLink[] {
  const links: ProjectLink[] = [];

  // Label download menyesuaikan platform supaya tidak ambigu:
  // "Download" saja membuat orang tidak tahu akan mendapat file apa.
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

/** Halaman detail selalu ada, jadi tombol pertama tidak pernah kosong. */
export function getDetailHref(project: Project): string {
  return `/projects/${project.slug}`;
}

/** Warna aksen per kategori, dipakai untuk badge dan gradient cover. */
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