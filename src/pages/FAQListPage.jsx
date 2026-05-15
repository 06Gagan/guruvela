// src/pages/FAQListPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { BookOpen, HelpCircle, ChevronRight, FileText, Download } from 'lucide-react';

// Labels for displaying language names
const languageLabels = {
  en: 'English',
  'hi-en': 'Hinglish',
  'te-en': 'Teluguish'
};

export default function FAQListPage() {
  const { language } = useLanguage();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
            <HelpCircle className="w-8 h-8 text-primary" />
            Frequently Asked Questions & Guides
          </h1>
          <p className="text-gray-500 text-lg">
            Find answers to common queries and read comprehensive guides about JoSAA, CSAB, and engineering admissions in {languageLabels[language] || language.toUpperCase()}.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">Knowledge Base</h2>
          </div>
          
          <div className="p-6 md:p-8">
            {items.length > 0 ? (
              <ul className="space-y-4"> 
                {items.map((item) => (
                  <li key={`${item.slug}-${item.language}`}> 
                    <Link 
                      to={getPageLink(item.slug)} 
                      className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-primary/30 hover:bg-blue-50/50 transition-all"
                    >
                      <div className="flex items-center gap-4 mb-3 sm:mb-0">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${item.page_type === 'guide' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                           {item.page_type === 'guide' ? <FileText className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />}
                         </div>
                         <div>
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-3 sm:ml-4">
                        {item.page_type && (
                          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${ // Adjusted padding for tag
                            item.page_type === 'guide' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                            item.page_type === 'faq' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-700 border-gray-200'
                          }`}>
                            {item.page_type.toUpperCase()}
                          </span>
                        )}
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
               <div className="text-center py-12">
                 <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                 <p className="text-gray-500 text-lg">
                   No FAQs or guides currently available for {languageLabels[language] || language.toUpperCase()}. Please select another language or check back later.
                 </p>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}