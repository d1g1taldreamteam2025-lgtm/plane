import type { Lang } from "../i18n";

export type ServiceId = "iv" | "botox" | "morpheus" | "thermage" | "lips" | "lashes";

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
  },
];

export function findServiceBySlug(slug: string, lang: Lang): ServiceDetail | undefined {
  return SERVICES.find((s) => s.slugs[lang] === slug);
}
