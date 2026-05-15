import es from "./es.json";
import en from "./en.json";

export type Lang = "es" | "en";
export const DEFAULT_LANG: Lang = "es";
export const LANGS: Lang[] = ["es", "en"];

const dictionaries = { es, en } as const;

export function getDict(lang: Lang) {
  return dictionaries[lang] ?? dictionaries[DEFAULT_LANG];
}

export function t(lang: Lang, path: string): string {
  const parts = path.split(".");
  let cur: unknown = getDict(lang);
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return path;
    }
  }
  return typeof cur === "string" ? cur : path;
}
