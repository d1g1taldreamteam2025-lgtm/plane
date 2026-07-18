export const SITE = {
  name: "Mia's Aesthetics",
  domain: "miasaesthetics.com",
  url: "https://miasaesthetics.com",
  owner: "Erlym Monasterios",

  // WhatsApp (mensajería)
  whatsappNumber: "16573482465",
  whatsappDisplay: "+1 (657) 348-2465",

  // Teléfono fijo del local (para "Llamar" — de Google Maps)
  phone: "+17149428683",
  phoneDisplay: "(714) 942-8683",

  email: "erlym.monasterios@miaesthetics.com",
  address: "5031 E Orangethorpe Ave unit g, Anaheim, CA 92807",
  addressShort: "5031 E Orangethorpe Ave, Anaheim",
  city: "Anaheim, CA",
  geo: { lat: 33.852, lng: -117.808 },

  social: {
    instagram: "https://www.instagram.com/mias_aesthetics8",
    instagramHandle: "@mias_aesthetics8",
    facebook: "https://www.facebook.com/mialashesca/",
    tiktok: "https://www.tiktok.com/@mialashseu",
    googleMaps: "https://maps.app.goo.gl/ZWDJmPyHTrUUqbH5A",
  },
  // Iconos: TODOS vivían en Cloudinary drbc4wbvw (cuenta muerta). Ahora
  // apuntan a /public/media/ con nombres semánticos. Cuando se re-suban
  // los archivos con esos nombres, cargan automáticamente. Los faltantes
  // simplemente muestran alt text hasta entonces (los componentes ya tienen
  // fallback SVG donde importa).
  icons: {
    instagram:  "/media/social-instagram.png",
    facebook:   "/media/social-facebook.png",
    tiktok:     "/media/social-tiktok.png",
    googleMaps: "/media/social-google-maps.png",
    google:     "/media/icon-google.png",
    gmail:      "/media/icon-gmail.png",
    whatsapp:   "/media/icon-whatsapp.png",
    logoFull:   "/LOGO-02.png", // ya existe local
    logoMark:   "/LOGO-02.png", // reutiliza mismo logo
    erlymPhoto: "/media/erlym-photo.jpg",
    flagEs:     "/media/flag-es.png",
    flagEn:     "/media/flag-en.png",
  },
  payments: [
    { name: "Visa", icon: "/payments/visa.svg" },
    { name: "Mastercard", icon: "/payments/mastercard.svg" },
    { name: "American Express", icon: "/payments/amex.svg" },
    { name: "Zelle", icon: "/payments/zelle.svg" },
  ],

  // Horarios estructurados (clave: 0 = Domingo, 6 = Sábado, en horario local de Anaheim)
  hoursStruct: [
    { day: 1, open: "09:00", close: "19:00" }, // Lun
    { day: 2, open: "09:00", close: "19:00" }, // Mar
    { day: 3, open: "09:00", close: "19:00" }, // Mié
    { day: 4, open: "09:00", close: "19:00" }, // Jue
    { day: 5, open: "09:00", close: "19:00" }, // Vie
    { day: 6, open: "10:00", close: "16:00" }, // Sáb
    // Domingo cerrado
  ] as { day: number; open: string; close: string }[],

  hours: {
    es: [
      { day: "Lun – Vie", time: "09:00 – 19:00" },
      { day: "Sábado", time: "10:00 – 16:00" },
      { day: "Domingo", time: "Cerrado" },
    ],
    en: [
      { day: "Mon – Fri", time: "9:00 AM – 7:00 PM" },
      { day: "Saturday", time: "10:00 AM – 4:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
  },
} as const;

export function waLink(text: string): string {
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${SITE.whatsappNumber}?text=${encoded}`;
}

export function telLink(): string {
  return `tel:${SITE.phone}`;
}
