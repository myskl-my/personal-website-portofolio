import type { Project } from "@/lib/data/types";
import { ProjectCard } from "@/components/project/project-card";
import { cn } from "@/lib/utils";

/**
 * Project grid reused on homepage (3 featured) as well as on page
 * `/projects` (all projects). One place to set up columns so both pages
 * stay consistent.
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
