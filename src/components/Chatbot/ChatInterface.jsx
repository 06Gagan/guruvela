// src/components/Chatbot/ChatInterface.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';

const initialCategoriesBase = [
  { id: 'cat_josaa_docs', topicId: 'josaa_documents_general', labelKey: 'documentsLabel', queryKey: 'documentsQuery' },
  { id: 'cat_seat_allotment', topicId: 'josaa_float_freeze_slide_meaning', labelKey: 'seatAllotmentLabel', queryKey: 'seatAllotmentQuery' },
  { id: 'cat_prep_courses', topicId: 'iit_preparatory_what_is', labelKey: 'prepCoursesLabel', queryKey: 'prepCoursesQuery' },
  { id: 'cat_colorblind', topicId: 'josaa_colorblind_general', labelKey: 'colorblindLabel', queryKey: 'colorblindQuery' },
];

const categoryMap = {
  obc: 'OBC-NCL',
  'obc ncl': 'OBC-NCL',
  sc: 'SC',
  st: 'ST',
  ews: 'EWS',
  gen: 'OPEN',
  general: 'OPEN',
  open: 'OPEN'
};

function parseCollegeQuery(text) {
  const lower = text.toLowerCase();
  const rankMatch = lower.match(/\b(\d{3,})\b/);
  const rank = rankMatch ? parseInt(rankMatch[1], 10) : null;
  let category = null;
  for (const key of Object.keys(categoryMap)) {
    if (lower.includes(key)) { category = categoryMap[key]; break; }
  }
  const branchMatch = text.match(/\b(CSE|Computer Science|ECE|Electrical|Electronics|Mechanical|Civil|IT|Information Technology)\b/i);
  const branch = branchMatch ? branchMatch[0] : null;
  const instituteMatch = text.match(/(?:at|in|for)\s+([A-Za-z ]*(?:IIT|NIT|IIIT)[A-Za-z ]*)/i);
  const institute = instituteMatch ? instituteMatch[1].trim() : null;
  const isCollegeQuery = rank !== null || branch || institute || lower.includes('college');
  return { rank, category, branch, institute, isCollegeQuery };
}

