#!/usr/bin/env node
/**
 * Wrapper deploy ke Cloudflare Pages.
 *
 * Kenapa tidak `wrangler pages deploy` langsung?
 *   Di mesin ini ada env var global CLOUDFLARE_API_KEY + CLOUDFLARE_EMAIL
 *   yang masih berisi token API versi lama (format cfk_, sudah tidak valid).
 *   Wrangler memprioritaskan pasangan X-Auth-Key/Email di atas
 *   Authorization: Bearer, sehingga selalu gagal dengan:
 *     "Unknown X-Auth-Key or X-Auth-Email [code: 9103]"
 *   Wrapper ini membersihkan kedua variabel itu sebelum memanggil wrangler,
 *   lalu menyuntikkan token yang benar dari .env.local.
 *
 * Sumber kredensial: file .env.local di root project (sudah masuk .gitignore)
 * DIUTAMAHKAN dari env var, bukan sebaliknya. Di mesin ini ada env var global
 * CLOUDFLARE_API_TOKEN yang masih berisi token versi lama (cfk_, sudah invalid).
 * Kalau env var menang, deploy selalu gagal dengan "Invalid access token [9109]".
 */

import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadDotEnv() {
  const file = resolve(process.cwd(), ".env.local");
  if (!existsSync(file)) return {};
  const values = {};
  for (const raw of readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    values[key] = val;
  }
  return values;
}

const dotenv = loadDotEnv();

const TOKEN = dotenv.CLOUDFLARE_API_TOKEN;
const PROJECT = dotenv.CLOUDFLARE_PAGES_PROJECT ?? "webportofolio-diki";
const BRANCH = dotenv.CLOUDFLARE_PAGES_BRANCH ?? "main";

if (!TOKEN) {
  console.error(
    "CLOUDFLARE_API_TOKEN belum di-set.\n" +
      "Buat .env.local di root project:\n" +
      "  CLOUDFLARE_API_TOKEN=cfut_xxx\n" +
      "  CLOUDFLARE_PAGES_PROJECT=webportofolio-diki",
  );
  process.exit(1);
}

// Bersihkan kredensial global yang stale agar wrangler memakai Bearer token.
const env = { ...process.env, CLOUDFLARE_API_TOKEN: TOKEN };
delete env.CLOUDFLARE_API_KEY;
delete env.CLOUDFLARE_EMAIL;

const WRANGLER_ENTRY = resolve(
  process.env.APPDATA ?? "",
  "npm",
  "node_modules",
  "wrangler",
  "bin",
  "wrangler.js",
);

const args = [
  WRANGLER_ENTRY,
  "pages",
  "deploy",
  "out",
  `--project-name=${PROJECT}`,
  `--branch=${BRANCH}`,
];

if (!existsSync(WRANGLER_ENTRY)) {
  console.error(
    `Entrypoint wrangler tidak ditemukan di:\n  ${WRANGLER_ENTRY}\n\n` +
      "Pasang dulu:  npm install -g wrangler",
  );
  process.exit(1);
}

const child = spawn(process.execPath, args, { stdio: "inherit", env });

child.on("exit", (code) => process.exit(code ?? 1));
child.on("error", (err) => {
  console.error(`Gagal menjalankan wrangler: ${err.message}`);
  process.exit(1);
});