
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';

// Define the available languages
export const languages = {
  en: { name: 'English', flag: '🇺🇸' },
  es: { name: 'Español', flag: '🇪🇸' }
};

export type Language = keyof typeof languages;

// Initialize i18n instance
i18n
  // detect language from browser
  .use(LanguageDetector)
  // pass i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    resources: {
      en: {
        common: enCommon
      },
      es: {
        common: esCommon
      }
    },
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    
    // default namespace used if not passed to translation function
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    }
  });

export default i18n;
