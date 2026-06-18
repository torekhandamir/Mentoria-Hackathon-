"use client";

import { useEffect, useState } from "react";
import { Lang, TranslationKey, translations } from "@/data/translations";
import { getLocal, setLocal } from "@/lib/utils";

const missingKeys = new Set<string>();

export function getLanguage() {
  return getLocal<Lang>("mentoria-lang", "ru");
}

export function setLanguage(lang: Lang) {
  setLocal("mentoria-lang", lang);
  if (typeof window !== "undefined") window.dispatchEvent(new Event("mentoria-lang"));
}

export function translate(lang: Lang, key: TranslationKey) {
  const value = translations[lang][key] ?? translations.en[key];
  if (!value) {
    const marker = `${lang}:${key}`;
    if (!missingKeys.has(marker)) {
      missingKeys.add(marker);
      console.warn(`[i18n] Missing translation for ${marker}`);
    }
    return key;
  }
  return value;
}

export function useTranslation() {
  const [lang, setLang] = useState<Lang>(() => getLanguage());

  useEffect(() => {
    const sync = () => setLang(getLanguage());
    window.addEventListener("mentoria-lang", sync);
    return () => window.removeEventListener("mentoria-lang", sync);
  }, []);

  return {
    lang,
    t: (key: TranslationKey) => translate(lang, key),
    setLang: (next: Lang) => setLanguage(next),
  };
}