async function fetchCollegePredictions({ rank, category, branch, institute }) {
  try {
    let query = supabase
      .from('college_cutoffs')
      .select('institute_name, branch_name, closing_rank')
      .eq('year', 2024)
      .eq('round_no', 6)
      .eq('exam_type', 'JEE Main')
      .eq('seat_type', category)
      .gte('closing_rank', rank);

    if (branch) query = query.ilike('branch_name', `%${branch}%`);
    if (institute) query = query.ilike('institute_name', `%${institute}%`);

    const { data, error } = await query.order('closing_rank', { ascending: true }).limit(3);
    if (error) { console.error('Supabase error', error); return []; }
    return data || [];
  } catch (err) {
    console.error('Prediction fetch error', err);
    return [];
  }
}

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
    askSpecific: "Please try a more specific question or select from the topics above.",
    howToUseReferralPrefix: "For more help on how to use Guruvela, see our ",
    howToUseReferralLinkText: "How to Use Guide",
    howToUseReferralSuffix: ".",
    predictorPopupText: "Curious about your college options? Try our JoSAA College Predictor!",
    goToPredictorButton: "JoSAA College Predictor",
    collegeSuggestionPrefix: "Here are the top 3 colleges you might get based on your rank and category:",
    viewFullListText: "View Full List on Guruvela",
    clarifyMissingInfo: "Can you tell me your JEE rank and category (General, OBC, SC, etc.)?"
  },
  'hi-en': {
    greeting: "Namaste! Main Guruvela ka assistant hoon. JoSAA/CSAB counselling mein aapki kya help kar sakta hoon?",
    documentsLabel: 'Zaroori Documents', documentsQuery: 'JoSAA ke liye documents?',
    seatAllotmentLabel: 'Seat Allotment Process', seatAllotmentQuery: 'Float, Freeze, Slide kya hai?',
    prepCoursesLabel: 'IIT Prep Courses', prepCoursesQuery: 'IIT preparatory rank kya hai?',
    colorblindLabel: 'Colorblindness Advice', colorblindQuery: 'Colorblind medical certificate info',
    askPlaceholder: "JoSAA, CSAB, documents ke baare mein sawaal type karein...",
    send: "Bhejein", sending: "Bhej raha hai...",
    chooseTopic: "Ya, inmein se koi topic chunein:",
    learnMore: "Aur Padhna →",
    fallbackResponse: "Sorry, aapke sawaal ka specific answer nahi mila. Question change karke try karein ya guides check karein.",
    connectionError: "Oops! Connection mein thodi problem hai. Please thodi der baad try karein.",
    englishFallbackNotice: "(Aapki language mein content nahi mila, isliye English result dikha raha hai.)",
    askSpecific: "Please thoda specific question poochein ya upar diye gaye topics mein se select karein.",
    howToUseReferralPrefix: "Guruvela kaise use karein, iske liye hamara ",
    howToUseReferralLinkText: "How to Use Guide",
    howToUseReferralSuffix: " dekhein.",
    predictorPopupText: "Apne college options ke baare mein जानना chahte hain? Hamara JoSAA College Predictor try karein!",
    goToPredictorButton: "JoSAA College Predictor",
    collegeSuggestionPrefix: "Yeh hain top 3 colleges jo aapke rank aur category ke hisaab se mil sakte hain:",
    viewFullListText: "Puri list Guruvela par dekhein",
    clarifyMissingInfo: "Kya aap apna JEE rank aur category bata sakte hain (General, OBC, SC, etc.)?"
  },
  'te-en': {
    greeting: "Namaste! Nenu Guruvela assistant. JoSAA/CSAB counselling lo ela help cheyagalanu?",
    documentsLabel: 'Kavaliసిన Documents', documentsQuery: 'JoSAA ki documents em kavali?',
    seatAllotmentLabel: 'Seat Allotment Process', seatAllotmentQuery: 'Float, Freeze, Slide explain cheyandi?',
    prepCoursesLabel: 'IIT Prep Courses', prepCoursesQuery: 'IIT preparatory rank ante enti?',
    colorblindLabel: 'Colorblindness Advice', colorblindQuery: 'Colorblind medical certificate information',
    askPlaceholder: "JoSAA, CSAB, documents gurinchi प्रश्न type cheyandi...",
    send: "Pampu", sending: "Pampistondi...",
    chooseTopic: "Leda, ee topics lo select cheskondi:",
    learnMore: "Inka Chaduvu →",
    fallbackResponse: "Sorry, mee prashnaku specific answer dorakaledu. Question marchi try cheyandi leda guides chudandi.",
    connectionError: "Oops! Connection lo konchem problem undi. Please konchem time tarvata try cheyandi.",
    englishFallbackNotice: "(Meeru select chesina language lo content dorakaledu, anduke English result chupistunnam.)",
    askSpecific: "Dayachesi konchem specific prashna adagandi leda paina unna topics nunchi select cheskondi.",
    howToUseReferralPrefix: "Guruvela ela vadalo telusukodaniki, maa ",
    howToUseReferralLinkText: "How to Use Guide",
    howToUseReferralSuffix: " chudandi.",
    predictorPopupText: "Mee college optionla gurinchi telusukovalani unda? Maa JoSAA College Predictor prayatninchandi!",
    goToPredictorButton: "JoSAA College Predictor",
    collegeSuggestionPrefix: "Mee rank mariyu category ni base cheskoni meeku dorakachu anukune top 3 colleges:",
    viewFullListText: "Full list Guruvela lo chudandi",
    clarifyMissingInfo: "Mee JEE rank mariyu category (General, OBC, SC, etc.) cheppagalara?"
  }
};

