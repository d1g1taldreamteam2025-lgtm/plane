// Catálogo de reels (solo videos 9:16). Las imágenes 1:1 y 9:16 viven en
// las páginas individuales de servicio, no en el showcase del home — así no
// se mezclan formatos y la sección queda visualmente coherente.
//
// Los videos de Erlym en cámara se intercalan (no van todos juntos al
// principio): cada ~3 cards aparece uno con Erlym.
//
// El poster (thumbnail) se genera automáticamente desde el primer frame
// con la transformación so_0,f_jpg de Cloudinary.

import type { Lang } from "../i18n";

export type ServiceTag =
  | "iv" | "botox" | "morpheus" | "thermage" | "lips" | "lashes"
  | "facial" | "depilation" | "dpl" | "salmon" | "dermapen";

export interface Reel {
  /** Video corto vertical (mp4 / mov) */
  src: string;
  /** Poster auto-generado */
  poster?: string;
  title: { es: string; en: string };
  subtitle: { es: string; en: string };
  /** Bandera para los videos donde aparece Erlym hablando */
  erlym?: boolean;
  /** Etiqueta de servicio: permite filtrar / mostrar el video en su página */
  service?: ServiceTag;
}

function poster(src: string): string {
  return src
    .replace("/video/upload/", "/video/upload/so_0,f_jpg,q_auto/")
    .replace(/\.(mov|mp4)$/i, ".jpg");
}

const r = (def: Omit<Reel, "poster">): Reel => ({ ...def, poster: poster(def.src) });

// Orden cuidado: Erlym aparece intercalado en posiciones 1, 5 y 10 (no en bloque).
export const REELS: Reel[] = [
  r({
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355874/0102_tsous6.mp4",
    title: { es: "Limpieza facial", en: "Facial cleansing" },
    subtitle: { es: "Antes y después", en: "Before & after" },
    // Sin service tag: la página /servicios/limpieza-facial usa FACIAL_MEDIA.
  }),
  r({
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355862/0828_scvesj.mp4",
    title: { es: "Botox por Erlym", en: "Botox by Erlym" },
    subtitle: { es: "Erlym te explica el procedimiento", en: "Erlym walks you through it" },
    erlym: true,
    // Sin service tag: la página /servicios/botox usa BOTOX_MEDIA.
  }),
  r({
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355872/Aumento_de_labio_1_kqa5ml.mp4",
    title: { es: "Aumento de labios", en: "Lip filler" },
    subtitle: { es: "Resultados naturales", en: "Natural results" },
    // Sin service tag: la página /servicios/aumento-labios usa LIPS_MEDIA.
  }),
  r({
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779356007/Morpheus_1_wgnizc.mp4",
    title: { es: "Morpheus 8", en: "Morpheus 8" },
    subtitle: { es: "Microagujas + radiofrecuencia", en: "Microneedling + radiofrequency" },
    // Sin service tag: aparece en el showcase del home, la página
    // /servicios/morpheus-8 usa su propio set (MORPHEUS_MEDIA).
  }),
  r({
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779354804/depoilacion_1_gopx81.mov",
    title: { es: "Depilación láser", en: "Laser hair removal" },
    subtitle: { es: "Adiós a la cuchilla", en: "Goodbye razor" },
    // Sin service tag: la página /servicios/depilacion-laser usa DEPILATION_MEDIA.
  }),
  r({
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355864/p1_jmtrma.mp4",
    title: { es: "Grasa abdominal", en: "Belly fat" },
    subtitle: { es: "Erlym habla de la técnica", en: "Erlym explains the technique" },
    erlym: true,
  }),
  r({
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779356011/Iv_therapy_ssvzpk.mov",
    title: { es: "IV Therapy", en: "IV Therapy" },
    subtitle: { es: "Vitaminas que sientes en minutos", en: "Vitamins you feel in minutes" },
    service: "iv",
  }),
  r({
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355919/DPL_vmcxrn.mov",
    title: { es: "Cicatrices de acné", en: "Acne scars" },
    subtitle: { es: "Tratamiento DPL", en: "DPL treatment" },
    // Sin service tag: la página /servicios/dpl-cicatrices-acne usa DPL_MEDIA.
  }),
  r({
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779356004/Dermepen_1_etfdjv.mp4",
    title: { es: "Dermapen", en: "Dermapen" },
    subtitle: { es: "Estimulación de colágeno", en: "Collagen stimulation" },
    // Sin service tag: solo en showcase del home.
  }),
  r({
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355880/06_1_1_1_j8zrq4.mp4",
    title: { es: "Esperma de salmón", en: "Salmon DNA" },
    subtitle: { es: "Tendencia anti-edad. Por Erlym.", en: "Anti-aging trend. By Erlym." },
    erlym: true,
    // Sin service tag: aparece en el showcase del home pero la página
    // /servicios/esperma-de-salmon usa su propio set (SALMON_MEDIA).
  }),
  r({
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779354815/PRP_PLASMA_ambw42.mov",
    title: { es: "PRP Plasma", en: "PRP Plasma" },
    subtitle: { es: "Bioestimulación con tu propio plasma", en: "Biostimulation with your own plasma" },
    // Sin service tag: solo en showcase del home.
  }),
  r({
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355940/Peptido_2_obha8k.mov",
    title: { es: "Péptidos", en: "Peptides" },
    subtitle: { es: "Bioestimulación celular", en: "Cell biostimulation" },
    // sin service tag: aparece en el showcase general del home pero no
    // se cuela en /servicios/sueroterapia (péptidos != IV)
  }),
  r({
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355988/glutation_f3jmuu.mov",
    title: { es: "Glutatión IV", en: "IV Glutathione" },
    subtitle: { es: "Antioxidante maestro", en: "Master antioxidant" },
    service: "iv",
  }),
];

