
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { languages } from '../i18n/i18n';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
  languages: typeof languages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize with the current language from i18n
  const [currentLanguage, setCurrentLanguage] = useState(
    i18n.language?.split('-')[0] || 'en'
  );
  
  // When the language changes, update routes and localStorage
  const changeLanguage = (lang: string) => {
    if (lang === currentLanguage) return; // Prevent unnecessary updates
    
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    
    // Update URL to reflect the language change
    const pathParts = location.pathname.split('/');
    
    // If the first segment is a language code, replace it
    if (Object.keys(languages).includes(pathParts[1])) {
      pathParts[1] = lang;
      navigate(pathParts.join('/') + location.search);
    } else {
      // Otherwise, prepend the language code
      navigate(`/${lang}${location.pathname}${location.search}`);
    }
  };
  
  // Effect to sync language with URL on initial load only
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const langInUrl = pathParts[1];
    
    if (Object.keys(languages).includes(langInUrl) && langInUrl !== currentLanguage) {
      // If URL has valid language code that's different from current
      i18n.changeLanguage(langInUrl);
      setCurrentLanguage(langInUrl);
    } else if (!Object.keys(languages).includes(langInUrl)) {
      // If URL has no language code, redirect to include it
      navigate(`/${currentLanguage}${location.pathname}${location.search}`, {
        replace: true
      });
    }
    // Include location.pathname in deps to avoid infinite loops
  }, [location.pathname, i18n, navigate, currentLanguage]);
  
  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};
