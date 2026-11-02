"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { spring } from "@/lib/motion";

/**
 * "Little Blob", karakter maskot orisinal untuk layar sambutan.
 *
 * Digambar sepenuhnya dengan SVG sehingga ringan, tajam di segala ukuran, dan
 * mudah dianimasikan tanpa aset eksternal. Warna memakai variabel tema
 * (--blob-*) supaya blob selalu berkontras dengan latar: terang di mode gelap,
 * gelap di mode terang.
 *
 * Pose dikendalikan dari luar lewat prop `pose`; animasi idle (mengambang,
 * bernapas, berkedip) berjalan sendiri di dalam komponen.
 */

export type BlobPose = "idle" | "invite" | "viewer" | "alert" | "happy";

type PoseSpec = {
  /** Arah pandangan mata (dalam satuan user SVG). */
  gazeX: number;
  gazeY: number;
  /** Rotasi lengan (derajat). Negatif = mengangkat. */
  armRight: number;
  armLeft: number;
  /** Kemiringan ringan seluruh tubuh. */
  tilt: number;
  smile: number;
  mouth: { opacity: number; rx: number; ry: number };
};

const POSE: Record<BlobPose, PoseSpec> = {
  idle: { gazeX: 0, gazeY: 0, armRight: 12, armLeft: -8, tilt: 0, smile: 1, mouth: { opacity: 0, rx: 6, ry: 4 } },
  // Melirik & menunjuk ke tombol di bawah (menunduk ke kanan).
  invite: { gazeX: 3, gazeY: 6, armRight: 74, armLeft: -10, tilt: 2, smile: 1, mouth: { opacity: 0, rx: 6, ry: 4 } },
  // Menatap pengunjung sejenak.
  viewer: { gazeX: 0, gazeY: -2, armRight: 12, armLeft: -8, tilt: -1, smile: 1, mouth: { opacity: 0, rx: 6, ry: 4 } },
  // Reaksi saat tombol di-hover / fokus.
  alert: { gazeX: 3, gazeY: 4, armRight: 58, armLeft: 24, tilt: 2, smile: 0.5, mouth: { opacity: 0.9, rx: 7, ry: 6 } },
  // Reaksi gembira saat masuk.
  happy: { gazeX: 0, gazeY: -3, armRight: -58, armLeft: 62, tilt: 0, smile: 0, mouth: { opacity: 1, rx: 11, ry: 10 } },
};

const BODY =
  "M108 50C142 48 174 74 173 116C172 154 145 189 109 188C74 187 47 153 48 115C49 76 76 52 108 50Z";

export function LittleBlob({
  pose,
  className,
}: {
  pose: BlobPose;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const target = POSE[pose];

  // Mengambang + napas halus (squash & stretch tipis), dimatikan saat
  // prefers-reduced-motion.
  const floatAnimate = reduce
    ? undefined
    : { y: [0, -5, 0], scaleY: [1, 1.025, 1], scaleX: [1, 0.99, 1] };
  const floatTransition = reduce
    ? undefined
    : { duration: 5.6, repeat: Infinity, ease: "easeInOut" as const };

  // Kedip sesekali: ry mengecil cepat lalu kembali.
  const eyeAnimate = reduce ? { ry: 13 } : { ry: [13, 13, 1.5, 13, 13] };
  const eyeTransition = reduce
    ? { duration: 0 }
    : {
        duration: 4.4,
        times: [0, 0.84, 0.88, 0.92, 1],
        repeat: Infinity,
        ease: "easeInOut" as const,
      };

  return (
    <svg
      viewBox="0 0 220 210"
      role="img"
      aria-label="Little Blob, maskot portofolio"
      className={className}
    >
      <defs>
        <linearGradient id="blob-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--blob-body-1)" />
          <stop offset="100%" stopColor="var(--blob-body-2)" />
        </linearGradient>
        <radialGradient id="blob-gloss" cx="0.35" cy="0.28" r="0.6">
          <stop offset="0%" stopColor="var(--blob-gloss)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--blob-gloss)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="blob-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="var(--blob-shadow)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--blob-shadow)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* bayangan lembut di lantai */}
      <ellipse cx="110" cy="197" rx="66" ry="12" fill="url(#blob-shadow)" />

      <motion.g
        style={{ transformBox: "view-box", transformOrigin: "110px 120px" }}
        animate={floatAnimate}
        transition={floatTransition}
      >
        <motion.g
          animate={{ rotate: target.tilt }}
          transition={spring.soft}
          style={{ transformBox: "view-box", transformOrigin: "110px 160px" }}
        >
          {/* tubuh */}
          <path d={BODY} fill="url(#blob-body)" />
          <path d={BODY} fill="url(#blob-gloss)" />

          {/* pipi samar */}
          <ellipse cx="70" cy="144" rx="11" ry="6.5" fill="var(--blob-accent)" opacity="0.16" />
          <ellipse cx="150" cy="144" rx="11" ry="6.5" fill="var(--blob-accent)" opacity="0.16" />

          {/* kaki mungil */}
          <ellipse cx="90" cy="186" rx="13" ry="8" fill="var(--blob-body-2)" />
          <ellipse cx="130" cy="186" rx="13" ry="8" fill="var(--blob-body-2)" />

          {/* mata, bergerak mengikuti arah pandang, berkedip sendiri */}
          <motion.g
            animate={{ x: target.gazeX, y: target.gazeY }}
            transition={spring.soft}
          >
            <motion.ellipse
              cx="86"
              cy="116"
              rx="10.5"
              fill="var(--blob-eye)"
              initial={{ ry: 13 }}
              animate={eyeAnimate}
              transition={eyeTransition}
            />
            <motion.ellipse
              cx="134"
              cy="116"
              rx="10.5"
              fill="var(--blob-eye)"
              initial={{ ry: 13 }}
              animate={eyeAnimate}
              transition={eyeTransition}
            />
            {/* kilau kecil di mata (tidak ikut berkedip) */}
            <circle cx="89.5" cy="111.5" r="2.6" fill="var(--blob-body-1)" />
            <circle cx="137.5" cy="111.5" r="2.6" fill="var(--blob-body-1)" />
          </motion.g>

          {/* mulut: garis senyum + mulut terbuka (di-crossfade) */}
          <motion.path
            d="M96 150 Q110 162 124 150"
            fill="none"
            stroke="var(--blob-eye)"
            strokeWidth="3.6"
            strokeLinecap="round"
            animate={{ opacity: target.smile }}
            transition={{ duration: 0.2 }}
          />
          <motion.ellipse
            cx="110"
            cy="156"
            fill="var(--blob-eye)"
            animate={{ opacity: target.mouth.opacity, rx: target.mouth.rx, ry: target.mouth.ry }}
            transition={spring.snap}
          />

          {/* lengan kanan (menunjuk) */}
          <motion.g
            style={{ transformBox: "view-box", transformOrigin: "160px 141px" }}
            animate={{ rotate: target.armRight }}
            transition={spring.bounce}
          >
            <rect x="158" y="134" width="31" height="13" rx="6.5" fill="var(--blob-body-1)" />
          </motion.g>

          {/* lengan kiri */}
          <motion.g
            style={{ transformBox: "view-box", transformOrigin: "60px 141px" }}
            animate={{ rotate: target.armLeft }}
            transition={spring.bounce}
          >
            <rect x="31" y="134" width="31" height="13" rx="6.5" fill="var(--blob-body-1)" />
          </motion.g>
        </motion.g>
      </motion.g>
    </svg>
  );
}
