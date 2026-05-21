// Catálogo de reels (videos cortos + imágenes 9:16 / 1:1)
// Los videos se sirven desde Cloudinary. El poster (thumbnail) se genera
// automáticamente a partir del primer frame con la transformación so_0,f_jpg.

export type ReelKind = "video" | "image";

export interface Reel {
  kind: ReelKind;
  title: { es: string; en: string };
  subtitle: { es: string; en: string };
  /** Bandera para marcar contenidos donde aparece Erlym */
  erlym?: boolean;
  /** URL del recurso original */
  src: string;
  /** Opcional: poster custom para videos */
  poster?: string;
}

// Helper para generar un poster (primer frame) desde un mov/mp4 de Cloudinary
function poster(src: string): string {
  // Reemplaza /video/upload/ por /video/upload/so_0,f_jpg,q_auto/
  return src.replace("/video/upload/", "/video/upload/so_0,f_jpg,q_auto/").replace(/\.(mov|mp4)$/i, ".jpg");
}

export const REELS: Reel[] = [
  {
    kind: "video",
    title: { es: "Botox por Erlym", en: "Botox by Erlym" },
    subtitle: { es: "Erlym te explica el procedimiento", en: "Erlym walks you through it" },
    erlym: true,
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355862/0828_scvesj.mp4",
    poster: poster("https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355862/0828_scvesj.mp4"),
  },
  {
    kind: "video",
    title: { es: "Grasa abdominal", en: "Belly fat" },
    subtitle: { es: "Erlym habla de la técnica", en: "Erlym explains the technique" },
    erlym: true,
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355864/p1_jmtrma.mp4",
    poster: poster("https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355864/p1_jmtrma.mp4"),
  },
  {
    kind: "video",
    title: { es: "Esperma de salmón", en: "Salmon DNA" },
    subtitle: { es: "Tendencia anti-edad. Por Erlym.", en: "Anti-aging trend. By Erlym." },
    erlym: true,
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355880/06_1_1_1_j8zrq4.mp4",
    poster: poster("https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355880/06_1_1_1_j8zrq4.mp4"),
  },
  {
    kind: "video",
    title: { es: "Aumento de labios", en: "Lip filler" },
    subtitle: { es: "Resultados naturales", en: "Natural results" },
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355872/Aumento_de_labio_1_kqa5ml.mp4",
    poster: poster("https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355872/Aumento_de_labio_1_kqa5ml.mp4"),
  },
  {
    kind: "video",
    title: { es: "Limpieza facial", en: "Facial cleansing" },
    subtitle: { es: "Antes y después", en: "Before & after" },
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355874/0102_tsous6.mp4",
    poster: poster("https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355874/0102_tsous6.mp4"),
  },
  {
    kind: "video",
    title: { es: "PRP Plasma", en: "PRP Plasma" },
    subtitle: { es: "Bioestimulación con tu propio plasma", en: "Biostimulation with your own plasma" },
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779354815/PRP_PLASMA_ambw42.mov",
    poster: poster("https://res.cloudinary.com/dehvpdo4z/video/upload/v1779354815/PRP_PLASMA_ambw42.mov"),
  },
  {
    kind: "video",
    title: { es: "Depilación láser", en: "Laser hair removal" },
    subtitle: { es: "Adiós a la cuchilla", en: "Goodbye razor" },
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779354804/depoilacion_1_gopx81.mov",
    poster: poster("https://res.cloudinary.com/dehvpdo4z/video/upload/v1779354804/depoilacion_1_gopx81.mov"),
  },
  {
    kind: "video",
    title: { es: "Cicatrices de acné", en: "Acne scars" },
    subtitle: { es: "Tratamiento DPL", en: "DPL treatment" },
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355919/DPL_vmcxrn.mov",
    poster: poster("https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355919/DPL_vmcxrn.mov"),
  },
  {
    kind: "video",
    title: { es: "Péptidos", en: "Peptides" },
    subtitle: { es: "Bioestimulación celular", en: "Cell biostimulation" },
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355940/Peptido_2_obha8k.mov",
    poster: poster("https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355940/Peptido_2_obha8k.mov"),
  },
  {
    kind: "video",
    title: { es: "Morpheus 8", en: "Morpheus 8" },
    subtitle: { es: "Microagujas + radiofrecuencia", en: "Microneedling + radiofrequency" },
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779356007/Morpheus_1_wgnizc.mp4",
    poster: poster("https://res.cloudinary.com/dehvpdo4z/video/upload/v1779356007/Morpheus_1_wgnizc.mp4"),
  },
  {
    kind: "video",
    title: { es: "Dermapen", en: "Dermapen" },
    subtitle: { es: "Estimulación de colágeno", en: "Collagen stimulation" },
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779356004/Dermepen_1_etfdjv.mp4",
    poster: poster("https://res.cloudinary.com/dehvpdo4z/video/upload/v1779356004/Dermepen_1_etfdjv.mp4"),
  },
  {
    kind: "video",
    title: { es: "IV Therapy — Glutatión", en: "IV Therapy — Glutathione" },
    subtitle: { es: "Antioxidante maestro", en: "Master antioxidant" },
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355988/glutation_f3jmuu.mov",
    poster: poster("https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355988/glutation_f3jmuu.mov"),
  },
  {
    kind: "video",
    title: { es: "IV Therapy", en: "IV Therapy" },
    subtitle: { es: "Vitaminas que sentís en minutos", en: "Vitamins you feel in minutes" },
    src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779356011/Iv_therapy_ssvzpk.mov",
    poster: poster("https://res.cloudinary.com/dehvpdo4z/video/upload/v1779356011/Iv_therapy_ssvzpk.mov"),
  },
  {
    kind: "image",
    title: { es: "Vitaminas para cada síntoma", en: "Vitamins for every symptom" },
    subtitle: { es: "Sueroterapia personalizada", en: "Custom IV therapy" },
    src: "https://res.cloudinary.com/dehvpdo4z/image/upload/v1779355854/2_02_hijc8p.png",
  },
  {
    kind: "image",
    title: { es: "Sueroterapia premium", en: "Premium IV therapy" },
    subtitle: { es: "Cocteles a tu medida", en: "Tailored cocktails" },
    src: "https://res.cloudinary.com/dehvpdo4z/image/upload/v1779355854/2_01_aukdck.png",
  },
  {
    kind: "image",
    title: { es: "Pérdida de peso", en: "Weight loss" },
    subtitle: { es: "Tirzepatida · Retatrutide · MOTS-C · GHK-Cu", en: "Tirzepatide · Retatrutide · MOTS-C · GHK-Cu" },
    src: "https://res.cloudinary.com/dehvpdo4z/image/upload/v1779357210/8_01_ufrke9.png",
  },
  {
    kind: "image",
    title: { es: "Péptidos avanzados", en: "Advanced peptides" },
    subtitle: { es: "NAD · PT-141 · y más", en: "NAD · PT-141 · and more" },
    src: "https://res.cloudinary.com/dehvpdo4z/image/upload/v1779357210/8_02_ea0lco.png",
  },
  {
    kind: "image",
    title: { es: "Vitamina por síntoma", en: "Vitamin per symptom" },
    subtitle: { es: "Sueroterapia personalizada", en: "Custom IV therapy" },
    src: "https://res.cloudinary.com/dehvpdo4z/image/upload/v1779357211/post_1_yzxnmu.png",
  },
  {
    kind: "image",
    title: { es: "Tu salud, primero", en: "Your health, first" },
    subtitle: { es: "Bienestar desde adentro", en: "Wellness from within" },
    src: "https://res.cloudinary.com/dehvpdo4z/image/upload/v1779357210/Posr_copia_krbtwe.png",
  },
];
