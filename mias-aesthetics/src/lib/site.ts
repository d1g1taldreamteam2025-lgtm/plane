export const SITE = {
  name: "Mia's Aesthetics",
  domain: "miasaesthetics.com",
  url: "https://miasaesthetics.com",
  instagram: "https://www.instagram.com/mias_aesthetics8",
  instagramHandle: "@mias_aesthetics8",
  whatsappNumber: "15551234567",
  whatsappDisplay: "+1 (555) 123-4567",
  email: "hello@miasaesthetics.com",
  address: "— Dirección por confirmar —",
  city: "USA",
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
