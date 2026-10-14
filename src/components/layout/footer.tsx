import { Mail, MessageCircle } from "lucide-react";
import { GithubIcon } from "@/components/icons/github";
import { site } from "@/lib/site";
import { CopyButton } from "@/components/ui/copy-button";
import { ScrollTopButton } from "@/components/ui/scroll-top-button";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-[var(--color-line)] bg-[var(--color-bg-2)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
              Contact
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl">
              Punya ide? Mari kita wujudkan.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted)]">
              Ceritakan projectmu lewat salah satu kanal di samping. Saya
              biasanya membalas dalam waktu dekat.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex min-h-[48px] items-center gap-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-line-2)] hover:shadow-[var(--shadow-card)]">
              <a
                href={`mailto:${site.email}`}
                className="flex min-w-0 flex-1 items-center gap-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                  <Mail className="h-[17px] w-[17px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-medium uppercase tracking-wider text-[var(--color-muted)]">
                    Email
                  </span>
                  <span className="block truncate font-mono text-[13.5px] font-semibold tracking-tight text-[var(--color-ink)]">
                    {site.email}
                  </span>
                </span>
              </a>
              <CopyButton
                value={site.email}
                label="email"
                className="shrink-0 p-1"
              />
            </div>

            <a
              href={site.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[48px] items-center gap-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-line-2)] hover:shadow-[var(--shadow-card)]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                <MessageCircle className="h-[17px] w-[17px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-medium uppercase tracking-wider text-[var(--color-muted)]">
                  WhatsApp
                </span>
                <span className="block truncate font-mono text-[13.5px] font-semibold tracking-tight text-[var(--color-ink)]">
                  {site.whatsapp}
                </span>
              </span>
            </a>

            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[48px] items-center gap-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-line-2)] hover:shadow-[var(--shadow-card)]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-mauve-soft)] text-[var(--color-mauve)]">
                <GithubIcon className="h-[17px] w-[17px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-medium uppercase tracking-wider text-[var(--color-muted)]">
                  GitHub
                </span>
                <span className="block truncate font-mono text-[13.5px] font-semibold tracking-tight text-[var(--color-ink)]">
                  {site.githubHandle}
                </span>
              </span>
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-line)] pt-6 sm:flex-row sm:items-center">
          <p className="text-[13px] text-[var(--color-muted)]">
            © {year} {site.name}
          </p>
          <ScrollTopButton className="group inline-flex min-h-[40px] items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-4 text-[13px] font-medium text-[var(--color-muted)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-line-2)] hover:text-[var(--color-ink)] hover:shadow-[var(--shadow-card)]" />
        </div>
      </div>
    </footer>
  );
}
