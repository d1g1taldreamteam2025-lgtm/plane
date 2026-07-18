# Recovery de Assets — Post Cloudinary

**Fecha:** 2026-07-18
**Contexto:** La cuenta Cloudinary `drbc4wbvw` (del cliente) se cayó y perdió todos los assets. La cuenta `dehvpdo4z` (backup) seguía viva y de ahí se rescataron 17 archivos. El resto (81 imágenes + varios videos) requiere re-upload manual.

Todos los archivos deben subirse a **`mias-aesthetics/public/media/`** en GitHub, con **exactamente los nombres listados abajo**. El código ya está apuntando a esos paths — apenas suban un archivo con ese nombre, se ve solo en la web.

---

## ✅ Ya rescatados (17 archivos, no re-subir)

Estos ya viven en `/public/media/`, funcionando:

- `contact-address.png` `contact-email.png` `contact-hours.png` `contact-whatsapp.png` — iconos rosados de la sección Contacto
- `before-lips.png` `after-lips.png` `before-eyebrows.png` `after-eyebrows.png` — antes/después del home
- `hero-post-1.png` `hero-post-2.png` — 2 posts del hero (ES desktop)
- `iv-visual-vertical-1/2/3/4.png` — 4 visuales verticales de IV Therapy
- `iv-visual-square-1/2.png` — 2 visuales cuadradas de IV Therapy
- `botox-erlym-poster.jpg` — poster del video de Erlym

---

## 📤 Por subir (81 archivos) — agrupados por sección

Sube cada uno **con el nombre exacto** listado. Los podés arrastrar a la carpeta `mias-aesthetics/public/media/` en GitHub y luego confirmar el commit.

### 1. Logo e iconografía del sitio (12 archivos)

Usados por header, footer y layout general.

| Nombre archivo | Qué es |
|---|---|
| `social-instagram.png` | Ícono custom Instagram (footer "Síguenos") |
| `social-facebook.png` | Ícono custom Facebook |
| `social-tiktok.png` | Ícono custom TikTok |
| `social-google-maps.png` | Ícono Google Maps clásico (contacto/mapa) |
| `social-google-maps-brand.png` | Ícono custom rosado Google Maps (footer "Síguenos") |
| `icon-google.png` | Ícono Google (reseñas / testimonios) |
| `icon-gmail.png` | Ícono Gmail (footer contacto email) |
| `icon-whatsapp.png` | Ícono WhatsApp verde (footer contacto tel) |
| `erlym-photo.jpg` | Foto de Erlym para la sección "Sobre Nosotras" (About) |
| `flag-es.png` | Bandera España para el switch de idioma |
| `flag-en.png` | Bandera USA para el switch de idioma |

**Nota:** el logo principal ya está en `/public/LOGO-02.png` — no hace falta re-subirlo.

### 2. Trust Badges del home (4 archivos)

Los 4 badges rosados en la parte superior del home.

| Nombre archivo | Qué es |
|---|---|
| `trust-badge-1-tecnica.png` | Cinta blanca "Técnica certificada" |
| `trust-badge-2-google.png` | Estrellas "5.0 ★ en Google" |
| `trust-badge-3-productos.png` | Corona "Productos premium" |
| `trust-badge-4-trato.png` | Manos "Trato personal" |

### 3. Modal de descuento 15% OFF (1 archivo)

| Nombre archivo | Qué es |
|---|---|
| `modal-offer.png` | Imagen de la modelo con la bolsa IV (era `pestaña_de_oferta`) |

**Nota:** actualmente el modal muestra un ícono corazón como fallback visual. Cuando subas `modal-offer.png`, hay que descomentar 4 líneas de código en `WelcomeModal.astro` para que la use.

### 4. Íconos custom de servicios en el menú dropdown (11 archivos)

Estos son los PNG pequeños que salen al lado del nombre de cada servicio en el menú de servicios del header.

| Nombre archivo | Servicio |
|---|---|
| `service-icon-iv.png` | IV Therapy / Sueroterapia |
| `service-icon-botox.png` | Botox |
| `service-icon-morpheus.png` | Morpheus 8 |
| `service-icon-thermage.png` | Thermage |
| `service-icon-lips.png` | Aumento de labios |
| `service-icon-lashes.png` | Pestañas pelo a pelo |
| `service-icon-facial.png` | Limpieza facial premium |
| `service-icon-depilation.png` | Depilación láser |
| `service-icon-dpl.png` | DPL cicatrices acné |
| `service-icon-salmon.png` | Esperma de salmón (PDRN) |
| `service-icon-dermapen.png` | Dermapen |

