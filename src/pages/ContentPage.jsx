// src/pages/ContentPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../contexts/LanguageContext';

export default function ContentPage() {
  const { slug } = useParams(); 
  const { language } = useLanguage(); 
  const navigate = useNavigate();

  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayLanguage, setDisplayLanguage] = useState(language);

  const languageLabels = { 'en': 'English', 'hi-en': 'Hinglish', 'te-en': 'Teluguish' };

  useEffect(() => {
    const fetchContent = async () => {
      if (!slug) {
        setError('Page slug is missing.'); 
        setLoading(false); 
        return;
      }
      setLoading(true); 
      setError(null); 
      setPageData(null);
      let currentLangToFetch = language;
      setDisplayLanguage(language);

      try {
        let { data, error: supabaseError } = await supabase
          .from('content_pages') 
          .select('title, content_markdown, language, page_type') 
          .eq('slug', slug)
          .eq('language', currentLangToFetch) 
          .single();

        if (supabaseError || !data) {
          if (currentLangToFetch !== 'en') {
            console.warn(`Content for slug '${slug}' in '${currentLangToFetch}' not found. Trying English fallback.`);
            setDisplayLanguage('en'); 
            let { data: fallbackData, error: fallbackError } = await supabase
              .from('content_pages')
              .select('title, content_markdown, language, page_type')
              .eq('slug', slug)
              .eq('language', 'en')
              .single();
            
            if (fallbackError || !fallbackData) {
              throw new Error(fallbackError?.message || `Page "${slug}" not found in English or the selected language.`);
            }
            setPageData(fallbackData);
          } else { 
            throw new Error(supabaseError?.message || `Page "${slug}" not found.`);
          }
        } else {
         setPageData(data);
         setDisplayLanguage(data.language); 
        }
      } catch (err) {
        console.error(`Error fetching content for slug: ${slug}, language: ${currentLangToFetch}`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [slug, language]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="card text-center p-6">
          <h1 className="text-xl font-bold text-red-600 mb-4">Oops! Content Not Found</h1>
          <p className="text-gray-600 mb-6 text-sm">{error || `The page content for "${slug}" could not be loaded.`}</p>
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
       <div className="flex justify-start mb-6">
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
      <div className="card p-6 md:p-8">
        {pageData && (
          <>
            {displayLanguage !== language && (
              <p className="text-sm text-yellow-800 bg-yellow-100 p-3 rounded-md mb-6 border border-yellow-200">
                Note: Content for '{languageLabels[language]}' was not found. Displaying in {languageLabels[displayLanguage]}.
              </p>
            )}
            {/* Main page title - font size reduced */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">{pageData.title}</h1>
            {/* Using "prose" for default Tailwind Typography styling (smaller than prose-lg) */}
            <div className="prose max-w-none"> {/* Ensured this is 'prose' and not 'prose-lg' */}
              <ReactMarkdown>{pageData.content_markdown}</ReactMarkdown>
            </div>
          </>
        )}
      </div>
    </article>
  );
}