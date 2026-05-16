export const SITE = {
  name: "Mia's Aesthetics",
  domain: "miasaesthetics.com",
  url: "https://miasaesthetics.com",
  owner: "Erlym Monasterios",
  whatsappNumber: "16573482465",
  whatsappDisplay: "+1 (657) 348-2465",
  email: "erlym.monasterios@miaesthetics.com",
  address: "160 S Old Springs Rd, Anaheim, CA 92808",
  city: "Anaheim, CA",
  social: {
    instagram: "https://www.instagram.com/mias_aesthetics8",
    instagramHandle: "@mias_aesthetics8",
    facebook: "https://www.facebook.com/mialashesca/",
    tiktok: "https://www.tiktok.com/@mialashseu",
    googleMaps: "https://maps.app.goo.gl/ZWDJmPyHTrUUqbH5A",
  },
  icons: {
    instagram: "https://res.cloudinary.com/drbc4wbvw/image/upload/v1778897809/Google_Maps_icon__2026.svg_waaes9.webp",
    facebook: "https://res.cloudinary.com/drbc4wbvw/image/upload/v1778897809/Facebook_Logo__2019.png_plnryr.webp",
    tiktok:
      "https://res.cloudinary.com/drbc4wbvw/image/upload/v1778897809/png-clipart-tik-tok-icon-circle-tech-companies-thumbnail_h6oztk.png",
    googleMaps: "https://res.cloudinary.com/drbc4wbvw/image/upload/v1778897809/Google_Maps_icon__2026.svg_waaes9.webp",
    google: "https://res.cloudinary.com/drbc4wbvw/image/upload/v1778898217/Google_Favicon_2025.svg_gjvcm8.webp",
    gmail: "https://res.cloudinary.com/drbc4wbvw/image/upload/v1778898407/images_p5ftf4.png",
    whatsapp: "https://res.cloudinary.com/drbc4wbvw/image/upload/v1778898491/WhatsApp_icon_ym0yfu.png",
  },
  hours: {
    es: [
      { day: "Lun – Vie", time: "10:00 – 19:00" },
      { day: "Sábado", time: "10:00 – 16:00" },
      { day: "Domingo", time: "Cerrado" },
    ],
    en: [
      { day: "Mon – Fri", time: "10:00 AM – 7:00 PM" },
      { day: "Saturday", time: "10:00 AM – 4:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
  },
} as const;

export function waLink(text: string): string {
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${SITE.whatsappNumber}?text=${encoded}`;
}
