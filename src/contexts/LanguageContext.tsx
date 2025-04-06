
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { languages } from '../i18n/i18n';

type LanguageContextType = {
  currentLanguage: keyof typeof languages;
  changeLanguage: (lang: keyof typeof languages) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  changeLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<keyof typeof languages>('en');

  useEffect(() => {
    // Initialize with browser language if it's supported, otherwise use default
    const browserLang = navigator.language.split('-')[0] as keyof typeof languages;
    const initialLang = Object.keys(languages).includes(browserLang) ? browserLang : 'en';
    
    setCurrentLanguage(initialLang);
    i18n.changeLanguage(initialLang);
  }, [i18n]);

  const changeLanguage = (lang: keyof typeof languages) => {
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
