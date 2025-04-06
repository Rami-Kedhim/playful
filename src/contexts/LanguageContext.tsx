
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Language, languages } from '../i18n/i18n';

type LanguageContextType = {
  currentLanguage: Language;
  changeLanguage: (lang: Language) => void;
  languages: typeof languages;
};

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  changeLanguage: () => {},
  languages
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    // Initialize with browser language if it's supported, otherwise use default
    const browserLang = navigator.language.split('-')[0] as Language;
    const initialLang = Object.keys(languages).includes(browserLang) ? browserLang : 'en';
    
    setCurrentLanguage(initialLang as Language);
    i18n.changeLanguage(initialLang);
  }, [i18n]);

  const changeLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};
