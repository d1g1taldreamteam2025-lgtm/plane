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

// Esperma de salmón (PDRN): contenido cerrado del cliente. 1 video 9:16 (reel)
// + 1 imagen. No se espera más material para este servicio.
export const SALMON_MEDIA = {
  video:
    "https://res.cloudinary.com/drbc4wbvw/video/upload/v1779762531/SaveClip.App_AQPvhd5cShVK-Pixsc96W2Qtmo8k_F3HF4qGCN5y7_opegTNzE8NvSQqc2VcsdWU0Yhn35aOijR3Nb25VXuMt9zs_mkcdpy.mp4",
  poster:
    "https://res.cloudinary.com/drbc4wbvw/video/upload/so_0,f_jpg,q_auto/v1779762531/SaveClip.App_AQPvhd5cShVK-Pixsc96W2Qtmo8k_F3HF4qGCN5y7_opegTNzE8NvSQqc2VcsdWU0Yhn35aOijR3Nb25VXuMt9zs_mkcdpy.jpg",
  image:
    "https://res.cloudinary.com/drbc4wbvw/image/upload/v1779762559/SaveClip.App_522385632_18364606645150544_274130291725021475_n_iydifk.jpg",
};

// Limpieza facial premium ("Cara bonita facial"): 1 video 9:16 + 2 imágenes
// del mismo tratamiento (tomas distintas de la misma clienta).
export const FACIAL_MEDIA = {
  video:
    "https://res.cloudinary.com/drbc4wbvw/video/upload/v1779764370/SaveClip.App_AQOo1SIvO4VxbibY8HK3dECs1l3HVatIu4WgCIV6VUVJRiI_u1DnIYJwvMiD1wGxaWUh9szPvXwL_xc2jj3Viyl9JQYbhXclZEPvC1s_hm8xcv.mp4",
  poster:
    "https://res.cloudinary.com/drbc4wbvw/video/upload/so_0,f_jpg,q_auto/v1779764370/SaveClip.App_AQOo1SIvO4VxbibY8HK3dECs1l3HVatIu4WgCIV6VUVJRiI_u1DnIYJwvMiD1wGxaWUh9szPvXwL_xc2jj3Viyl9JQYbhXclZEPvC1s_hm8xcv.jpg",
  images: [
    "https://res.cloudinary.com/drbc4wbvw/image/upload/v1779764369/SaveClip.App_684620899_18100067354319616_9215194501862653536_n_qeiytg.jpg",
    "https://res.cloudinary.com/drbc4wbvw/image/upload/v1779764370/SaveClip.App_687870839_18100067363319616_7705718227054544239_n_nrn45p.jpg",
  ],
};

// Aumento de labios: 1 video 9:16 + 4 imágenes. Mezcla de antes/después
// compuestos y tomas de cliente mostrando los labios.
export const LIPS_MEDIA = {
  video:
    "https://res.cloudinary.com/drbc4wbvw/video/upload/v1779809317/SaveClip.App_AQN6qLg59IeI4yLRlX8aNf5v1N4G0wyIKLl_i8nruROcUXIXCtYjZ-v3yj9Jxjr4U8NsJcbTtNJz0lZgmDdYJDDdmLPFlOm4IPwlxsI_ntmtqs.mp4",
  poster:
    "https://res.cloudinary.com/drbc4wbvw/video/upload/so_0,f_jpg,q_auto/v1779809317/SaveClip.App_AQN6qLg59IeI4yLRlX8aNf5v1N4G0wyIKLl_i8nruROcUXIXCtYjZ-v3yj9Jxjr4U8NsJcbTtNJz0lZgmDdYJDDdmLPFlOm4IPwlxsI_ntmtqs.jpg",
  images: [
    "https://res.cloudinary.com/drbc4wbvw/image/upload/v1779809317/SaveClip.App_684145299_18315256438257331_3719632616539177969_n_yllyuc.jpg",
    "https://res.cloudinary.com/drbc4wbvw/image/upload/v1779809317/SaveClip.App_705229114_18103691726102230_2785700437246520319_n_fkiscg.jpg",
    "https://res.cloudinary.com/drbc4wbvw/image/upload/v1779809316/SaveClip.App_704636931_18103691699102230_5601088055226191573_n_ktxukd.jpg",
    "https://res.cloudinary.com/drbc4wbvw/image/upload/v1779809316/SaveClip.App_704731828_18103691708102230_1520745183553020035_n_w6k0fy.jpg",
  ],
};

