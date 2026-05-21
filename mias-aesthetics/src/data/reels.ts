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
    service: "facial",
  }),
  r({
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355862/0828_scvesj.mp4",
    title: { es: "Botox por Erlym", en: "Botox by Erlym" },
    subtitle: { es: "Erlym te explica el procedimiento", en: "Erlym walks you through it" },
    erlym: true,
    service: "botox",
  }),
  r({
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355872/Aumento_de_labio_1_kqa5ml.mp4",
    title: { es: "Aumento de labios", en: "Lip filler" },
    subtitle: { es: "Resultados naturales", en: "Natural results" },
    service: "lips",
  }),
  r({
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779356007/Morpheus_1_wgnizc.mp4",
    title: { es: "Morpheus 8", en: "Morpheus 8" },
    subtitle: { es: "Microagujas + radiofrecuencia", en: "Microneedling + radiofrequency" },
    service: "morpheus",
  }),
  r({
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779354804/depoilacion_1_gopx81.mov",
    title: { es: "Depilación láser", en: "Laser hair removal" },
    subtitle: { es: "Adiós a la cuchilla", en: "Goodbye razor" },
    service: "depilation",
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
    service: "dpl",
  }),
  r({
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779356004/Dermepen_1_etfdjv.mp4",
    title: { es: "Dermapen", en: "Dermapen" },
    subtitle: { es: "Estimulación de colágeno", en: "Collagen stimulation" },
    service: "facial",
  }),
  r({
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355880/06_1_1_1_j8zrq4.mp4",
    title: { es: "Esperma de salmón", en: "Salmon DNA" },
    subtitle: { es: "Tendencia anti-edad. Por Erlym.", en: "Anti-aging trend. By Erlym." },
    erlym: true,
    service: "salmon",
  }),
  r({
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779354815/PRP_PLASMA_ambw42.mov",
    title: { es: "PRP Plasma", en: "PRP Plasma" },
    subtitle: { es: "Bioestimulación con tu propio plasma", en: "Biostimulation with your own plasma" },
    service: "facial",
  }),
  r({
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355940/Peptido_2_obha8k.mov",
    title: { es: "Péptidos", en: "Peptides" },
    subtitle: { es: "Bioestimulación celular", en: "Cell biostimulation" },
    service: "iv",
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
export const IV_VISUALS_VERTICAL = [
  "https://res.cloudinary.com/dehvpdo4z/image/upload/v1779355854/2_02_hijc8p.png",
  "https://res.cloudinary.com/dehvpdo4z/image/upload/v1779355854/2_01_aukdck.png",
  "https://res.cloudinary.com/dehvpdo4z/image/upload/v1779357210/8_01_ufrke9.png",
  "https://res.cloudinary.com/dehvpdo4z/image/upload/v1779357210/8_02_ea0lco.png",
];

export const IV_VISUALS_SQUARE = [
  "https://res.cloudinary.com/dehvpdo4z/image/upload/v1779357211/post_1_yzxnmu.png",
  "https://res.cloudinary.com/dehvpdo4z/image/upload/v1779357210/Posr_copia_krbtwe.png",
];

// Compat: algunos componentes viejos siguen importando IV_VISUALS.
export const IV_VISUALS = [...IV_VISUALS_VERTICAL, ...IV_VISUALS_SQUARE];

/** Devuelve los videos para un servicio dado */
export function reelsByService(tag: ServiceTag): Reel[] {
  return REELS.filter((r) => r.service === tag);
}
