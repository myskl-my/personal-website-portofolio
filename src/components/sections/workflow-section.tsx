"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Compass, Sparkles, Code2, Bug, FlaskConical, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { RegisterSection } from "@/components/providers/register-section";
import { spring } from "@/lib/motion";

type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    icon: Compass,
    title: "Plan",
    description:
      "Memahami masalah, menyusun kebutuhan, lalu memecah pekerjaan jadi langkah kecil yang bisa diuji.",
  },
  {
    icon: Sparkles,
    title: "Prompt & Prototype",
    description:
      "Menyusun arahan untuk AI, lalu menyiapkan draf awal struktur data dan antarmuka.",
  },
  {
    icon: Code2,
    title: "Build",
    description:
      "Menulis kode bertahap, meninjau tiap perubahan, dan menjaga struktur tetap mudah dibaca.",
  },
  {
    icon: Bug,
    title: "Debug",
    description:
      "Menelusuri error bersama AI sampai akar masalahnya jelas, bukan sekadar menempel tambalan.",
  },
  {
    icon: FlaskConical,
    title: "Test",
    description:
      "Menguji alur utama di berbagai ukuran layar dan skenario sebelum dirilis.",
  },
  {
    icon: Rocket,
    title: "Deploy",
    description:
      "Merilis ke hosting, memeriksa hasilnya langsung, lalu memperbaiki bila masih ada yang kurang.",
  },
];

export function WorkflowSection() {
  const reduce = useReducedMotion();

  return (
    <RegisterSection id="workflow">
      <section className="relative border-y border-[var(--color-line)] bg-[var(--color-bg-2)]">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading
            eyebrow="AI Development Workflow"
            title="AI jadi metode kerja, bukan pengganti proses."
            description="Setiap project saya kerjakan dengan alur yang sama: mulai dari memahami masalah sampai memastikan hasilnya benar-benar berjalan."
          />

          <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.title}
                  initial={reduce ? false : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ ...spring.soft, delay: Math.min(i * 0.06, 0.3) }}
                  className="surface surface-hover relative flex h-full flex-col rounded-2xl p-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="font-mono text-[12px] font-semibold text-[var(--color-muted)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[16px] font-semibold tracking-tight text-[var(--color-ink)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-muted)]">
                    {step.description}
                  </p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>
    </RegisterSection>
  );
}
