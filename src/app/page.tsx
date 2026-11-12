import { Hero } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects-section";
import { WorkflowSection } from "@/components/sections/workflow-section";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { AboutSection } from "@/components/sections/about-section";
import { RegisterSection } from "@/components/providers/register-section";

/**
 * Homepage, one full page with scroll navigation.
 *
 *   #top          : hero, top
 *   #projects     : my projects
 *   #workflow     : development workflow
 *   #capabilities : technical skills
 *   #about        : about me
 *   #contact      : footer, rendered in layout
 *
 * IMPORTANT: each section wrapped in its own `RegisterSection`, must not be
 * combined. If two sections share one wrapper, the monitored element becomes
 * as tall as two sections at once so the navbar indicator is late to move.
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
