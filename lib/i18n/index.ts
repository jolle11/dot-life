"use client";

import { createContext, useContext } from "react";
import { ar } from "./ar";
import { ca } from "./ca";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { hi } from "./hi";
import { it } from "./it";
import { ja } from "./ja";
import { ko } from "./ko";
import { pt } from "./pt";
import { zh } from "./zh";
import type { Locale, Translations } from "./types";

export type { Locale, Translations };

export const locales: Record<Locale, Translations> = {
  es, ca, en, fr, de, pt, it, ja, ko, zh, ar, hi,
};

export const LOCALE_STORAGE_KEY = "dot-life-locale";

const DATE_LOCALES: Record<Locale, string> = {
  es: "es-ES",
  ca: "ca-ES",
  en: "en-US",
  fr: "fr-FR",
  de: "de-DE",
  pt: "pt-BR",
  it: "it-IT",
  ja: "ja-JP",
  ko: "ko-KR",
  zh: "zh-CN",
  ar: "ar-SA",
  hi: "hi-IN",
};

export function getDateLocale(locale: Locale): string {
  return DATE_LOCALES[locale];
}

export function getNumberLocale(locale: Locale): string {
  return DATE_LOCALES[locale];
}

const I18nContext = createContext<Translations>(es);

export const I18nProvider = I18nContext.Provider;

export function useT(): Translations {
  return useContext(I18nContext);
}
