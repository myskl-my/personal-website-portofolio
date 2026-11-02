import type { Project } from "./types";
import { projects as localProjects } from "./local";

/**
 * Entry point tunggal untuk membaca data.
 *
 * Semua komponen WAJIB mengimpor dari file ini, bukan langsung dari
 * `local.ts`. Dengan begitu perubahan sumber data cukup mengubah isi file
 * ini, komponen tidak tersentuh sama sekali.
 */

/** Hanya `published` yang boleh tampil di halaman publik. */
function onlyPublished(list: Project[]): Project[] {
  return list.filter((p) => p.status === "published").sort((a, b) => a.order - b.order);
}

async function resolveProjects(): Promise<Project[]> {
  return onlyPublished(localProjects);
}

/** Semua project yang sudah published, urut. */
export async function getProjects(): Promise<Project[]> {
  return resolveProjects();
}

/** Project yang ditandai `featured`, untuk section unggulan di homepage. */
export async function getFeaturedProjects(): Promise<Project[]> {
  return (await resolveProjects()).filter((p) => p.featured);
}

/** Satu project berdasarkan slug, atau `undefined` kalau tidak ada / tidak published. */
export async function getProject(slug: string): Promise<Project | undefined> {
  return (await resolveProjects()).find((p) => p.slug === slug);
}

/** Project sebelumnya & sesudahnya, untuk navigasi prev/next di studi kasus. */
export async function getProjectNeighbours(
  slug: string,
): Promise<{ prev?: Project; next?: Project }> {
  const all = await resolveProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? all[idx - 1] : undefined,
    next: idx < all.length - 1 ? all[idx + 1] : undefined,
  };
}

export * from "./types";
