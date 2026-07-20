# Family Key Auto Group — Sitio Web

Migración del sitio de **WordPress/Elementor a código** con **Astro + TypeScript + Tailwind 4**.

## 🚀 Arranque rápido

```bash
# 1. Instalar dependencias
npm install

# 2. (Opcional) configurar variables de entorno
cp .env.example .env   # y edita los valores si hace falta

# 3. Servidor de desarrollo → http://localhost:4321
npm run dev

# 4. Compilar para producción (genera /dist)
npm run build

# 5. Previsualizar el build
npm run preview
```

## 🧱 Arquitectura

```
src/
├── config/site.ts        # Fuente ÚNICA de datos: teléfono, dirección, horarios,
│                         #   URLs de Supabase/webhook/Cloudinary, navegación, assets
├── i18n/                 # Traducciones ES/EN centralizadas (en.ts define las claves,
│   ├── en.ts             #   es.ts está obligado por TS a tenerlas todas)
│   ├── es.ts
│   └── index.ts          # helper t(key, lang)
├── scripts/lang.ts       # Runtime de idioma en el navegador:
│                         #   aplica [data-i18n], guarda localStorage.fkag_lang,
│                         #   dispara el evento 'fkag-lang-change'
├── lib/
│   ├── supabase.ts       # Lectura de inventario (REST, sin dependencias)
│   ├── webhook.ts        # Envío de leads a n8n (sendLead)
│   └── cloudinary.ts     # Helpers de imágenes
├── layouts/BaseLayout.astro   # <head>, SEO, Header + Footer + Chat, runtime i18n
├── components/           # Header, Footer, ChatWidget (compartidos)  →  se irán
│                         #   agregando: Hero, ServiceCard, VDP, etc.
└── pages/                # Cada archivo = una ruta. index.astro = home
```

## 🌐 Cómo funciona el bilingüe (ES/EN)

- Cada texto traducible se marca con `data-i18n="clave"` (o `data-i18n-placeholder`).
- El texto por defecto que se renderiza en el servidor es **español**.
- Al cargar, `scripts/lang.ts` lee `localStorage.fkag_lang` y, si es `en`, cambia todo.
- Los botones de idioma tienen `data-lang="es"` / `data-lang="en"` (y la clase
  `.fkag-lang__btn`), así el sistema los detecta automáticamente.
- Al cambiar idioma se dispara `window` → `CustomEvent('fkag-lang-change', {detail:{lang}})`,
  que los scripts de widgets dinámicos (inventario, VDP) escuchan para re-renderizar.

### Agregar una traducción nueva
1. Añade la clave en `src/i18n/en.ts`.
2. TypeScript te obligará a añadirla también en `src/i18n/es.ts`.
3. Úsala: `<span data-i18n="mi_clave">{t('mi_clave','es')}</span>`.

## 📋 Estado de la migración

| Sección | Estado |
|---|---|
| Header (top bar, banderas, dropdown, marquee, móvil) | ✅ migrado (fiel al WP) |
| Footer | ✅ migrado |
| Chat widget (lateral + WhatsApp) | ✅ migrado |
| Sistema i18n + tokens de diseño | ✅ |
| Supabase / webhook | ✅ conectados |
| Imágenes 100% locales (sin Cloudinary) | ✅ |
| **Home** (hero, CTAs, destacados, marcas, reseñas, SEO) | ✅ migrado |
| **Inventory** (filtros rápidos, búsqueda, sidebar, chips, paginación) | ✅ migrado |
| VDP (detalle de vehículo) | ⏳ |
| Financing + Apply | ⏳ |
| About / Contact / FAQs | ⏳ |
| Legal (privacy, terms, sitemap, accessibility) | ⏳ |

## 🖼️ Imágenes

Las URLs de assets están centralizadas en `src/config/site.ts` (`assets`). Las que se
perdieron se reemplazan ahí en un solo lugar.

## 🚢 Deploy

Listo para **Vercel** o **Netlify** (sitio estático). Conecta el repo y despliega —
no requiere configuración extra. Recuerda poner las variables de `.env` en el panel
del hosting.
