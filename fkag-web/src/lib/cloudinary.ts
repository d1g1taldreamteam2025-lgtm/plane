/**
 * Helper de Cloudinary.
 * - cld(publicId, transform): construye una URL con transformaciones
 * - optimize(url): inserta f_auto,q_auto en una URL de Cloudinary ya existente
 *   (para las imágenes que ya tenemos hardcodeadas y queremos servir optimizadas)
 */
import { site } from '../config/site';

const BASE = `https://res.cloudinary.com/${site.cloudinaryCloud}/image/upload`;

export function cld(publicId: string, transform = 'f_auto,q_auto'): string {
  return `${BASE}/${transform}/${publicId}`;
}

export function optimize(url: string, transform = 'f_auto,q_auto'): string {
  if (!url || url.indexOf('/image/upload/') === -1) return url;
  // Evita duplicar transformaciones
  if (url.includes('f_auto') || url.includes('q_auto')) return url;
  return url.replace('/image/upload/', `/image/upload/${transform}/`);
}
