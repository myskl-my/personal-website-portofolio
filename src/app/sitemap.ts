import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/data";
import { site } from "@/lib/site";

// Wajib untuk `output: "export"`: metadata route harus ditandai statis.
export const dynamic = "force-static";

/**
 * Sitemap statis.
 *
 * Dibuat saat build dari daftar project yang published. Karena situs memakai
 * `trailingSlash: true`, setiap URL diakhiri garis miring.
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
