// src/components/Layout/Header.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Header() {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isPredictorDropdownOpen, setIsPredictorDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, changeLanguage, supportedLanguages } = useLanguage();
  
  const langDropdownRef = useRef(null);
  const predictorDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null); // Ref for the mobile menu itself

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsLangDropdownOpen(false);
    setIsMobileMenuOpen(false); 
  };

  const closeAllDropdowns = () => {
    setIsLangDropdownOpen(false);
    setIsPredictorDropdownOpen(false);
    setIsMobileMenuOpen(false);
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
      // Check if the click is outside the mobile menu and not on the toggle button
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('button[aria-label="Open navigation menu"]')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary transition-colors duration-150" onClick={closeAllDropdowns}>
            Guruvela
          </Link>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="text-gray-600 hover:text-primary focus:outline-none transition-colors duration-150"
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation Links - Conditional rendering for mobile */}
          <div 
            ref={mobileMenuRef} // Add ref here
            className={`
              absolute top-full left-0 w-full bg-white shadow-lg md:shadow-none md:static md:w-auto md:flex md:items-center md:space-x-3
              ${isMobileMenuOpen ? 'block' : 'hidden'}
              transition-all duration-300 ease-in-out z-40 
              md:p-0
            `}
          >
            <div className="flex flex-col md:flex-row md:items-center md:space-x-3 px-4 py-2 md:p-0">
              {/* Rank Predictor Dropdown */}
              <div className="relative py-2 md:py-0" ref={predictorDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsPredictorDropdownOpen(prev => !prev)}
                  className="w-full text-left md:text-center text-gray-600 hover:text-primary focus:outline-none py-2 px-1 md:px-2 rounded flex items-center justify-between md:justify-start transition-colors duration-150"
                >
                  College Predictor
                  <svg className={`w-4 h-4 inline-block ml-1 transition-transform duration-200 ${isPredictorDropdownOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isPredictorDropdownOpen && (
                  <div className="md:absolute static z-30 md:right-0 mt-1 w-full md:w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                    <Link to="/rank-predictor" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors duration-150" onClick={closeAllDropdowns}>JoSAA Predictor</Link>
                    <Link to="/csab-predictor" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors duration-150" onClick={closeAllDropdowns}>CSAB Predictor</Link>
                  </div>
                )}
              </div>

              <Link to="/mentors" className="text-gray-600 hover:text-primary py-2 px-1 md:px-2 rounded block transition-colors duration-150" onClick={closeAllDropdowns}>Mentors</Link>
              <Link to="/pages/about-us" className="text-gray-600 hover:text-primary py-2 px-1 md:px-2 rounded block transition-colors duration-150" onClick={closeAllDropdowns}>About</Link>
              <Link to="/how-to-use" className="text-gray-600 hover:text-primary py-2 px-1 md:px-2 rounded block transition-colors duration-150" onClick={closeAllDropdowns}>How to Use</Link> {/* Updated Link */}
              <Link to="/faqs" className="text-gray-600 hover:text-primary py-2 px-1 md:px-2 rounded block transition-colors duration-150" onClick={closeAllDropdowns}>FAQ & Guides</Link>

              {/* Language Dropdown */}
              <div className="relative py-2 md:py-0" ref={langDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsLangDropdownOpen(prev => !prev)}
                  className="w-full text-left md:text-center text-gray-600 hover:text-primary focus:outline-none py-2 px-1 md:px-2 rounded flex items-center justify-between md:justify-start transition-colors duration-150"
                >
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 2a8 8 0 015.036 13.561l-1.414-1.414A6 6 0 1010 4V2z" /><path d="M10 2C5.029 2 1 6.03 1 11s4.029 9 9 9c2.905 0 5.513-1.379 7.238-3.595L15.5 14.5A7.001 7.001 0 0010 18c-3.866 0-7-3.134-7-7s3.134-7 7-7a7.001 7.001 0 014.595 1.738l1.778-1.778A8.965 8.965 0 0010 2zm8 5a1 1 0 00-1-1h-4a1 1 0 000 2h1.586l-2.627 2.627a1 1 0 101.414 1.414L16 10.414V12a1 1 0 002 0V7a1 1 0 00-1-1z" /></svg>
                    {languageLabels[language] || 'Language'}
                  </span>
                  <svg className={`w-4 h-4 inline-block ml-1 transition-transform duration-200 md:inline-block ${isLangDropdownOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isLangDropdownOpen && (
                  <div className="md:absolute static z-30 md:right-0 mt-1 w-full md:w-36 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                    {supportedLanguages.map((langCode) => (
                      <button key={langCode} onClick={() => handleLanguageChange(langCode)}
                        className={`block w-full text-left px-4 py-2 text-sm ${language === langCode ? 'bg-primary text-white' : 'text-gray-700'} hover:bg-gray-100 hover:text-primary transition-colors duration-150`}
                      >
                        {languageLabels[langCode]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}