// src/i18n/index.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import es from './es.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en', // Change this to set the default language
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  interpolation: {
    escapeValue: false, // Not needed for React
  },
});

export default i18n;
