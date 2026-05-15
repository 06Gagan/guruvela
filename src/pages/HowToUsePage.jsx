// src/pages/HowToUsePage.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Ensure this path is correct for your project
import { useLanguage } from '../contexts/LanguageContext';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate } from 'react-router-dom';
import { HelpCircle, ChevronRight, AlertCircle, Info } from 'lucide-react';

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
      setDisplayLanguage(language); 

      try {
        // Attempt to fetch content in the selected language
        let { data, error: supabaseError } = await supabase
          .from('how_to_use_page_translations') 
          .select('title, content_markdown, language_code')
          .eq('language_code', currentLangToFetch)
          .single();

        if (supabaseError || !data) {
          // If not found and current language is not English, try English fallback
          if (currentLangToFetch !== 'en') {
            console.warn(`"How to Use" content in '${currentLangToFetch}' not found. Trying English fallback.`);
            setDisplayLanguage('en'); 
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
          setDisplayLanguage(data.language_code); 
        }
      } catch (err) {
        console.error(`Error fetching "How to Use" content for language: ${currentLangToFetch}`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [language]); 

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
          <h1 className="text-xl font-bold text-red-600 mb-4">Error Loading Page</h1>
          <p className="text-gray-600 mb-6 text-sm">{error}</p>
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
          <h1 className="text-xl font-bold text-gray-700 mb-4">Content Not Available</h1>
          <p className="text-gray-600 mb-6 text-sm">
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
    <div className="w-full bg-[#f8fafc] min-h-screen pb-20 font-sans">
      
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 py-12 mb-10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex justify-start mb-4">
            <Link to="/" className="text-primary hover:underline flex items-center text-sm font-medium">
              <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
              Back to Home
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Info className="w-8 h-8 text-primary" />
            {pageTitle || 'How to Use Guruvela'}
          </h1>
          <p className="text-gray-500 text-lg">
            A comprehensive guide on making the most out of our rank prediction models and mentorship services.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 md:p-10">
            {displayLanguage !== language && (
              <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>Note: Content for '{languageLabels[language]}' was not found. Displaying in {languageLabels[displayLanguage]}.</p>
              </div>
            )}
            
            <div className="prose prose-blue max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:text-gray-600"> 
              <ReactMarkdown>{pageMarkdown}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}