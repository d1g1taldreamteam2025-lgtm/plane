/**
 * Runtime de idioma del lado del cliente.
 * - Lee/escribe localStorage.fkag_lang
 * - Aplica traducciones a todos los [data-i18n] y [data-i18n-placeholder]
 * - Dispara el evento global 'fkag-lang-change' (los scripts migrados
 *   de cada widget lo escuchan, así siguen funcionando sin cambios)
 * - Escucha clics en cualquier [data-lang] o .fkag-lang__btn
 *
 * Se importa una sola vez en BaseLayout.
 */
import { dict, DEFAULT_LANG, type Lang } from '../i18n';

const STORAGE_KEY = 'fkag_lang';

function read(): Lang {
  try {
    const x = localStorage.getItem(STORAGE_KEY);
    if (x === 'en' || x === 'es') return x;
  } catch {
    /* ignore */
  }
  return DEFAULT_LANG;
}

let current: Lang = read();

function apply(): void {
  const table = dict[current] as Record<string, string>;
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const k = el.getAttribute('data-i18n');
    if (k && table[k] != null) el.innerHTML = table[k];
  });
  document
    .querySelectorAll<HTMLElement>('[data-i18n-placeholder]')
    .forEach((el) => {
      const k = el.getAttribute('data-i18n-placeholder');
      if (k && table[k] != null) el.setAttribute('placeholder', table[k]);
    });
  document.documentElement.lang = current;
  syncButtons();
}

function syncButtons(): void {
  document.querySelectorAll<HTMLElement>('[data-lang]').forEach((b) => {
    b.classList.toggle('active', b.getAttribute('data-lang') === current);
  });
}

export function getLang(): Lang {
  return current;
}

export function setLang(lang: Lang): void {
  if (lang === current) return;
  current = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
  apply();
  window.dispatchEvent(new CustomEvent('fkag-lang-change', { detail: { lang } }));
}

function init(): void {
  apply();
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    const btn = target?.closest<HTMLElement>('[data-lang]');
    if (!btn) return;
    const l = btn.getAttribute('data-lang');
    if (l === 'en' || l === 'es') setLang(l);
  });
  // Disponible para scripts inline de widgets migrados que quieran leer/forzar idioma
  (window as unknown as Record<string, unknown>).FKAG = { getLang, setLang };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
