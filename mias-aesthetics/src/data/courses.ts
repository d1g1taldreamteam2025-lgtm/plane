import type { Lang } from "../i18n";

export type CourseId = "lashes-classic" | "lashes-volume" | "facials" | "bbglow" | "fullstack";

export interface CourseDetail {
  id: CourseId;
  slugs: Record<Lang, string>;
  title: Record<Lang, string>;
  tagline: Record<Lang, string>;
  shortDesc: Record<Lang, string>;
  duration: Record<Lang, string>;
  modality: Record<Lang, string>;
  level: Record<Lang, string>;
  priceFrom: Record<Lang, string>;
  priceNote: Record<Lang, string>;
  /** Próxima fecha — actualizar manualmente */
  nextDate: Record<Lang, string>;
  longDesc: Record<Lang, string[]>;
  whoFor: Record<Lang, string[]>;
  learn: Record<Lang, string[]>;
  includes: Record<Lang, string[]>;
  certificate: Record<Lang, string>;
  /** Embed Vimeo / YouTube — opcional */
  videoEmbed?: string;
  /** Imagen de portada — cuando tengas la real, reemplazá aquí */
  cover?: string;
  palette: { from: string; to: string; accent: string; text: string };
}

export const COURSES: CourseDetail[] = [
  {
    id: "lashes-classic",
    slugs: { es: "pestanas-pelo-a-pelo", en: "classic-lashes" },
    title: { es: "Curso de pestañas pelo a pelo", en: "Classic lash extensions course" },
    tagline: {
      es: "Aprende la técnica clásica que más vende en Estados Unidos.",
      en: "Learn the classic technique that sells most in the US.",
    },
    shortDesc: {
      es: "De cero a profesional en 2 días.",
      en: "From zero to pro in 2 days.",
    },
    duration: { es: "16 horas (2 días)", en: "16 hours (2 days)" },
    modality: { es: "Presencial en Anaheim, CA", en: "In-person in Anaheim, CA" },
    level: { es: "Principiante", en: "Beginner" },
    priceFrom: { es: "Desde $850", en: "From $850" },
    priceNote: {
      es: "Incluye kit profesional valuado en $250. Cupos limitados a 4 alumnas.",
      en: "Includes pro kit valued at $250. Limited to 4 students.",
    },
    nextDate: { es: "Próxima fecha por confirmar", en: "Next date TBA" },
    longDesc: {
      es: [
        "Aprende la técnica clásica pelo a pelo paso a paso con Erlym Monasterios, más de 20 años de experiencia. Vas a salir del curso con un set completo de pestañas hecho por ti misma sobre modelo real.",
        "Trabajamos con materiales premium hipoalergénicos, adhesivo médico y herramientas profesionales. No necesitas experiencia previa.",
        "El curso es 100% práctico: 80% de tiempo aplicando pestañas, 20% teoría. Al terminar tienes el conocimiento y la confianza para empezar a cobrar tu primer cliente.",
      ],
      en: [
        "Learn the classic hair-by-hair technique step by step with Erlym Monasterios, 20+ years of experience. You'll leave with a full set of lashes done on a real model.",
        "We use premium hypoallergenic materials, medical adhesive and pro tools. No prior experience needed.",
        "100% hands-on: 80% applying lashes, 20% theory. By the end you have the skills and confidence to charge your first client.",
      ],
    },
    whoFor: {
      es: [
        "Mujeres que quieren empezar un emprendimiento de belleza",
        "Esteticistas que quieren agregar pestañas a su menú",
        "Profesionales con experiencia que quieren actualizar técnica",
      ],
      en: [
        "Women starting a beauty business",
        "Estheticians adding lashes to their menu",
        "Pros refreshing their technique",
      ],
    },
    learn: {
      es: [
        "Anatomía de la pestaña natural y ciclos de crecimiento",
        "Selección de curvatura, largo y grosor según cada clienta",
        "Aislamiento profesional con pinzas",
        "Aplicación pelo a pelo con técnica de presión correcta",
        "Manejo del adhesivo y tiempos de secado",
        "Mantenimiento, retoques y resolución de problemas",
        "Higiene, bioseguridad y limpieza de herramientas",
        "Precios de mercado y consejos de marketing inicial",
      ],
      en: [
        "Natural lash anatomy and growth cycles",
        "Choosing curl, length and thickness per client",
        "Professional isolation with tweezers",
        "Hair-by-hair application with the right pressure",
        "Adhesive handling and curing times",
        "Maintenance, refills and troubleshooting",
        "Hygiene, biosafety and tool cleaning",
        "Market pricing and starter marketing tips",
      ],
    },
    includes: {
      es: [
        "Manual digital con todo el contenido",
        "Kit profesional de inicio (pinzas, adhesivo, pestañas, parches)",
        "1 modelo el segundo día para tu práctica final",
        "Almuerzo y coffee break ambos días",
        "Certificado oficial Mia's Aesthetics",
        "Grupo privado de WhatsApp para consultas post-curso",
      ],
      en: [
        "Digital manual with full content",
        "Professional starter kit (tweezers, adhesive, lashes, patches)",
        "1 model day 2 for your final practice",
        "Lunch and coffee break both days",
        "Official Mia's Aesthetics certificate",
        "Private WhatsApp group for post-course support",
      ],
    },
    certificate: {
      es: "Certificado oficial firmado por Erlym Monasterios con sello del estudio.",
      en: "Official certificate signed by Erlym Monasterios with studio stamp.",
    },
    palette: { from: "#3d1f48", to: "#1a0f1f", accent: "#d4a85a", text: "#fff" },
    cover: "/media/course-cover-lashes-classic.png",
  },
  {
    id: "lashes-volume",
    slugs: { es: "pestanas-volumen-ruso", en: "russian-volume-lashes" },
    title: { es: "Curso de volumen ruso", en: "Russian volume lashes course" },
    tagline: {
      es: "Domina el volumen ruso 2D-6D y multiplica tu ticket promedio.",
      en: "Master 2D-6D Russian volume and multiply your average ticket.",
    },
    shortDesc: {
      es: "Para quienes ya dominan pelo a pelo.",
      en: "For those who already master classic.",
    },
    duration: { es: "16 horas (2 días)", en: "16 hours (2 days)" },
    modality: { es: "Presencial en Anaheim, CA", en: "In-person in Anaheim, CA" },
    level: { es: "Intermedio / Avanzado", en: "Intermediate / Advanced" },
    priceFrom: { es: "Desde $1,100", en: "From $1,100" },
    priceNote: {
      es: "Requisito: tener experiencia previa en clásico pelo a pelo.",
      en: "Prerequisite: prior experience in classic.",
    },
    nextDate: { es: "Próxima fecha por confirmar", en: "Next date TBA" },
    longDesc: {
      es: [
        "El volumen ruso es la técnica de mayor crecimiento en la industria de belleza en EE. UU. Aprende a crear ramilletes 2D, 3D, hasta 6D, manipulando pestañas livianas para crear miradas dramáticas o naturales según preferencia.",
        "Aprende a fabricar ramilletes a mano con la técnica isolation + grip + dipping perfecta. Trabajamos con pestañas 0.05-0.07 mm.",
        "Te entregamos las técnicas para diseñar miradas tipo 'cat eye', 'doll eye', 'fox eye' y los híbridos que más se piden actualmente.",
      ],
      en: [
        "Russian volume is the fastest-growing technique in the US beauty industry. Learn to create 2D, 3D, up to 6D fans, manipulating ultra-light lashes for dramatic or natural looks.",
        "Learn to hand-make fans with the isolation + grip + dipping technique. We work with 0.05-0.07 mm lashes.",
        "We teach you to design 'cat eye', 'doll eye', 'fox eye' and the hybrid looks currently most requested.",
      ],
    },
    whoFor: {
      es: [
        "Lashistas con dominio del clásico que quieren subir de nivel",
        "Profesionales que quieren cobrar más por servicio",
      ],
      en: [
        "Lash artists with classic mastery ready to level up",
        "Pros looking to charge more per service",
      ],
    },
    learn: {
      es: [
        "Fabricación de ramilletes a mano 2D, 3D, 4D, 5D y 6D",
        "Selección y manejo de pestañas premium 0.03 - 0.07 mm",
        "Técnica de isolation perfecta con ambas manos",
        "Estilos: cat eye, doll eye, fox eye, sirena",
        "Híbridos que combinan clásico con volumen",
        "Mantenimiento sin daño a la pestaña natural",
        "Diagnóstico de pestaña dañada y cómo recuperarla",
        "Pricing premium en el mercado estadounidense",
      ],
      en: [
        "Hand-made fan creation 2D, 3D, 4D, 5D and 6D",
        "Premium 0.03 - 0.07 mm lash selection and handling",
        "Perfect ambidextrous isolation",
        "Styles: cat eye, doll eye, fox eye, mermaid",
        "Hybrids combining classic with volume",
        "Maintenance without damaging the natural lash",
        "Damaged lash diagnosis and recovery",
        "Premium pricing in the US market",
      ],
    },
    includes: {
      es: [
        "Manual digital con técnicas y mapas de mirada",
        "Kit avanzado (pestañas volumen, pinzas L y curva, adhesivo premium)",
        "2 modelos para práctica supervisada",
        "Almuerzo y coffee break ambos días",
        "Certificado oficial Mia's Aesthetics",
      ],
      en: [
        "Digital manual with techniques and eye-style maps",
        "Advanced kit (volume lashes, L and curved tweezers, premium adhesive)",
        "2 models for supervised practice",
        "Lunch and coffee break both days",
        "Official Mia's Aesthetics certificate",
      ],
    },
    certificate: {
      es: "Certificado de especialización en Volumen Ruso firmado por Erlym Monasterios.",
      en: "Russian Volume specialization certificate signed by Erlym Monasterios.",
    },
    palette: { from: "#ffe6f1", to: "#ec6f9c", accent: "#d04b7e", text: "#fff" },
    cover: "/media/course-cover-lashes-volume.png",
  },
  {
    id: "bbglow",
    slugs: { es: "bb-glow", en: "bb-glow" },
    title: { es: "Curso de BB Glow", en: "BB Glow course" },
    tagline: {
      es: "Piel uniforme, luminosa y con efecto base natural.",
      en: "Even, glowing, no-makeup-makeup skin.",
    },
    shortDesc: {
      es: "El tratamiento coreano que enamora a Hollywood.",
      en: "The Korean treatment Hollywood loves.",
    },
    duration: { es: "8 horas (1 día intensivo)", en: "8 hours (1-day intensive)" },
    modality: { es: "Presencial en Anaheim, CA", en: "In-person in Anaheim, CA" },
    level: { es: "Principiante / Intermedio", en: "Beginner / Intermediate" },
    priceFrom: { es: "Desde $650", en: "From $650" },
    priceNote: {
      es: "Incluye sérum BB Glow grado profesional y dermapen estéril.",
      en: "Includes pro-grade BB Glow serum and sterile dermapen.",
    },
    nextDate: { es: "Próxima fecha por confirmar", en: "Next date TBA" },
    longDesc: {
      es: [
        "El BB Glow es una técnica semipermanente de origen coreano que combina microneedling superficial con un sérum coloreado y rico en nutrientes para unificar el tono, disimular manchas y dar luminosidad.",
        "Es uno de los servicios más rentables: 60 minutos de aplicación, ticket de $200 a $350 por sesión, y las clientas vuelven cada 3 a 4 semanas.",
        "Aprenderás la técnica completa, contraindicaciones, manejo de tonos para distintos fototipos y combinación con otros tratamientos.",
      ],
      en: [
        "BB Glow is a semi-permanent Korean technique combining superficial microneedling with a tinted, nutrient-rich serum to even tone, mask spots and add radiance.",
        "One of the most profitable services: 60-minute application, $200 to $350 ticket, and clients come back every 3 to 4 weeks.",
        "You'll learn the full technique, contraindications, tone matching for different skin types, and combinations with other treatments.",
      ],
    },
    whoFor: {
      es: [
        "Esteticistas y cosmetólogas",
        "Lashistas que quieren agregar un servicio facial premium",
        "Emprendedoras que recién empiezan en estética",
      ],
      en: [
        "Estheticians and cosmetologists",
        "Lash artists adding a premium facial service",
        "Aspiring beauty entrepreneurs",
      ],
    },
    learn: {
      es: [
        "Anatomía de la piel y permeabilidad",
        "Selección del sérum según fototipo (5 tonos)",
        "Técnica de aplicación con dermapen estéril",
        "Tiempos, capas y profundidades correctas",
        "Combinación con luz LED post-tratamiento",
        "Protocolo de cuidado en casa para la clienta",
        "Cómo cobrar este servicio en California",
        "Marketing y muestras antes-después",
      ],
      en: [
        "Skin anatomy and permeability",
        "Serum selection per skin type (5 tones)",
        "Application with sterile dermapen",
        "Correct timing, layers and depth",
        "Combination with LED light post-treatment",
        "At-home aftercare protocol",
        "How to price this service in California",
        "Marketing and before-after samples",
      ],
    },
    includes: {
      es: [
        "Manual digital BB Glow",
        "Sérum BB Glow profesional (3 tonos)",
        "1 modelo para práctica",
        "Snack y refrigerios",
        "Certificado oficial Mia's Aesthetics",
      ],
      en: [
        "BB Glow digital manual",
        "Professional BB Glow serum (3 tones)",
        "1 model for practice",
        "Snacks and refreshments",
        "Official Mia's Aesthetics certificate",
      ],
    },
    certificate: {
      es: "Certificado oficial de BB Glow firmado por Erlym Monasterios.",
      en: "Official BB Glow certificate signed by Erlym Monasterios.",
    },
    palette: { from: "#fff3d4", to: "#d4a85a", accent: "#b88a36", text: "#4a3210" },
    cover: "/media/course-cover-bbglow.png",
  },
  {
    id: "facials",
    slugs: { es: "faciales-premium", en: "premium-facials" },
    title: { es: "Curso de faciales premium", en: "Premium facials course" },
    tagline: {
      es: "El facial completo que mueve la economía de un estudio.",
      en: "The complete facial that drives a studio's revenue.",
    },
    shortDesc: {
      es: "Limpieza, exfoliación, extracción, masaje y mascarilla.",
      en: "Cleanse, exfoliate, extract, massage and mask.",
    },
    duration: { es: "12 horas (1.5 días)", en: "12 hours (1.5 days)" },
    modality: { es: "Presencial en Anaheim, CA", en: "In-person in Anaheim, CA" },
    level: { es: "Principiante / Intermedio", en: "Beginner / Intermediate" },
    priceFrom: { es: "Desde $750", en: "From $750" },
    priceNote: {
      es: "Incluye kit de productos profesionales para empezar.",
      en: "Includes pro starter kit.",
    },
    nextDate: { es: "Próxima fecha por confirmar", en: "Next date TBA" },
    longDesc: {
      es: [
        "El facial premium de 60 a 75 minutos es uno de los servicios estrella en cualquier estudio profesional. Es alta rentabilidad, retorno frecuente de clientas y base perfecta para vender otros tratamientos avanzados.",
        "Aprenderás los 6 pasos profesionales del facial: doble limpieza, exfoliación enzimática, extracción manual, masaje facial, mascarilla y rutina post.",
        "Trabajamos con productos profesionales (Skinceuticals, Image, ZO Skin Health) y protocolos específicos para piel grasa, seca, mixta, sensible y con acné.",
      ],
      en: [
        "The 60-75 minute premium facial is a flagship service in any professional studio. High profitability, frequent return clients and a perfect base to upsell advanced treatments.",
        "You'll learn the 6 professional facial steps: double cleanse, enzymatic exfoliation, manual extraction, facial massage, mask and aftercare routine.",
        "We work with professional products (Skinceuticals, Image, ZO Skin Health) and specific protocols for oily, dry, combination, sensitive and acne-prone skin.",
      ],
    },
    whoFor: {
      es: [
        "Esteticistas que quieren un protocolo profesional probado",
        "Cosmetólogas que quieren mejorar su menú",
        "Profesionales sin experiencia que quieren entrar a la industria",
      ],
      en: [
        "Estheticians wanting a proven professional protocol",
        "Cosmetologists upgrading their menu",
        "Newcomers to the industry",
      ],
    },
    learn: {
      es: [
        "Análisis de piel y biotipos",
        "Doble limpieza profesional (oleosa + acuosa)",
        "Exfoliación enzimática vs. mecánica",
        "Extracción manual segura y sin marcas",
        "Masaje facial drenante y de modelado",
        "Aplicación correcta de mascarillas (peel-off, hidratante, calmante)",
        "Recomendaciones de skincare en casa",
        "Precios sugeridos en California",
      ],
      en: [
        "Skin analysis and biotypes",
        "Professional double cleanse (oil + water)",
        "Enzymatic vs. mechanical exfoliation",
        "Safe extraction without marks",
        "Lymphatic and modeling facial massage",
        "Correct application of masks (peel-off, hydrating, calming)",
        "At-home skincare recommendations",
        "Suggested pricing in California",
      ],
    },
    includes: {
      es: [
        "Manual digital del facial premium",
        "Kit de productos profesionales (limpiador, exfoliante, mascarilla, sérum)",
        "2 modelos para práctica",
        "Almuerzo ambos días",
        "Certificado oficial Mia's Aesthetics",
      ],
      en: [
        "Premium facial digital manual",
        "Pro product kit (cleanser, exfoliant, mask, serum)",
        "2 models for practice",
        "Lunch both days",
        "Official Mia's Aesthetics certificate",
      ],
    },
    certificate: {
      es: "Certificado de Faciales Premium firmado por Erlym Monasterios.",
      en: "Premium Facials certificate signed by Erlym Monasterios.",
    },
    palette: { from: "#ffe6f1", to: "#ffa3c6", accent: "#d04b7e", text: "#fff" },
    cover: "/media/course-cover-facials.png",
  },
  {
    id: "fullstack",
    slugs: { es: "completo-mia-academy", en: "full-stack-mia-academy" },
    title: { es: "Programa Mia Academy completo", en: "Full Mia Academy program" },
    tagline: {
      es: "El programa que convierte a una principiante en una emprendedora rentable.",
      en: "The program that turns a beginner into a profitable entrepreneur.",
    },
    shortDesc: {
      es: "Pestañas + Faciales + BB Glow + Marketing.",
      en: "Lashes + Facials + BB Glow + Marketing.",
    },
    duration: { es: "5 días intensivos", en: "5 intensive days" },
    modality: { es: "Presencial en Anaheim, CA", en: "In-person in Anaheim, CA" },
    level: { es: "Todos los niveles", en: "All levels" },
    priceFrom: { es: "Desde $2,400", en: "From $2,400" },
    priceNote: {
      es: "Plan de pagos en 3 cuotas. Ahorro de $750 vs. cursos por separado.",
      en: "3-installment payment plan. Save $750 vs. courses separately.",
    },
    nextDate: { es: "Próxima fecha por confirmar", en: "Next date TBA" },
    longDesc: {
      es: [
        "El programa completo Mia Academy incluye los 3 cursos estrella más un módulo extra de marketing digital. En 5 días intensivos vas a salir lista para abrir tu propio estudio o sumar todos estos servicios a tu menú actual.",
        "Incluye un video tutorial extenso (2+ horas) que podrás revisar después del curso para reforzar cada técnica desde casa.",
        "Es el programa que más recomendamos a personas que recién empiezan en la industria estética en Estados Unidos.",
      ],
      en: [
        "The full Mia Academy program includes the 3 flagship courses plus an extra digital marketing module. In 5 intensive days you'll leave ready to open your own studio or add all these services to your current menu.",
        "Includes a 2+ hour video tutorial you can review after class to reinforce every technique from home.",
        "This is the program we recommend most to people starting out in the US beauty industry.",
      ],
    },
    whoFor: {
      es: [
        "Mujeres que quieren cambiar de carrera y entrar a la belleza",
        "Estilistas que quieren agregar servicios estéticos",
        "Profesionales que quieren un estudio propio",
      ],
      en: [
        "Women switching careers into beauty",
        "Stylists adding aesthetic services",
        "Pros launching their own studio",
      ],
    },
    learn: {
      es: [
        "Todas las técnicas de los cursos individuales",
        "Marketing digital para captar clientas (Instagram, TikTok, Google Maps)",
        "Cómo armar un menú de servicios rentable",
        "Manejo de agenda y reservas",
        "Atención al cliente y fidelización",
        "Bioseguridad y normativa de California",
        "Modelo de negocio: solo o con socias",
        "Tutorial en video para repasar desde casa",
      ],
      en: [
        "Every technique from individual courses",
        "Digital marketing to attract clients (Instagram, TikTok, Google Maps)",
        "How to build a profitable service menu",
        "Booking and schedule management",
        "Client service and retention",
        "Biosafety and California regulations",
        "Business model: solo or with partners",
        "Video tutorial to review at home",
      ],
    },
    includes: {
      es: [
        "Todos los kits de los cursos individuales",
        "Tutorial en video (2+ horas) — para revisar desde casa",
        "Manual digital completo",
        "5 modelos (uno por día) para práctica supervisada",
        "Almuerzo todos los días",
        "Certificado completo Mia Academy",
        "Mentoría por WhatsApp durante 30 días post-curso",
      ],
      en: [
        "All starter kits from individual courses",
        "Video tutorial (2+ hours) — review at home",
        "Full digital manual",
        "5 models (one per day) for supervised practice",
        "Lunch every day",
        "Full Mia Academy certificate",
        "30-day WhatsApp mentorship post-course",
      ],
    },
    certificate: {
      es: "Certificado Mia Academy + certificados individuales por cada técnica.",
      en: "Mia Academy certificate + individual certificates per technique.",
    },
    // videoEmbed: cuando subas el video de 2h a Vimeo, pegá acá el ID
    // ejemplo: videoEmbed: "https://player.vimeo.com/video/123456789",
    palette: { from: "#fff3d4", to: "#d4a85a", accent: "#b88a36", text: "#4a3210" },
    cover: "/media/course-cover-fullstack.png",
  },
];

export function findCourseBySlug(slug: string, lang: Lang): CourseDetail | undefined {
  return COURSES.find((c) => c.slugs[lang] === slug);
}
