import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/lib/data";
import { ProjectGrid } from "@/components/project/project-grid";
import { SectionHeading } from "@/components/sections/section-heading";
import { RegisterSection } from "@/components/providers/register-section";

/**
 * Section Featured Projects di homepage.
 *
 * Menampilkan maksimal tiga project unggulan, lalu mengarahkan ke halaman
 * `/projects` untuk daftar lengkap. Halaman ini sengaja ringkas sesuai peran
 * homepage sebagai pengantar, bukan katalog penuh.
 */
export async function ProjectsSection() {
  const featured = (await getFeaturedProjects()).slice(0, 3);

  return (
    <RegisterSection id="projects">
      <section className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Karya yang saya bangun."
            description="Beberapa project pilihan yang menunjukkan cara saya bekerja. Tiap project punya halaman sendiri berisi studi kasus lengkapnya."
          />
          <Link
            href="/projects"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-2.5 text-[14px] font-semibold text-[var(--color-ink)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-line-2)] hover:shadow-[var(--shadow-card)]"
          >
            View all
            <ArrowRight className="h-4 w-4 text-[var(--color-primary)] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {featured.length > 0 ? (
          <ProjectGrid projects={featured} className="mt-10" />
        ) : (
          <div className="surface mt-10 rounded-3xl px-6 py-16 text-center">
            <p className="text-[15px] text-[var(--color-muted)]">
              No featured projects published yet.
            </p>
          </div>
        )}
      </section>
    </RegisterSection>
  );
}
