// src/pages/JosaaDocumentsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

export default function JosaaDocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();

  const pageTranslations = {
    en: {
      title: "JoSAA Official Documents",
      description: "Important official documents related to JoSAA counseling.",
      disclaimer: "Please note: All formats and documents listed here are sourced from the official JoSAA website and are provided for informational purposes only. Always refer to the latest official JoSAA portal for the most current and authoritative versions.",
      docNameHeader: "Document Title",
      descriptionHeader: "Description",
      linkHeaderText: "View/Download",
      noDocuments: "No JoSAA documents are currently listed. Please check back later.",
      errorLoading: "Could not load JoSAA documents at this time. Please try again later."
    },
    'hi-en': {
      title: "JoSAA ke Official Documents",
      description: "JoSAA counselling se jude zaroori official documents.",
      disclaimer: "Kripya dhyaan dein: Yahan di gayi sabhi formats aur documents official JoSAA website se li gayi hain aur केवल सूचना ke liye hain. Hamesha sabse current aur authoritative versions ke liye official JoSAA portal check karein.",
      docNameHeader: "Document ka Naam",
      descriptionHeader: "Vivaran",
      linkHeaderText: "Dekhein/Download Karein",
      noDocuments: "Abhi koi JoSAA documents list mein nahi hain. Kripya baad mein check karein.",
      errorLoading: "Abhi JoSAA documents load nahi ho pa rahe hain. Kripya thodi der baad try karein."
    },
    'te-en': {
      title: "JoSAA Official Documents",
      description: "JoSAA counselling ki sambandhinchina mukhyamaina official documents.",
      disclaimer: "Dayachesi gamaninchandi: Ikkada suchinchabadina anni formatlu mariyu documentlu official JoSAA website nundi grahinchabadinavi mariyu kevalam samacharam koraku matrame ivvabadinavi. Ati venta update ayina mariyu adhikarikamaina versionla koraku official JoSAA portal nu chudandi.",
      docNameHeader: "Document Peru",
      descriptionHeader: "Vivaraṇa",
      linkHeaderText: "Chudu/Download Cheyi",
      noDocuments: "Prastutaniki JoSAA documents emi levu. Dayachesi tarvata chudandi.",
      errorLoading: "Prastutam JoSAA documents load avvatledu. Dayachesi konchem samayam tarvata prayatninchandi."
    }
  };

  const uiText = pageTranslations[language] || pageTranslations.en;

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: supabaseError } = await supabase
          .from('document')
          .select('id, title, description, link')
          .eq('category', 'JoSAA')
          .order('title', { ascending: true });

        if (supabaseError) throw supabaseError;
        setDocuments(data || []);
      } catch {
        setError(uiText.errorLoading);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, [language, uiText.errorLoading]);

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8">
      <div className="flex justify-start mb-6">
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">{uiText.title}</h1>
        <p className="text-md sm:text-lg text-gray-600">{uiText.description}</p>
      </div>

      <div className="max-w-4xl mx-auto mb-8 p-4 bg-yellow-50 border border-yellow-300 text-yellow-700 rounded-md text-sm">
        <p>{uiText.disclaimer}</p>
      </div>

      {loading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}

      {error && !loading && (
        <div className="card text-center p-6 bg-red-50 border-red-200">
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      )}

      {!loading && !error && documents.length === 0 && (
        <div className="card text-center p-8">
          <p className="text-gray-600 text-lg">{uiText.noDocuments}</p>
        </div>
      )}

      {!loading && !error && documents.length > 0 && (
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{uiText.docNameHeader}</th>
                  {/* Description header is only for sm screens and up */}
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">{uiText.descriptionHeader}</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors duration-150">
                    {/* Cell for Title and Mobile Description */}
                    <td className="px-4 py-4 whitespace-normal text-sm font-medium text-gray-900">
                      {doc.title}
                      {/* Description for mobile (xs screens), shown only if it exists */}
                      {doc.description && (
                        <p className="mt-1 text-xs text-gray-500 block sm:hidden">
                          {doc.description}
                        </p>
                      )}
                    </td>
                    {/* Description cell for sm screens and up */}
                    <td className="px-4 py-4 whitespace-normal text-sm text-gray-600 hidden sm:table-cell">
                      {doc.description || ''}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                      <a
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary py-1.5 px-3 text-xs inline-flex items-center" 
                      >
                        {uiText.linkHeaderText}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}