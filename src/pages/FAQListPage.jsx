// src/pages/FAQListPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

export default function FAQListPage() {
  const { language } = useLanguage();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const languageLabels = { 'en': 'English', 'hi-en': 'Hinglish', 'te-en': 'Teluguish' };

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error: supabaseError } = await supabase
          .from('content_pages')
          .select('title, slug, page_type, language')
          .eq('language', language) 
          .or('page_type.eq.faq,page_type.eq.guide')
          .order('title', { ascending: true });

        if (supabaseError) throw supabaseError;
        setItems(data || []);
      } catch (err) {
        console.error('Error fetching FAQ list for language:', language, err);
        setError(`Failed to load list for ${languageLabels[language] || language}.`);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, [language]);

  const getPageLink = (slug) => `/pages/${slug}`; 

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
          <h1 className="text-xl font-bold text-red-500 mb-4">Oops!</h1> {/* Reduced font size */}
          <p className="text-gray-600 mb-6 text-sm">{error}</p> {/* Reduced font size */}
          <Link to="/" className="btn-primary">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
       <div className="flex justify-start mb-6">
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
      <div className="card p-6">
        {/* Reduced font size for the main heading */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions & Guides ({languageLabels[language] || language.toUpperCase()})</h1>
        {items.length > 0 ? (
          <ul className="space-y-3"> {/* Reduced space-y slightly */}
            {items.map((item) => (
              <li key={`${item.slug}-${item.language}`} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"> {/* Reduced padding */}
                {/* Reduced font size for item titles */}
                <Link to={getPageLink(item.slug)} className="text-base font-semibold text-primary hover:underline">
                  {item.title}
                </Link>
                {item.page_type && (
                   <span className={`ml-2 text-xs font-medium inline-flex items-center px-2 py-0.5 rounded-full ${ // Adjusted padding for tag
                    item.page_type === 'guide' ? 'bg-blue-100 text-blue-800' : 
                    item.page_type === 'faq' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                   }`}>
                    {item.page_type.charAt(0).toUpperCase() + item.page_type.slice(1)}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-sm">No FAQs or guides currently available for {languageLabels[language] || language.toUpperCase()}. Please select another language or check back later.</p> // Reduced font size
        )}
      </div>
    </div>
  );
}