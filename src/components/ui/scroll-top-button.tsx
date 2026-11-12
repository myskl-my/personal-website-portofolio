"use client";

import { ArrowUp } from "lucide-react";
import { scrollToElement } from "@/lib/smooth-scroll";

/**
 * Back to top button that works on any page.
 *
 * Uses own scroll animation (`scrollToElement`) to stay consistent with
 * navbar navigation, and doesn't depend on `#top` element existence. On
 * /projects page this button still works.
 */
export function ScrollTopButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => scrollToElement(window, { duration: 800 })}
      className={className}
    >
      Back to top
      <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
