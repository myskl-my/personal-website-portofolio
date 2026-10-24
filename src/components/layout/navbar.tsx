"use client";

import * as React from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GithubIcon } from "@/components/icons/github";
import { site, navLinks } from "@/lib/site";
import { useScrollSpy } from "@/components/providers/scroll-spy";
import { useScrollToSection } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { activeId } = useScrollSpy();
  const scrollTo = useScrollToSection();
  const pathname = usePathname();
  const router = useRouter();
  const onHome = pathname === "/";

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 34,
    restDelta: 0.001,
  });

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape menutup sheet mobile — perilaku dialog yang diharapkan keyboard user.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleNav = React.useCallback(
    (id: string) => {
      setOpen(false);
      // Di halaman lain (mis. /projects) section tidak ada di DOM, jadi
      // diarahkan dulu ke beranda dengan anchor. Di beranda sendiri, cukup
      // pakai animasi scroll supaya URL tetap bersih tanpa hash.
      if (!onHome) {
        router.push(id === "top" ? "/" : `/#${id}`);
        return;
      }
      // Beri jeda satu frame supaya sheet mobile sempat mulai menutup
      // sebelum scroll dijalankan.
      requestAnimationFrame(() => scrollTo(id));
    },
    [scrollTo, onHome, router],
  );

  // Di halaman non-home hanya `#kontak` (footer) yang ada di DOM, jadi
  // scroll-spy akan selalu menyimpulkan "Contact" aktif — itu menyesatkan.
  // Indikator tab hanya dihitung di beranda tempat seluruh section ada.
  const isActive = (id: string) => onHome && activeId === id;

  return (
    <>
      {/* bar progres scroll */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-mauve)] to-[var(--color-accent)]"
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border-color] duration-400",
          scrolled
            ? "border-b border-[var(--color-line)] bg-[var(--color-bg)]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--color-bg)]/65"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          className={cn(
            "mx-auto flex w-full max-w-6xl items-center justify-between px-4 transition-[padding,height] duration-400 sm:px-6",
            scrolled ? "h-14" : "h-16 sm:h-[72px]",
          )}
          aria-label="Main navigation"
        >
          <button
            type="button"
            onClick={() => handleNav("top")}
            className="group relative flex items-center gap-2.5"
            aria-label={`${site.name} — back to top`}
          >
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[var(--shadow-card-hover)]">
              <span className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-soft)] to-[var(--color-accent-soft)] opacity-80" />
              <span className="relative font-mono text-[13px] font-bold tracking-tight text-[var(--color-primary)]">
                {site.shortName}
              </span>
            </span>
            <span className="hidden text-[15px] font-semibold tracking-tight text-[var(--color-ink)] sm:block">
              {site.name}
            </span>
          </button>

          {/* desktop */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNav(link.id)}
                aria-current={isActive(link.id) ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300",
                  isActive(link.id)
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
                )}
              >
                {link.label}
                {isActive(link.id) && (
                  <motion.span
                    layoutId="nav-dot"
                    transition={spring.snap}
                    className="absolute inset-x-2.5 -bottom-0.5 h-[2px] rounded-full bg-[var(--color-primary)]"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub ${site.githubHandle}`}
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-muted)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-line-2)] hover:text-[var(--color-ink)] hover:shadow-[var(--shadow-card)] active:scale-95 sm:flex"
            >
              <GithubIcon className="h-[17px] w-[17px]" />
            </a>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink)] transition-all duration-300 active:scale-95 lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={spring.snap}
                  className="flex items-center justify-center"
                >
                  {open ? (
                    <X className="h-[18px] w-[18px]" />
                  ) : (
                    <Menu className="h-[18px] w-[18px]" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* menu mobile */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-[var(--color-bg)]/70 backdrop-blur-md lg:hidden"
              aria-hidden
            />
            <motion.div
              key="sheet"
              initial={{ y: "100%", opacity: 0.4 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={spring.soft}
              className="fixed inset-x-3 bottom-3 z-50 origin-bottom rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-2 shadow-[var(--shadow-float)] lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="mx-auto mb-2 h-1 w-9 rounded-full bg-[var(--color-line-2)]" />
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...spring.soft, delay: 0.06 + i * 0.05 }}
                  >
                    <button
                      type="button"
                      onClick={() => handleNav(link.id)}
                      aria-current={isActive(link.id) ? "page" : undefined}
                      className={cn(
                        "flex min-h-[48px] w-full items-center justify-between rounded-xl px-4 text-[14px] font-semibold uppercase tracking-[0.12em] transition-colors",
                        isActive(link.id)
                          ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                          : "text-[var(--color-ink)] hover:bg-[var(--color-bg-2)]",
                      )}
                    >
                      {link.label}
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full transition-colors",
                          isActive(link.id)
                            ? "bg-[var(--color-primary)]"
                            : "bg-transparent",
                        )}
                      />
                    </button>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-2 flex items-center gap-2 border-t border-[var(--color-line)] px-2 pt-3 pb-1">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--color-line)] text-[14px] font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bg-2)]"
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href={site.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] flex-1 items-center justify-center rounded-xl bg-[var(--color-primary)] text-[14px] font-semibold text-[var(--color-on-primary)] transition-transform active:scale-95"
                >
                  Contact
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}