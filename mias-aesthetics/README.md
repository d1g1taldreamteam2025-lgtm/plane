# Mia's Aesthetics

Sitio web del centro estético **Mia's Aesthetics** — Astro + Tailwind v4, bilingüe ES/EN, reservas por WhatsApp.

## Stack

- **Astro 6** (SSG, output `static`)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **TypeScript** estricto
- **Fonts**: Poppins (display) + Inter (body) — self-hosted via `@fontsource`
- **i18n** por URL: `/` (ES) y `/en/` (EN), con `hreflang` + sitemap
- **SEO**: meta tags completos, Open Graph, Twitter Card, JSON-LD `BeautySalon`
- **A11y**: skip link, ARIA roles, contrast AA

## Estructura

```
src/
├── pages/
│   ├── index.astro       # Home ES
│   └── en/index.astro    # Home EN
├── layouts/
│   └── MainLayout.astro  # SEO + Header/Footer wrapper
├── components/
│   ├── Header.astro      # Sticky con LangSwitch + nav
│   ├── Footer.astro
│   ├── LangSwitch.astro  # Toggle ES/EN
│   ├── WhatsAppFloat.astro
│   ├── Hero.astro
│   ├── Marquee.astro
│   ├── Intro.astro
│   ├── ServicesPreview.astro
│   ├── WhyUs.astro
│   ├── Testimonials.astro
│   └── CTAFinal.astro
├── i18n/
│   ├── es.json
│   ├── en.json
│   └── index.ts          # helper `t(lang, 'path.to.key')`
├── lib/
│   └── site.ts           # constantes (WhatsApp, Instagram, horarios)
└── styles/
    └── global.css        # Tailwind v4 theme + design tokens
```

## Comandos

| Comando        | Acción                           |
| :------------- | :------------------------------- |
| `pnpm install` | Instala dependencias             |
| `pnpm dev`     | Dev server en `localhost:4321`   |
| `pnpm build`   | Build de producción en `./dist/` |
| `pnpm preview` | Preview local del build          |

## Configuración rápida

Editá `src/lib/site.ts` para cambiar:

- Número de WhatsApp (`whatsappNumber`)
- Instagram (`instagram` / `instagramHandle`)
- Email, dirección, horarios

Los textos de cada idioma viven en `src/i18n/es.json` y `src/i18n/en.json`.

## Deploy

Funciona en cualquier host estático: **Vercel**, **Netlify**, **Cloudflare Pages**.
Subí el contenido de `dist/` o conectá el repo y configurá:

- Build command: `pnpm build`
- Output dir: `dist`
- Node: `22`
