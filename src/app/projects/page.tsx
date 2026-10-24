import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProjects } from "@/lib/data";
import { SectionHeading } from "@/components/sections/section-heading";
import { ProjectsExplorer } from "@/components/project/projects-explorer";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Kumpulan project Diki Candra. Klik salah satu untuk membaca studi kasus lengkapnya, mulai dari masalah sampai hasil akhir.",
  alternates: { canonical: "/projects/" },
};

/**
 * Daftar seluruh project.
 *
 * Berbeda dari section Featured Projects di homepage yang hanya menampilkan
 * tiga unggulan, halaman ini menampilkan semuanya dan menyediakan filter
 * kategori serta pencarian.
 */
export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-28 pb-20 sm:px-6 sm:pt-32 sm:pb-24">
      <Link
        href="/"
        className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
        Back to home
      </Link>

      <SectionHeading
        className="mt-6"
        eyebrow="Projects"
        title="Semua yang pernah saya bangun."
        description="Setiap project punya halaman sendiri berisi studi kasus lengkap, dari masalah yang diangkat sampai hasil akhirnya."
      />

      <div className="mt-10">
        {projects.length > 0 ? (
          <ProjectsExplorer projects={projects} />
        ) : (
          <div className="surface rounded-3xl px-6 py-20 text-center">
            <p className="text-[15px] text-[var(--color-muted)]">
              No projects published yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
