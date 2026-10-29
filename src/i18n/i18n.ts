import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pt from "./pt.json";
import en from "./en.json";
import de from "./de.json";
import { parseRoute } from "@/lib/route";

export const LANGUAGES = [
  { code: "pt", label: "PT", name: "Português" },
  { code: "en", label: "EN", name: "English" },
] as const;

export type LanguageCode = typeof LANGUAGES[number]["code"];

i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: pt },
    en: { translation: en },
    de: { translation: de },
  },

  // Language comes from the URL: "/" = Português (default for every new visitor), "/en" = English.
  lng: parseRoute(window.location.pathname).lang,
  fallbackLng: "pt",

  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: false,
  },
});

export default i18n;
