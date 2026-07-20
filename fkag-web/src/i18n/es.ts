import type { TranslationKey } from './en';

/**
 * Traducciones al español. TypeScript obliga a que estén TODAS
 * las claves de en.ts (si falta una, marca error al compilar).
 */
const es: Record<TranslationKey, string> = {
  // ---- Navegación / Header ----
  nav_home: 'Inicio',
  nav_inventory: 'Inventario',
  nav_financing: 'Financiamiento',
  nav_fin_overview: 'Financiamiento',
  nav_fin_apply: 'Aplicar para Financiamiento',
  nav_about: 'Nosotros',
  nav_contact: 'Contáctanos',
  nav_faqs: 'Preguntas Frecuentes',
  nav_get_prequalified: 'Pre-Calificar',

  // ---- Top bar ----
  topbar_hours: 'Lun–Sáb 9AM–8PM · Dom 11AM–6PM',

  // ---- Marquee ----
  marquee_low_down: 'BAJO PAGO INICIAL',
  marquee_approval: 'APROBACIÓN EN 60 SEGUNDOS',
  marquee_carfax: 'CARFAX GRATIS',
  marquee_inspection: 'INSPECCIÓN 150+ PUNTOS',
  marquee_sold: '+1,000 VEHÍCULOS VENDIDOS',

  // ---- Footer ----
  footer_tagline:
    'Tu concesionario local de autos usados con vehículos de calidad, precios honestos y financiamiento flexible.',
  footer_inventory_title: 'Inventario',
  footer_view_all: 'Ver Todo el Inventario',
  footer_under_20k: 'Menos de $20k',
  footer_under_10k: 'Menos de $10k',
  footer_resources_title: 'Recursos',
  footer_apply: 'Aplicar para Financiamiento',
  footer_about: 'Nosotros',
  footer_contact: 'Contáctanos',
  footer_faqs: 'Preguntas Frecuentes',
  footer_newsletter_title: 'Mantente en Contacto',
  footer_newsletter_sub: 'Recibe ofertas mensuales y nuevos vehículos.',
  footer_email_placeholder: 'tu@email.com',
  footer_subscribe: 'Suscribirme',
  footer_subscribing: 'Enviando...',
  footer_subscribed: '¡Suscrito!',
  footer_try_again: 'Reintentar',
  footer_copyright_post: 'Family Key Auto Group. Todos los derechos reservados.',
  footer_privacy: 'Política de Privacidad',
  footer_terms: 'Términos de Uso',
  footer_sitemap: 'Mapa del Sitio',
  footer_accessibility: 'Accesibilidad',

  // ---- Chat widget ----
  chat_text: 'Chat con Nosotros',
};

export default es;
