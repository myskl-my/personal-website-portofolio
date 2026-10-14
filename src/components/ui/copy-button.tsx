"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";

type Props = {
  value: string;
  label?: string;
  className?: string;
  children?: React.ReactNode;
};

export function CopyButton({ value, label, className, children }: Props) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Tanpa `children`, komponen ini hanya ikon salin + toast.
  // Nilai teksnya sengaja TIDAK dirender di sini supaya tidak dobel
  // dengan teks yang sudah tampil di elemen sebelahnya.

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const el = document.createElement("textarea");
      el.value = value;
      el.setAttribute("readonly", "");
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand("copy");
      } finally {
        document.body.removeChild(el);
      }
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Tersalin" : `Salin ${label ?? value}`}
      className={cn(
        "group relative inline-flex items-center gap-2 rounded-full",
        "transition-[box-shadow,transform,border-color] duration-300",
        "active:scale-[0.97]",
        className,
      )}
    >
      {children}

      <span
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
          copied
            ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)]"
            : "border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-muted)] group-hover:text-[var(--color-ink)]",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={spring.bounce}
              className="flex"
            >
              <Check className="h-3.5 w-3.5" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={spring.snap}
              className="flex"
            >
              <Copy className="h-3.5 w-3.5" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      {/* toast kecil */}
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={spring.bounce}
            className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--color-ink)] px-3 py-1 text-[11px] font-medium text-[var(--color-bg)] shadow-[var(--shadow-card)]"
          >
            Tersalin!
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
