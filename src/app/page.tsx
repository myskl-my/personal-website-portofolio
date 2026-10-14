import { Hero } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects-section";
import { WorkflowSection } from "@/components/sections/workflow-section";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { AboutSection } from "@/components/sections/about-section";
import { RegisterSection } from "@/components/providers/register-section";

/**
 * Halaman utama — satu halaman utuh dengan navigasi scroll.
 *
 *   #top          : hero, paling atas
 *   #projects     : featured projects
 *   #workflow     : alur kerja AI
 *   #capabilities : kemampuan teknis
 *   #about        : tentang saya
 *   #kontak       : footer, dirender di layout
 *
 * PENTING: tiap section dibungkus `RegisterSection` sendiri, tidak boleh
 * digabung. Kalau dua section berbagi satu wrapper, elemen yang dipantau jadi
 * setinggi dua section sekaligus sehingga indikator navbar terlambat pindah.
 */
export default function HomePage() {
  return (
    <>
      <RegisterSection id="top">
        <Hero />
      </RegisterSection>
      <ProjectsSection />
      <WorkflowSection />
      <CapabilitiesSection />
      <AboutSection />
    </>
  );
}
