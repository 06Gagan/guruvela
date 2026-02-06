// src/components/Layout/Header.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Header() {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isPredictorDropdownOpen, setIsPredictorDropdownOpen] = useState(false);
  const [isDocumentsDropdownOpen, setIsDocumentsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, changeLanguage, supportedLanguages } = useLanguage();
  const location = useLocation();
  
  const langDropdownRef = useRef(null);
  const predictorDropdownRef = useRef(null);
  const documentsDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsLangDropdownOpen(false);
    setIsMobileMenuOpen(false); 
  };

  const closeAllDropdowns = () => {
    setIsLangDropdownOpen(false);
    setIsPredictorDropdownOpen(false);
    setIsDocumentsDropdownOpen(false);
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
      if (documentsDropdownRef.current && !documentsDropdownRef.current.contains(event.target)) {
        setIsDocumentsDropdownOpen(false);
      }
      if (mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target) &&
          !event.target.closest('button[aria-label*="navigation menu"]')
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 text-gray-800 sticky top-0 z-50 transition-all duration-300">
      <nav className="container mx-auto px-4 py-3" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-black text-primary tracking-tight"
            onClick={closeAllDropdowns}
            aria-label="Guruvela Home"
          >
            Guruvela
          </Link>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors duration-150"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu-panel"
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

          {/* Navigation Links Panel */}
          <div
            id="mobile-menu-panel"
            ref={mobileMenuRef}
            className={`
              absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg md:shadow-none
              md:static md:w-auto md:flex md:items-center md:space-x-1 lg:space-x-4
              ${isMobileMenuOpen ? 'block' : 'hidden'}
              transition-all duration-300 ease-in-out z-40
              md:p-0 md:bg-transparent md:border-none
            `}
          >
            <div className="flex flex-col md:flex-row md:items-center md:space-x-1 lg:space-x-4 px-4 py-4 md:p-0">

              {/* Predictor Dropdown */}
              <div className="relative py-2 md:py-0" ref={predictorDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsPredictorDropdownOpen(prev => !prev)}
                  className={`w-full text-left md:text-center py-2 px-3 rounded-md flex items-center justify-between md:justify-start transition-colors duration-150 font-medium
                    ${isPredictorDropdownOpen ? 'text-primary bg-blue-50' : 'text-gray-700 hover:text-primary hover:bg-gray-50'}`}
                  aria-expanded={isPredictorDropdownOpen}
                  aria-controls="predictor-dropdown"
                >
                  College Predictor
                  <svg className={`w-4 h-4 inline-block ml-1 transition-transform duration-200 ${isPredictorDropdownOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isPredictorDropdownOpen && (
                  <div 
                    id="predictor-dropdown"
                    className="md:absolute static z-30 md:right-0 mt-1 w-full md:w-48 bg-white rounded-lg shadow-xl py-1 border border-gray-100"
                    role="menu"
                  >
                    <Link 
                      to="/rank-predictor" 
                      className={`block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary transition-colors duration-150 ${isActive('/rank-predictor') ? 'text-primary bg-blue-50 font-semibold' : 'text-gray-700'}`}
                      onClick={closeAllDropdowns}
                      role="menuitem"
                    >
                      JoSAA Predictor
                    </Link>
                    <Link 
                      to="/csab-predictor" 
                      className={`block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary transition-colors duration-150 ${isActive('/csab-predictor') ? 'text-primary bg-blue-50 font-semibold' : 'text-gray-700'}`}
                      onClick={closeAllDropdowns}
                      role="menuitem"
                    >
                      CSAB Predictor
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Documents Dropdown */}
              <div className="relative py-2 md:py-0" ref={documentsDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDocumentsDropdownOpen(prev => !prev)}
                  className={`w-full text-left md:text-center py-2 px-3 rounded-md flex items-center justify-between md:justify-start transition-colors duration-150 font-medium
                    ${isDocumentsDropdownOpen ? 'text-primary bg-blue-50' : 'text-gray-700 hover:text-primary hover:bg-gray-50'}`}
                  aria-expanded={isDocumentsDropdownOpen}
                  aria-controls="documents-dropdown"
                >
                  Documents
                  <svg className={`w-4 h-4 inline-block ml-1 transition-transform duration-200 ${isDocumentsDropdownOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isDocumentsDropdownOpen && (
                  <div
                    id="documents-dropdown"
                    className="md:absolute static z-30 md:right-0 mt-1 w-full md:w-48 bg-white rounded-lg shadow-xl py-1 border border-gray-100"
                    role="menu"
                  >
                    <Link
                      to="/josaa-documents"
                      className={`block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary transition-colors duration-150 ${isActive('/josaa-documents') ? 'text-primary bg-blue-50 font-semibold' : 'text-gray-700'}`}
                      onClick={closeAllDropdowns}
                      role="menuitem"
                    >
                      JoSAA Documents
                    </Link>
                    <a
                      href="https://drive.google.com/file/d/1Ycew4aaCgDVYfyLI8-H7YtZ9ff4WiQNw/view?usp=sharing" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors duration-150"
                      onClick={closeAllDropdowns}
                      role="menuitem"
                    >
                      CSAB Documents
                    </a>
                  </div>
                )}
              </div>

              <Link 
                to="/preference-guides"
                className={`nav-link block py-2 px-3 rounded-md ${isActive('/preference-guides') ? 'nav-link-active bg-blue-50' : ''}`}
                onClick={closeAllDropdowns}
              >
                Preference Guides
              </Link>

              <Link 
                to="/mentors" 
                className={`nav-link block py-2 px-3 rounded-md ${isActive('/mentors') ? 'nav-link-active bg-blue-50' : ''}`}
                onClick={closeAllDropdowns}
              >
                Mentors
              </Link>

              <Link
                to="/merchandise"
                className={`nav-link block py-2 px-3 rounded-md ${isActive('/merchandise') ? 'nav-link-active bg-blue-50' : ''}`}
                onClick={closeAllDropdowns}
              >
                Merchandise
              </Link>

              {/* Language Dropdown */}
              <div className="relative py-2 md:py-0" ref={langDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsLangDropdownOpen(prev => !prev)}
                  className={`w-full text-left md:text-center py-2 px-3 rounded-md flex items-center justify-between md:justify-start transition-colors duration-150 font-medium
                    ${isLangDropdownOpen ? 'text-primary bg-blue-50' : 'text-gray-700 hover:text-primary hover:bg-gray-50'}`}
                  aria-expanded={isLangDropdownOpen}
                  aria-controls="language-dropdown"
                >
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2a8 8 0 015.036 13.561l-1.414-1.414A6 6 0 1010 4V2z" />
                      <path d="M10 2C5.029 2 1 6.03 1 11s4.029 9 9 9c2.905 0 5.513-1.379 7.238-3.595L15.5 14.5A7.001 7.001 0 0010 18c-3.866 0-7-3.134-7-7s3.134-7 7-7a7.001 7.001 0 014.595 1.738l1.778-1.778A8.965 8.965 0 0010 2zm8 5a1 1 0 00-1-1h-4a1 1 0 000 2h1.586l-2.627 2.627a1 1 0 101.414 1.414L16 10.414V12a1 1 0 002 0V7a1 1 0 00-1-1z" />
                    </svg>
                    {languageLabels[language] || 'Language'}
                  </span>
                  <svg className={`w-4 h-4 inline-block ml-1 transition-transform duration-200 ${isLangDropdownOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isLangDropdownOpen && (
                  <div 
                    id="language-dropdown"
                    className="md:absolute static z-30 md:right-0 mt-1 w-full md:w-36 bg-white rounded-lg shadow-xl py-1 border border-gray-100"
                    role="menu"
                  >
                    {supportedLanguages.map((langCode) => (
                      <button 
                        key={langCode} 
                        onClick={() => handleLanguageChange(langCode)}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-150
                          ${language === langCode ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-primary'}`}
                        role="menuitem"
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