// Botox: 2 videos 9:16. El primero es Erlym explicando el procedimiento.
// El segundo es nuevo (cliente). Layout side-by-side igual que Morpheus.
export const BOTOX_MEDIA = {
  videos: [
    {
      src: "https://res.cloudinary.com/dehvpdo4z/video/upload/v1779355862/0828_scvesj.mp4",
      poster:
        "https://res.cloudinary.com/dehvpdo4z/video/upload/so_0,f_jpg,q_auto/v1779355862/0828_scvesj.jpg",
      erlym: true,
    },
    {
      src: "https://res.cloudinary.com/drbc4wbvw/video/upload/v1779809193/SaveClip.App_AQOwIeiO2v8kP9oeQ_-zI-avlRCjw19K3GvtFcSWS3qhCKZ9OJ-LNC7ZSl-9YC4P0fHvnL-idF27ewdaUilLw4luVW1Lo1wosrpnPlo_fnnipt.mp4",
      poster:
        "https://res.cloudinary.com/drbc4wbvw/video/upload/so_0,f_jpg,q_auto/v1779809193/SaveClip.App_AQOwIeiO2v8kP9oeQ_-zI-avlRCjw19K3GvtFcSWS3qhCKZ9OJ-LNC7ZSl-9YC4P0fHvnL-idF27ewdaUilLw4luVW1Lo1wosrpnPlo_fnnipt.jpg",
      erlym: false,
    },
  ],
};

// Depilación láser: 1 video 9:16 + 1 imagen.
export const DEPILATION_MEDIA = {
  video:
    "https://res.cloudinary.com/drbc4wbvw/video/upload/v1779809134/SaveClip.App_AQMyPjs_J0I_81l3EYCufZ701MKeguzHvrM6jB4zFRSg7NXn26VD_Q0OOYT3kA7-dMyUiH-3WIQjwK2tTlKSJy3okiNwUa0Wvb0vVOA_yhmftx.mp4",
  poster:
    "https://res.cloudinary.com/drbc4wbvw/video/upload/so_0,f_jpg,q_auto/v1779809134/SaveClip.App_AQMyPjs_J0I_81l3EYCufZ701MKeguzHvrM6jB4zFRSg7NXn26VD_Q0OOYT3kA7-dMyUiH-3WIQjwK2tTlKSJy3okiNwUa0Wvb0vVOA_yhmftx.jpg",
  image:
    "https://res.cloudinary.com/drbc4wbvw/image/upload/v1779809134/SaveClip.App_688964391_18354503521242182_56855528722126690_n_cj180f.jpg",
};

// Dermapen: 1 video 9:16 + 1 imagen antes/después compuesta.
export const DERMAPEN_MEDIA = {
  video:
    "https://res.cloudinary.com/drbc4wbvw/video/upload/v1779808755/SaveClip.App_AQN4HOlpB50e06cOQEYG-3a0G95jiez-Hm_uiT6cLdU-ZiRX315Jzzl9Ny_EhlyLG04bLJxo-jAGeCapRVmlNHXgsop6hj8nFvo5ZhU_ov1fyi.mp4",
  poster:
    "https://res.cloudinary.com/drbc4wbvw/video/upload/so_0,f_jpg,q_auto/v1779808755/SaveClip.App_AQN4HOlpB50e06cOQEYG-3a0G95jiez-Hm_uiT6cLdU-ZiRX315Jzzl9Ny_EhlyLG04bLJxo-jAGeCapRVmlNHXgsop6hj8nFvo5ZhU_ov1fyi.jpg",
  image:
    "https://res.cloudinary.com/drbc4wbvw/image/upload/v1779808757/SaveClip.App_495051886_17922346569073154_516711458015911548_n_dvxksj.jpg",
};

// DPL cicatrices de acné: 1 video 9:16 (nuevo) + 1 imagen 1:1.
// El video del reel viejo `DPL_vmcxrn` ya NO se muestra aquí (sigue en
// el showcase del home).
export const DPL_MEDIA = {
  video:
    "https://res.cloudinary.com/drbc4wbvw/video/upload/v1779807091/SaveClip.App_AQOBdwOwdeQ62wEpAGkl09FpnNI6--r8wLGrPq1JEVk40ATs-qpIXdyV8OAYls0vNGzkfiLaqrfw3f2uHUNDDQTR0WutYRStWfl7jlg_ztbpcg.mp4",
  poster:
    "https://res.cloudinary.com/drbc4wbvw/video/upload/so_0,f_jpg,q_auto/v1779807091/SaveClip.App_AQOBdwOwdeQ62wEpAGkl09FpnNI6--r8wLGrPq1JEVk40ATs-qpIXdyV8OAYls0vNGzkfiLaqrfw3f2uHUNDDQTR0WutYRStWfl7jlg_ztbpcg.jpg",
  image:
    "https://res.cloudinary.com/drbc4wbvw/image/upload/v1779808243/SaveClip.App_705326927_18268748017294421_4604449087039333561_n_f2yokz.jpg",
};

