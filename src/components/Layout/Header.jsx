// src/components/Layout/Header.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Header() {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isPredictorDropdownOpen, setIsPredictorDropdownOpen] = useState(false);
  const { language, changeLanguage, supportedLanguages } = useLanguage();
  
  const langDropdownRef = useRef(null);
  const predictorDropdownRef = useRef(null);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsLangDropdownOpen(false);
  };

  const languageLabels = {
    'en': 'English',
    'hi-en': 'Hinglish',
    'te-en': 'Teluguish'
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
      if (predictorDropdownRef.current && !predictorDropdownRef.current.contains(event.target)) {
        setIsPredictorDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); // Removed refs from dependency array as they don't change

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Guruvela
          </Link>
          <div className="space-x-3 md:space-x-4 flex items-center">
            {/* Rank Predictor Dropdown */}
            <div className="relative" ref={predictorDropdownRef}>
              <button
                type="button" // Explicitly set type
                onClick={() => setIsPredictorDropdownOpen(prev => !prev)}
                className="text-gray-600 hover:text-primary focus:outline-none py-2 px-1 md:px-2 rounded flex items-center"
              >
                Rank Predictor
                <svg className={`w-4 h-4 inline-block ml-1 transition-transform duration-200 ${isPredictorDropdownOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {isPredictorDropdownOpen && (
                <div className="absolute z-30 right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                  <Link to="/rank-predictor" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary" onClick={() => setIsPredictorDropdownOpen(false)}>JoSAA Predictor</Link>
                  <Link to="/csab-predictor" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary" onClick={() => setIsPredictorDropdownOpen(false)}>CSAB Predictor</Link>
                </div>
              )}
            </div>

            <Link to="/pages/about-us" className="text-gray-600 hover:text-primary py-2 px-1 md:px-2 rounded">About</Link>
            <Link to="/pages/how-to-use" className="text-gray-600 hover:text-primary py-2 px-1 md:px-2 rounded">How to Use</Link>
            <Link to="/faqs" className="text-gray-600 hover:text-primary py-2 px-1 md:px-2 rounded">FAQ & Guides</Link>

            {/* Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button" // Explicitly set type
                onClick={() => setIsLangDropdownOpen(prev => !prev)}
                className="text-gray-600 hover:text-primary focus:outline-none py-2 px-1 md:px-2 rounded flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 2a8 8 0 015.036 13.561l-1.414-1.414A6 6 0 1010 4V2z" /><path d="M10 2C5.029 2 1 6.03 1 11s4.029 9 9 9c2.905 0 5.513-1.379 7.238-3.595L15.5 14.5A7.001 7.001 0 0010 18c-3.866 0-7-3.134-7-7s3.134-7 7-7a7.001 7.001 0 014.595 1.738l1.778-1.778A8.965 8.965 0 0010 2zm8 5a1 1 0 00-1-1h-4a1 1 0 000 2h1.586l-2.627 2.627a1 1 0 101.414 1.414L16 10.414V12a1 1 0 002 0V7a1 1 0 00-1-1z" /></svg>
                {languageLabels[language] || 'Language'}
                <svg className={`w-4 h-4 inline-block ml-1 transition-transform duration-200 ${isLangDropdownOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {isLangDropdownOpen && (
                <div className="absolute z-30 right-0 mt-1 w-36 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                  {supportedLanguages.map((langCode) => (
                    <button key={langCode} onClick={() => handleLanguageChange(langCode)}
                      className={`block w-full text-left px-4 py-2 text-sm ${language === langCode ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-gray-100 hover:text-primary`}
                    >
                      {languageLabels[langCode]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}