import type { Project } from "./types";

/**
 * Stub untuk layer Supabase.
 *
 * Belum diaktifkan — kredensial Supabase menyusul nanti. File ini sengaja
 * tidak mengimpor `@supabase/supabase-js` supaya bundle tidak membengkak
 * sebelum benar-benar dipakai.
 *
 * Rencana pengaktifan:
 *   1. `npm i @supabase/supabase-js`
 *   2. isi .env.local:
 *        NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
 *        NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
 *   3. `supabase link --project-ref <ref>` lalu tulis migrasi di
 *      `supabase/migrations/` (RLS wajib ada sebelum ini aktif)
 *   4. isi fungsi-fungsi di bawah dengan query sungguhan
 *
 * PENTING untuk static export: karena `output: "export"`, tidak ada server
 * Next.js yang bisa query database saat runtime. Pilihannya:
 *   a) ambil data saat build (`next build`) — konten berubah butuh rebuild
 *   b) ambil di browser dengan anon key + RLS — realtime, tanpa rebuild
 *
 * Untuk portofolio, (b) lebih cocok kalau nanti sering nambah project lewat
 * admin panel. Tapi pastikan RLS mengizinkan SELECT hanya untuk baris
 * berstatus `published`.
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True kalau kredensial Supabase sudah terisi di .env.local. */
export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

/**
 * Belum dipakai — akan diisi saat Supabase aktif.
 * Fungsi ini harus mengembalikan bentuk yang sama persis dengan `local.ts`
 * supaya pergantian sumber data tidak mengubah komponen sama sekali.
 */
export async function fetchProjectsFromSupabase(): Promise<Project[]> {
  throw new Error(
    "Supabase belum dikonfigurasi. Isi NEXT_PUBLIC_SUPABASE_URL dan " +
      "NEXT_PUBLIC_SUPABASE_ANON_KEY, lalu implementasikan query di supabase.ts.",
  );
}