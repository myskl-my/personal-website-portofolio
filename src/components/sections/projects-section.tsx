import { getProjects } from "@/lib/data";
import { ProjectGrid } from "@/components/project/project-grid";
import { SectionHeading } from "@/components/sections/section-heading";
import { RegisterSection } from "@/components/providers/register-section";

/**
 * Section Projects di homepage.
 *
 * Menampilkan seluruh project yang tersedia langsung di halaman utama.
 * Tidak ada tautan ke halaman daftar terpisah; setiap kartu project tetap
 * bisa diklik untuk membuka halaman detailnya.
 */
export async function ProjectsSection() {
  const projects = await getProjects();

  return (
    <RegisterSection id="projects">
        <section className="relative border-y border-[var(--color-line)] bg-[var(--color-bg-2)]">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="My Projects"
            description="Semua project yang tersedia ditampilkan di bawah ini. Klik tiap kartu untuk membuka halaman detailnya."
          />
        </div>

        {projects.length > 0 ? (
          <>
            <ProjectGrid projects={projects} className="mt-10" />
          </>
        ) : (
          <div className="surface mt-10 rounded-3xl px-6 py-16 text-center">
            <p className="text-[15px] text-[var(--color-muted)]">
              Nothing pinned here yet. New work is on the way.
            </p>
          </div>
        )}
      </div>
      </section>
    </RegisterSection>
  );
}
