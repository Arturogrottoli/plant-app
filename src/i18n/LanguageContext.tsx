import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import en from './en.json';
import es from './es.json';

export type Lang = 'es' | 'en';

const translations = { es, en } as const;

function getNestedValue(obj: Record<string, any>, key: string): string {
  const value = key.split('.').reduce((current, k) => current?.[k], obj);
  return typeof value === 'string' ? value : key;
}

function interpolate(str: string, vars: Record<string, any>): string {
  return Object.entries(vars).reduce(
    (result, [k, v]) => result.replace(new RegExp(`{{${k}}}`, 'g'), String(v)),
    str
  );
}

interface LangContextType {
  lang: Lang;
  t: (key: string, vars?: Record<string, any>) => string;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextType>({
  lang: 'es',
  t: (key) => key,
  setLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es');

  useEffect(() => {
    AsyncStorage.getItem('@app_language').then((saved) => {
      if (saved === 'es' || saved === 'en') setLangState(saved);
    });
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, any>): string => {
      const value = getNestedValue(translations[lang] as Record<string, any>, key);
      if (vars) return interpolate(value, vars);
      return value;
    },
    [lang]
  );

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    AsyncStorage.setItem('@app_language', newLang);
  }, []);

  return (
    <LangContext.Provider value={{ lang, t, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
