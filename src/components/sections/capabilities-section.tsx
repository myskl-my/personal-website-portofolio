"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Layout,
  Smartphone,
  Layers,
  Palette,
  Server,
  CloudUpload,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { RegisterSection } from "@/components/providers/register-section";
import { spring } from "@/lib/motion";

type Capability = {
  icon: LucideIcon;
  title: string;
  description: string;
};

/**
 * Keahlian ditampilkan sebagai bidang kerja beserta stack utama,
 * bukan daftar nama teknologi dengan angka kecakapan.
 */
const CAPABILITIES: Capability[] = [
  {
    icon: Layout,
    title: "Web Development",
    description:
      "React, Next.js, TypeScript, and Tailwind CSS: modern web apps built to last.",
  },
  {
    icon: Smartphone,
    title: "Android Development",
    description:
      "Native Android apps end to end, from architecture to release.",
  },
  {
    icon: Layers,
    title: "Multi-Platform development with Flutter",
    description:
      "Cross-platform mobile from one codebase: fast, consistent, production-ready.",
  },
  {
    icon: Palette,
    title: "UI Engineering",
    description:
      "Crafting fast, responsive, accessible interfaces that feel right on any screen.",
  },
  {
    icon: Server,
    title: "APIs & Backend",
    description:
      "Designing solid server logic, data flows, and integrations that keep apps running without drama.",
  },
  {
    icon: CloudUpload,
    title: "Deployment",
    description:
      "Cloudflare Pages and release workflows: ship fast, keep production stable.",
  },
];

export function CapabilitiesSection() {
  const reduce = useReducedMotion();

  return (
    <RegisterSection id="capabilities">
      <section className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="Skills & Experience"
          description="Web, mobile, and the stack behind them, focused on products that ship."
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
                <h3 className="mt-4 text-[16px] font-semibold tracking-tight text-[var(--color-ink)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-muted)]">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </RegisterSection>
  );
}