### 5. Fotos "Hero" de páginas de servicios (10 archivos)

Foto cuadrada grande en la parte superior de cada `/servicios/X`. Botox no tenía foto.

| Nombre archivo | Servicio |
|---|---|
| `service-hero-iv.png` | IV Therapy |
| `service-hero-morpheus.png` | Morpheus 8 |
| `service-hero-thermage.png` | Thermage |
| `service-hero-lips.png` | Aumento de labios |
| `service-hero-lashes.png` | Pestañas |
| `service-hero-facial.png` | Limpieza facial |
| `service-hero-depilation.png` | Depilación láser |
| `service-hero-dpl.png` | DPL |
| `service-hero-salmon.png` | Salmón |
| `service-hero-dermapen.png` | Dermapen |

### 6. Antes/después de Morpheus 8 en el home (2 archivos)

Falta rescatar de la cuenta muerta. Los otros (labios y cejas) ya están.

| Nombre archivo | Qué es |
|---|---|
| `before-morpheus.png` | Piel con manchas antes del tratamiento |
| `after-morpheus.png` | Piel uniforme después |

**Nota:** actualmente esta card usa un placeholder de gradiente. Cuando subas ambos archivos, hay que editar `BeforeAfter.astro` para reactivar el modo `real: true`.

### 7. Portadas de cursos (5 archivos)

Las imágenes de las cards del listado `/cursos`.

| Nombre archivo | Curso |
|---|---|
| `course-cover-lashes-classic.png` | Pestañas pelo a pelo |
| `course-cover-lashes-volume.png` | Volumen ruso |
| `course-cover-bbglow.png` | BB Glow |
| `course-cover-facials.png` | Faciales premium |
| `course-cover-fullstack.png` | Programa Mia Academy completo |

### 8. Media por servicio (imágenes y videos)

Cada página de servicio tiene su propia sección "Mira el tratamiento" con videos y fotos. **Los videos son opcionales** — si el archivo mp4 no existe, sale un play sin video pero el resto de la página funciona. Prioriza las **imágenes** (JPG).

#### Salmón (Esperma de salmón / PDRN)
| Nombre archivo | Tipo |
|---|---|
| `salmon-video.mp4` | Video 9:16 |
| `salmon-video-poster.jpg` | Poster del video |
| `salmon-image.jpg` | Imagen del tratamiento |

#### Facial (Limpieza facial premium)
| Nombre archivo | Tipo |
|---|---|
| `facial-video.mp4` | Video 9:16 |
| `facial-video-poster.jpg` | Poster |
| `facial-image-1.jpg` | Foto 1 |
| `facial-image-2.jpg` | Foto 2 |

#### Labios (Aumento de labios)
| Nombre archivo | Tipo |
|---|---|
| `lips-video.mp4` | Video 9:16 |
| `lips-video-poster.jpg` | Poster |
| `lips-image-1.jpg` `lips-image-2.jpg` `lips-image-3.jpg` `lips-image-4.jpg` | 4 fotos |

#### Botox (video secundario — el de Erlym sigue vivo)
| Nombre archivo | Tipo |
|---|---|
| `botox-video-2.mp4` | Video secundario 9:16 |
| `botox-video-2-poster.jpg` | Poster |

#### Depilación láser
| Nombre archivo | Tipo |
|---|---|
| `depilation-video.mp4` | Video |
| `depilation-video-poster.jpg` | Poster |
| `depilation-image.jpg` | Foto |

#### Dermapen
| Nombre archivo | Tipo |
|---|---|
| `dermapen-video.mp4` | Video |
| `dermapen-video-poster.jpg` | Poster |
| `dermapen-image.jpg` | Foto |

#### DPL cicatrices acné
| Nombre archivo | Tipo |
|---|---|
| `dpl-video.mp4` | Video |
| `dpl-video-poster.jpg` | Poster |
| `dpl-image.jpg` | Foto |

