"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { GithubIcon } from "@/components/icons/github";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/sections/section-heading";
import { RegisterSection } from "@/components/providers/register-section";
import { useScrollToSection } from "@/lib/smooth-scroll";
import { spring } from "@/lib/motion";

export function AboutSection() {
  const reduce = useReducedMotion();
  const scrollTo = useScrollToSection();

  return (
    <RegisterSection id="about">
      <section className="relative border-y border-[var(--color-line)] bg-[var(--color-bg-2)]">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="About Me"
              title="Di balik setiap project."
              description="Saya percaya ide bagus layak segera diwujudkan. AI membuat proses itu lebih cepat, tanpa mengorbankan kerapian kode dan kualitas hasil."
            />

            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[var(--color-muted)]">
              <p>
                Nama saya {site.name}, seorang {site.role}. Saya mengerjakan
                project dari hulu ke hilir: memahami masalah, merancang
                solusinya, membangun, menguji, sampai merilis.
              </p>
              <p>
                Cara kerja saya sederhana. Pahami dulu masalahnya, susun
                rencana, bangun bertahap, uji tiap langkah, lalu rilis. AI
                menemani di sepanjang proses, tetapi keputusan teknis dan
                hasil akhir tetap saya tinjau sendiri.
              </p>
            </div>
          </div>

          <motion.aside
            initial={reduce ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={spring.soft}
            className="surface h-fit rounded-2xl p-6"
          >
            <dl className="space-y-5">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                  Peran
                </dt>
                <dd className="mt-1 text-[15px] font-semibold text-[var(--color-ink)]">
                  {site.role}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                  Ketersediaan
                </dt>
                <dd className="mt-1 inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--color-ink)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                  Terbuka untuk proyek baru
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                  Prinsip
                </dt>
                <dd className="mt-1 text-[15px] font-semibold text-[var(--color-ink)]">
                  {site.tagline}
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollTo("kontak")}
                className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-5 text-[14px] font-semibold text-[var(--color-on-primary)] transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.97]"
              >
                <MessageCircle className="h-4 w-4" />
                Contact Me
              </button>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-5 text-[14px] font-semibold text-[var(--color-ink)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-line-2)] hover:shadow-[var(--shadow-card)]"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </motion.aside>
        </div>
      </section>
    </RegisterSection>
  );
}
