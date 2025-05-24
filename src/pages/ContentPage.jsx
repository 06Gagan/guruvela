// src/pages/ContentPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const [langDisplayed, setLangDisplayed] = useState(language); // To show which language is being displayed

  const languageLabels = { 'en': 'English', 'hi-en': 'Hinglish', 'te-en': 'Teluguish' };

  useEffect(() => {
    const fetchContent = async () => {
      if (!slug) {
        setError('Page slug is missing.'); setLoading(false); return;
      }
      setLoading(true); setError(null); setPageData(null); setLangDisplayed(language);

      try {
        let { data, error: supabaseError } = await supabase
          .from('content_pages')
          .select('title, content_markdown, language, page_type')
          .eq('slug', slug)
          .eq('language', language) 
          .single();

        if (supabaseError || !data) {
          if (language !== 'en') { 
            console.warn(`Content for slug '${slug}' in '${language}' not found. Trying English fallback.`);
            let { data: fallbackData, error: fallbackError } = await supabase
              .from('content_pages').select('title, content_markdown, language, page_type')
              .eq('slug', slug).eq('language', 'en').single();
            
            if (fallbackError || !fallbackData) {
              throw new Error(fallbackError?.message || `Page "${slug}" not found in English or the selected language.`);
            }
            setPageData(fallbackData); setLangDisplayed('en'); 
          } else { 
            throw new Error(supabaseError?.message || `Page "${slug}" not found.`);
          }
        } else {
         setPageData(data);
        }
      } catch (err) {
        console.error(`Error fetching content for slug: ${slug}, language: ${language}`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [slug, language]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[400px]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  // Preserve your original error display structure
  if (error || !pageData) {
    return (
      <div className="max-w-4xl mx-auto py-8"> {/* Added py-8 */}
        <div className="card text-center p-6"> {/* Added p-6 */}
          <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Content Not Found</h1>
          <p className="text-gray-600 mb-6">{error || `The page content for "${slug}" could not be loaded in the selected language (${languageLabels[language] || language.toUpperCase()}).`}</p>
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
    <article className="max-w-4xl mx-auto py-8"> {/* Added py-8 */}
      <div className="card p-6 md:p-8"> {/* Added padding, ensure this class 'card' is defined in your styles */}
        {pageData && (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{pageData.title}</h1>
            {langDisplayed !== language && 
              <p className="text-sm text-yellow-700 bg-yellow-100 p-2 rounded-md mb-4">
                Note: Content for '{languageLabels[language]}' was not found. Displaying in English.
              </p>
            }
            <div className="prose prose-lg max-w-none"> {/* Make sure @tailwindcss/typography is set up */}
              <ReactMarkdown>{pageData.content_markdown}</ReactMarkdown>
            </div>
          </>
        )}
      </div>
    </article>
  );
}