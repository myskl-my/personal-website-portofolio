import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/data";
import { site } from "@/lib/site";

// Required for `output: "export"`: metadata route must be marked static.
export const dynamic = "force-static";

/**
 * Static sitemap.
 *
 * Built at build time from the list of published projects. Since the site uses
 * `trailingSlash: true`, every URL ends with a trailing slash.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = `https://${site.domain}`;
  const projects = await getProjects();
  const lastModified = new Date();

  return [
    {
      url: `${base}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/projects/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
