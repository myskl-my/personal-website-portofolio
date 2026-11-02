import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Kartu kode bergaya editor, dipakai sebagai elemen visual di hero.
 *
 * Isinya sengaja potongan alur kerja, bukan kode project asli, tujuannya
 * menggambarkan cara kerja (rencana, implementasi, debug, uji, rilis), bukan
 * mengklaim hasil. Murni presentasional, tanpa state, supaya bisa dirender
 * sebagai bagian dari hero di klien.
 */

const kw = "text-[var(--color-primary)]";
const fn = "text-[var(--color-accent)]";
const str = "text-[var(--color-mauve)]";
const com = "text-[var(--color-muted)] italic";
const pn = "text-[var(--color-ink-2)]";
const tx = "text-[var(--color-ink)]";

type Row = { n: number; parts: React.ReactNode };

const ROWS: Row[] = [
  { n: 1, parts: <span className={com}>{"// idea → shipped"}</span> },
  {
    n: 2,
    parts: (
      <>
        <span className={kw}>const</span> <span className={tx}>stack</span>{" "}
        <span className={pn}>=</span> <span className={pn}>[</span>
      </>
    ),
  },
  {
    n: 3,
    parts: (
      <>
        {"  "}
        <span className={str}>&quot;next&quot;</span>
        <span className={pn}>,</span>
      </>
    ),
  },
  {
    n: 4,
    parts: (
      <>
        {"  "}
        <span className={str}>&quot;typescript&quot;</span>
        <span className={pn}>,</span>
      </>
    ),
  },
  {
    n: 5,
    parts: (
      <>
        {"  "}
        <span className={str}>&quot;tailwind&quot;</span>
        <span className={pn}>,</span>
      </>
    ),
  },
  { n: 6, parts: <span className={pn}>{"];"}</span> },
  { n: 7, parts: <span>&nbsp;</span> },
  {
    n: 8,
    parts: (
      <>
        <span className={kw}>export async function</span>{" "}
        <span className={fn}>ship</span>
        <span className={pn}>(</span>
        <span className={tx}>idea</span>
        <span className={pn}>: </span>
        <span className={tx}>Idea</span>
        <span className={pn}> {"{"}</span>
      </>
    ),
  },
  {
    n: 9,
    parts: (
      <>
        {"  "}
        <span className={kw}>const</span> <span className={tx}>plan</span>{" "}
        <span className={pn}>= await</span> <span className={fn}>design</span>
        <span className={pn}>(</span>
        <span className={tx}>idea</span>
        <span className={pn}>);</span>
      </>
    ),
  },
  {
    n: 10,
    parts: (
      <>
        {"  "}
        <span className={kw}>const</span> <span className={tx}>build</span>{" "}
        <span className={pn}>=</span> <span className={fn}>implement</span>
        <span className={pn}>(</span>
        <span className={tx}>plan</span>
        <span className={pn}>);</span>
      </>
    ),
  },
  { n: 11, parts: <span>&nbsp;</span> },
  {
    n: 12,
    parts: (
      <>
        {"  "}
        <span className={kw}>await</span> <span className={fn}>test</span>
        <span className={pn}>(</span>
        <span className={tx}>build</span>
        <span className={pn}>);</span>
      </>
    ),
  },
  { n: 13, parts: <span>&nbsp;</span> },
  {
    n: 14,
    parts: (
      <>
        {"  "}
        <span className={kw}>return</span> <span className={fn}>deploy</span>
        <span className={pn}>(</span>
        <span className={tx}>build</span>
        <span className={pn}>);</span>
      </>
    ),
  },
  { n: 15, parts: <span className={pn}>{"}"}</span> },
];

export function CodeWindow({ className }: { className?: string }) {
  return (
    <figure
      className={cn(
        "surface relative overflow-hidden rounded-2xl border border-[var(--color-line)] shadow-[var(--shadow-float)]",
        className,
      )}
    >
      {/* bilah judul */}
      <div className="flex items-center gap-2 border-b border-[var(--color-line)] bg-[var(--color-surface-2)] px-4 py-3">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#c47a3c]" />
          <span className="h-3 w-3 rounded-full bg-[#c4956a]" />
          <span className="h-3 w-3 rounded-full bg-[#a67c52]" />
        </span>
        <span className="ml-2 font-mono text-[12px] text-[var(--color-muted)]">
          ship.ts
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] px-2 py-0.5 text-[10.5px] font-medium tracking-wide text-[var(--color-primary)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
          TS
        </span>
      </div>

      {/* isi kode */}
      <div className="overflow-x-auto bg-[var(--color-surface)] px-2 py-4">
        <pre className="font-mono text-[12.5px] leading-[1.85] sm:text-[13px]">
          <code>
            {ROWS.map((row) => (
              <span key={row.n} className="flex">
                <span
                  aria-hidden
                  className="w-9 shrink-0 select-none pr-3 text-right text-[var(--color-line-2)]"
                >
                  {row.n}
                </span>
                <span className="min-w-0 whitespace-pre text-[var(--color-ink-2)]">
                  {row.parts}
                </span>
              </span>
            ))}
            <span className="flex">
              <span
                aria-hidden
                className="w-9 shrink-0 select-none pr-3 text-right text-[var(--color-line-2)]"
              >
                16
              </span>
              <span className="inline-flex items-center text-[var(--color-muted)]">
                <span
                  aria-hidden
                  className="ml-0.5 inline-block h-[1.05em] w-[7px] animate-[caret_1.1s_steps(1)_infinite] rounded-[1px] bg-[var(--color-primary)] align-middle"
                />
              </span>
            </span>
          </code>
        </pre>
      </div>

      {/* bilah status */}
      <div className="flex items-center justify-between border-t border-[var(--color-line)] bg-[var(--color-surface-2)] px-4 py-2 font-mono text-[11px] text-[var(--color-muted)]">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mauve)]" />
          main
        </span>
        <span>UTF-8 · TS</span>
      </div>
    </figure>
  );
}
