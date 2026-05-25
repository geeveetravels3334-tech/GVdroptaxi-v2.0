import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, translations } from '../translations.ts';

interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
}

export const availableLanguages: LanguageConfig[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  fontClass: string;
  availableLanguages: LanguageConfig[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('geevee_language');
      return (saved as Language) || 'en';
    } catch {
      return 'en';
    }
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem('geevee_language', lang);
    } catch (e) {
      console.error('Failed to save language', e);
    }
  };

  const rawT = translations[language] || translations.en;
  
  // Create a robust translation object with fallbacks to 'en' for missing properties
  const t = {
    ...translations.en,
    ...rawT,
    // Deep spread for nested complex objects to ensure all keys exist
    nav: { ...translations.en.nav, ...(rawT.nav || {}) },
    booking: { ...translations.en.booking, ...(rawT.booking || {}) },
    hero: { ...translations.en.hero, ...(rawT.hero || {}) },
    packages: { ...translations.en.packages, ...(rawT.packages || {}) },
    packageDetails: { ...translations.en.packageDetails, ...(rawT.packageDetails || {}) },
    packageForm: { ...translations.en.packageForm, ...(rawT.packageForm || {}) }
  } as unknown as typeof translations.en;

  const fontClass = language === 'ta' ? 'font-tamil' : language === 'hi' ? 'font-hindi' : language === 'te' ? 'font-telugu' : language === 'kn' ? 'font-kannada' : 'font-sans';

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, fontClass, availableLanguages }}>
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