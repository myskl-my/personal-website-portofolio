import type { Project } from "@/lib/data/types";
import { ProjectCard } from "@/components/project/project-card";
import { cn } from "@/lib/utils";

/**
 * Grid project yang dipakai ulang di homepage (3 unggulan) maupun di halaman
 * `/projects` (semua project). Satu tempat untuk mengatur kolom supaya kedua
 * halaman tetap konsisten.
 */
export function ProjectGrid({
  projects,
  className,
}: {
  projects: Project[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {projects.map((project, i) => (
        <ProjectCard key={project.slug} project={project} index={i} />
      ))}
    </div>
  );
}
