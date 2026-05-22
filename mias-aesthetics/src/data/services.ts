import type { Lang } from "../i18n";

export type ServiceId =
  | "iv" | "botox" | "morpheus" | "thermage" | "lips" | "lashes"
  | "facial" | "depilation" | "dpl" | "salmon" | "dermapen";

export interface ServiceDetail {
  id: ServiceId;
  slugs: Record<Lang, string>;
  title: Record<Lang, string>;
  tagline: Record<Lang, string>;
  shortDesc: Record<Lang, string>;
  duration: Record<Lang, string>;
  priceFrom: Record<Lang, string>;
  priceNote: Record<Lang, string>;
  longDesc: Record<Lang, string[]>;
  includes: Record<Lang, string[]>;
  preCare: Record<Lang, string[]>;
  postCare: Record<Lang, string[]>;
  faqs: Record<Lang, { q: string; a: string }[]>;
  palette: { from: string; to: string; accent: string; text: string };
  /** PNG icono custom de la marca (opcional). Si está, reemplaza el SVG genérico. */
  iconUrl?: string;
}

export const SERVICES: ServiceDetail[] = [
  {
    id: "iv",
    slugs: { es: "sueroterapia", en: "iv-therapy" },
    title: { es: "IV Therapy / Sueroterapia", en: "IV Therapy" },
    tagline: {
      es: "Vitaminas, hidratación y energía directo al torrente sanguíneo.",
      en: "Vitamins, hydration and energy delivered straight to your bloodstream.",
    },
    shortDesc: {
      es: "Belleza y bienestar desde adentro.",
      en: "Beauty and wellness from within.",
    },
    duration: { es: "45 – 60 min", en: "45 – 60 min" },
    priceFrom: { es: "Desde $129", en: "From $129" },
    priceNote: {
      es: "Precio según el cóctel elegido. Consulta opciones por WhatsApp.",
      en: "Price varies by cocktail. Ask via WhatsApp for options.",
    },
    longDesc: {
      es: [
        "La sueroterapia IV combina vitaminas, minerales y antioxidantes que ingresan al torrente sanguíneo de forma directa, logrando una absorción del 100% (muy superior a la vía oral).",
        "Es ideal para combatir fatiga, jet lag, resaca, estrés, falta de energía, antes de eventos importantes o como complemento de un tratamiento estético.",
        "En Mia's Aesthetics trabajamos con cócteles específicos según tu objetivo: glow, energía, defensas, recuperación post-entreno y bienestar general.",
      ],
      en: [
        "IV Therapy combines vitamins, minerals and antioxidants delivered directly into the bloodstream for 100% absorption (far better than oral intake).",
        "Ideal to fight fatigue, jet lag, hangovers, stress and low energy — or before important events and as a complement to any aesthetic treatment.",
        "At Mia's Aesthetics we offer specific cocktails based on your goal: glow, energy, immune boost, post-workout recovery and general wellness.",
      ],
    },
    includes: {
      es: [
        "Consulta inicial breve para definir el cóctel ideal",
        "Aplicación IV en un espacio cómodo y privado",
        "Mezcla profesional de vitaminas, minerales y antioxidantes",
        "Hidratación isotónica de grado médico",
      ],
      en: [
        "Quick intake to pick the right cocktail",
        "IV application in a comfortable, private setting",
        "Professional blend of vitamins, minerals and antioxidants",
        "Medical-grade isotonic hydration",
      ],
    },
    preCare: {
      es: [
        "Llega hidratada y habiendo comido algo ligero (no es necesario ayuno)",
        "Avísanos si tomas medicación habitual o tienes alergias",
        "Usa ropa cómoda con manga ancha",
      ],
      en: [
        "Arrive hydrated and after a light meal (no fasting needed)",
        "Let us know about any medication or allergies",
        "Wear comfortable clothes with loose sleeves",
      ],
    },
    postCare: {
      es: [
        "Mantén hidratación durante el resto del día",
        "Evita alcohol las primeras 24 horas",
        "Puedes volver a tus actividades normales de inmediato",
      ],
      en: [
        "Keep hydrated for the rest of the day",
        "Avoid alcohol for the first 24 hours",
        "Resume normal activities immediately",
      ],
    },
    faqs: {
      es: [
        { q: "¿Cuánto dura el efecto?", a: "Entre 5 y 10 días según el estilo de vida y el cóctel elegido. Las personas suelen sentir el cambio de energía durante el resto de la semana." },
        { q: "¿Es seguro?", a: "Sí. Trabajamos con personal entrenado y soluciones de grado médico. Antes de cada aplicación hacemos un breve cuestionario de salud." },
        { q: "¿Duele la pinchada?", a: "Solo el pinchazo inicial. Usamos catéteres pediátricos para reducir la molestia. Una vez puesto el catéter, la sesión es relajante." },
        { q: "¿Cada cuánto puedo hacerme una IV?", a: "Para mantenimiento general, una vez al mes. Para protocolos específicos (anti-edad, glow, deportivo) hasta una vez por semana durante 4 a 8 semanas." },
        { q: "¿Qué cócteles ofrecen?", a: "Glutatión (glow + detox), Vitamina C alta dosis (defensas), Complejo B (energía), Myers Cocktail (multivitamínico clásico), NAD+ (anti-aging), Hidratación + minerales (post-fiesta o jet lag)." },
        { q: "¿Puedo combinarlo con otros tratamientos estéticos?", a: "Sí. La IV con glutatión potencia los resultados de Morpheus 8, Thermage y láser, y acelera la recuperación post-procedimiento." },
        { q: "¿Sirve si estoy resfriada o me siento bajoneada?", a: "Sí. El cóctel de Vitamina C + complejo B + zinc + glutatión es el más pedido para fortalecer defensas y recuperar energía rápido." },
        { q: "¿Lo puede hacer cualquier persona?", a: "Adultos sanos sin contraindicaciones específicas. Personas con condiciones renales, cardíacas o embarazo deben consultar con su médico primero." },
      ],
      en: [
        { q: "How long does it last?", a: "Between 5 and 10 days depending on lifestyle and chosen cocktail. Most people feel the energy boost for the rest of the week." },
        { q: "Is it safe?", a: "Yes. Performed by trained staff with medical-grade solutions. We run a quick health screening before every session." },
        { q: "Does the IV hurt?", a: "Only the initial poke. We use pediatric catheters to minimize discomfort. Once placed, the session is relaxing." },
        { q: "How often can I get an IV?", a: "Monthly for general maintenance. For specific protocols (anti-aging, glow, athletic) up to once a week for 4 to 8 weeks." },
        { q: "Which cocktails do you offer?", a: "Glutathione (glow + detox), high-dose Vitamin C (immunity), B-complex (energy), Myers Cocktail (classic multi-vitamin), NAD+ (anti-aging), Hydration + minerals (hangover or jet lag)." },
        { q: "Can I combine it with other aesthetic treatments?", a: "Yes. Glutathione IV boosts results of Morpheus 8, Thermage and laser, and speeds up post-procedure recovery." },
        { q: "Does it help if I'm sick or run down?", a: "Yes. The Vitamin C + B-complex + zinc + glutathione cocktail is the most requested for immunity and rapid energy recovery." },
        { q: "Can anyone get an IV?", a: "Healthy adults with no specific contraindications. People with kidney, heart conditions or pregnancy should consult their doctor first." },
      ],
    },
    palette: { from: "#ffe6f1", to: "#d4a85a", accent: "#b88a36", text: "#4a3210" },
    iconUrl: "https://res.cloudinary.com/drbc4wbvw/image/upload/v1779412111/Mesa_de_trabajo_1_gwfbln.png",
  },
  {
    id: "botox",
    slugs: { es: "botox", en: "botox" },
    title: { es: "Botox", en: "Botox" },
    tagline: {
      es: "Suaviza tus arrugas dinámicas sin perder expresión.",
      en: "Smooth dynamic wrinkles without losing expression.",
    },
    shortDesc: {
      es: "Rejuvenecimiento natural en minutos.",
      en: "Natural rejuvenation in minutes.",
    },
    duration: { es: "30 – 45 min", en: "30 – 45 min" },
    priceFrom: { es: "Desde $14 / unidad", en: "From $14 / unit" },
    priceNote: {
      es: "El total depende de las zonas y unidades necesarias. Promedio: $250 – $650.",
      en: "Total depends on areas and units needed. Average: $250 – $650.",
    },
    longDesc: {
      es: [
        "El Botox es una neurotoxina purificada que relaja temporalmente los músculos responsables de las arrugas dinámicas: entrecejo, frente y patas de gallo.",
        "Los resultados comienzan a notarse entre los 3 y 7 días, y se estabilizan a los 14 días. La duración promedio es de 3 a 4 meses.",
        "Es un procedimiento mínimamente invasivo, sin downtime real. Vas a salir del estudio y volver a tu rutina al instante.",
      ],
      en: [
        "Botox is a purified neurotoxin that temporarily relaxes the muscles responsible for dynamic wrinkles: frown lines, forehead and crow's feet.",
        "Results start to show between days 3 and 7 and stabilize around day 14. Average duration is 3 to 4 months.",
        "It's a minimally invasive procedure with no real downtime. Walk out and resume your day immediately.",
      ],
    },
    includes: {
      es: [
        "Evaluación facial personalizada",
        "Marcado preciso de los puntos a tratar",
        "Aplicación con técnica de microinyecciones",
        "Recomendaciones de cuidado post-tratamiento",
      ],
      en: [
        "Personalized facial assessment",
        "Precise marking of injection points",
        "Application via microinjection technique",
        "Aftercare recommendations",
      ],
    },
    preCare: {
      es: [
        "Evita alcohol 24 horas antes",
        "Suspende aspirina, ibuprofeno y vitamina E una semana antes (reducen hematomas)",
        "Llega sin maquillaje en la zona a tratar",
      ],
      en: [
        "No alcohol 24 hours before",
        "Stop aspirin, ibuprofen and vitamin E one week before (reduces bruising)",
        "Arrive with no makeup on the treatment area",
      ],
    },
    postCare: {
      es: [
        "No te acuestes ni te inclines hacia adelante por 4 horas",
        "Evita ejercicio intenso por 24 horas",
        "No te masajees ni te toques la zona por 24 horas",
        "Evita saunas, piscinas y exposición solar directa por 48 horas",
      ],
      en: [
        "Don't lie down or bend forward for 4 hours",
        "Avoid intense exercise for 24 hours",
        "Don't massage or touch the area for 24 hours",
        "Avoid saunas, pools and direct sun for 48 hours",
      ],
    },
    faqs: {
      es: [
        { q: "¿Cuándo se ven los resultados?", a: "Los primeros cambios entre los 3 y 7 días. El efecto final se aprecia a las 2 semanas." },
        { q: "¿Va a paralizar mi cara?", a: "No. Aplicamos dosis personalizadas para mantener tu expresión natural. La idea es suavizar, no congelar." },
        { q: "¿Cuánto dura?", a: "Entre 3 y 4 meses la primera vez. Con aplicaciones regulares la duración aumenta porque el músculo se entrena." },
        { q: "¿Cuántas unidades necesito?", a: "Depende de la zona. Entrecejo: 18-25 unidades. Frente: 8-15. Patas de gallo: 8-12 por lado. En la consulta te decimos exacto." },
        { q: "¿Duele?", a: "Muy poco. Usamos agujas ultrafinas y, si quieres, anestesia tópica. La mayoría lo describe como un pellizco." },
        { q: "¿A partir de qué edad se puede hacer?", a: "El Botox preventivo se recomienda a partir de los 25-28 años. El correctivo a partir de los 35-40 años, según el caso." },
        { q: "¿Puedo hacerme Botox si estoy embarazada o lactando?", a: "No. Hay que esperar hasta finalizar la lactancia para aplicar Botox." },
        { q: "¿Qué marca usan?", a: "Trabajamos con marcas FDA-approved como Botox Allergan, Dysport y Xeomin. Te explicamos en consulta la diferencia entre cada una." },
      ],
      en: [
        { q: "When do I see results?", a: "First changes between days 3 and 7. Full effect at 2 weeks." },
        { q: "Will my face look frozen?", a: "No. We use personalized doses so your expressions stay natural. The goal is to soften, not freeze." },
        { q: "How long does it last?", a: "3 to 4 months the first time. With regular sessions duration extends because the muscle is trained." },
        { q: "How many units do I need?", a: "Depends on the area. Frown lines: 18-25 units. Forehead: 8-15. Crow's feet: 8-12 per side. We confirm in the consultation." },
        { q: "Does it hurt?", a: "Very little. We use ultra-fine needles and topical anesthesia if you want. Most clients describe it as a pinch." },
        { q: "From what age can I get Botox?", a: "Preventive Botox is recommended from age 25-28. Corrective from 35-40, depending on the case." },
        { q: "Can I get Botox if pregnant or breastfeeding?", a: "No. You should wait until you finish breastfeeding to get Botox." },
        { q: "Which brand do you use?", a: "We work with FDA-approved brands like Botox Allergan, Dysport and Xeomin. We explain the difference in consultation." },
      ],
    },
    palette: { from: "#ffe6f1", to: "#ec6f9c", accent: "#d04b7e", text: "#fff" },
    iconUrl: "https://res.cloudinary.com/drbc4wbvw/image/upload/v1779412112/Mesa_de_trabajo_1_copia_w6pjj9.png",
  },
  {
    id: "morpheus",
    slugs: { es: "morpheus-8", en: "morpheus-8" },
    title: { es: "Morpheus 8", en: "Morpheus 8" },
    tagline: {
      es: "Microagujas + radiofrecuencia para remodelar tu piel.",
      en: "Microneedling + radiofrequency to remodel your skin.",
    },
    shortDesc: {
      es: "Colágeno, firmeza y textura uniforme.",
      en: "Collagen, firmness and even texture.",
    },
    duration: { es: "60 – 90 min", en: "60 – 90 min" },
    priceFrom: { es: "Desde $800 / sesión", en: "From $800 / session" },
    priceNote: {
      es: "Se recomiendan 3 sesiones separadas por 30 días. Pack 3 sesiones desde $2,100.",
      en: "Course of 3 sessions, 30 days apart. 3-session pack from $2,100.",
    },
    longDesc: {
      es: [
        "Morpheus 8 combina microagujas con radiofrecuencia fraccionada, llegando hasta 4 mm de profundidad para estimular colágeno y elastina en las capas más profundas de la piel.",
        "Ideal para arrugas finas, flacidez leve a moderada, cicatrices de acné, poros dilatados, manchas y mejora general de textura.",
        "Es seguro para todos los fototipos de piel y se puede aplicar en cara, cuello y escote. La recuperación es de 24 a 48 horas.",
      ],
      en: [
        "Morpheus 8 combines microneedling with fractional radiofrequency, reaching up to 4 mm deep to stimulate collagen and elastin in the deepest skin layers.",
        "Ideal for fine wrinkles, mild to moderate sagging, acne scars, enlarged pores, dark spots and overall texture improvement.",
        "Safe for all skin phototypes — face, neck and décolleté. Downtime: 24 – 48 hours.",
      ],
    },
    includes: {
      es: [
        "Análisis facial profundo previo",
        "Limpieza profunda y anestesia tópica",
        "Aplicación con dispositivo Morpheus 8 original",
        "Sérum reparador post-tratamiento",
      ],
      en: [
        "In-depth facial analysis",
        "Deep cleanse and topical anesthesia",
        "Treatment with original Morpheus 8 device",
        "Repair serum after the session",
      ],
    },
    preCare: {
      es: [
        "Evita exposición solar 2 semanas antes",
        "No uses retinol, ácidos exfoliantes ni vitamina C 5 días antes",
        "Llega sin maquillaje ni cremas",
      ],
      en: [
        "Avoid sun exposure 2 weeks before",
        "Stop retinol, acid exfoliants and vitamin C 5 days before",
        "Arrive with no makeup or creams",
      ],
    },
    postCare: {
      es: [
        "SPF 50 todos los días durante un mes",
        "No piscinas, saunas ni ejercicio intenso por 48 horas",
        "Evita maquillaje las primeras 24 horas",
        "Usa la rutina post indicada (hidratante calmante + reparador)",
      ],
      en: [
        "Daily SPF 50 for one month",
        "No pools, saunas or intense exercise for 48 hours",
        "No makeup for the first 24 hours",
        "Follow the post-care routine (soothing moisturizer + repair)",
      ],
    },
    faqs: {
      es: [
        { q: "¿Cuándo se ven los resultados?", a: "A partir de la semana 4. El resultado final se ve a los 3 meses tras completar las sesiones." },
        { q: "¿Duele?", a: "Aplicamos anestesia tópica para que sea cómodo. Sientes calor más que dolor." },
        { q: "¿Cuántas sesiones necesito?", a: "Generalmente 3 sesiones separadas por 30 días. Casos avanzados pueden necesitar 4 a 5." },
        { q: "¿Sirve para cicatrices de acné?", a: "Sí. Morpheus 8 es uno de los tratamientos más efectivos para cicatrices atróficas (esos pocitos del acné) por la profundidad que alcanza." },
        { q: "¿Cuánto downtime tengo?", a: "24 a 48 horas con rojez similar a una quemadura solar leve. Algunas personas vuelven al trabajo al día siguiente con makeup mineral." },
        { q: "¿Lo puedo combinar con Botox?", a: "Sí, pero recomendamos aplicar el Botox 2 semanas antes o después de Morpheus 8, no el mismo día." },
        { q: "¿Sirve para flacidez del cuello?", a: "Sí, es uno de los pocos tratamientos no invasivos que de verdad mejora la zona del cuello y mandíbula (jawline)." },
        { q: "¿Es seguro en piel oscura?", a: "Sí. A diferencia de algunos láseres, Morpheus 8 es seguro en todos los fototipos de piel (I a VI)." },
      ],
      en: [
        { q: "When do I see results?", a: "From week 4. Final results around 3 months after the full course." },
        { q: "Does it hurt?", a: "We use topical anesthesia for comfort. You feel warmth more than pain." },
        { q: "How many sessions do I need?", a: "Usually 3 sessions, 30 days apart. Advanced cases may need 4 to 5." },
        { q: "Does it work on acne scars?", a: "Yes. Morpheus 8 is one of the most effective treatments for atrophic acne scars due to its depth." },
        { q: "How much downtime?", a: "24 to 48 hours with redness similar to mild sunburn. Some people return to work the next day with mineral makeup." },
        { q: "Can I combine it with Botox?", a: "Yes, but we recommend doing Botox 2 weeks before or after Morpheus 8, not the same day." },
        { q: "Does it help neck sagging?", a: "Yes — one of the few non-invasive treatments that genuinely improves neck and jawline area." },
        { q: "Is it safe on dark skin?", a: "Yes. Unlike some lasers, Morpheus 8 is safe on all skin phototypes (I to VI)." },
      ],
    },
    palette: { from: "#fff3d4", to: "#d4a85a", accent: "#b88a36", text: "#4a3210" },
    iconUrl: "https://res.cloudinary.com/drbc4wbvw/image/upload/v1779412110/Mesa_de_trabajo_1_copia_3_upt8ip.png",
  },
  {
    id: "thermage",
    slugs: { es: "thermage", en: "thermage" },
    title: { es: "Thermage", en: "Thermage" },
    tagline: {
      es: "Lifting sin cirugía con radiofrecuencia monopolar.",
      en: "Non-surgical lifting with monopolar radiofrequency.",
    },
    shortDesc: {
      es: "Firmeza visible que dura hasta 2 años.",
      en: "Visible firmness that lasts up to 2 years.",
    },
    duration: { es: "60 – 90 min", en: "60 – 90 min" },
    priceFrom: { es: "Desde $2,200", en: "From $2,200" },
    priceNote: {
      es: "Sesión única. Resultados progresivos durante 6 meses, duración hasta 2 años.",
      en: "Single session. Progressive results over 6 months, lasting up to 2 years.",
    },
    longDesc: {
      es: [
        "Thermage es un tratamiento de radiofrecuencia monopolar que calienta las capas profundas de la dermis sin dañar la superficie de la piel.",
        "Provoca la contracción del colágeno existente (resultado inmediato) y estimula la producción de colágeno nuevo durante los siguientes 6 meses (resultado progresivo).",
        "Ideal para rostro, cuello, contorno mandibular, párpados y abdomen. Es 100% no invasivo: sin agujas, sin cortes, sin downtime.",
      ],
      en: [
        "Thermage is a monopolar radiofrequency treatment that heats deep dermal layers without damaging the skin's surface.",
        "It contracts existing collagen (immediate result) and stimulates new collagen production over the following 6 months (progressive result).",
        "Ideal for face, neck, jawline, eyelids and abdomen. 100% non-invasive: no needles, no cuts, no downtime.",
      ],
    },
    includes: {
      es: [
        "Evaluación de objetivos y zonas a tratar",
        "Aplicación con la última generación del dispositivo Thermage",
        "Punta con la cantidad de pulsos según protocolo",
        "Guía de cuidado y seguimiento",
      ],
      en: [
        "Goal and zone evaluation",
        "Treatment with the latest-generation Thermage device",
        "Tip with proper pulse count per protocol",
        "Aftercare guide and follow-up",
      ],
    },
    preCare: {
      es: [
        "Llega sin maquillaje ni cremas",
        "Evita alcohol 24 horas antes",
        "Come algo previo para evitar mareos",
      ],
      en: [
        "Arrive with no makeup or creams",
        "Avoid alcohol 24 hours before",
        "Eat beforehand to avoid lightheadedness",
      ],
    },
    postCare: {
      es: [
        "Hidratación abundante y SPF 50 diario",
        "Evita saunas y baños calientes por 48 horas",
        "Puedes retomar maquillaje y actividades el mismo día",
      ],
      en: [
        "Plenty of hydration and daily SPF 50",
        "Avoid saunas and hot baths for 48 hours",
        "Resume makeup and activities the same day",
      ],
    },
    faqs: {
      es: [
        { q: "¿Cuántas sesiones necesito?", a: "Generalmente una sola. Algunos casos avanzados se benefician de un refuerzo a los 12 meses." },
        { q: "¿Cuándo veo el resultado?", a: "Algo inmediato y la mejora total entre 2 y 6 meses, conforme se genera nuevo colágeno." },
        { q: "¿Duele?", a: "Vas a sentir calor profundo en pulsos breves. La última generación de Thermage incluye sistema de vibración que reduce la sensación." },
        { q: "¿Es igual al Morpheus 8?", a: "No. Thermage es radiofrecuencia monopolar SIN agujas (no invasivo, sin downtime). Morpheus 8 es radiofrecuencia CON microagujas (invasivo, 24-48h de downtime). Cada uno tiene su indicación." },
        { q: "¿Qué zonas se pueden tratar?", a: "Rostro completo, cuello, contorno mandibular (jawline), párpados (lifting de mirada), abdomen, brazos, muslos y glúteos." },
        { q: "¿Cuánto duran los resultados?", a: "Hasta 2 años en piel madura, manteniendo cuidado básico (SPF + buena hidratación)." },
        { q: "¿Es seguro?", a: "Sí. Thermage tiene aprobación FDA desde 2002 y más de 20 años de uso clínico en todo el mundo." },
        { q: "¿Puedo combinarlo con Botox o relleno?", a: "Sí. Lo ideal es hacer Thermage primero, esperar 2 semanas, y luego aplicar Botox o ácido hialurónico." },
      ],
      en: [
        { q: "How many sessions do I need?", a: "Usually just one. Advanced cases may benefit from a touch-up at 12 months." },
        { q: "When do I see results?", a: "Some immediate effect, with full results between 2 and 6 months as new collagen forms." },
        { q: "Does it hurt?", a: "You'll feel deep heat in brief pulses. The latest Thermage generation includes vibration that reduces the sensation." },
        { q: "Is it the same as Morpheus 8?", a: "No. Thermage is monopolar radiofrequency WITHOUT needles (non-invasive, no downtime). Morpheus 8 uses microneedles (invasive, 24-48h downtime). Each has its indication." },
        { q: "Which areas can be treated?", a: "Full face, neck, jawline, eyelids, abdomen, arms, thighs and glutes." },
        { q: "How long do results last?", a: "Up to 2 years on mature skin with basic care (SPF + good hydration)." },
        { q: "Is it safe?", a: "Yes. Thermage has been FDA-approved since 2002 with 20+ years of clinical use worldwide." },
        { q: "Can I combine it with Botox or filler?", a: "Yes. Best practice is Thermage first, wait 2 weeks, then Botox or hyaluronic acid." },
      ],
    },
    palette: { from: "#e6d5ec", to: "#6b3a73", accent: "#3d1f48", text: "#fff" },
  },
  {
    id: "lips",
    slugs: { es: "aumento-labios", en: "lip-augmentation" },
    title: { es: "Aumento de labios", en: "Lip augmentation" },
    tagline: {
      es: "Volumen, definición e hidratación con ácido hialurónico.",
      en: "Volume, definition and hydration with hyaluronic acid.",
    },
    shortDesc: {
      es: "Labios naturales, no exagerados.",
      en: "Natural lips, never overdone.",
    },
    duration: { es: "45 min", en: "45 min" },
    priceFrom: { es: "Desde $650 / jeringa", en: "From $650 / syringe" },
    priceNote: {
      es: "Una jeringa suele alcanzar para el resultado deseado. Marcas premium: Juvederm o Restylane.",
      en: "One syringe is usually enough for your goal. Premium brands: Juvederm or Restylane.",
    },
    longDesc: {
      es: [
        "Diseño de labios con relleno de ácido hialurónico de marca premium. Trabajamos volumen, definición del contorno, hidratación profunda y proyección — siempre buscando un resultado natural.",
        "Antes de aplicar, hacemos un diseño personalizado en función de tu rostro, simetría y deseos. La aplicación es con cánula o aguja según la zona.",
        "Los resultados son inmediatos y se asientan en 7 a 14 días. Duración promedio: 6 a 12 meses.",
      ],
      en: [
        "Lip design with premium-brand hyaluronic acid filler. We work on volume, lip border definition, deep hydration and projection — always aiming for a natural look.",
        "We start with a personalized design based on your face, symmetry and goals. Application is with cannula or needle depending on the area.",
        "Results are immediate and settle over 7 to 14 days. Average duration: 6 to 12 months.",
      ],
    },
    includes: {
      es: [
        "Consulta y diseño personalizado",
        "Anestesia tópica para mayor comodidad",
        "1 jeringa de ácido hialurónico premium",
        "Frío local y kit post-tratamiento",
      ],
      en: [
        "Consultation and personalized design",
        "Topical anesthesia for comfort",
        "1 syringe of premium hyaluronic acid",
        "Local cold and aftercare kit",
      ],
    },
    preCare: {
      es: [
        "Evita alcohol y antiinflamatorios 48 horas antes",
        "No tomes aspirina ni vitamina E una semana antes",
        "Llega hidratada y sin maquillaje en los labios",
      ],
      en: [
        "Avoid alcohol and anti-inflammatories 48 hours before",
        "No aspirin or vitamin E one week prior",
        "Arrive hydrated and with no lip makeup",
      ],
    },
    postCare: {
      es: [
        "Frío local por intervalos las primeras 24 horas",
        "Evita ejercicio intenso por 48 horas",
        "No piscinas, saunas ni vuelos por 1 semana",
        "Evita besos profundos por 2 días",
      ],
      en: [
        "Local cold in intervals during the first 24 hours",
        "No intense exercise for 48 hours",
        "No pools, saunas or flights for a week",
        "Avoid deep kisses for 2 days",
      ],
    },
    faqs: {
      es: [
        { q: "¿Se ven hinchados al principio?", a: "Sí, es normal por 3 a 5 días. Después se asientan al resultado real." },
        { q: "¿Es reversible?", a: "Sí. Si por alguna razón no te gustan, podemos disolver el producto con hialuronidasa." },
        { q: "¿Cuántas jeringas necesito?", a: "Para la primera vez, generalmente 1 jeringa de 1 ml. Si querés volumen más marcado, 2 jeringas en 2 sesiones (separadas 2-3 semanas)." },
        { q: "¿Duele?", a: "Muy poco. Usamos anestesia tópica + el producto ya viene con lidocaína. Es muy llevadero." },
        { q: "¿Cuánto duran?", a: "Entre 6 y 12 meses. Personas con metabolismo rápido pueden necesitar refuerzo a los 6 meses." },
        { q: "¿Se ven 'patos' como en redes sociales?", a: "No, si trabajas con un profesional con experiencia. Nuestro diseño busca proporciones naturales según tu rostro." },
        { q: "¿Qué marca usan?", a: "Juvederm Allergan o Restylane Galderma, ambas premium y FDA-approved." },
        { q: "¿Puedo hacérmelos si tengo herpes labial?", a: "Sí, pero hay que premedicar con antiviral 1 día antes y 3 días después. Avísanos en consulta." },
      ],
      en: [
        { q: "Will they look swollen at first?", a: "Yes, that's normal for 3 to 5 days. Then they settle into the real result." },
        { q: "Is it reversible?", a: "Yes. If for any reason you're not happy, we can dissolve the filler with hyaluronidase." },
        { q: "How many syringes do I need?", a: "First time, usually 1 syringe of 1 ml. For more dramatic volume, 2 syringes over 2 sessions (2-3 weeks apart)." },
        { q: "Does it hurt?", a: "Very little. We use topical anesthesia and the product already contains lidocaine. Very tolerable." },
        { q: "How long do they last?", a: "Between 6 and 12 months. Faster metabolism may need a touch-up at 6 months." },
        { q: "Will they look 'duck-lips' like on social media?", a: "No, when done by an experienced professional. Our design targets natural proportions for your face." },
        { q: "Which brand do you use?", a: "Juvederm Allergan or Restylane Galderma, both premium and FDA-approved." },
        { q: "Can I get it if I have cold sores?", a: "Yes, but you'll pre-medicate with antiviral 1 day before and 3 days after. Tell us in consultation." },
      ],
    },
    palette: { from: "#ffc6dd", to: "#ff7eaf", accent: "#d04b7e", text: "#fff" },
    iconUrl: "https://res.cloudinary.com/drbc4wbvw/image/upload/v1779412111/Mesa_de_trabajo_1_copia_4_c06ctj.png",
  },
  {
    id: "lashes",
    slugs: { es: "pestanas-pelo-a-pelo", en: "classic-lashes" },
    title: { es: "Pestañas pelo a pelo", en: "Classic lashes" },
    tagline: {
      es: "Extensiones clásicas con técnica de Erlym, una por una.",
      en: "Classic extensions placed one-by-one by Erlym.",
    },
    shortDesc: {
      es: "Mirada elegante con look 100% natural.",
      en: "An elegant gaze that looks 100% natural.",
    },
    duration: { es: "Set completo: 90 – 120 min · Retoque: 60 – 90 min", en: "Full set: 90 – 120 min · Refill: 60 – 90 min" },
    priceFrom: { es: "Set desde $140 · Retoque desde $75", en: "Set from $140 · Refill from $75" },
    priceNote: {
      es: "Retoques sugeridos cada 3 a 4 semanas para mantener la densidad.",
      en: "Refills recommended every 3 to 4 weeks to maintain density.",
    },
    longDesc: {
      es: [
        "Técnica clásica pelo a pelo: pegamos una extensión por cada pestaña natural, respetando su ciclo de crecimiento. El resultado es una mirada definida y absolutamente natural.",
        "Elegimos la curvatura, largo y grosor que mejor te quede según tu tipo de pestaña, forma de ojo y estilo de vida.",
        "Materiales hipoalergénicos de grado premium. Adhesivo médico de alta duración, libre de látex.",
      ],
      en: [
        "Classic hair-by-hair technique: we attach one extension per natural lash, respecting its growth cycle. The result is a defined yet completely natural gaze.",
        "We pick the curl, length and thickness that suit your natural lash, eye shape and lifestyle.",
        "Premium-grade hypoallergenic materials. Long-lasting, latex-free medical adhesive.",
      ],
    },
    includes: {
      es: [
        "Consulta breve para definir estilo",
        "Limpieza profunda de pestañas naturales",
        "Aislamiento y aplicación pelo a pelo",
        "Cepillado y kit de cuidado",
      ],
      en: [
        "Quick consultation to define the style",
        "Deep clean of natural lashes",
        "Isolation and hair-by-hair application",
        "Brushing and aftercare kit",
      ],
    },
    preCare: {
      es: [
        "Llega sin maquillaje en los ojos",
        "Evita lentes de contacto el día de la cita si es posible",
        "No usar rímel waterproof 24 horas antes",
      ],
      en: [
        "Arrive with no eye makeup",
        "Avoid contact lenses on the appointment day if possible",
        "No waterproof mascara 24 hours before",
      ],
    },
    postCare: {
      es: [
        "No mojar las pestañas durante las primeras 24 horas",
        "No frotar los ojos ni dormir boca abajo",
        "Limpia con shampoo específico cada 2-3 días",
        "Nunca uses rímel ni desmaquillantes oleosos",
      ],
      en: [
        "No water on lashes for the first 24 hours",
        "Don't rub your eyes or sleep face down",
        "Clean with lash-specific shampoo every 2-3 days",
        "Never use mascara or oil-based makeup removers",
      ],
    },
    faqs: {
      es: [
        { q: "¿Dañan mis pestañas naturales?", a: "No, si se aplican y mantienen bien. Trabajamos respetando cada ciclo natural y usando peso adecuado." },
        { q: "¿Cada cuánto tengo que retocar?", a: "Entre 3 y 4 semanas para mantener la densidad pareja." },
        { q: "¿Cuánto duran?", a: "Cada extensión dura el ciclo de la pestaña natural (~6-8 semanas). Con retoques cada 3-4 semanas mantienes el look siempre." },
        { q: "¿Puedo nadar y entrenar?", a: "Sí, después de las primeras 24 horas. Solo evita saunas a temperaturas muy altas." },
        { q: "¿Puedo usar maquillaje?", a: "Sí, pero solo sombras y delineador que NO sea oleoso. NUNCA uses rímel (lo arruina y daña las pestañas)." },
        { q: "¿Qué pasa si tengo pestañas naturales finas?", a: "Trabajamos con extensiones muy livianas (0.05 - 0.07 mm) para no dañarlas. La consulta inicial determina qué tipo y grosor usar." },
        { q: "¿Es doloroso?", a: "No, para nada. La mayoría de clientas se duerme durante la sesión." },
        { q: "¿Qué hago si se me cae una extensión?", a: "Es normal perder 1 a 3 por día (caen con la pestaña natural). Si caen más, vuelve al retoque o pasa por una revisión gratis dentro de la primera semana." },
      ],
      en: [
        { q: "Do they damage my natural lashes?", a: "No, when applied and maintained properly. We respect every natural growth cycle and use proper weight." },
        { q: "How often do I need a refill?", a: "Every 3 to 4 weeks to keep density even." },
        { q: "How long do they last?", a: "Each extension lasts the natural lash cycle (~6-8 weeks). With refills every 3-4 weeks you keep the look always." },
        { q: "Can I swim and work out?", a: "Yes, after the first 24 hours. Just avoid saunas at very high temperatures." },
        { q: "Can I wear makeup?", a: "Yes, but only shadows and eyeliner that are NOT oil-based. NEVER use mascara (ruins them and damages your lashes)." },
        { q: "What if my natural lashes are thin?", a: "We use very light extensions (0.05 - 0.07 mm) to avoid damage. The intake consult determines the right type and thickness." },
        { q: "Is it painful?", a: "Not at all. Most clients fall asleep during the session." },
        { q: "What if an extension falls off?", a: "Losing 1-3 per day is normal (they fall with the natural lash). If more, come for a refill or a free check-up within the first week." },
      ],
    },
    palette: { from: "#3d1f48", to: "#1a0f1f", accent: "#d4a85a", text: "#fff" },
    iconUrl: "https://res.cloudinary.com/drbc4wbvw/image/upload/v1779412110/Mesa_de_trabajo_1_copia_5_yogrkw.png",
  },
  {
    id: "facial",
    slugs: { es: "limpieza-facial", en: "facial-cleansing" },
    title: { es: "Limpieza facial premium", en: "Premium facial cleansing" },
    tagline: {
      es: "Piel limpia, hidratada y luminosa en una sola sesión.",
      en: "Clean, hydrated, glowing skin in one session.",
    },
    shortDesc: {
      es: "Tu glow natural, restaurado.",
      en: "Your natural glow, restored.",
    },
    duration: { es: "60 – 75 min", en: "60 – 75 min" },
    priceFrom: { es: "Desde $120", en: "From $120" },
    priceNote: {
      es: "Incluye análisis de piel, extracción y mascarilla personalizada.",
      en: "Includes skin analysis, extraction and custom mask.",
    },
    longDesc: {
      es: [
        "Nuestra limpieza facial premium es una rutina completa de 60 a 75 minutos que limpia, exfolia, extrae impurezas, hidrata y nutre la piel a profundidad.",
        "Comenzamos con un análisis de tu piel para elegir los productos exactos: distintos protocolos para piel grasa, mixta, seca, sensible o con acné.",
        "Sales del estudio con la piel renovada, sin imperfecciones visibles y con un brillo natural que dura semanas.",
      ],
      en: [
        "Our premium facial is a complete 60-75 minute routine that cleanses, exfoliates, extracts impurities, hydrates and deeply nourishes the skin.",
        "We begin with a skin analysis to pick the exact products: different protocols for oily, combination, dry, sensitive or acne-prone skin.",
        "You leave with renewed skin, no visible blemishes and a natural glow that lasts for weeks.",
      ],
    },
    includes: {
      es: [
        "Análisis personalizado de piel",
        "Doble limpieza + exfoliación enzimática",
        "Extracción manual de impurezas",
        "Mascarilla a medida + masaje facial relajante",
      ],
      en: [
        "Personalized skin analysis",
        "Double cleanse + enzymatic exfoliation",
        "Manual extraction of impurities",
        "Custom mask + relaxing facial massage",
      ],
    },
    preCare: {
      es: [
        "Evita exfoliantes fuertes 48 horas antes",
        "No uses retinol ni ácidos 3 días antes",
        "Llega con piel limpia, sin maquillaje",
      ],
      en: [
        "Avoid strong exfoliants 48 hours before",
        "No retinol or acids 3 days before",
        "Arrive with clean skin, no makeup",
      ],
    },
    postCare: {
      es: [
        "Hidrata abundantemente y usa SPF 30+ todos los días",
        "Evita exposición solar directa por 48 horas",
        "Evita maquillaje las primeras 6 horas si tuviste extracciones",
        "No te toques la cara para evitar contaminar la piel limpia",
      ],
      en: [
        "Hydrate abundantly and use SPF 30+ daily",
        "Avoid direct sun exposure for 48 hours",
        "No makeup for the first 6 hours if you had extractions",
        "Don't touch your face to avoid contaminating clean skin",
      ],
    },
    faqs: {
      es: [
        { q: "¿Con qué frecuencia debo hacerme una limpieza facial?", a: "Idealmente una vez al mes. Personas con piel grasa o tendencia al acné pueden necesitarla cada 3 semanas." },
        { q: "¿Duele la extracción?", a: "Es una sensación incómoda pero corta. Aplicamos vapor previo para abrir los poros y minimizar la molestia." },
        { q: "¿Puedo maquillarme después?", a: "Te recomendamos esperar al menos 6 horas. La piel necesita respirar y absorber los principios activos aplicados." },
        { q: "¿Sirve para acné?", a: "Sí. Tenemos un protocolo específico anti-acné con productos calmantes, exfoliación enzimática suave y mascarilla con ingredientes seborreguladores." },
        { q: "¿Voy a salir con rojez?", a: "Una rojez leve es normal y dura 1 a 4 horas. Si tuviste extracciones intensas puede durar hasta 24 horas en zonas específicas." },
        { q: "¿Lo puedo combinar con Morpheus 8 o Thermage?", a: "Sí, pero ese mismo día solo limpieza. Los tratamientos avanzados los programamos en sesiones separadas." },
        { q: "¿Qué tipo de productos usan?", a: "Marcas profesionales con respaldo dermatológico: Skinceuticals, Image Skincare, ZO Skin Health, entre otras." },
        { q: "¿Cuánto duran los efectos visibles?", a: "El glow se nota desde el día 1 y dura entre 2 y 4 semanas, dependiendo de tu rutina diaria de skincare." },
      ],
      en: [
        { q: "How often should I get a facial?", a: "Ideally once a month. Oily or acne-prone skin may need it every 3 weeks." },
        { q: "Does the extraction hurt?", a: "Mildly uncomfortable but short. We apply steam beforehand to open pores and minimize discomfort." },
        { q: "Can I wear makeup after?", a: "We recommend waiting at least 6 hours. Skin needs to breathe and absorb the active ingredients." },
        { q: "Does it help with acne?", a: "Yes. We have an anti-acne protocol with calming products, gentle enzymatic exfoliation and sebum-regulating masks." },
        { q: "Will I leave with redness?", a: "Mild redness is normal for 1 to 4 hours. Intense extractions can extend redness up to 24 hours in spots." },
        { q: "Can I combine it with Morpheus 8 or Thermage?", a: "Yes, but not the same day. We schedule advanced treatments in separate sessions." },
        { q: "Which products do you use?", a: "Professional dermatology-backed brands: Skinceuticals, Image Skincare, ZO Skin Health and others." },
        { q: "How long does the glow last?", a: "Visible from day 1, lasting 2 to 4 weeks depending on your daily skincare routine." },
      ],
    },
    palette: { from: "#ffe6f1", to: "#ffa3c6", accent: "#d04b7e", text: "#fff" },
  },
  {
    id: "depilation",
    slugs: { es: "depilacion-laser", en: "laser-hair-removal" },
    title: { es: "Depilación láser", en: "Laser hair removal" },
    tagline: {
      es: "Adiós a la cuchilla. Piel suave, definitivamente.",
      en: "Goodbye razor. Smooth skin, for good.",
    },
    shortDesc: {
      es: "Resultados duraderos con tecnología profesional.",
      en: "Long-lasting results with pro technology.",
    },
    duration: { es: "15 – 60 min según zona", en: "15 – 60 min depending on area" },
    priceFrom: { es: "Desde $80 / zona", en: "From $80 / area" },
    priceNote: {
      es: "Axilas $80 · Bikini $120 · Piernas completas $250 · Full body desde $400. Pack 6 sesiones con 20% OFF.",
      en: "Underarms $80 · Bikini $120 · Full legs $250 · Full body from $400. 6-session pack with 20% OFF.",
    },
    longDesc: {
      es: [
        "Trabajamos con láser de diodo de última generación: seguro en todos los tonos de piel y efectivo en distintos tipos de vello. La emisión del láser destruye el folículo piloso sin dañar la piel circundante.",
        "Una sesión por zona dura entre 15 minutos (axilas) y 60 minutos (full body). Se recomienda un mínimo de 6 sesiones separadas por 4 a 8 semanas, dependiendo de la zona.",
        "Despues del tratamiento completo, la mayoría de personas mantiene reducción permanente del 80 al 95% del vello, con sesiones de mantenimiento cada 12 a 18 meses.",
      ],
      en: [
        "We use latest-generation diode laser: safe on all skin tones and effective on different hair types. The laser destroys the hair follicle without damaging surrounding skin.",
        "A session lasts 15 minutes (underarms) to 60 minutes (full body). A minimum of 6 sessions, 4 to 8 weeks apart, is recommended depending on the area.",
        "After the full course, most people maintain 80-95% permanent hair reduction, with maintenance sessions every 12 to 18 months.",
      ],
    },
    includes: {
      es: [
        "Patch test inicial para verificar tolerancia",
        "Marcado de la zona y gel conductor refrescante",
        "Aplicación con láser diodo profesional",
        "Loción calmante post-sesión",
      ],
      en: [
        "Initial patch test to verify tolerance",
        "Area marking and refreshing conductor gel",
        "Application with professional diode laser",
        "Soothing post-session lotion",
      ],
    },
    preCare: {
      es: [
        "Rasura la zona 24 horas antes (no depiles con cera ni pinza)",
        "Evita exposición solar 2 semanas antes",
        "No uses cremas, perfumes ni desodorantes en la zona el día de la cita",
      ],
      en: [
        "Shave the area 24 hours before (no waxing or tweezing)",
        "Avoid sun exposure 2 weeks before",
        "No creams, perfumes or deodorants on the area the day of",
      ],
    },
    postCare: {
      es: [
        "SPF 50 diario sobre la zona durante 1 mes",
        "Evita exposición solar directa por 2 semanas",
        "No saunas, piscinas ni gimnasio intenso por 48 horas",
        "Hidrata la zona con loción calmante 2 veces al día por 1 semana",
      ],
      en: [
        "Daily SPF 50 on the area for 1 month",
        "Avoid direct sun for 2 weeks",
        "No saunas, pools or intense gym for 48 hours",
        "Hydrate with soothing lotion twice daily for 1 week",
      ],
    },
    faqs: {
      es: [
        { q: "¿Funciona en todos los tipos de piel?", a: "Sí. Nuestro láser diodo es seguro en fototipos I a VI (piel muy clara hasta piel muy oscura)." },
        { q: "¿Cuántas sesiones necesito?", a: "Mínimo 6 sesiones. Algunas personas necesitan 8 a 10 según genética, zona y tipo de vello." },
        { q: "¿Es definitiva?", a: "La FDA permite hablar de 'reducción permanente del vello'. La mayoría mantiene un 80-95% de reducción a largo plazo con mantenimiento anual." },
        { q: "¿Duele?", a: "Sentirás una sensación de 'gomita' o calor breve. Nuestro láser tiene punta fría que reduce mucho la molestia." },
        { q: "¿Cada cuánto tengo que ir?", a: "Cada 4 semanas para axilas y bikini, cada 6-8 semanas para piernas, espalda y full body." },
        { q: "¿Puedo depilarme con cera entre sesiones?", a: "NO. Necesitas mantener el folículo intacto. Solo puedes rasurarte con cuchilla entre sesiones." },
        { q: "¿Funciona en vello rubio o blanco?", a: "Es menos efectivo. El láser necesita melanina (pigmento) para identificar el folículo. Vello rubio claro o blanco puede no responder." },
        { q: "¿Es seguro en embarazo?", a: "No. La depilación láser se posterga hasta finalizar el embarazo y la lactancia." },
      ],
      en: [
        { q: "Does it work on all skin types?", a: "Yes. Our diode laser is safe on Fitzpatrick I to VI (very light to very dark skin)." },
        { q: "How many sessions do I need?", a: "Minimum 6. Some people need 8 to 10 depending on genetics, area and hair type." },
        { q: "Is it permanent?", a: "The FDA allows 'permanent hair reduction'. Most maintain 80-95% reduction long term with yearly maintenance." },
        { q: "Does it hurt?", a: "You'll feel a brief 'rubber band' or warmth sensation. Our laser has a chilled tip that greatly reduces discomfort." },
        { q: "How often do I come back?", a: "Every 4 weeks for underarms and bikini, every 6-8 weeks for legs, back and full body." },
        { q: "Can I wax between sessions?", a: "NO. You need the follicle intact. Only razor shaving is allowed between sessions." },
        { q: "Does it work on blonde or white hair?", a: "Less effective. The laser needs melanin (pigment) to target the follicle. Light blonde or white hair may not respond." },
        { q: "Is it safe during pregnancy?", a: "No. Laser is postponed until after pregnancy and breastfeeding." },
      ],
    },
    palette: { from: "#e6d5ec", to: "#6b3a73", accent: "#3d1f48", text: "#fff" },
  },
  {
    id: "dpl",
    slugs: { es: "dpl-cicatrices-acne", en: "dpl-acne-scars" },
    title: { es: "DPL para cicatrices de acné", en: "DPL for acne scars" },
    tagline: {
      es: "Luz pulsada dinámica para suavizar cicatrices y manchas.",
      en: "Dynamic pulsed light to smooth scars and dark spots.",
    },
    shortDesc: {
      es: "Tu piel, sin recuerdos del pasado.",
      en: "Your skin, with no memory of the past.",
    },
    duration: { es: "45 – 60 min", en: "45 – 60 min" },
    priceFrom: { es: "Desde $280 / sesión", en: "From $280 / session" },
    priceNote: {
      es: "Se recomiendan 4 a 6 sesiones separadas por 4 semanas. Pack 5 sesiones con 15% OFF.",
      en: "4 to 6 sessions, 4 weeks apart. 5-session pack with 15% OFF.",
    },
    longDesc: {
      es: [
        "El DPL (Dynamic Pulsed Light) es una evolución del IPL clásico. Emite pulsos de luz que apuntan a las cicatrices, manchas y enrojecimientos sin afectar la piel sana de alrededor.",
        "Es ideal para cicatrices atróficas leves a moderadas del acné, manchas post-inflamatorias (PIH), poros dilatados, telangiectasias (venitas) y rojeces persistentes.",
        "Después de cada sesión vas a notar mejora progresiva en textura y tono. El resultado completo se aprecia entre 2 y 4 meses tras finalizar el ciclo.",
      ],
      en: [
        "DPL (Dynamic Pulsed Light) is an evolution of classic IPL. It emits light pulses that target scars, dark spots and redness without affecting surrounding healthy skin.",
        "Ideal for mild to moderate atrophic acne scars, post-inflammatory hyperpigmentation (PIH), enlarged pores, telangiectasias (small veins) and persistent redness.",
        "After each session you'll notice progressive improvement in texture and tone. Full result is visible 2 to 4 months after finishing the course.",
      ],
    },
    includes: {
      es: [
        "Análisis de piel y planificación del protocolo",
        "Limpieza profunda previa",
        "Aplicación de DPL con parámetros personalizados",
        "Sérum calmante y reparador post-sesión",
      ],
      en: [
        "Skin analysis and protocol planning",
        "Pre-session deep cleansing",
        "DPL application with personalized parameters",
        "Soothing and repair serum after the session",
      ],
    },
    preCare: {
      es: [
        "Evita exposición solar 4 semanas antes",
        "Suspende retinol y ácidos 5 días antes",
        "Llega sin maquillaje ni cremas",
      ],
      en: [
        "Avoid sun exposure 4 weeks before",
        "Stop retinol and acids 5 days before",
        "Arrive with no makeup or creams",
      ],
    },
    postCare: {
      es: [
        "SPF 50 diario por 4 semanas",
        "Evita sol directo, saunas y ejercicio intenso por 48 horas",
        "No uses retinol ni ácidos por 1 semana",
        "Las costritas oscuras que pueden formarse caen solas en 5-10 días — no las arranques",
      ],
      en: [
        "Daily SPF 50 for 4 weeks",
        "Avoid direct sun, saunas and intense exercise for 48 hours",
        "No retinol or acids for 1 week",
        "Dark micro-crusts may form and fall off naturally in 5-10 days — don't pick them",
      ],
    },
    faqs: {
      es: [
        { q: "¿En qué se diferencia del IPL común?", a: "DPL usa filtros más selectivos y pulsos dinámicos. Es más preciso, con menos riesgo de quemaduras y mejor rendimiento en pieles de tono medio." },
        { q: "¿Cuántas sesiones necesito?", a: "4 a 6 sesiones para cicatrices leves. Cicatrices más profundas requieren combinar con Morpheus 8 o Dermapen." },
        { q: "¿Sirve para todo tipo de cicatriz?", a: "Funciona muy bien con cicatrices atróficas (hundidas) leves y manchas. Cicatrices hipertróficas (relieve) requieren otros tratamientos." },
        { q: "¿Duele?", a: "Sensación de chispazo breve, comparable a una gomita. Usamos gel frío para mayor comodidad." },
        { q: "¿Hay downtime?", a: "Apenas. Rojez de 4 a 24 horas. Las micro-costritas (si se forman) son discretas y se pueden cubrir con base mineral después de 24h." },
        { q: "¿Sirve para rosácea?", a: "Sí. El DPL es uno de los mejores tratamientos para reducir el enrojecimiento difuso y las venitas asociadas a rosácea leve a moderada." },
        { q: "¿Es seguro en piel oscura?", a: "Requiere parámetros conservadores y mayor cantidad de sesiones, pero sí es seguro. Hacemos patch test previo en piel oscura." },
        { q: "¿Puedo combinarlo con limpieza facial?", a: "Sí. Lo ideal es limpieza 1 semana antes del DPL para optimizar el resultado." },
      ],
      en: [
        { q: "How is it different from regular IPL?", a: "DPL uses more selective filters and dynamic pulses. More precise, lower burn risk and better performance on medium-toned skin." },
        { q: "How many sessions do I need?", a: "4 to 6 sessions for mild scarring. Deeper scars require combining with Morpheus 8 or Dermapen." },
        { q: "Does it work on every scar type?", a: "Works very well on mild atrophic (sunken) scars and dark spots. Hypertrophic (raised) scars need other treatments." },
        { q: "Does it hurt?", a: "Brief snap sensation, similar to a rubber band. We use cooling gel for comfort." },
        { q: "Is there downtime?", a: "Almost none. Redness for 4-24 hours. Any micro-crusts are subtle and can be covered with mineral foundation after 24h." },
        { q: "Does it help rosacea?", a: "Yes. DPL is one of the best treatments for diffuse redness and small vessels in mild to moderate rosacea." },
        { q: "Is it safe on dark skin?", a: "Requires conservative parameters and more sessions, but it is safe. We do a patch test first on darker skin." },
        { q: "Can I combine it with a facial?", a: "Yes. Ideally a facial 1 week before DPL to optimize results." },
      ],
    },
    palette: { from: "#fff3d4", to: "#d4a85a", accent: "#b88a36", text: "#4a3210" },
    iconUrl: "https://res.cloudinary.com/drbc4wbvw/image/upload/v1779412110/Mesa_de_trabajo_1_copia_2_w7qnsc.png",
  },
  {
    id: "salmon",
    slugs: { es: "esperma-de-salmon", en: "salmon-dna" },
    title: { es: "Esperma de salmón (PDRN)", en: "Salmon DNA (PDRN)" },
    tagline: {
      es: "Bioestimulación anti-edad con ADN de salmón.",
      en: "Anti-aging biostimulation with salmon DNA.",
    },
    shortDesc: {
      es: "Regeneración celular profunda.",
      en: "Deep cellular regeneration.",
    },
    duration: { es: "45 – 60 min", en: "45 – 60 min" },
    priceFrom: { es: "Desde $450 / sesión", en: "From $450 / session" },
    priceNote: {
      es: "Se recomiendan 3 sesiones separadas por 21 días. Pack 3 sesiones desde $1,200.",
      en: "Course of 3 sessions, 21 days apart. 3-session pack from $1,200.",
    },
    longDesc: {
      es: [
        "El tratamiento de PDRN (polydeoxyribonucleotide) usa fragmentos de ADN extraído del esperma de salmón, biocompatible con el ADN humano. Estimula la regeneración celular, la producción de colágeno y elastina, y mejora la cicatrización.",
        "Ideal para piel cansada, opaca, con arrugas finas, manchas, flacidez leve o post-procedimientos para acelerar recuperación. Es uno de los tratamientos anti-edad más populares en Corea y Europa.",
        "Los resultados son progresivos: textura más uniforme, tono parejo, luminosidad natural y firmeza. Visible desde la primera sesión, óptimo a las 8-12 semanas.",
      ],
      en: [
        "PDRN (polydeoxyribonucleotide) treatment uses DNA fragments extracted from salmon sperm, biocompatible with human DNA. Stimulates cellular regeneration, collagen and elastin production, and improves healing.",
        "Ideal for tired, dull skin, fine wrinkles, dark spots, mild sagging or post-procedure recovery. One of the most popular anti-aging treatments in Korea and Europe.",
        "Progressive results: more even texture, uniform tone, natural radiance and firmness. Visible from the first session, optimal at 8-12 weeks.",
      ],
    },
    includes: {
      es: [
        "Evaluación facial completa",
        "Anestesia tópica para comodidad",
        "Aplicación con micro-inyecciones o mesoterapia",
        "Suero post calmante y reparador",
      ],
      en: [
        "Full facial evaluation",
        "Topical anesthesia for comfort",
        "Application via micro-injections or mesotherapy",
        "Calming and repairing post serum",
      ],
    },
    preCare: {
      es: [
        "Evita alcohol 48 horas antes",
        "Suspende aspirina y antiinflamatorios 1 semana antes",
        "Llega sin maquillaje",
      ],
      en: [
        "Avoid alcohol 48 hours before",
        "Stop aspirin and anti-inflammatories 1 week before",
        "Arrive with no makeup",
      ],
    },
    postCare: {
      es: [
        "No te toques ni te masajees la cara por 24 horas",
        "Evita maquillaje las primeras 12 horas",
        "SPF 30+ diario por 1 semana",
        "Evita saunas, piscinas y ejercicio intenso por 48 horas",
      ],
      en: [
        "Don't touch or massage your face for 24 hours",
        "No makeup for the first 12 hours",
        "Daily SPF 30+ for 1 week",
        "Avoid saunas, pools and intense exercise for 48 hours",
      ],
    },
    faqs: {
      es: [
        { q: "¿Es vegano o de origen animal?", a: "Es de origen animal: ADN purificado de esperma de salmón. No es compatible con dieta vegana estricta." },
        { q: "¿Es seguro?", a: "Sí. El PDRN tiene más de 20 años de uso clínico en Corea, Italia y Japón con perfil de seguridad excelente. Es altamente biocompatible." },
        { q: "¿Cuándo veo resultados?", a: "Mejoría en luminosidad e hidratación desde el día 3. Cambios en textura y firmeza desde la semana 4. Resultado óptimo a las 12 semanas." },
        { q: "¿Cuántas sesiones necesito?", a: "Protocolo estándar: 3 sesiones cada 21 días. Mantenimiento opcional cada 6 a 12 meses." },
        { q: "¿Duele?", a: "Aplicamos anestesia tópica y las micro-agujas son muy finas. Es muy tolerable." },
        { q: "¿Lo puedo combinar con Botox o relleno?", a: "Sí, en sesiones separadas. PDRN potencia el colágeno y mejora la calidad de piel donde luego se aplica Botox/relleno." },
        { q: "¿Es alérgico para personas con alergia a pescado?", a: "Hay un riesgo teórico bajísimo. Personas con alergia severa a pescado deben consultar antes y hacer test." },
        { q: "¿Cuánto duran los resultados?", a: "Entre 6 y 12 meses según edad y cuidado de piel. Con mantenimiento, los resultados se sostienen indefinidamente." },
      ],
      en: [
        { q: "Is it vegan or animal-derived?", a: "Animal-derived: purified salmon sperm DNA. Not compatible with strict vegan diet." },
        { q: "Is it safe?", a: "Yes. PDRN has 20+ years of clinical use in Korea, Italy and Japan with excellent safety profile. Highly biocompatible." },
        { q: "When do I see results?", a: "Improvement in radiance and hydration from day 3. Texture and firmness changes from week 4. Optimal at 12 weeks." },
        { q: "How many sessions do I need?", a: "Standard protocol: 3 sessions every 21 days. Optional maintenance every 6 to 12 months." },
        { q: "Does it hurt?", a: "We use topical anesthesia and ultra-fine needles. Very tolerable." },
        { q: "Can I combine it with Botox or filler?", a: "Yes, in separate sessions. PDRN boosts collagen and improves skin quality where Botox/filler is later applied." },
        { q: "Is it allergenic for fish allergies?", a: "Theoretical risk is minimal. People with severe fish allergy should consult and test first." },
        { q: "How long do results last?", a: "6 to 12 months depending on age and skincare. With maintenance, results are sustained indefinitely." },
      ],
    },
    palette: { from: "#ffe6f1", to: "#ec6f9c", accent: "#d04b7e", text: "#fff" },
  },
  {
    id: "dermapen",
    slugs: { es: "dermapen", en: "dermapen" },
    title: { es: "Dermapen", en: "Dermapen" },
    tagline: {
      es: "Microneedling premium para textura y colágeno.",
      en: "Premium microneedling for texture and collagen.",
    },
    shortDesc: {
      es: "Tu piel renovada, sin downtime largo.",
      en: "Your skin renewed, without long downtime.",
    },
    duration: { es: "45 – 60 min", en: "45 – 60 min" },
    priceFrom: { es: "Desde $220 / sesión", en: "From $220 / session" },
    priceNote: {
      es: "Se recomiendan 3 a 4 sesiones separadas por 30 días. Pack 3 sesiones desde $600.",
      en: "3 to 4 sessions, 30 days apart. 3-session pack from $600.",
    },
    longDesc: {
      es: [
        "Dermapen es un dispositivo motorizado con micro-agujas estériles desechables que crea micro-canales controlados en la piel. Estos micro-canales activan la cicatrización natural, estimulando colágeno y elastina nuevos.",
        "Es perfecto para cicatrices de acné suaves a moderadas, líneas finas, poros dilatados, estrías, alopecia y para potenciar la absorción de principios activos (factor de crecimiento, ácido hialurónico, péptidos).",
        "A diferencia del Morpheus 8, no usa radiofrecuencia, por lo que el downtime es menor (24 horas) y el precio más accesible. Ideal como tratamiento de mantenimiento o paso intermedio.",
      ],
      en: [
        "Dermapen is a motorized device with sterile disposable micro-needles that creates controlled micro-channels in the skin. These channels activate natural healing, stimulating new collagen and elastin.",
        "Perfect for mild to moderate acne scars, fine lines, enlarged pores, stretch marks, hair loss, and to boost absorption of active ingredients (growth factor, hyaluronic acid, peptides).",
        "Unlike Morpheus 8, it doesn't use radiofrequency, so downtime is shorter (24 hours) and price more accessible. Ideal as a maintenance or intermediate treatment.",
      ],
    },
    includes: {
      es: [
        "Anestesia tópica 30 min antes",
        "Sesión con aguja estéril desechable de un solo uso",
        "Aplicación de sérum bioestimulante personalizado",
        "Mascarilla calmante post-tratamiento",
      ],
      en: [
        "Topical anesthesia 30 min before",
        "Session with single-use sterile disposable needle",
        "Application of personalized biostimulating serum",
        "Soothing post-treatment mask",
      ],
    },
    preCare: {
      es: [
        "Evita sol y autobronceadores 1 semana antes",
        "No uses retinol ni ácidos 3 días antes",
        "Llega con cara limpia, sin maquillaje",
      ],
      en: [
        "Avoid sun and self-tanners 1 week before",
        "No retinol or acids 3 days before",
        "Arrive with clean face, no makeup",
      ],
    },
    postCare: {
      es: [
        "SPF 50 diario por 2 semanas",
        "No maquillaje por 24 horas",
        "Hidrata con productos calmantes (sin alcohol ni perfume)",
        "Evita saunas, piscinas y ejercicio intenso por 48 horas",
      ],
      en: [
        "Daily SPF 50 for 2 weeks",
        "No makeup for 24 hours",
        "Hydrate with soothing products (no alcohol or fragrance)",
        "Avoid saunas, pools and intense exercise for 48 hours",
      ],
    },
    faqs: {
      es: [
        { q: "¿Cuál es la diferencia con Morpheus 8?", a: "Dermapen usa solo micro-agujas (sin radiofrecuencia), va menos profundo y tiene downtime más corto. Morpheus 8 combina agujas + radiofrecuencia, llega más profundo y suele dar resultados más marcados en flacidez." },
        { q: "¿Cuántas sesiones necesito?", a: "Para cicatrices o líneas finas: 3 a 4. Para alopecia o estrías: 4 a 6." },
        { q: "¿Duele?", a: "Aplicamos anestesia tópica 30 minutos antes. Es muy tolerable, la mayoría dice que se siente como una vibración." },
        { q: "¿Hay rojez?", a: "Sí, rojez tipo quemadura solar leve por 24 a 48 horas. Algunas personas también tienen descamación leve al 3er día." },
        { q: "¿Sirve para estrías?", a: "Sí, especialmente las rojas o frescas. Las blancas requieren más sesiones (6+) y se combinan con DPL para mejor resultado." },
        { q: "¿Sirve para alopecia?", a: "Sí. Combinado con PRP o péptidos capilares, mejora notablemente la densidad y grosor del cabello en personas con caída leve a moderada." },
        { q: "¿Es seguro en piel oscura?", a: "Sí. A diferencia del láser, el microneedling es seguro en todos los fototipos sin riesgo de despigmentación." },
        { q: "¿Lo puedo hacer en zonas del cuerpo?", a: "Sí. Hacemos Dermapen en cara, cuello, escote, manos, abdomen (para estrías) y cuero cabelludo (para alopecia)." },
      ],
      en: [
        { q: "What's the difference from Morpheus 8?", a: "Dermapen uses only micro-needles (no radiofrequency), goes shallower and has shorter downtime. Morpheus 8 combines needles + radiofrequency, goes deeper and tends to give more dramatic results on sagging." },
        { q: "How many sessions do I need?", a: "For scars or fine lines: 3 to 4. For alopecia or stretch marks: 4 to 6." },
        { q: "Does it hurt?", a: "We apply topical anesthesia 30 minutes before. Very tolerable, most people say it feels like a vibration." },
        { q: "Is there redness?", a: "Yes, mild sunburn-like redness for 24 to 48 hours. Some experience light peeling on day 3." },
        { q: "Does it work on stretch marks?", a: "Yes, especially fresh red ones. White stretch marks require more sessions (6+) and combination with DPL for best result." },
        { q: "Does it help with hair loss?", a: "Yes. Combined with PRP or hair peptides, notably improves density and thickness in mild to moderate hair loss." },
        { q: "Is it safe on dark skin?", a: "Yes. Unlike laser, microneedling is safe on all phototypes with no depigmentation risk." },
        { q: "Can I do it on body areas?", a: "Yes. We perform Dermapen on face, neck, décolleté, hands, abdomen (for stretch marks) and scalp (for alopecia)." },
      ],
    },
    palette: { from: "#fff3d4", to: "#e8c878", accent: "#b88a36", text: "#4a3210" },
  },
];

export function findServiceBySlug(slug: string, lang: Lang): ServiceDetail | undefined {
  return SERVICES.find((s) => s.slugs[lang] === slug);
}
