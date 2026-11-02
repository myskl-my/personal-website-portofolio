# Portofolio Diki Candra

Situs portofolio pribadi: satu halaman utama (hero, projects, workflow,
capabilities, about, kontak) plus halaman daftar project dan halaman detail
studi kasus per project.

## Tech stack

- Next.js 16 (App Router, `output: "export"`) + React 19
- TypeScript (strict)
- Tailwind CSS v4
- framer-motion untuk animasi, lucide-react untuk ikon
- next-themes untuk mode terang/gelap (default gelap)

## Menjalankan lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Perintah

| Perintah           | Fungsi                                              |
| ------------------ | --------------------------------------------------- |
| `npm run dev`      | Server pengembangan                                 |
| `npm run build`    | Build statis ke folder `out/`                       |
| `npm run lint`     | Jalankan ESLint                                     |
| `npm run preview`  | Pratinjau hasil build (`out/`) di port 3000         |
| `npm run deploy`   | Build lalu deploy ke Cloudflare Pages               |
| `npm run deploy:fast` | Deploy hasil build yang ada (tanpa build ulang)  |

## Struktur

```
src/
  app/            # route, layout, metadata, globals.css
  components/     # UI: layout, sections, project, providers, welcome, ui
  lib/
    data/         # sumber konten (types, local seed, index)
    project-links.ts
    motion.ts
    smooth-scroll.ts
scripts/deploy.mjs  # wrapper deploy ke Cloudflare Pages
```

## Konten

Seluruh konten project & profil dibaca lewat `src/lib/data/index.ts`. Data
berasal dari seed statis di `src/lib/data/local.ts` — edit file itu
untuk menambah/mengubah project.

## Deploy

Situs di-deploy ke Cloudflare Pages. Salin `.env.example` menjadi `.env.local`,
isi nilainya, lalu jalankan `npm run deploy`. Detail alur deploy ada di
`scripts/deploy.mjs`.
