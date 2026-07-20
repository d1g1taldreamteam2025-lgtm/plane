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
  cloudinaryCloud: import.meta.env.PUBLIC_CLOUDINARY_CLOUD || 'drbc4wbvw',
} as const;

/**
 * URLs de imágenes/assets (centralizadas para poder reemplazar
 * las que se perdieron en un solo lugar).
 */
export const assets = {
  logoHeader:
    'https://res.cloudinary.com/drbc4wbvw/image/upload/v1778669606/dorado_ezwn0e.svg', // TODO confirmar logo del header
  logoFooter:
    'https://res.cloudinary.com/drbc4wbvw/image/upload/v1778669606/dorado_ezwn0e.svg',
  placeholder: 'https://via.placeholder.com/900x600?text=No+Photo',
} as const;

/** Enlaces de navegación (se traducen vía data-i18n en el Header) */
export const nav = [
  { key: 'nav_home', href: '/' },
  { key: 'nav_inventory', href: '/inventory/' },
  {
    key: 'nav_financing',
    href: '/financing/',
    children: [
      { key: 'nav_fin_overview', href: '/financing/' },
      { key: 'nav_fin_apply', href: '/financing/apply/' },
    ],
  },
  { key: 'nav_about', href: '/about/' },
  { key: 'nav_contact', href: '/contact/' },
  { key: 'nav_faqs', href: '/faqs/' },
] as const;
