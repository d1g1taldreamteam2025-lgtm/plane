/**
 * Fuente ÚNICA de verdad de los datos del negocio.
 * Cambia un dato aquí y se actualiza en todo el sitio.
 */

export const site = {
  name: 'Family Key Auto Group',
  legalName: 'Family Key Auto Group',
  domain: 'https://familykeyautogroup.com',

  /** Contacto */
  phoneDisplay: '(949) 514-7366',
  phoneHref: '+19495147366',
  whatsappNumber: '19495147366', // sin "+", formato wa.me
  email: 'info@familykeyautogroup.com', // TODO confirmar email principal
  contactEmail: 'samuel.yepez@familykeyautogroup.com',

  /** Dirección */
  address: {
    line1: '170 N Arrowhead Ave STE C 175',
    line2: 'Rialto, CA 92376',
    full: '170 N Arrowhead Ave STE C 175, Rialto, CA 92376',
    // Coordenadas del mapa (OpenStreetMap embed)
    osmBbox: '-117.402,34.087,-117.349,34.131',
    osmMarker: '34.109,-117.376',
    googleMapsQuery: '170+N+Arrowhead+Ave+STE+C+175+CA+92376',
  },

  /** Horarios (fuente única — el top bar y la página de contacto leen de aquí) */
  hours: {
    weekday: '9:00am – 7:00pm', // Lun–Sáb
    sunday: '11:00am – 5:00pm',
    topbarSummary: 'Mon–Sat 9AM–8PM · Sun 11AM–6PM', // TODO: reconciliar con horarios reales
  },

  /** Redes sociales (deja el string vacío para ocultar el ícono) */
  social: {
    facebook: '',
    instagram: '',
    tiktok: '',
  },

  /** Integraciones (con fallback a los valores actuales si no hay .env) */
  supabaseUrl: import.meta.env.PUBLIC_SUPABASE_URL || 'https://db.ucallnow.fun',
  supabaseKey:
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
  webhookUrl:
    import.meta.env.PUBLIC_WEBHOOK_URL ||
    'https://n8n-ucallnow.ucallnow.fun/webhook/fkag-leads',
} as const;

/**
 * URLs de imágenes/assets (centralizadas para poder reemplazar
 * las que se perdieron en un solo lugar).
 */
export const assets = {
  // Locales (servidas desde /public/images) — SIN dependencia de Cloudinary.
  // ⚠️ FALTAN: hay que colocar estos archivos reales en public/images/
  logoHeader: '/images/logo-header.png', // ⛔ pendiente (logo FKAG real)
  logoFooter: '/images/logo-footer.svg', // ⛔ pendiente (logo dorado FKAG)
  flagEs: '/images/flag-es.svg', // ✅ generado local
  flagEn: '/images/flag-en.svg', // ✅ generado local
  googleIcon: '/images/google-icon.svg', // ✅ generado local
  placeholder: '/images/placeholder.svg',
  invHeroBg: '/images/inv-hero-bg.png', // ⛔ pendiente (fondo del hero de inventario, opcional)
} as const;

/** Marcas que se muestran en el home (logos locales) */
export const brands = [
  { key: 'jeep', name: 'Jeep', img: '/images/brand-jeep.svg' },
  { key: 'ford', name: 'Ford', img: '/images/brand-ford.svg' },
  { key: 'hyundai', name: 'Hyundai', img: '/images/brand-hyundai.svg' },
  { key: 'toyota', name: 'Toyota', img: '/images/brand-toyota.svg' },
  { key: 'nissan', name: 'Nissan', img: '/images/brand-nissan.svg' },
  { key: 'chevrolet', name: 'Chevrolet', img: '/images/brand-chevrolet.svg' },
  { key: 'honda', name: 'Honda', img: '/images/brand-honda.svg' },
  { key: 'kia', name: 'Kia', img: '/images/brand-kia.svg' },
  { key: 'mazda', name: 'Mazda', img: '/images/brand-mazda.svg' },
  { key: 'renault', name: 'Renault', img: '/images/brand-renault.svg' },
] as const;

/**
 * Slides del hero (imágenes por idioma y por dispositivo).
 * ⛔ Los archivos aún no existen — se colocan en public/images/ cuando estén.
 */
export const heroSlides = [
  {
    es: '/images/hero-1-es.png',
    en: '/images/hero-1-en.png',
    esMobile: '/images/hero-1-es-mobile.png',
    enMobile: '/images/hero-1-en-mobile.png',
  },
  {
    es: '/images/hero-2-es.png',
    en: '/images/hero-2-en.png',
    esMobile: '/images/hero-2-es-mobile.png',
    enMobile: '/images/hero-2-en-mobile.png',
  },
  {
    es: '/images/hero-3-es.png',
    en: '/images/hero-3-en.png',
    esMobile: '/images/hero-3-es-mobile.png',
    enMobile: '/images/hero-3-en-mobile.png',
  },
] as const;

/** Enlaces de navegación (se traducen vía data-i18n en el Header) */
export const nav = [
  { key: 'nav_home', href: '/' },
  { key: 'nav_inventory', href: '/inventory/' },
  {
    key: 'nav_financing',
    href: '/financing/',
    children: [
      { key: 'nav_financing_overview', href: '/financing/' },
      { key: 'nav_financing_apply', href: '/financing/apply/' },
    ],
  },
  { key: 'nav_about', href: '/about/' },
  { key: 'nav_contact', href: '/contact/' },
  { key: 'nav_faqs', href: '/faqs/' },
] as const;
