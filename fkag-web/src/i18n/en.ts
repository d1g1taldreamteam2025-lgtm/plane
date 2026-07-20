/**
 * Diccionario base (inglés). Es la "fuente de claves":
 * es.ts está obligado por TypeScript a tener EXACTAMENTE estas mismas keys.
 * Se irán agregando keys a medida que migramos cada página.
 */
const en = {
  // ---- Navegación / Header ----
  nav_home: 'Home',
  nav_inventory: 'Inventory',
  nav_financing: 'Financing',
  nav_fin_overview: 'Financing Overview',
  nav_fin_apply: 'Apply for Financing',
  nav_about: 'About',
  nav_contact: 'Contact Us',
  nav_faqs: 'FAQs',
  nav_get_prequalified: 'Get Pre-Qualified',

  // ---- Top bar ----
  topbar_hours: 'Mon–Sat 9AM–8PM · Sun 11AM–6PM',

  // ---- Marquee ----
  marquee_low_down: 'LOW DOWN PAYMENT',
  marquee_approval: 'APPROVAL IN 60 SECONDS',
  marquee_carfax: 'FREE CARFAX INCLUDED',
  marquee_inspection: '150+ POINT INSPECTION',
  marquee_sold: '+1,000 VEHICLES SOLD',

  // ---- Footer ----
  footer_tagline:
    'Your local pre-owned dealer offering quality vehicles, honest pricing, and flexible financing.',
  footer_inventory_title: 'Inventory',
  footer_view_all: 'View All Inventory',
  footer_under_20k: 'Under $20k',
  footer_under_10k: 'Under $10k',
  footer_resources_title: 'Resources',
  footer_apply: 'Apply for Financing',
  footer_about: 'About Us',
  footer_contact: 'Contact Us',
  footer_faqs: 'FAQs',
  footer_newsletter_title: 'Stay in Touch',
  footer_newsletter_sub: 'Get monthly specials and new arrivals.',
  footer_email_placeholder: 'your@email.com',
  footer_subscribe: 'Subscribe',
  footer_subscribing: 'Sending...',
  footer_subscribed: 'Subscribed!',
  footer_try_again: 'Try Again',
  footer_copyright_post: 'Family Key Auto Group. All rights reserved.',
  footer_privacy: 'Privacy Policy',
  footer_terms: 'Terms of Use',
  footer_sitemap: 'Sitemap',
  footer_accessibility: 'Accessibility',

  // ---- Chat widget ----
  chat_text: 'Chat with Us',
} as const;

export default en;
export type TranslationKey = keyof typeof en;
