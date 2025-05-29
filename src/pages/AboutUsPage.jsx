// src/pages/AboutUsPage.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate } from 'react-router-dom';

export default function AboutUsPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayLanguage, setDisplayLanguage] = useState(language);

  const languageLabels = { 'en': 'English', 'hi-en': 'Hinglish', 'te-en': 'Teluguish' };
  const PAGE_IDENTIFIER = 'about-us';

  useEffect(() => {
    const fetchContent = async () => {
      console.log(`AboutUsPage: useEffect triggered. Current language from context: ${language}`);
      setLoading(true);
      setError(null);
      setContent(null);
      let currentLangToFetch = language;
      setDisplayLanguage(language);
      console.log(`AboutUsPage: Attempting to fetch content from 'static_page_content' for page_identifier: '${PAGE_IDENTIFIER}', language_code: '${currentLangToFetch}'`);

      try {
        let { data, error: supabaseError } = await supabase
          .from('static_page_content')
          .select('title, content_markdown, language_code')
          .eq('page_identifier', PAGE_IDENTIFIER)
          .eq('language_code', currentLangToFetch)
          .single();

        console.log(`AboutUsPage: Initial fetch for '${currentLangToFetch}' - Data:`, data, `SupabaseError:`, supabaseError);

        if (supabaseError || !data) {
          console.log(`AboutUsPage: Initial fetch failed or no data. SupabaseError: ${supabaseError?.message}, Data: ${data}`);
          if (currentLangToFetch !== 'en') {
            console.warn(`AboutUsPage: Content in '${currentLangToFetch}' not found or error occurred. Trying English fallback for 'static_page_content'.`);
            
            let { data: fallbackData, error: fallbackError } = await supabase
              .from('static_page_content')
              .select('title, content_markdown, language_code')
              .eq('page_identifier', PAGE_IDENTIFIER)
              .eq('language_code', 'en')
              .single();
            
            console.log(`AboutUsPage: English fallback fetch from 'static_page_content' - FallbackData:`, fallbackData, `FallbackError:`, fallbackError);

            if (fallbackError || !fallbackData) {
              const mainErrorMsg = fallbackError?.message || `About Us page content (from static_page_content) not found in English either for identifier '${PAGE_IDENTIFIER}'.`;
              console.error(`AboutUsPage: English fallback also failed. Error: ${mainErrorMsg}`);
              throw new Error(mainErrorMsg);
            }
            setContent(fallbackData);
            setDisplayLanguage('en');
            console.log(`AboutUsPage: Successfully set content from English fallback (static_page_content).`);
          } else {
            const mainErrorMsg = supabaseError?.message || `About Us page content (from static_page_content) not found for ${currentLangToFetch} and identifier '${PAGE_IDENTIFIER}'.`;
            console.error(`AboutUsPage: Error fetching English content or no data and no fallback (static_page_content). Error: ${mainErrorMsg}`);
            throw new Error(mainErrorMsg);
          }
        } else {
          setContent(data);
          setDisplayLanguage(data.language_code);
          console.log(`AboutUsPage: Successfully set content from 'static_page_content' for language: ${data.language_code}`);
        }
      } catch (err) {
        console.error(`AboutUsPage: Error caught in fetchContent (static_page_content) - Message: ${err.message}`, err);
        setError(err.message);
      } finally {
        setLoading(false);
        console.log(`AboutUsPage: fetchContent (static_page_content) finished. Loading: false.`);
      }
    };

    fetchContent();
  }, [language]);

  console.log(`AboutUsPage: Rendering component - Loading: ${loading}, Error: ${error}, Content:`, content, `DisplayLanguage: ${displayLanguage}`);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card text-center p-6">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Content Not Found</h1>
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
  
  if (!content && !loading) {
     return (
      <div className="container mx-auto px-4 py-8">
        <div className="card text-center p-6">
          <h1 className="text-xl font-bold text-gray-700 mb-4">Content Not Available</h1>
          <p className="text-gray-600 mb-6 text-sm">
            The "About Us" information is currently not available.
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-start mb-6">
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
      <div className="max-w-4xl mx-auto card">
        {displayLanguage !== language && content && (
          <p className="text-sm text-yellow-800 bg-yellow-100 p-3 rounded-md mb-6 border border-yellow-200">
            Note: Content for '{languageLabels[language] || language}' was not found. Displaying in {languageLabels[displayLanguage] || displayLanguage}.
          </p>
        )}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{content?.title}</h1>
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{content?.content_markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}