// src/pages/FAQListPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext'; // Import useLanguage

export default function FAQListPage() {
  const { language } = useLanguage(); // Get lang from context
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

  // ContentPage.jsx will handle language selection via context when navigated to by slug
  const getPageLink = (slug) => `/pages/${slug}`; 

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card text-center p-6"> {/* Added padding */}
          <h1 className="text-2xl font-bold text-red-500 mb-4">Oops!</h1> {/* Changed text color for error */}
          <p className="text-gray-600 mb-6">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8"> {/* Added py-8 for spacing */}
      <div className="card p-6"> {/* Added padding to card */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions & Guides ({languageLabels[language] || language.toUpperCase()})</h1>
        {items.length > 0 ? (
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={`${item.slug}-${item.language}`} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"> {/* Added transition */}
                <Link to={getPageLink(item.slug)} className="text-lg font-semibold text-primary hover:underline">
                  {item.title}
                </Link>
                {item.page_type && (
                   <span className={`ml-3 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full ${
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
          <p className="text-gray-600">No FAQs or guides currently available for {languageLabels[language] || language.toUpperCase()}. Please select another language or check back later.</p>
        )}
      </div>
    </div>
  );
}