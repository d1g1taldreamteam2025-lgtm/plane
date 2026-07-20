# 📋 FKAG Web — Estado del Proyecto y Documentación

> **Migración de Family Key Auto Group de WordPress/Elementor a código (Astro).**
> Documento de referencia del estado actual, arquitectura y cómo continuar.
> Última actualización: sesión de migración (Home → Inventory → VDP → Financing → Apply).

---

## 1. Resumen ejecutivo

- **Qué es**: sitio del concesionario Family Key Auto Group, migrado de WordPress a un proyecto Astro estático, bilingüe ES/EN.
- **Stack**: **Astro 5 + TypeScript + Tailwind 4** (build estático, deploy en Vercel/Netlify).
- **Dónde vive**: dentro del monorepo de Plane, en la carpeta `fkag-web/` (rama `claude/continue-production-project-xAiby`, PR #1). ⚠️ **Recomendación pendiente: mover a su propio repo** (ver §8).
- **Imágenes**: **100% locales** en `public/images/`. **Cero dependencia de Cloudinary** (su cuenta fue deshabilitada — ver §6).

---

## 2. Cómo correrlo

```bash
cd fkag-web
npm install          # una sola vez
npm run dev          # → http://localhost:4321
npm run build        # genera /dist (sitio estático)
npm run preview      # previsualiza el build
```

Node 18+ requerido (probado con Node 22).

---

## 3. Arquitectura

```
fkag-web/
├── public/images/          # TODAS las imágenes locales (sin Cloudinary)
├── src/
│   ├── config/site.ts      # ⭐ Fuente ÚNICA de datos: teléfono, dirección, horarios,
│   │                       #   Supabase, webhook, assets, brands, lenders, heroSlides
│   ├── i18n/
│   │   ├── en.ts           # diccionario base (define las claves)
│   │   ├── es.ts           # español (TS obliga a tener todas las claves de en.ts)
│   │   └── index.ts        # helper t(key, lang), dict, DEFAULT_LANG='es'
│   ├── scripts/lang.ts     # ⭐ Runtime de idioma en el navegador (ver §4)
│   ├── lib/
│   │   ├── supabase.ts     # getAllVehicles, getVehicleById, getFeaturedVehicles, mapVehicle
│   │   └── webhook.ts      # sendLead + WEBHOOK_URL (n8n)
│   ├── layouts/BaseLayout.astro   # <head> + SEO/OG + Header + Footer + ChatWidget + lang runtime
│   ├── components/
│   │   ├── Header.astro     # top bar, banderas ES/EN, nav + dropdown, marquee, menú móvil
│   │   ├── Footer.astro     # footer + newsletter (sin redes sociales)
│   │   └── ChatWidget.astro # botón lateral "Chat" + WhatsApp flotante
│   │   └── home/
│   │       ├── HeroCarousel.astro     # carrusel hero (imagen por idioma + móvil)
│   │       └── FeaturedVehicles.astro # destacados dinámicos de Supabase
│   └── pages/              # cada archivo = una ruta
│       ├── index.astro                  # /            (Home)
│       ├── inventory/index.astro        # /inventory/  (listado con filtros)
│       ├── inventory/sample/index.astro # /inventory/sample/?id=... (VDP detalle)
│       └── financing/index.astro        # /financing/  (hero + mini-form + pasos + lenders + FAQ)
│           financing/apply/index.astro  # /financing/apply/ (aplicación de crédito completa)
├── astro.config.mjs
├── package.json
└── README.md
```

---

## 4. Sistema bilingüe (ES/EN) — MUY IMPORTANTE

Hay **dos patrones** conviviendo (ambos válidos):

### A) i18n central (Home, Header, Footer)
- Textos con `data-i18n="clave"`. Las claves están en `src/i18n/en.ts` + `es.ts`.
- `src/scripts/lang.ts` (cargado por `BaseLayout`) aplica las traducciones, guarda
  `localStorage.fkag_lang`, y dispara `window` → `CustomEvent('fkag-lang-change')`.
- Los botones de idioma tienen `data-lang="es"` / `data-lang="en"` + clase `.fkag-lang__btn`.
- Para agregar una traducción: añade la clave en `en.ts` → TS te obliga a ponerla en `es.ts`.

### B) i18n self-contained por página (Inventory, VDP, Financing, Apply)
- Cada página tiene su **propio diccionario `TR`** dentro de su `<script>` y su propio
  `applyTr()` que **scopea** a sus secciones (ej. `.fkag-apply [data-i18n]`).
- Inventory/VDP usan atributos propios (`data-inv-i18n`, `data-vdp-i18n`); Financing/Apply
  usan `data-i18n` pero con selectores scopeados, así el runtime central **no los pisa**
  (el central solo traduce claves que existen en el diccionario central).
- Todas escuchan `fkag-lang-change` para re-traducir al cambiar idioma.

**Regla de oro:** el idioma se guarda en `localStorage.fkag_lang` y el evento
`fkag-lang-change` sincroniza TODOS los widgets. Nunca romper esos dos nombres.

---

## 5. Estado de la migración

| Página / Pieza | Ruta | Estado |
|---|---|---|
| Header (top bar, banderas, dropdown, marquee, móvil) | (componente) | ✅ |
| Footer (+ newsletter) | (componente) | ✅ |
| Chat widget (lateral + WhatsApp) | (componente) | ✅ |
| Sistema i18n + tokens de diseño | — | ✅ |
| **Home** (hero, CTAs, destacados, marcas, reseñas, SEO) | `/` | ✅ |
| **Inventory** (filtros, búsqueda, paginación, sidebar) | `/inventory/` | ✅ |
| **VDP** (detalle de vehículo, galería, modales) | `/inventory/sample/` | ✅ |
| **Financing** (hero + mini-form, pasos, lenders, FAQ) | `/financing/` | ✅ |
| **Apply** (aplicación de crédito completa) | `/financing/apply/` | ✅ |
| Contact | `/contact/` | ⏳ pendiente |
| About | `/about/` | ⏳ pendiente |
| FAQs | `/faqs/` | ⏳ pendiente |
| Privacy Policy | `/privacy/` | ⏳ pendiente |
| Terms of Use | `/terms/` | ⏳ pendiente |
| Sitemap | `/sitemap/` | ⏳ pendiente |
| Accessibility | `/accessibility/` | ⏳ pendiente |

`npm run build` genera **5 rutas** limpias actualmente.

---

## 6. Imágenes — situación y pendientes

### ⚠️ Causa raíz: la cuenta Cloudinary `drbc4wbvw` está **DESHABILITADA**
Todas las imágenes daban error `401 → "cloud_name drbc4wbvw is disabled"`. Por eso se
rompieron en la web. **El proyecto ya NO depende de Cloudinary** — todo apunta a
`public/images/` (rutas locales centralizadas en `src/config/site.ts`).

### ✅ Ya locales (generadas/recuperadas)
- `flag-es.svg`, `flag-en.svg` (banderas generadas)
- `google-icon.svg` (generado)
- `placeholder.svg` (imagen "no disponible")
- 10 logos de marcas: `brand-{jeep,ford,hyundai,toyota,nissan,chevrolet,honda,kia,mazda,renault}.svg`
- 2 logos de bancos: `lender-chase.svg`, `lender-wellsfargo.svg`

### ⛔ Faltan (el cliente debe colocarlas en `public/images/` con estos nombres exactos)
| Archivo | Qué es | Fallback actual |
|---|---|---|
| `logo-header.png` | Logo FKAG del header | texto "FAMILY KEY AUTO GROUP" |
| `logo-footer.svg` | Logo dorado del footer | texto dorado |
| `hero-1-es.png` / `hero-1-en.png` | Hero slide 1 (16:9 desktop) | gris |
| `hero-1-es-mobile.png` / `hero-1-en-mobile.png` | Hero slide 1 (1:1 móvil) | gris |
| `hero-2-es.png` / `hero-2-en.png` / `hero-2-es-mobile.png` / `hero-2-en-mobile.png` | Hero slide 2 | gris |
| `hero-3-es.png` / `hero-3-en.png` / `hero-3-es-mobile.png` / `hero-3-en-mobile.png` | Hero slide 3 | gris |
| `inv-hero-bg.png` | Fondo del hero de Inventory | gradiente oscuro |
| `fin-hero-bg.png` | Fondo del hero de Financing | gradiente oscuro |
| `lender-ally.svg` / `lender-capitalone.svg` / `lender-santander.svg` / `lender-scu.svg` | Logos de bancos | nombre en texto |

> **Cómo recuperar los originales**: reactivar la cuenta de Cloudinary y descargarlos, o
> que el cliente los envíe. El **hero (16:9 desktop / 1:1 móvil)** y el **logo** son
> custom del cliente. Todo está referenciado con ruta local; solo hay que soltar los
> archivos en `public/images/`.

---

## 7. Integraciones backend

### Supabase (lectura de inventario) — `src/lib/supabase.ts`
- URL: `https://db.ucallnow.fun` · anon key en `site.ts` (pública por diseño).
- Tabla `inventory`. `getAllVehicles()`, `getVehicleById(id)`, `getFeaturedVehicles(n)`.
- `mapVehicle()` normaliza y **pone `bodyType` en minúscula** (los filtros comparan en minúscula).
- El inventory guarda los autos en `localStorage.fkag_inventory` para que el VDP no re-consulte.

### Webhook n8n (todos los formularios) — `src/lib/webhook.ts`
- URL: `https://n8n-ucallnow.ucallnow.fun/webhook/fkag-leads`
- Un solo endpoint; el campo **`form_type`** enruta en n8n:
  - `contact` — formulario de contacto
  - `newsletter` — suscripción del footer
  - `financing_quick` — mini-form de `/financing/` (+ guarda `sessionStorage.fkag_prefill`)
  - `financing` — aplicación completa de `/financing/apply/` (incluye `raw_fields` + `message` formateado para el PDF)
  - `reserve` / `quote` / `question` / `testdrive` — modales del VDP
- El n8n arma el PDF de la aplicación (JS puro), envía email (Gmail) y WhatsApp (Evolution API).

---

## 8. Problemas conocidos (CI del PR)

En el PR #1 hay **dos checks en rojo permanentes** — **NO son de nuestro código**:
1. **Vercel `mias-aesthetics`**: es un proyecto de Vercel del cliente (otro sitio, "Mia's
   Aesthetics") conectado a este repo que busca una carpeta `mias-aesthetics/` que no existe.
2. **Copyright Check**: workflow del monorepo de Plane que exige el header "Plane Software
   Inc." en los `.ts`. No corresponde estampar ese copyright en el código de FKAG.

**Ambos tienen la misma causa raíz**: `fkag-web` vive dentro del monorepo de Plane.
**Nuestro build compila perfecto.** Se ignoran sin riesgo.

### ✅ Solución recomendada: dar a `fkag-web` su propio repositorio
```bash
cd fkag-web
git init && git add . && git commit -m "FKAG web — Astro migration"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/fkag-web.git
git push -u origin main
# Vercel → New Project → importar fkag-web → detecta Astro → Deploy
```
Esto elimina los dos rojos y deja el deploy limpio.

---

## 9. Receta para migrar una página nueva

1. Toma el HTML del widget de WordPress; **descarta** el header/footer/chat pegados
   (ya son componentes en `BaseLayout`) y el script de i18n del header.
2. Crea `src/pages/<ruta>/index.astro`:
   ```astro
   ---
   import BaseLayout from '../../layouts/BaseLayout.astro';
   ---
   <BaseLayout title="..."> ...secciones... </BaseLayout>
   <script> /* i18n propio (TR + applyTr scopeado) + lógica de forms, importando site */ </script>
   <style> /* CSS del widget */ </style>
   ```
3. **Imágenes**: cambia cualquier `res.cloudinary.com/...` por `/images/<nombre>.png`
   local (y agrégalo a la tabla de pendientes en §6). Fallbacks `onerror` para no romper.
4. **Formularios**: `import { site }` y postea a `site.webhookUrl` con el `form_type` correcto.
5. **Estilos**: si el JS inyecta HTML con `innerHTML` (tarjetas dinámicas), usa
   `<style is:global>` (los estilos scopeados NO aplican a HTML inyectado). Si todo es
   estático, `<style>` normal está bien.
6. **Sticky bajo el header**: usa `top: var(--fkag-header-h, 150px)` (el Header expone su
   altura real en esa variable CSS).
7. `npm run build` y verifica: `grep -rl "res.cloudinary.com" src/` debe dar **cero**.

---

## 10. Tokens de diseño (paleta)

```
Dorado:      #c9a961 (primary) · #d4b674 (hover) · #a88a47 (dark)
Negro/ink:   #0c0c0c · #0a0a0a
Gris texto:  #5b6b7c · #4a4a4a
Fondo claro: #fafaf7 · #f5f7fa · #eef1f5
Bordes:      #e8e4dc
OK / Error:  #2f7d4f / #c0392b
Tipografía:  Poppins (títulos) · Inter (cuerpo) · Material Icons Outlined
```

---

## 11. Datos del negocio (en `src/config/site.ts`)

- **Nombre**: Family Key Auto Group
- **Teléfono**: (949) 514-7366 · WhatsApp: 19495147366
- **Dirección**: 170 N Arrowhead Ave STE C 175, Rialto, CA 92376
- **Email**: info@familykeyautogroup.com (⚠️ confirmar — el contact usó samuel.yepez@familykeyautogroup.com)
- **Horario**: Lun–Sáb 9AM–8PM · Dom 11AM–6PM (⚠️ el contact detalla 9–7 y Dom 11–5; reconciliar)
- Mapa (OpenStreetMap): bbox `-117.402,34.087,-117.349,34.131` · marker `34.109,-117.376`

---

## 12. Próximos pasos sugeridos

1. **Migrar páginas restantes**: Contact, About, FAQs, y legales (Privacy, Terms, Sitemap, Accessibility).
2. **Colocar imágenes pendientes** (§6) en `public/images/`.
3. **Mover `fkag-web` a su propio repo** (§8) → apaga los CI rojos y habilita deploy limpio.
4. **Reemplazar redes sociales reales** (footer/contact tienen `#`).
5. **Confirmar** email y horarios oficiales.
6. **Deploy** en Vercel + dominio + SSL.
