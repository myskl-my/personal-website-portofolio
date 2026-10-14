import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Image as ImageIcon,
  Lightbulb,
  Sparkles,
  Target,
  TriangleAlert,
} from "lucide-react";
import { getProject, getProjectNeighbours, getProjects } from "@/lib/data";
import {
  categoryAccent,
  categoryLabel,
  getDetailHref,
  getProjectLinks,
} from "@/lib/project-links";
import { ProjectLinkButtons } from "@/components/project/project-link-buttons";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Project tidak ditemukan" };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
    },
  };
}

/** Blok studi kasus dengan judul konsisten. */
function DetailSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[var(--color-line)] pt-8">
      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-[clamp(1.25rem,3.5vw,1.6rem)] font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const links = getProjectLinks(project);
  const { prev, next } = await getProjectNeighbours(slug);
  const cs = project.caseStudy ?? {};
  const accent = categoryAccent[project.category];

  return (
    <article className="mx-auto w-full max-w-4xl px-4 pt-28 pb-20 sm:px-6 sm:pt-32 sm:pb-24">
      <Link
        href="/projects"
        className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
        Semua project
      </Link>

      {/* header */}
      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-full border px-2.5 py-0.5 text-[12px] font-semibold"
            style={{
              color: accent,
              borderColor: `color-mix(in srgb, ${accent} 45%, transparent)`,
              background: `color-mix(in srgb, ${accent} 14%, var(--color-surface))`,
            }}
          >
            {categoryLabel[project.category]}
          </span>
          {project.platforms.map((p) => (
            <span
              key={p}
              className="rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-0.5 text-[12px] font-medium text-[var(--color-muted)]"
            >
              {p}
            </span>
          ))}
          {project.featured && (
            <span className="rounded-full border border-[var(--color-primary)]/40 bg-[var(--color-primary-soft)] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-primary)]">
              Unggulan
            </span>
          )}
        </div>

        <h1 className="mt-4 text-[clamp(1.9rem,6vw,3rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-balance text-[var(--color-ink)]">
          {project.title}
        </h1>
        <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-[var(--color-muted)]">
          {project.tagline}
        </p>

        {/* meta */}
        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
              Peran
            </dt>
            <dd className="mt-1 text-[14px] font-medium text-[var(--color-ink)]">
              {project.role}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
              Waktu
            </dt>
            <dd className="mt-1 text-[14px] font-medium text-[var(--color-ink)]">
              {project.timeline}
            </dd>
          </div>
        </dl>

        {links.length > 0 && (
          <div className="mt-6">
            <ProjectLinkButtons links={links} size="md" />
          </div>
        )}
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
              Belum ada gambar sampul
            </span>
          </div>
        )}
      </div>

      {/* isi studi kasus */}
      <div className="mt-12 space-y-10">
        {cs.overview && (
          <DetailSection eyebrow="Overview" title="Ringkasan project">
            <p className="text-[15px] leading-relaxed text-[var(--color-muted)]">
              {cs.overview}
            </p>
          </DetailSection>
        )}

        {(cs.problem || cs.solution) && (
          <DetailSection eyebrow="Problem & Solution" title="Masalah dan solusinya">
            <div className="grid gap-4 sm:grid-cols-2">
              {cs.problem && (
                <div className="surface rounded-2xl p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    <Target className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="mt-3 text-[15px] font-semibold text-[var(--color-ink)]">
                    Masalah
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-muted)]">
                    {cs.problem}
                  </p>
                </div>
              )}
              {cs.solution && (
                <div className="surface rounded-2xl p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                    <Lightbulb className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="mt-3 text-[15px] font-semibold text-[var(--color-ink)]">
                    Solusi
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-muted)]">
                    {cs.solution}
                  </p>
                </div>
              )}
            </div>
          </DetailSection>
        )}

        {cs.features && cs.features.length > 0 && (
          <DetailSection eyebrow="Features" title="Fitur utama">
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {cs.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-[14.5px] text-[var(--color-ink-2)]"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                  {feature}
                </li>
              ))}
            </ul>
          </DetailSection>
        )}

        {project.techStack.length > 0 && (
          <DetailSection eyebrow="Tech Stack" title="Teknologi yang dipakai">
            <ul className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg-2)] px-2.5 py-1 font-mono text-[12.5px] text-[var(--color-ink-2)]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </DetailSection>
        )}

        {cs.aiWorkflow && cs.aiWorkflow.length > 0 && (
          <DetailSection
            eyebrow="AI-Assisted Workflow"
            title="Cara saya mengerjakannya"
          >
            <ol className="space-y-3">
              {cs.aiWorkflow.map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-soft)] font-mono text-[12px] font-semibold text-[var(--color-primary)]">
                    {i + 1}
                  </span>
                  <p className="pt-0.5 text-[14.5px] leading-relaxed text-[var(--color-muted)]">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </DetailSection>
        )}

        {cs.challenges && cs.challenges.length > 0 && (
          <DetailSection eyebrow="Technical Challenges" title="Tantangan teknis">
            <ul className="space-y-3">
              {cs.challenges.map((challenge) => (
                <li key={challenge} className="flex items-start gap-2.5">
                  <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-amber)]" />
                  <p className="text-[14.5px] leading-relaxed text-[var(--color-muted)]">
                    {challenge}
                  </p>
                </li>
              ))}
            </ul>
          </DetailSection>
        )}

        <DetailSection eyebrow="Screenshots" title="Tangkapan layar">
          {project.gallery.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2">
              {project.gallery.map((media) => (
                <li
                  key={media.src}
                  className="surface overflow-hidden rounded-2xl"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={media.src}
                    alt={media.alt}
                    className="h-full w-full object-cover"
                  />
                  {media.caption && (
                    <p className="px-4 py-2.5 text-[13px] text-[var(--color-muted)]">
                      {media.caption}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-[var(--color-line-2)] px-6 py-12 text-center">
              <ImageIcon className="h-8 w-8 text-[var(--color-muted)]" />
              <p className="mt-3 text-[14px] font-medium text-[var(--color-ink)]">
                Screenshot belum tersedia
              </p>
              <p className="mt-1 max-w-sm text-[13.5px] leading-relaxed text-[var(--color-muted)]">
                Tangkapan layar akan ditambahkan setelah project siap
                dipublikasikan.
              </p>
            </div>
          )}
        </DetailSection>
      </div>

      {/* navigasi prev / next */}
      {(prev || next) && (
        <nav
          aria-label="Navigasi project"
          className="mt-14 grid gap-3 border-t border-[var(--color-line)] pt-8 sm:grid-cols-2"
        >
          {prev ? (
            <Link
              href={getDetailHref(prev)}
              className="group surface surface-hover flex flex-col rounded-2xl p-4"
            >
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--color-muted)]">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                Sebelumnya
              </span>
              <span className="mt-1.5 text-[15px] font-semibold text-[var(--color-ink)]">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={getDetailHref(next)}
              className="group surface surface-hover flex flex-col rounded-2xl p-4 sm:items-end sm:text-right"
            >
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--color-muted)]">
                Selanjutnya
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="mt-1.5 text-[15px] font-semibold text-[var(--color-ink)]">
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      )}

      {/* ajakan kembali */}
      <div className="mt-10 flex items-center gap-2 text-[13.5px] text-[var(--color-muted)]">
        <Sparkles className="h-4 w-4 text-[var(--color-primary)]" />
        <Link
          href="/#kontak"
          className="font-medium text-[var(--color-ink)] underline-offset-4 transition-colors hover:text-[var(--color-primary)] hover:underline"
        >
          Tertarik bekerja sama? Hubungi saya.
        </Link>
      </div>
    </article>
  );
}
