/**
 * Diccionario base (inglés). es.ts está obligado por TypeScript a tener
 * EXACTAMENTE estas mismas claves. Se agregan más al migrar cada página.
 */
const en = {
  // ---- Header / Top bar ----
  header_hours: 'Mon–Sat 9AM–8PM · Sun 11AM–6PM',
  header_address: '170 N Arrowhead Ave STE C 175, CA 92376',
  cta_prequalify: 'Get Pre-Qualified',

  // ---- Navegación ----
  nav_home: 'Home',
  nav_inventory: 'Inventory',
  nav_financing: 'Financing',
  nav_financing_overview: 'Financing Overview',
  nav_financing_apply: 'Apply for Financing',
  nav_about: 'About',
  nav_contact: 'Contact Us',
  nav_faqs: 'FAQs',

  // ---- Marquee ----
  m_sold: '+1,000 Vehicles Sold',
  m_down: 'Low Down Payment',
  m_approval: 'Approval in 60 Seconds',
  m_carfax: 'Free Carfax Included',
  m_inspection: '150+ Point Inspection',

  // ---- Hero ----
  hero_cta_static: 'View Inventory',

  // ---- CTA cards ----
  cta_search_cars: 'Search Cars',
  cta_search_cars_sub: 'Browse our full pre-owned inventory',
  cta_promotions: 'Promotions',
  cta_promotions_sub: 'Vehicles under $20k and exclusive deals',
  cta_financing: 'Financing',
  cta_financing_sub: 'Get pre-qualified in 60 seconds',

  // ---- Dividers ----
  divider_quality: 'WE SELL NEW AND PRE-OWNED VEHICLES',
  divider_family: 'JOIN OUR FAMILY OF +1,000 HAPPY CUSTOMERS',

  // ---- Featured vehicles ----
  feat_title: 'Featured Vehicles',
  feat_sub: 'Hand-picked from our latest arrivals',
  cta_view_all: 'View All Inventory',
  feat_loading: 'Loading featured vehicles...',
  feat_none: 'No featured vehicles yet. Check back soon!',
  feat_error: 'Unable to load featured vehicles.',
  feat_view_details: 'View Details',
  feat_prequalify: 'Pre-Qualify',
  feat_available: 'AVAILABLE',
  feat_featured: 'FEATURED',

  // ---- Brands ----
  brands_eyebrow: 'Top Brands',
  brands_title: 'Brands We Carry',
  brands_sub: 'Quality pre-owned vehicles from the makes you trust.',

  // ---- Reviews ----
  reviews_title: 'What Our Customers Say',
  reviews_count: 'based on 200+ Google reviews',
  review_verified: 'Verified Buyer',
  review_1_quote:
    "\"I knew nothing about financing and they guided me through everything, from picking the car to signing the contract. They clearly explained the term, the annual interest, and which option was best for me. You can feel they're really on your side and not just trying to sell you.\"",
  review_2_quote:
    '"Honestly, I was nervous about the contract and the fine print, but here they explained absolutely everything. They broke down the annual interest, payments, and conditions without runarounds. For the first time I felt I understood what I was signing. That\'s worth a lot."',
  review_3_quote:
    '"With other dealers there are always hidden fees at the end, but not here. From the start they gave me the final number with taxes, fees, and everything included. The contract was exactly what they explained — no surprises. Very transparent."',

  // ---- SEO block ----
  seo_title: 'Your Trusted Used Car Dealer',
  seo_p1: 'Family Key Auto Group helps families find the right vehicle for their lifestyle and budget.',
  seo_h3_1: 'What Makes Us Different',
  seo_p2: 'Every vehicle goes through a multi-point inspection. We work with a wide network of lenders.',
  seo_h3_2: 'Brands We Carry',
  seo_p3: 'Honda, Toyota, Ford, Chevrolet, Hyundai, Kia, Nissan, Jeep, Mazda, Renault and more.',

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
