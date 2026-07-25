/**
 * Proxy de imágenes de vehículos (mismo dominio).
 *
 * Las fotos del inventario viven en CDNs de terceros (pictures.dealer.com,
 * cdn05.carsforsale.com). Algunos de esos hosts bloquean el hotlinking desde
 * el navegador (y los ad-blockers también los cortan), así que el sitio las
 * pide a /api/img?u=<url> y esta función las descarga del lado del servidor
 * y las sirve desde familykeyautogroup.com — nada que bloquear.
 *
 * Solo se permiten los CDNs de la allowlist (evita que sea un proxy abierto).
 * La respuesta se cachea en el edge de Vercel por 30 días.
 */
const ALLOWED = /^https:\/\/([a-z0-9-]+\.)*(dealer\.com|carsforsale\.com|dealercdn\.com|homenetiol\.com|edmunds-media\.com)\//i;

export default async function handler(req, res) {
  const u = req.query && req.query.u;
  if (!u || typeof u !== 'string' || !ALLOWED.test(u)) {
    res.status(400).send('Bad request');
    return;
  }
  try {
    const r = await fetch(u, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; FKAG-ImageProxy/1.0)' },
      redirect: 'follow',
    });
    if (!r.ok) {
      // Propaga el error (p. ej. 403/404 de una foto muerta) para que el
      // fallback de galería del cliente pase a la siguiente imagen.
      res.status(r.status).end();
      return;
    }
    const type = r.headers.get('content-type') || 'image/jpeg';
    if (!type.startsWith('image/')) {
      res.status(415).end();
      return;
    }
    const buf = Buffer.from(await r.arrayBuffer());
    res.setHeader('Content-Type', type);
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400');
    res.status(200).send(buf);
  } catch (e) {
    res.status(502).end();
  }
}