// Morpheus 8: 2 videos 9:16 + 1 imagen "antes y después" compuesta.
export const MORPHEUS_MEDIA = {
  videos: [
    {
      src: "https://res.cloudinary.com/drbc4wbvw/video/upload/v1779762776/SaveClip.App_AQOSVUpeNTRjR-9F_CWqgwabyUAkAwr5JrVDTrCUmC4f65IxLd_09hlii2HRCSd5eQfrdPZ4O5b6bIKmJ4xbChs5wEGRtw3wkUFYsnI_dkop2x.mp4",
      poster:
        "https://res.cloudinary.com/drbc4wbvw/video/upload/so_0,f_jpg,q_auto/v1779762776/SaveClip.App_AQOSVUpeNTRjR-9F_CWqgwabyUAkAwr5JrVDTrCUmC4f65IxLd_09hlii2HRCSd5eQfrdPZ4O5b6bIKmJ4xbChs5wEGRtw3wkUFYsnI_dkop2x.jpg",
    },
    {
      src: "https://res.cloudinary.com/drbc4wbvw/video/upload/v1779762780/SaveClip.App_AQNNj_ll5X9PQFQX7VYrcIrpVTI7LyTf8jEeoXrcfdQvl1DoTipo0gAegGiPKEmPRZtClNXHI3P4Ooy2_vK0-AsjZWm4E8KMKO8yJPY_wct2ef.mp4",
      poster:
        "https://res.cloudinary.com/drbc4wbvw/video/upload/so_0,f_jpg,q_auto/v1779762780/SaveClip.App_AQNNj_ll5X9PQFQX7VYrcIrpVTI7LyTf8jEeoXrcfdQvl1DoTipo0gAegGiPKEmPRZtClNXHI3P4Ooy2_vK0-AsjZWm4E8KMKO8yJPY_wct2ef.jpg",
    },
  ],
  beforeAfter:
    "https://res.cloudinary.com/drbc4wbvw/image/upload/v1779762782/SaveClip.App_583712300_18493124635077862_3224149055901972673_n_lgjs4l.jpg",
};

// Pestañas pelo a pelo: 1 video 9:16 + 3 imágenes "antes y después juntas".
// Las imágenes ya traen el antes/después compuesto, no se necesita slider.
export const LASHES_MEDIA = {
  video:
    "https://res.cloudinary.com/drbc4wbvw/video/upload/v1779762725/SaveClip.App_AQOV24WJYMECJls_6Srk6MfJiEnwZTbqr9-uMYXJ29B6h__pkxoJXqYjwDoP9WRZYMK-zsvw8Xd5WxOZxvmiSw0gS7MagbkWT8AAoO8_yu0lyy.mp4",
  poster:
    "https://res.cloudinary.com/drbc4wbvw/video/upload/so_0,f_jpg,q_auto/v1779762725/SaveClip.App_AQOV24WJYMECJls_6Srk6MfJiEnwZTbqr9-uMYXJ29B6h__pkxoJXqYjwDoP9WRZYMK-zsvw8Xd5WxOZxvmiSw0gS7MagbkWT8AAoO8_yu0lyy.jpg",
  beforeAfter: [
    "https://res.cloudinary.com/drbc4wbvw/image/upload/v1779762617/SaveClip.App_608264652_18276728188303114_4023936625881933481_n_s1udgr.jpg",
    "https://res.cloudinary.com/drbc4wbvw/image/upload/v1779762616/SaveClip.App_607430952_18276728206303114_4974195390126426643_n_fky2hu.jpg",
    "https://res.cloudinary.com/drbc4wbvw/image/upload/v1779762615/SaveClip.App_607259020_18276728197303114_4521815148200121655_n_tcvzk4.jpg",
  ],
};

// Thermage: tiene su propio set porque su video es landscape 16:9 (no 9:16
// como el resto). 1 video + 2 imágenes cuadradas. Único set, no se espera más.
export const THERMAGE_MEDIA = {
  video: "https://res.cloudinary.com/drbc4wbvw/video/upload/v1779762194/SaveClip.App_AQPKuQ1f0-I2TDxEM4iLWXLmezWEbOTEfvRbhdeVm9lTEwLEoYxAhl-J7tI2LbBr2lARWNq0iXi8I6kibXg49ygf2XkunocU6g2bKSg_vnrvsv.mp4",
  poster:
    "https://res.cloudinary.com/drbc4wbvw/video/upload/so_0,f_jpg,q_auto/v1779762194/SaveClip.App_AQPKuQ1f0-I2TDxEM4iLWXLmezWEbOTEfvRbhdeVm9lTEwLEoYxAhl-J7tI2LbBr2lARWNq0iXi8I6kibXg49ygf2XkunocU6g2bKSg_vnrvsv.jpg",
  squares: [
    "https://res.cloudinary.com/drbc4wbvw/image/upload/v1779762207/SaveClip.App_702223984_18535974715072216_9158287249791732785_n_nzqew0.jpg",
    "https://res.cloudinary.com/drbc4wbvw/image/upload/v1779762205/SaveClip.App_702946371_18535974706072216_3928399222044985701_n_xhmius.jpg",
  ],
};

// Compat: algunos componentes viejos siguen importando IV_VISUALS.
export const IV_VISUALS = [...IV_VISUALS_VERTICAL, ...IV_VISUALS_SQUARE];

/** Devuelve los videos para un servicio dado */
export function reelsByService(tag: ServiceTag): Reel[] {
  return REELS.filter((r) => r.service === tag);
}
