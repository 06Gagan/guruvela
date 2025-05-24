// src/contexts/LanguageContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('guruvela-lang') || 'en'; // Default to English
  });

  useEffect(() => {
    localStorage.setItem('guruvela-lang', language);
  }, [language]);

  const changeLanguage = (langCode) => {
    setLanguage(langCode);
  };

  const supportedLanguages = ['en', 'hi-en', 'te-en'];
  const currentActiveLanguage = supportedLanguages.includes(language) ? language : 'en';

  return (
    <LanguageContext.Provider value={{ language: currentActiveLanguage, changeLanguage, supportedLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};