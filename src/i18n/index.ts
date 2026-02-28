import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import es from './es.json';

const LANGUAGE_KEY = '@app_language';

i18next.use(initReactI18next).init({
  lng: 'es',
  fallbackLng: 'es',
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  interpolation: {
    escapeValue: false,
  },
});

// Load saved language from AsyncStorage and apply it
AsyncStorage.getItem(LANGUAGE_KEY).then((savedLang) => {
  if (savedLang && savedLang !== i18next.language) {
    i18next.changeLanguage(savedLang);
  }
});

export async function setLanguage(lang: string) {
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  i18next.changeLanguage(lang);
}

export default i18next;
