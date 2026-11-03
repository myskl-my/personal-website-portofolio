"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Layout, Layers, Server, Smartphone, Tablet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { RegisterSection } from "@/components/providers/register-section";
import { spring } from "@/lib/motion";

type Capability = {
  icon: LucideIcon;
  title: string;
  technologies: string[];
  career: string;
  description: string;
};

const CAPABILITIES: Capability[] = [
  {
    icon: Server,
    title: "Backend Development",
    technologies: ["PHP", "Laravel", "MySQL"],
    career: "Backend Developer / Web Developer",
    description:
      "Logika server, alur data, dan basis data yang andal untuk aplikasi web produksi.",
  },
  {
    icon: Layout,
    title: "Frontend Development",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    career: "Frontend Developer",
    description:
      "Antarmuka modern, responsif, dan mudah diakses dengan stack yang ringkas.",
  },
  {
    icon: Layers,
    title: "Full-Stack Development",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    career: "Frontend Developer / Full-Stack Developer",
    description:
      "Aplikasi full-stack dengan Next.js, dari frontend hingga backend dalam satu ekosistem.",
  },
  {
    icon: Smartphone,
    title: "Cross-Platform Mobile Development",
    technologies: ["Flutter", "Dart"],
    career: "Mobile Developer",
    description:
      "Aplikasi mobile multiplatform dengan satu basis kode untuk Android dan iOS.",
  },
  {
    icon: Tablet,
    title: "Native Android Development",
    technologies: ["Kotlin", "Jetpack Compose"],
    career: "Android Developer",
    description:
      "Aplikasi Android native dengan Kotlin dan antarmuka modern via Jetpack Compose.",
  },
];

export function CapabilitiesSection() {
  const reduce = useReducedMotion();

  return (
    <RegisterSection id="capabilities">
      <section className="relative border-y border-[var(--color-line)] bg-[var(--color-bg-2)]">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="Skills"
          description={
            <>
              Teknologi yang menjadi fokus pembelajaran dan pengembangan proyek,
              disusun berdasarkan kebutuhan rekrutmen Web Developer. Daftar ini
              menampilkan area fokus, bukan klaim kemampuan penuh.
            </>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ...spring.soft, delay: Math.min(i * 0.05, 0.25) }}
                className="surface surface-hover flex h-full flex-col rounded-2xl p-5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-1 text-[17px] font-semibold tracking-tight text-[var(--color-ink)]">
                  {item.title}
                </h3>
                <p className="mt-1 text-[12px] text-[var(--color-muted)]">
                  {item.career}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {item.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="flex items-center gap-1.5 text-[14px] text-[var(--color-ink-2)]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-line-2)]" />
                      {tech}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-4 text-[13px] leading-relaxed text-[var(--color-muted)]">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
        </div>
      </section>
    </RegisterSection>
  );
}
