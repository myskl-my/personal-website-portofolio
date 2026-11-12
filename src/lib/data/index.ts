import type { Project } from "./types";
import { projects as localProjects } from "./local";

/**
 * Single entry point for reading data.
 *
 * All components MUST import from this file, not directly from
 * `local.ts`. That way changing the data source only requires editing
 * this file, components are not touched at all.
 */

/** Only `published` may appear on the public page. */
function onlyPublished(list: Project[]): Project[] {
  return list.filter((p) => p.status === "published").sort((a, b) => a.order - b.order);
}

async function resolveProjects(): Promise<Project[]> {
  return onlyPublished(localProjects);
}

/** All published projects, sorted. */
export async function getProjects(): Promise<Project[]> {
  return resolveProjects();
}

/** Project marked `featured`, for featured section on homepage. */
export async function getFeaturedProjects(): Promise<Project[]> {
  return (await resolveProjects()).filter((p) => p.featured);
}

/** One project based on slug, or `undefined` if not found / not published. */
export async function getProject(slug: string): Promise<Project | undefined> {
  return (await resolveProjects()).find((p) => p.slug === slug);
}

/** Previous & next project, for prev/next navigation in case study. */
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
