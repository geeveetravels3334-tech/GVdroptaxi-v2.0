import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, translations } from '../translations.ts';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
  fontClass: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = translations[language];
  const fontClass = language === 'ta' ? 'font-tamil' : language === 'hi' ? 'font-hindi' : language === 'te' ? 'font-telugu' : language === 'kn' ? 'font-kannada' : '';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, fontClass }}>
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