export default function ChatInterface() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  const chatEndRef = useRef(null);
  const initialLoadDoneRef = useRef(false);

  const [currentCategories, setCurrentCategories] = useState([]);
  const [currentUiText, setCurrentUiText] = useState(uiTranslations.en);
  const [showPredictorPromo, setShowPredictorPromo] = useState(true);

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
      showHowToUseSuggestion: false,
    }]);
    initialLoadDoneRef.current = false;
  }, [language]);

  useEffect(() => {
    if (initialLoadDoneRef.current && chatHistory.length > 1) {
      const timer = setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
      return () => clearTimeout(timer);
    } else if (chatHistory.length > 0) {
        initialLoadDoneRef.current = true;
    }
  }, [chatHistory]);

  const handleClosePredictorPromo = () => {
    setShowPredictorPromo(false);
  };

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
        if (searchTerms.length === 0) {
          return {
            content: langTrans.askSpecific,
            relatedContent: null,
            showHowToUseSuggestion: true
          };
        }
        const keywordConditions = searchTerms.map(term => `question_keywords.cs.{${term.trim().replace(/'/g, "''")}}`).join(',');
        queryBuilder = supabase.from('fixed_responses').select('answer_text, related_content_slug')
          .eq('language', currentLang).or(keywordConditions).limit(1);
      }
      let { data, error } = await queryBuilder;
      if (error || !data || (Array.isArray(data) && data.length === 0) ) {
        if (currentLang !== 'en') {
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
              return {
                content: `${responseData.answer_text} ${langTrans.englishFallbackNotice}`,
                relatedContent: responseData.related_content_slug,
                showHowToUseSuggestion: responseData.related_content_slug === 'josaa-comprehensive-faq'
              };
            }
          }
        }
        return {
          content: langTrans.fallbackResponse,
          relatedContent: 'josaa-comprehensive-faq',
          showHowToUseSuggestion: true
        };
      }
      const responseData = Array.isArray(data) ? data[0] : data;
      return {
        content: responseData.answer_text,
        relatedContent: responseData.related_content_slug,
        showHowToUseSuggestion: false
      };
    } catch (catchError) {
      return {
        content: langTrans.connectionError,
        relatedContent: null,
        showHowToUseSuggestion: true
      };
    }
  };

  const handleSubmit = async (e, directMessage = null) => {
    if (e) e.preventDefault();
    const currentMessageText = directMessage || message;
    if (!currentMessageText.trim() || isLoading) return;
    setIsLoading(true);
    const userMessageObject = { type: 'user', content: currentMessageText };
    const parsed = parseCollegeQuery(currentMessageText);
    let response;
    if (parsed.isCollegeQuery) {
      if (!parsed.rank || !parsed.category) {
        response = { content: currentUiText.clarifyMissingInfo, relatedContent: null, showHowToUseSuggestion: false };
      } else {
        const colleges = await fetchCollegePredictions(parsed);
        if (colleges.length > 0) {
          const lines = colleges.map(c => `\ud83c\udf93 ${c.institute_name} \u2013 ${c.branch_name}`).join('\n');
          const link = `https://guruvela.in/college-predictor?rank=${parsed.rank}&cat=${encodeURIComponent(parsed.category)}`;
          response = {
            content: `${currentUiText.collegeSuggestionPrefix}\n${lines}\n[${currentUiText.viewFullListText}](${link})`,
            relatedContent: null,
            showHowToUseSuggestion: false
          };
        } else {
          response = { content: currentUiText.fallbackResponse, relatedContent: 'josaa-comprehensive-faq', showHowToUseSuggestion: true };
        }
      }
    } else {
      response = await findBestResponse(currentMessageText, language);
    }
    const newBotMessage = {
      type: 'bot',
      content: response.content,
      relatedContent: response.relatedContent,
      suggestions: null,
      showHowToUseSuggestion: response.showHowToUseSuggestion || false
    };
    if (directMessage || (response.showHowToUseSuggestion && (response.relatedContent === 'josaa-comprehensive-faq' || response.relatedContent === null))) {
        newBotMessage.suggestions = currentCategories;
    }
    setChatHistory(prev => {
      const updatedHistory = prev.map(msg => ({
        ...msg,
        suggestions: null,
        showHowToUseSuggestion: msg.showHowToUseSuggestion
      }));
      return [...updatedHistory, userMessageObject, newBotMessage];
    });
    if (!directMessage) setMessage('');
    setIsLoading(false);
  };

  const getLearnMoreLinkPath = (slug) => {
    if (slug === 'josaa-comprehensive-faq') {
      return '/faqs';
    }
    return `/pages/${slug}`;
  };

  return (
    // Make this outer div a flex container that grows to fill available vertical space
    <div className="max-w-4xl mx-auto flex-grow flex flex-col"> 
      {showPredictorPromo && (
        <div className="relative bg-gray-100 border border-gray-200 p-3 sm:p-4 mb-4 rounded-lg shadow flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
          <p className="text-sm sm:text-base text-gray-700 mb-2 sm:mb-0 sm:mr-4">
            {currentUiText.predictorPopupText}
          </p>
          <Link
            to="/rank-predictor"
            className="btn-primary py-1.5 px-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap"
            onClick={handleClosePredictorPromo}
          >
            {currentUiText.goToPredictorButton}
          </Link>
          <button
            onClick={handleClosePredictorPromo}
            className="absolute top-1 right-1 p-1 text-gray-400 hover:text-gray-600 sm:static sm:ml-2"
            aria-label="Close predictor promotion"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      {/* Make the card grow to fill space from parent (flex-1), 
        remain a flex column, and hide its own overflow.
        Remove fixed height h-[calc(100vh-200px)] sm:h-[600px]
      */}
      <div className="card flex-1 flex flex-col overflow-hidden">
        <div
          className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          role="log"
          aria-label="Chat messages"
        >
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              role={msg.type === 'user' ? 'user-message' : 'bot-message'}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 shadow-sm transition-all duration-200
                  ${msg.type === 'user'
                    ? 'bg-primary text-white hover:shadow-md'
                    : 'bg-gray-50 text-gray-800 hover:shadow-md border border-gray-100'}`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>

                {msg.type === 'bot' && msg.relatedContent && (
                  <Link
                    to={getLearnMoreLinkPath(msg.relatedContent)}
                    className="mt-3 inline-flex items-center text-sm text-accent hover:text-accent-dark transition-colors duration-150"
                  >
                    {currentUiText.learnMore}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}

                {msg.type === 'bot' && msg.showHowToUseSuggestion && (
                  <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {currentUiText.howToUseReferralPrefix}
                    <Link
                      to="/how-to-use"
                      className="text-accent hover:text-accent-dark font-medium hover:underline transition-colors duration-150"
                    >
                      {currentUiText.howToUseReferralLinkText}
                    </Link>
                    {currentUiText.howToUseReferralSuffix}
                  </div>
                )}

                {msg.type === 'bot' && msg.suggestions && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-600 font-medium">{currentUiText.chooseTopic}</p>
                    <div className="flex flex-wrap gap-2">
                      {msg.suggestions.map((suggestion) => (
                        <button
                          key={suggestion.id}
                          onClick={() => handleSubmit(null, suggestion.exampleQuery)}
                          className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-full
                                   text-gray-700 hover:bg-gray-50 hover:border-gray-300
                                   focus:outline-none focus:ring-2 focus:ring-primary/50
                                   transition-all duration-200"
                          disabled={isLoading}
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

        <div className="border-t border-gray-200 p-4 bg-white">
          {/* Form area, fixed height */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={currentUiText.askPlaceholder}
              className="flex-grow form-input"
              disabled={isLoading}
              aria-label="Type your message"
            />
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className={`btn-primary flex items-center gap-2 min-w-[100px] justify-center
                ${(!message.trim() || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label={isLoading ? "Sending message..." : "Send message"}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>{currentUiText.sending}</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>{currentUiText.send}</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}