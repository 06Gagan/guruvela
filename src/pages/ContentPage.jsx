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
      console.log(`ContentPage: useEffect triggered for slug: '${slug}', language from context: '${language}'`);
      if (!slug) {
        setError('Page slug is missing.');
        setLoading(false);
        console.error("ContentPage: Slug is missing.");
        return;
      }
      
      setLoading(true);
      setError(null);
      setPageData(null);
      let currentLangToFetch = language;
      setDisplayLanguage(language);
      console.log(`ContentPage: Attempting to fetch content for slug: '${slug}', language: '${currentLangToFetch}' from 'content_pages' table.`);

      try {
        let { data, error: supabaseError } = await supabase
          .from('content_pages')
          .select('title, content_markdown, language, page_type')
          .eq('slug', slug)
          .eq('language', currentLangToFetch);

        console.log(`ContentPage: Initial fetch for '${currentLangToFetch}' - SupabaseError:`, supabaseError, `Data:`, data);

        let foundContent = null;

        if (supabaseError) {
          console.error(`ContentPage: Supabase error on initial fetch for '${currentLangToFetch}':`, supabaseError.message);
        } else if (data && data.length === 1) {
          foundContent = data[0];
          console.log(`ContentPage: Found one entry for slug '${slug}' in '${currentLangToFetch}'.`);
        } else if (data && data.length > 1) {
          console.warn(`ContentPage: Found multiple entries (${data.length}) for slug '${slug}' in '${currentLangToFetch}'. Using the first one.`);
          foundContent = data[0]; 
        }
        
        if ((!foundContent || supabaseError) && currentLangToFetch !== 'en') {
          console.warn(`ContentPage: Content for slug '${slug}' in '${currentLangToFetch}' not definitively found or error occurred. Trying English fallback for 'content_pages'.`);
          
          let { data: fallbackData, error: fallbackError } = await supabase
            .from('content_pages')
            .select('title, content_markdown, language, page_type')
            .eq('slug', slug)
            .eq('language', 'en');

          console.log(`ContentPage: English fallback fetch from 'content_pages' - FallbackError:`, fallbackError, `FallbackData:`, fallbackData);

          if (fallbackError) {
            console.error(`ContentPage: Supabase error on English fallback fetch:`, fallbackError.message);
            throw new Error(fallbackError.message || `Page "${slug}" content (from content_pages) encountered an error during English fallback.`);
          } else if (fallbackData && fallbackData.length === 1) {
            foundContent = fallbackData[0];
            setDisplayLanguage('en');
            console.log(`ContentPage: Found one entry for slug '${slug}' in English (fallback from content_pages).`);
          } else if (fallbackData && fallbackData.length > 1) {
            console.warn(`ContentPage: Found multiple entries (${fallbackData.length}) for slug '${slug}' in English (fallback from content_pages). Using the first one.`);
            foundContent = fallbackData[0];
            setDisplayLanguage('en');
          } else {
            throw new Error(`Page "${slug}" content not found in selected language or in English (from content_pages).`);
          }
        } else if (!foundContent && currentLangToFetch === 'en') {
           throw new Error(supabaseError?.message || `Page "${slug}" content not found in English (from content_pages).`);
        }

        if (foundContent) {
          setPageData(foundContent);
          setDisplayLanguage(foundContent.language);
          console.log(`ContentPage: Successfully set pageData for language: ${foundContent.language}`);
        } else if (!supabaseError) { 
          throw new Error(`Page "${slug}" content could not be loaded for language '${currentLangToFetch}' (from content_pages).`);
        }

      } catch (err) {
        console.error(`ContentPage: Final error in fetchContent for slug: '${slug}', language: '${currentLangToFetch}' - Message: ${err.message}`, err);
        setError(err.message);
      } finally {
        setLoading(false);
        console.log(`ContentPage: fetchContent (content_pages) finished. Loading: false.`);
      }
    };

    fetchContent();
  }, [slug, language]);

  console.log(`ContentPage: Rendering component - Slug: ${slug}, Loading: ${loading}, Error: ${error}, PageData:`, pageData);

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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">{pageData.title}</h1>
            <div className="prose max-w-none">
              <ReactMarkdown>{pageData.content_markdown}</ReactMarkdown>
            </div>
          </>
        )}
      </div>
    </article>
  );
}