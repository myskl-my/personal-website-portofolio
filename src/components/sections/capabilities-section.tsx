"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Layout,
  Server,
  Database,
  CloudUpload,
  GitBranch,
  ShieldCheck,
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
 * Kemampuan teknis ditampilkan sebagai bidang kerja, bukan daftar nama
 * teknologi dengan angka kecakapan. Tujuannya menghindari klaim yang belum
 * diverifikasi, sekaligus tetap memberi gambaran cara saya bekerja.
 */
const CAPABILITIES: Capability[] = [
  {
    icon: Layout,
    title: "Frontend & UI",
    description:
      "Membangun antarmuka responsif yang rapi dan aksesibel, dari layar handphone sampai desktop.",
  },
  {
    icon: Server,
    title: "Backend & API",
    description:
      "Menyusun logika server, alur data, dan integrasi layanan supaya aplikasi berjalan konsisten.",
  },
  {
    icon: Database,
    title: "Database & Data",
    description:
      "Merancang struktur data yang jelas dan mudah dikembangkan seiring bertambahnya kebutuhan.",
  },
  {
    icon: CloudUpload,
    title: "Deployment & Hosting",
    description:
      "Merilis situs maupun aplikasi ke hosting modern, lalu memastikan hasilnya cepat dan stabil.",
  },
  {
    icon: GitBranch,
    title: "Tooling & Otomasi",
    description:
      "Merapikan alur kerja dengan kontrol versi, skrip build, dan otomatisasi langkah rilis.",
  },
  {
    icon: ShieldCheck,
    title: "Testing & QA",
    description:
      "Menguji alur utama dan menelusuri error sebelum rilis, supaya yang dipakai benar-benar berfungsi.",
  },
];

export function CapabilitiesSection() {
  const reduce = useReducedMotion();

  return (
    <RegisterSection id="capabilities">
      <section className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="Technical Capabilities"
          title="Yang bisa saya kerjakan."
          description="Kemampuan yang saya pakai sehari-hari untuk mengubah ide menjadi produk yang bisa dipakai."
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
