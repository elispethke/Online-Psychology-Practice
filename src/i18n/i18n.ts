import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import pt from './pt.json'
import en from './en.json'
import de from './de.json'

export const LANGUAGES = [
  { code: 'pt', label: 'PT', flag: '🇧🇷', name: 'Português' },
  { code: 'en', label: 'EN', flag: '🇬🇧', name: 'English' },
  { code: 'de', label: 'DE', flag: '🇩🇪', name: 'Deutsch' },
] as const

export type LanguageCode = (typeof LANGUAGES)[number]['code']

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
      de: { translation: de },
    },

    lng: 'pt',
    fallbackLng: 'pt',

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  })

export default i18n