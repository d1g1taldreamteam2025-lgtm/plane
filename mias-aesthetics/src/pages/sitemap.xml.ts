import type { APIRoute } from "astro";
import { SITE } from "../lib/site.ts";
import { SERVICES } from "../data/services.ts";
import { COURSES } from "../data/courses.ts";

export const GET: APIRoute = () => {
  const base = SITE.url.replace(/\/$/, "");
  const today = new Date().toISOString().split("T")[0];

  type Entry = { loc: string; lastmod: string; changefreq: string; priority: string; es?: string; en?: string };
  const entries: Entry[] = [
    {
      loc: `${base}/`,
      lastmod: today,
      changefreq: "weekly",
      priority: "1.0",
      es: `${base}/`,
      en: `${base}/en`,
    },
    {
      loc: `${base}/en`,
      lastmod: today,
      changefreq: "weekly",
      priority: "0.9",
      es: `${base}/`,
      en: `${base}/en`,
    },
  ];

  // Courses index
  entries.push({
    loc: `${base}/cursos`,
    lastmod: today, changefreq: "weekly", priority: "0.9",
    es: `${base}/cursos`, en: `${base}/en/courses`,
  });
  entries.push({
    loc: `${base}/en/courses`,
    lastmod: today, changefreq: "weekly", priority: "0.85",
    es: `${base}/cursos`, en: `${base}/en/courses`,
  });

  // Individual course pages
  for (const c of COURSES) {
    const esUrl = `${base}/cursos/${c.slugs.es}`;
    const enUrl = `${base}/en/courses/${c.slugs.en}`;
    entries.push({ loc: esUrl, lastmod: today, changefreq: "monthly", priority: "0.8",  es: esUrl, en: enUrl });
    entries.push({ loc: enUrl, lastmod: today, changefreq: "monthly", priority: "0.75", es: esUrl, en: enUrl });
  }

  for (const svc of SERVICES) {
    const esUrl = `${base}/servicios/${svc.slugs.es}`;
    const enUrl = `${base}/en/services/${svc.slugs.en}`;
    entries.push({
      loc: esUrl,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.85",
      es: esUrl,
      en: enUrl,
    });
    entries.push({
      loc: enUrl,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.8",
      es: esUrl,
      en: enUrl,
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
  .map(
    (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>${
      e.es
        ? `
    <xhtml:link rel="alternate" hreflang="es" href="${e.es}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${e.en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${e.es}"/>`
        : ""
    }
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
