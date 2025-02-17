import React, { createContext, useContext, useState, useEffect } from 'react';
import { ContentManager } from './contentManager';
import { translations } from './translations';

type Language = 'en' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, section?: string) => string;
  getLocalizedContent: (type: 'project' | 'page', id: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const contentManager = ContentManager.getInstance();

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string, section?: string): string => {
    try {
      const keys = key.split('.');
      let result = translations[language];
      
      for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
          result = result[k];
        } else {
          return key; // Return the key if translation not found
        }
      }
      
      return typeof result === 'string' ? result : key;
    } catch (error) {
      return key; // Return the key if any error occurs
    }
  };

  const getLocalizedContent = (type: 'project' | 'page', id: string) => {
    if (type === 'project') {
      return contentManager.getProject(id, language);
    }
    return contentManager.getPage(id, language);
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleSetLanguage, 
      t: t as (key: string, section?: string) => string,
      getLocalizedContent 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};