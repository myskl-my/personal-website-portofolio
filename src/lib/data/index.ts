import type { Category, Platform, Profile, Project, Skill } from "./types";
import { profile as localProfile, projects as localProjects, skills as localSkills } from "./local";
import {
  fetchProjectsFromSupabase,
  fetchSkillsFromSupabase,
  isSupabaseConfigured,
} from "./supabase";

/**
 * Entry point tunggal untuk membaca data.
 *
 * Semua komponen WAJIB mengimpor dari file ini, bukan langsung dari
 * `local.ts` atau `supabase.ts`. Dengan begitu perpindahan ke database
 * nanti cukup mengubah isi file ini — komponen tidak tersentuh sama sekali.
 *
 * Fallback otomatis: kalau Supabase belum dikonfigurasi, data diambil dari
 * seed lokal. Tidak ada error, tidak ada layar kosong.
 */

/** Hanya `published` yang boleh tampil di halaman publik. */
function onlyPublished(list: Project[]): Project[] {
  return list.filter((p) => p.status === "published").sort((a, b) => a.order - b.order);
}

async function resolveProjects(): Promise<Project[]> {
  if (isSupabaseConfigured()) {
    try {
      return onlyPublished(await fetchProjectsFromSupabase());
    } catch (err) {
      console.warn("[data] Supabase gagal, memakai seed lokal.", err);
    }
  }
  return onlyPublished(localProjects);
}

async function resolveSkills(): Promise<Skill[]> {
  if (isSupabaseConfigured()) {
    try {
      return (await fetchSkillsFromSupabase()).sort((a, b) => a.order - b.order);
    } catch (err) {
      console.warn("[data] Supabase gagal, memakai seed lokal.", err);
    }
  }
  return [...localSkills].sort((a, b) => a.order - b.order);
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

/** Project milik satu kategori. */
export async function getProjectsByCategory(category: Category): Promise<Project[]> {
  return (await resolveProjects()).filter((p) => p.category === category);
}

/** Project yang bisa dijalankan di platform tertentu. */
export async function getProjectsByPlatform(platform: Platform): Promise<Project[]> {
  return (await resolveProjects()).filter((p) => p.platforms.includes(platform));
}

export async function getSkills(): Promise<Skill[]> {
  return resolveSkills();
}

export async function getFeaturedSkills(): Promise<Skill[]> {
  return (await resolveSkills()).filter((s) => s.featured);
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

/**
 * Ringkasan untuk ditampilkan di homepage — sengaja sinkron supaya bisa
 * dipakai di Server Component tanpa menunggu.
 * Selalu dari seed lokal; kalau Supabase aktif, hapus cache ini dan jadikan async.
 */
export function getProfileSync(): Profile {
  return localProfile;
}

export * from "./types";