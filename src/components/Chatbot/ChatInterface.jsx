// src/components/Chatbot/ChatInterface.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';

// Base structure for initial categories.
// Actual labels and example queries will come from the 'translations' object.
const initialCategoriesBase = [
  { id: 'cat_josaa_docs', topicId: 'josaa_documents_general', labelKey: 'documentsLabel', queryKey: 'documentsQuery' },
  { id: 'cat_seat_allotment', topicId: 'josaa_float_freeze_slide_meaning', labelKey: 'seatAllotmentLabel', queryKey: 'seatAllotmentQuery' },
  { id: 'cat_prep_courses', topicId: 'iit_preparatory_what_is', labelKey: 'prepCoursesLabel', queryKey: 'prepCoursesQuery' },
  { id: 'cat_colorblind', topicId: 'josaa_colorblind_general', labelKey: 'colorblindLabel', queryKey: 'colorblindQuery' },
];

// Translations for UI elements and initial category button text/queries
// YOU WILL PROVIDE THE ACTUAL HINGLISH AND TELUGUISH TEXT HERE
const uiTranslations = {
  en: {
    greeting: "Hi! I'm Guruvela's assistant. How can I help you with JoSAA/CSAB counseling today?",
    documentsLabel: 'Required Documents', documentsQuery: 'What documents are needed for JoSAA?',
    seatAllotmentLabel: 'Seat Allotment Process', seatAllotmentQuery: 'Explain Float, Freeze, Slide',
    prepCoursesLabel: 'IIT Preparatory Courses', prepCoursesQuery: 'What is IIT preparatory rank?',
    colorblindLabel: 'Colorblindness Advice', colorblindQuery: 'Colorblind medical certificate query',
    askPlaceholder: "Type your question about JoSAA, CSAB, documents...",
    send: "Send", sending: "Sending...",
    chooseTopic: "Or, pick a common topic:",
    learnMore: "Learn more →",
    fallbackResponse: "I'm sorry, I couldn't find a specific answer. Please try rephrasing, or check our guides for more information.",
    connectionError: "Oops! I'm having a bit of trouble connecting to my knowledge base right now. Please try again in a moment.",
    englishFallbackNotice: "(Showing English result as specific content for your selected language was not found.)",
    askSpecific: "Please try a more specific question or select from the topics above."
  },
  'hi-en': { // Replace with your actual Hinglish text
    greeting: "Namaste! Main Guruvela ka assistant hoon. JoSAA/CSAB counselling mein aapki kya help kar sakta hoon?",
    documentsLabel: 'Zaroori Documents', documentsQuery: 'JoSAA ke liye documents?',
    seatAllotmentLabel: 'Seat Allotment Process', seatAllotmentQuery: 'Float, Freeze, Slide kya hai?',
    prepCoursesLabel: 'IIT Prep Courses', prepCoursesQuery: 'IIT preparatory rank kya hai?',
    colorblindLabel: 'Colorblindness Advice', colorblindQuery: 'Colorblind medical certificate info',
    askPlaceholder: "JoSAA, CSAB, documents ke baare mein sawaal type karein...",
    send: "Bhejein", sending: "Bhej raha hai...",
    chooseTopic: "Ya, inmein se koi topic chunein:",
    learnMore: "Aur Padhna →", // Example for Hinglish
    fallbackResponse: "Sorry, aapke sawaal ka specific answer nahi mila. Question change karke try karein ya guides check karein.",
    connectionError: "Oops! Connection mein thodi problem hai. Please thodi der baad try karein.",
    englishFallbackNotice: "(Aapki language mein content nahi mila, isliye English result dikha raha hai.)",
    askSpecific: "Please thoda specific question poochein ya upar diye gaye topics mein se select karein."
  },
  'te-en': { // Replace with your actual Teluguish text
    greeting: "Namaste! Nenu Guruvela assistant. JoSAA/CSAB counselling lo ela help cheyagalanu?",
    documentsLabel: 'Kavaliసిన Documents', documentsQuery: 'JoSAA ki documents em kavali?',
    seatAllotmentLabel: 'Seat Allotment Process', seatAllotmentQuery: 'Float, Freeze, Slide explain cheyandi?',
    prepCoursesLabel: 'IIT Prep Courses', prepCoursesQuery: 'IIT preparatory rank ante enti?',
    colorblindLabel: 'Colorblindness Advice', colorblindQuery: 'Colorblind medical certificate information',
    askPlaceholder: "JoSAA, CSAB, documents gurinchi प्रश्न type cheyandi...",
    send: "Pampu", sending: "Pampistondi...",
    chooseTopic: "Leda, ee topics lo select cheskondi:",
    learnMore: "Inka Chaduvu →", // Example for Teluguish
    fallbackResponse: "Sorry, mee prashnaku specific answer dorakaledu. Question marchi try cheyandi leda guides chudandi.",
    connectionError: "Oops! Connection lo konchem problem undi. Please konchem time tarvata try cheyandi.",
    englishFallbackNotice: "(Meeru select chesina language lo content dorakaledu, anduke English result chupistunnam.)",
    askSpecific: "Dayachesi konchem specific prashna adagandi leda paina unna topics nunchi select cheskondi."
  }
};

