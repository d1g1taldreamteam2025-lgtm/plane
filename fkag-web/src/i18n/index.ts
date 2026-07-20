import en, { type TranslationKey } from './en';
import es from './es';

export type Lang = 'en' | 'es';
export type { TranslationKey };

export const DEFAULT_LANG: Lang = 'es';

export const dict = { en, es } as const;

/**
 * Traduce una clave a un idioma. Uso en el servidor (Astro):
 *   {t('nav_home', lang)}
 * Con fallback a inglés y, por último, la propia clave.
 */
export function t(key: TranslationKey, lang: Lang = DEFAULT_LANG): string {
  return dict[lang]?.[key] ?? dict.en[key] ?? key;
}
