// src/pages/PreferenceGuidesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/K8ZQUXHpJBwKgeTjuP7qfE";

export default function PreferenceGuidesPage() {
  const { language } = useLanguage();

  const pageTranslations = {
    en: {
      pageTitle: "College Choice Filling Guides",
      pageDescription: "Access curated preference lists to help you with your JoSAA and CSAB choice filling. These lists are based on previous year trends, institute reputation, and branch popularity.",
      formSubmissionNote: "Join our WhatsApp community group directly to get access to all the detailed preference lists.",
      jeeMainTitle: "JEE Main Based College Preference List",
      jeeMainDescription: "A general preference order for NITs, IIITs, and GFTIs based on JEE Main ranks. Suitable for different rank ranges.",
      jeeAdvancedTitle: "JEE Advanced Based College Preference List",
      jeeAdvancedDescription: "A general preference order for IITs based on JEE Advanced ranks.",
      getAccessButton: "Join WhatsApp Community",
      comingSoon: "Coming Soon!"
    },
    'hi-en': {
      pageTitle: "College Choice Filling Guides",
      pageDescription: "JoSAA aur CSAB choice filling mein madad ke liye curated preference lists ko access karein. Yeh lists pichhle saal ke trends, institute ki reputation, aur branch ki popularity par aadharit hain.",
      formSubmissionNote: "Detailed preference lists paane ke liye turant hamari WhatsApp community se juden.",
      jeeMainTitle: "JEE Main Aadharit College Preference List",
      jeeMainDescription: "JEE Main ranks ke aadhar par NITs, IIITs, aur GFTIs ke liye ek saamanya preference order. Alag-alag rank ranges ke liye upyukt.",
      jeeAdvancedTitle: "JEE Advanced Aadharit College Preference List",
      jeeAdvancedDescription: "JEE Advanced ranks ke aadhar par IITs ke liye ek general preference order.",
      getAccessButton: "WhatsApp Community Join Karein",
      comingSoon: "Jald Aa Raha Hai!"
    },
    'te-en': {
      pageTitle: "College Choice Filling Guides",
      pageDescription: "JoSAA mariyu CSAB choice filling lo sahayam kosam curate chesina preference lists ni access cheyyandi. Ee lists gatavaarsam trends, institute reputation, mariyu branch popularity ni adharanga teesukoni tayarainavi.",
      formSubmissionNote: "Detailed preference lists kosam direct ga maa WhatsApp community lo join avvandi.",
      jeeMainTitle: "JEE Main Adharita College Preference List",
      jeeMainDescription: "JEE Main ranks adharanga NITs, IIITs, mariyu GFTIs kosam oka general preference order. Vivida rank ranges ki taggattu upayogam.",
      jeeAdvancedTitle: "JEE Advanced Adharita College Preference List",
      jeeAdvancedDescription: "JEE Advanced ranks adharanga IITs kosam oka general preference order.",
      getAccessButton: "WhatsApp Community lo Join Avvandi",
      comingSoon: "Tvaralo vastundi!"
    }
  };

  const uiText = pageTranslations[language] || pageTranslations.en;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-start mb-6">
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{uiText.pageTitle}</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{uiText.pageDescription}</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* JEE Main Preference List Section */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-primary mb-3">{uiText.jeeMainTitle}</h2>
          <p className="text-gray-700 mb-4">{uiText.jeeMainDescription}</p>
          <a
            href={WHATSAPP_COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full md:w-auto inline-block text-center"
          >
            {uiText.getAccessButton}
          </a>
        </div>

        {/* JEE Advanced Preference List Section */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-primary mb-3">{uiText.jeeAdvancedTitle}</h2>
          <p className="text-gray-700 mb-4">{uiText.jeeAdvancedDescription}</p>
          <a
            href={WHATSAPP_COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full md:w-auto inline-block text-center"
          >
            {uiText.getAccessButton}
          </a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-10 p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-md text-sm">
        <p className="font-semibold mb-1">Important Note:</p>
        <p>{uiText.formSubmissionNote}</p>
      </div>
    </div>
  );
}
