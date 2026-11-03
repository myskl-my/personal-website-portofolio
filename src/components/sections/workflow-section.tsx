"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Compass, Layers, Code2, Search, FlaskConical, Rocket } from "lucide-react";
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
    title: "Discover",
    description:
      "Clarify requirements, users, and constraints before writing code.",
  },
  {
    icon: Layers,
    title: "Architect",
    description:
      "Design the data model, API surface, and UI structure up front.",
  },
  {
    icon: Code2,
    title: "Develop",
    description:
      "Implement features in clean, reviewable increments with a structure that stays easy to read.",
  },
  {
    icon: Search,
    title: "Review",
    description:
      "Refactor for clarity, consistency, and maintainability. Root causes, not band-aids.",
  },
  {
    icon: FlaskConical,
    title: "Test",
    description:
      "Cover core flows across screen sizes and real scenarios before anything goes live.",
  },
  {
    icon: Rocket,
    title: "Deploy",
    description:
      "Deploy to production, verify in the wild, then polish whatever still feels off.",
  },
];

export function WorkflowSection() {
  const reduce = useReducedMotion();

  return (
    <RegisterSection id="workflow">
        <section className="relative border-y border-[var(--color-line)] bg-[var(--color-surface)]">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading
            eyebrow="Development Workflow"
            description="Same playbook every time: understand the problem, build in slices, and deploy something that actually works."
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