export default function ChatInterface() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage(); // 'en', 'hi-en', or 'te-en'
  const chatEndRef = useRef(null);
  const [showGuide, setShowGuide] = useState(true); // State to control guide visibility

  const [currentCategories, setCurrentCategories] = useState([]);
  const [currentUiText, setCurrentUiText] = useState(uiTranslations.en);

  useEffect(() => {
    const langTrans = uiTranslations[language] || uiTranslations.en;
    setCurrentUiText(langTrans);

    const translatedCategories = initialCategoriesBase.map(cat => ({
      ...cat,
      label: langTrans[cat.labelKey] || cat.defaultLabel,
      exampleQuery: langTrans[cat.queryKey] || cat.defaultExampleQuery,
    }));
    setCurrentCategories(translatedCategories);

    setChatHistory([{
      type: 'bot',
      content: langTrans.greeting,
      suggestions: translatedCategories,
      relatedContent: null,
    }]);
  }, [language]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const findBestResponse = async (userMessage, currentLang) => {
    const langTrans = uiTranslations[currentLang] || uiTranslations.en;
    try {
      const clickedSuggestion = currentCategories.find(cat => cat.exampleQuery === userMessage && cat.topicId);

      let queryBuilder;
      if (clickedSuggestion) {
        queryBuilder = supabase.from('fixed_responses').select('answer_text, related_content_slug')
          .eq('topic_id', clickedSuggestion.topicId).eq('language', currentLang).single();
      } else {
        const searchTerms = userMessage.toLowerCase().split(' ').filter(term => term.length > 1 && term.length < 25);
        if (searchTerms.length === 0) return { content: langTrans.askSpecific, relatedContent: null };
        const keywordConditions = searchTerms.map(term => `question_keywords.cs.{${term.trim().replace(/'/g, "''")}}`).join(',');
        queryBuilder = supabase.from('fixed_responses').select('answer_text, related_content_slug')
          .eq('language', currentLang).or(keywordConditions).limit(1);
      }

      let { data, error } = await queryBuilder;

      if (error || !data || (Array.isArray(data) && data.length === 0) ) {
        if (currentLang !== 'en') { // Fallback to English
          console.warn(`No response in ${currentLang} for "${userMessage}". Trying English fallback.`);
          if (clickedSuggestion) {
            queryBuilder = supabase.from('fixed_responses').select('answer_text, related_content_slug').eq('topic_id', clickedSuggestion.topicId).eq('language', 'en').single();
          } else {
            const searchTerms = userMessage.toLowerCase().split(' ').filter(term => term.length > 1 && term.length < 25);
            if (searchTerms.length > 0) {
                const keywordConditions = searchTerms.map(term => `question_keywords.cs.{${term.trim().replace(/'/g, "''")}}`).join(',');
                queryBuilder = supabase.from('fixed_responses').select('answer_text, related_content_slug').eq('language', 'en').or(keywordConditions).limit(1);
            } else { queryBuilder = null; }
          }
          if(queryBuilder) {
            const { data: enData, error: enError } = await queryBuilder;
            if (!enError && enData && ( (Array.isArray(enData) && enData.length > 0) || (!Array.isArray(enData) && enData) ) ) {
              const responseData = Array.isArray(enData) ? enData[0] : enData;
              return { content: `${responseData.answer_text} ${langTrans.englishFallbackNotice}`, relatedContent: responseData.related_content_slug };
            }
          }
        }
        return { content: langTrans.fallbackResponse, relatedContent: 'josaa-comprehensive-faq' };
      }
      
      const responseData = Array.isArray(data) ? data[0] : data;
      return { content: responseData.answer_text, relatedContent: responseData.related_content_slug };

    } catch (catchError) {
      console.error('Error in findBestResponse:', catchError);
      return { content: langTrans.connectionError, relatedContent: null };
    }
  };

  const handleSubmit = async (e, directMessage = null) => {
    if (e) e.preventDefault();
    const currentMessageText = directMessage || message;
    if (!currentMessageText.trim() || isLoading) return;

    setIsLoading(true);
    const userMessageObject = { type: 'user', content: currentMessageText };
    setChatHistory(prev => prev.map(msg => ({ ...msg, suggestions: null })).concat([userMessageObject]));
    
    const response = await findBestResponse(currentMessageText, language);

    const newBotMessage = {
      type: 'bot',
      content: response.content, 
      relatedContent: response.relatedContent, 
      suggestions: null 
    };
    
    // Show initial categories again if the bot gives a generic fallback or it's a direct query from category button
     if ( (response.relatedContent === 'josaa-comprehensive-faq' && response.content === (uiTranslations[language] || uiTranslations.en).fallbackResponse ) || directMessage) {
        newBotMessage.suggestions = currentCategories;
    }

    setChatHistory(prev => [...prev, newBotMessage]);
    if (!directMessage) setMessage('');
    setIsLoading(false);
  };
  
  const getLearnMoreLink = (slug) => `/pages/${slug}`; // ContentPage.jsx handles language

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card h-[calc(100vh-200px)] sm:h-[600px] flex flex-col">
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-3 shadow-sm ${msg.type === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'}`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
                {msg.type === 'bot' && msg.relatedContent && (
                  <Link to={getLearnMoreLink(msg.relatedContent)} className="mt-2 inline-block text-sm text-accent hover:underline">
                    {currentUiText.learnMore}
                  </Link>
                )}
                {msg.type === 'bot' && msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm font-semibold mb-2 text-gray-700">{currentUiText.chooseTopic}</p>
                    <div className="flex flex-wrap gap-2">
                      {msg.suggestions.map((suggestion) => (
                        <button
                          key={suggestion.id} // Ensure category objects from initialCategoriesBase have unique 'id'
                          onClick={() => handleSubmit(null, suggestion.exampleQuery)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-full text-sm"
                        >
                          {suggestion.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={currentUiText.askPlaceholder}
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="btn-primary px-4 py-2" disabled={isLoading}>
              {isLoading ? currentUiText.sending : currentUiText.send}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}