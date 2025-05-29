// src/pages/HowToUsePage.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Ensure this path is correct for your project
import { useLanguage } from '../contexts/LanguageContext';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate } from 'react-router-dom';

export default function HowToUsePage() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [pageTitle, setPageTitle] = useState('');
  const [pageMarkdown, setPageMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayLanguage, setDisplayLanguage] = useState(language);

  const languageLabels = { 'en': 'English', 'hi-en': 'Hinglish', 'te-en': 'Teluguish' };

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      setPageTitle('');
      setPageMarkdown('');
      let currentLangToFetch = language;
      setDisplayLanguage(language); // Optimistically set display language

      try {
        // Attempt to fetch content in the selected language
        let { data, error: supabaseError } = await supabase
          .from('how_to_use_page_translations') // Using the specific table name
          .select('title, content_markdown, language_code')
          .eq('language_code', currentLangToFetch)
          .single();

        if (supabaseError || !data) {
          // If not found and current language is not English, try English fallback
          if (currentLangToFetch !== 'en') {
            console.warn(`"How to Use" content in '${currentLangToFetch}' not found. Trying English fallback.`);
            setDisplayLanguage('en'); // Set display language to English to show the notice correctly
            let { data: fallbackData, error: fallbackError } = await supabase
              .from('how_to_use_page_translations')
              .select('title, content_markdown, language_code')
              .eq('language_code', 'en')
              .single();
            
            if (fallbackError || !fallbackData) {
              // If English fallback also fails
              throw new Error(fallbackError?.message || "How to Use page content not found in English.");
            }
            // Successfully fetched English fallback
            setPageTitle(fallbackData.title);
            setPageMarkdown(fallbackData.content_markdown);
          } else {
            // If it was English and not found, then it's a genuine error
            throw new Error(supabaseError?.message || "How to Use page content not found.");
          }
        } else {
          // Content found in the selected language
          setPageTitle(data.title);
          setPageMarkdown(data.content_markdown);
          setDisplayLanguage(data.language_code); // Confirm display language
        }
      } catch (err) {
        console.error(`Error fetching "How to Use" content for language: ${currentLangToFetch}`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [language]); // Re-fetch when language changes

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="card text-center p-6">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Page</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }
  
  if (!pageMarkdown && !loading) {
     return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="card text-center p-6">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Content Not Available</h1>
          <p className="text-gray-600 mb-6">
            The "How to Use" guide is currently not available for {languageLabels[displayLanguage] || displayLanguage.toUpperCase()}.
          </p>
           <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto py-8 px-4">
      <div className="card p-6 md:p-8">
        {displayLanguage !== language && (
          <p className="text-sm text-yellow-800 bg-yellow-100 p-3 rounded-md mb-6 border border-yellow-200">
            Note: Content for '{languageLabels[language]}' was not found. Displaying in {languageLabels[displayLanguage]}.
          </p>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
          {pageTitle}
        </h1>
        {/* Using "prose" for default Tailwind Typography styling (smaller than prose-lg) */}
        <div className="prose max-w-none"> 
          <ReactMarkdown>{pageMarkdown}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}