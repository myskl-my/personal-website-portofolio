"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";

/** Subscribe kosong — dipakai useSyncExternalStore untuk deteksi mount. */
const emptySubscribe = () => () => {};

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  // useSyncExternalStore menghindari hydration mismatch tanpa setState
  // di dalam effect (larangan react-hooks/set-state-in-effect).
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  // Gating dengan `mounted` penting: di server resolvedTheme tidak tersedia,
  // sehingga tanpa gating nilai isDark berbeda saat hidrasi dan memicu
  // hydration mismatch (React 19 bisa meninggalkan aria-label yang basi).
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Ganti ke tema terang" : "Ganti ke tema gelap"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full",
        "border border-[var(--color-line)] bg-[var(--color-surface)]",
        "transition-[box-shadow,transform,border-color] duration-300",
        "hover:border-[var(--color-line-2)] hover:shadow-[var(--shadow-card)]",
        "active:scale-95",
        className,
      )}
    >
      {/* lingkaran cahaya kecil yang ikut bergerak */}
      <motion.span
        aria-hidden
        layout
        className="absolute inset-0 rounded-full"
        animate={{
          background: isDark
            ? "radial-gradient(circle at 70% 30%, var(--color-accent-soft), transparent 70%)"
            : "radial-gradient(circle at 30% 70%, var(--color-primary-soft), transparent 70%)",
        }}
        transition={spring.soft}
      />

      <AnimatePresence mode="wait" initial={false}>
        {mounted ? (
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={spring.snap}
            className="relative z-10 flex items-center justify-center"
          >
            {isDark ? (
              <Moon className="h-[18px] w-[18px] text-[var(--color-mauve)]" />
            ) : (
              <Sun className="h-[18px] w-[18px] text-[var(--color-accent)]" />
            )}
          </motion.span>
        ) : (
          <span className="relative z-10 flex h-[18px] w-[18px]" aria-hidden />
        )}
      </AnimatePresence>
    </button>
  );
}