// Imágenes verticales 9:16 (1920x1080) — van en el mismo grid que los videos
// porque comparten formato. Las imágenes 1:1 (1080x1080) van aparte en un
// grid cuadrado.
// NOTA: assets locales en /public/media/ (recovery post-Cloudinary).
export const IV_VISUALS_VERTICAL = [
  "/media/iv-visual-vertical-2.png",
  "/media/iv-visual-vertical-1.png",
  "/media/iv-visual-vertical-3.png",
  "/media/iv-visual-vertical-4.png",
];

export const IV_VISUALS_SQUARE = [
  "/media/iv-visual-square-1.png",
  "/media/iv-visual-square-2.png",
];

// Esperma de salmón (PDRN): contenido cerrado del cliente. 1 video 9:16 (reel)
// + 1 imagen. No se espera más material para este servicio.
export const SALMON_MEDIA = {
  video:
    "/media/salmon-video.mp4",
  poster:
    "/media/salmon-video-poster.jpg",
  image:
    "/media/salmon-image.jpg",
};

// Limpieza facial premium ("Cara bonita facial"): 1 video 9:16 + 2 imágenes
// del mismo tratamiento (tomas distintas de la misma clienta).
export const FACIAL_MEDIA = {
  video:
    "/media/facial-video.mp4",
  poster:
    "/media/facial-video-poster.jpg",
  images: [
    "/media/facial-image-1.jpg",
    "/media/facial-image-2.jpg",
  ],
};

// Aumento de labios: 1 video 9:16 + 4 imágenes. Mezcla de antes/después
// compuestos y tomas de cliente mostrando los labios.
export const LIPS_MEDIA = {
  video:
    "/media/lips-video.mp4",
  poster:
    "/media/lips-video-poster.jpg",
  images: [
    "/media/lips-image-1.jpg",
    "/media/lips-image-2.jpg",
    "/media/lips-image-3.jpg",
    "/media/lips-image-4.jpg",
  ],
};

// Botox: 2 videos 9:16. El primero es Erlym explicando el procedimiento.
// El segundo es nuevo (cliente). Layout side-by-side igual que Morpheus.
export const BOTOX_MEDIA = {
  videos: [
    {
      // Video sigue en Cloudinary dehvpdo4z (aún vivo). Migrar cuando decidas
      // CDN propio. Poster ya vive localmente.
      src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355862/0828_scvesj.mp4",
      poster: "/media/botox-erlym-poster.jpg",
      erlym: true,
    },
    {
      src: "/media/botox-video-2.mp4",
      poster:
        "/media/botox-video-2-poster.jpg",
      erlym: false,
    },
  ],
};

// Depilación láser: 1 video 9:16 + 1 imagen.
export const DEPILATION_MEDIA = {
  video:
    "/media/depilation-video.mp4",
  poster:
    "/media/depilation-video-poster.jpg",
  image:
    "/media/depilation-image.jpg",
};

// Dermapen: 1 video 9:16 + 1 imagen antes/después compuesta.
export const DERMAPEN_MEDIA = {
  video:
    "/media/dermapen-video.mp4",
  poster:
    "/media/dermapen-video-poster.jpg",
  image:
    "/media/dermapen-image.jpg",
};

// DPL cicatrices de acné: 1 video 9:16 (nuevo) + 1 imagen 1:1.
// El video del reel viejo `DPL_vmcxrn` ya NO se muestra aquí (sigue en
// el showcase del home).
export const DPL_MEDIA = {
  video:
    "/media/dpl-video.mp4",
  poster:
    "/media/dpl-video-poster.jpg",
  image:
    "/media/dpl-image.jpg",
};

// Morpheus 8: 2 videos 9:16 + 1 imagen "antes y después" compuesta.
export const MORPHEUS_MEDIA = {
  videos: [
    {
      src: "/media/morpheus-video-1.mp4",
      poster:
        "/media/morpheus-video-1-poster.jpg",
    },
    {
      src: "/media/morpheus-video-2.mp4",
      poster:
        "/media/morpheus-video-2-poster.jpg",
    },
  ],
  beforeAfter:
    "/media/morpheus-image.jpg",
};

// Pestañas pelo a pelo: 1 video 9:16 + 3 imágenes "antes y después juntas".
// Las imágenes ya traen el antes/después compuesto, no se necesita slider.
export const LASHES_MEDIA = {
  video:
    "/media/lashes-video.mp4",
  poster:
    "/media/lashes-video-poster.jpg",
  beforeAfter: [
    "/media/lashes-image-1.jpg",
    "/media/lashes-image-2.jpg",
    "/media/lashes-image-3.jpg",
  ],
};

// Thermage: tiene su propio set porque su video es landscape 16:9 (no 9:16
// como el resto). 1 video + 2 imágenes cuadradas. Único set, no se espera más.
export const THERMAGE_MEDIA = {
  video: "/media/thermage-video.mp4",
  poster:
    "/media/thermage-video-poster.jpg",
  squares: [
    "/media/thermage-image-1.jpg",
    "/media/thermage-image-2.jpg",
  ],
};

// Compat: algunos componentes viejos siguen importando IV_VISUALS.
export const IV_VISUALS = [...IV_VISUALS_VERTICAL, ...IV_VISUALS_SQUARE];

/** Devuelve los videos para un servicio dado */
export function reelsByService(tag: ServiceTag): Reel[] {
  return REELS.filter((r) => r.service === tag);
}