#### Morpheus 8
| Nombre archivo | Tipo |
|---|---|
| `morpheus-video-1.mp4` | Video 1 |
| `morpheus-video-1-poster.jpg` | Poster 1 |
| `morpheus-video-2.mp4` | Video 2 |
| `morpheus-video-2-poster.jpg` | Poster 2 |
| `morpheus-image.jpg` | Foto antes/después compuesta |

#### Pestañas pelo a pelo
| Nombre archivo | Tipo |
|---|---|
| `lashes-video.mp4` | Video |
| `lashes-video-poster.jpg` | Poster |
| `lashes-image-1.jpg` `lashes-image-2.jpg` `lashes-image-3.jpg` | 3 fotos |

#### Thermage
| Nombre archivo | Tipo |
|---|---|
| `thermage-video.mp4` | Video landscape (1920×1080) |
| `thermage-video-poster.jpg` | Poster |
| `thermage-image-1.jpg` `thermage-image-2.jpg` | 2 fotos cuadradas |

### 9. Hero del home — desktop y móvil (12 archivos)

Los posts rotativos del carrusel del home. Actualmente hay 2 slides funcionando (los rescatados). Cuando subas los otros, se activan las 4 slides en ES y EN.

**ES (español):**
| Nombre archivo | Slot |
|---|---|
| `hero-post-3.png` | Slide 3 desktop |
| `hero-post-4.png` | Slide 4 desktop |
| `hero-post-1-mobile.png` | Slide 1 versión móvil vertical (1080×800) |
| `hero-post-2-mobile.png` | Slide 2 versión móvil |
| `hero-post-3-mobile.png` | Slide 3 versión móvil |
| `hero-post-4-mobile.png` | Slide 4 versión móvil |

**EN (inglés):**
| Nombre archivo | Slot |
|---|---|
| `hero-post-1-en.png` `hero-post-2-en.png` `hero-post-3-en.png` `hero-post-4-en.png` | 4 desktop |
| `hero-post-1-en-mobile.png` `hero-post-2-en-mobile.png` `hero-post-3-en-mobile.png` `hero-post-4-en-mobile.png` | 4 móvil |

**Nota:** cuando subas al menos 4 archivos EN o 4 archivos ES desktop, se puede reactivar el carrusel de 4 slides. Se necesita editar `HeroCarousel.astro` para agregar las slides adicionales al array `ES_POSTS` / `EN_POSTS`.

---

## 🔥 Videos que aún dependen de Cloudinary `dehvpdo4z`

Los siguientes videos SIGUEN cargando desde Cloudinary (cuenta vieja que aún funciona). No son urgentes pero conviene migrar a un CDN propio (Bunny.net, Cloudflare R2, etc.) o subir a YouTube unlisted para no depender de un solo servicio externo:

- `0102_tsous6.mp4` — Limpieza facial (home reels)
- `0828_scvesj.mp4` — Botox por Erlym (home reels + página botox)
- `Aumento_de_labio_1_kqa5ml.mp4` — Aumento labios (home reels)
- `Morpheus_1_wgnizc.mp4` — Morpheus 8 (home reels)
- `depoilacion_1_gopx81.mov` — Depilación (home reels)
- `p1_jmtrma.mp4` — Grasa abdominal Erlym (home reels)
- `Iv_therapy_ssvzpk.mov` — IV Therapy (home reels + página IV)
- `DPL_vmcxrn.mov` — DPL (home reels)
- `Dermepen_1_etfdjv.mp4` — Dermapen (home reels)
- `06_1_1_1_j8zrq4.mp4` — Salmón por Erlym (home reels)
- `PRP_PLASMA_ambw42.mov` — PRP Plasma (home reels)
- `Peptido_2_obha8k.mov` — Péptidos (home reels)
- `glutation_f3jmuu.mov` — Glutatión IV (home reels + página IV)

Total: ~560 MB de video.

---

## Cómo subir todo a la vez desde GitHub

1. Entra a: `https://github.com/d1g1taldreamteam2025-lgtm/plane/tree/claude/continue-production-project-ruNes/mias-aesthetics/public/media`
2. Botón **"Add file" → "Upload files"** arriba a la derecha
3. Arrastra los archivos con **los nombres exactos** de las tablas de arriba
4. Abajo escribe algo tipo `chore: re-upload assets after Cloudinary loss`
5. Click **Commit changes**

Vercel redeployará automáticamente en 1-2 minutos y las imágenes aparecerán en la web sin tocar ni una línea de código.
