import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Image as ImageIcon } from "lucide-react";
import { getProject, getProjects } from "@/lib/data";
import { categoryAccent } from "@/lib/project-links";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}/` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const accent = categoryAccent[project.category];

  return (
    <article className="mx-auto w-full max-w-4xl px-4 pt-28 pb-20 sm:px-6 sm:pt-32 sm:pb-24">
      <Link
        href="/"
        scroll={false}
        className="group inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-4 text-[14px] font-medium text-[var(--color-ink-2)] transition-[box-shadow,transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-[var(--color-line-2)] hover:shadow-[var(--shadow-card)] active:scale-[0.97]"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
        Back
      </Link>

      {/* header */}
      <header className="mt-6">
        <h1 className="text-[clamp(1.9rem,6vw,3rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-balance text-[var(--color-ink)]">
          {project.title}
        </h1>
        <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-[var(--color-muted)]">
          {project.tagline}
        </p>
      </header>

      {/* cover / placeholder visual */}
      <div className="surface mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl">
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.coverImage}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 22%, var(--color-surface)), color-mix(in srgb, ${accent} 5%, var(--color-surface-2)))`,
            }}
          >
            <span className="text-[13px] font-medium text-[var(--color-muted)]">
              Cover coming soon
            </span>
          </div>
        )}
      </div>

      {/* screenshots */}
      {project.gallery.length > 0 ? (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {project.gallery.map((media) => (
            <li key={media.src} className="surface overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={media.src} alt={media.alt} className="h-full w-full object-cover" />
              {media.caption && (
                <p className="px-4 py-2.5 text-[13px] text-[var(--color-muted)]">
                  {media.caption}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-[var(--color-line-2)] px-6 py-12 text-center">
          <ImageIcon className="h-8 w-8 text-[var(--color-muted)]" />
          <p className="mt-3 text-[14px] font-medium text-[var(--color-ink)]">
            Screenshots dropping soon
          </p>
          <p className="mt-1 max-w-sm text-[13.5px] leading-relaxed text-[var(--color-muted)]">
            They&rsquo;ll be added once the project is ready to show off.
          </p>
        </div>
      )}

      {/* tombol kunjungi website */}
      {project.liveUrl && (
        <div className="mt-10">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group inline-flex min-h-[44px] items-center gap-1.5 rounded-full border px-4 text-[14px] font-medium",
              "transition-[box-shadow,transform,border-color,background-color] duration-300",
              "hover:-translate-y-0.5 active:scale-[0.97]",
              "border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink-2)]",
              "hover:border-[var(--color-line-2)] hover:shadow-[var(--shadow-card)]",
            )}
          >
            Kunjungi Website
            <ExternalLink
              aria-hidden
              className="h-3.5 w-3.5 opacity-50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      )}
    </article>
  );
}

