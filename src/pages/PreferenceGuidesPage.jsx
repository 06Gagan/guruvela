// src/pages/PreferenceGuidesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const JEE_MAIN_PREFERENCE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd1UrGHdHfa-ABzdWyYkRKjMQsvIOZR6jRsPqb7x-1ZgE1Oqw/viewform?usp=dialog";
const JEE_ADVANCED_PREFERENCE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd1UrGHdHfa-ABzdWyYkRKjMQsvIOZR6jRsPqb7x-1ZgE1Oqw/viewform?usp=dialog";

export default function PreferenceGuidesPage() {
  const { language } = useLanguage();

  const pageTranslations = {
    en: {
      pageTitle: "College Choice Filling Guides",
      pageDescription: "Access curated preference lists to help you with your JoSAA and CSAB choice filling. These lists are based on previous year trends, institute reputation, and branch popularity.",
      formSubmissionNote: "After submitting the form, please follow the instructions to join our guidance group and message the provided number to get access to the Google Drive spreadsheet containing the detailed preference list.",
      jeeMainTitle: "JEE Main Based College Preference List",
      jeeMainDescription: "A general preference order for NITs, IIITs, and GFTIs based on JEE Main ranks. Suitable for different rank ranges.",
      jeeAdvancedTitle: "JEE Advanced Based College Preference List",
      jeeAdvancedDescription: "A general preference order for IITs based on JEE Advanced ranks.",
      getAccessButton: "Get Access via Form",
      comingSoon: "Coming Soon!"
    },
    'hi-en': {
      pageTitle: "College Choice Filling Guides",
      pageDescription: "JoSAA aur CSAB choice filling mein madad ke liye curated preference lists ko access karein. Yeh lists pichhle saal ke trends, institute ki reputation, aur branch ki popularity par aadharit hain.",
      formSubmissionNote: "Form submit karne ke baad, kripya diye gaye nirdeshon ka paalan karein – hamare guidance group mein judne ke liye aur Google Drive spreadsheet (jismein detailed preference list hai) ki access ke liye diye gaye number par message bhejein.",
      jeeMainTitle: "JEE Main Aadharit College Preference List",
      jeeMainDescription: "JEE Main ranks ke aadhar par NITs, IIITs, aur GFTIs ke liye ek saamanya preference order. Alag-alag rank ranges ke liye upyukt.",
      jeeAdvancedTitle: "JEE Advanced Aadharit College Preference List",
      jeeAdvancedDescription: "JEE Advanced ranks ke aadhar par IITs ke liye ek general preference order.",
      getAccessButton: "Form ke zariye Access lein",
      comingSoon: "Jald Aa Raha Hai!"
    },
    'te-en': {
      pageTitle: "College Choice Filling Guides",
      pageDescription: "JoSAA mariyu CSAB choice filling lo sahayam kosam curate chesina preference lists ni access cheyyandi. Ee lists gatavaarsam trends, institute reputation, mariyu branch popularity ni adharanga teesukoni tayarainavi.",
      formSubmissionNote: "Form submit chesaka, dayachesi ichina instructions ni follow cheyyandi – ma guidance group lo join avvadani ki mariyu detailed preference list unna Google Drive spreadsheet access cheyyadaniki ichina number ki message pampandi.",
      jeeMainTitle: "JEE Main Adharita College Preference List",
      jeeMainDescription: "JEE Main ranks adharanga NITs, IIITs, mariyu GFTIs kosam oka general preference order. Vivida rank ranges ki taggattu upayogam.",
      jeeAdvancedTitle: "JEE Advanced Adharita College Preference List",
      jeeAdvancedDescription: "JEE Advanced ranks adharanga IITs kosam oka general preference order.",
      getAccessButton: "Form dvara Access pondandi",
      comingSoon: "Tvaralo vastundi!"
    }
  };

  const uiText = pageTranslations[language] || pageTranslations.en;

  const isJeeMainFormPlaceholder = JEE_MAIN_PREFERENCE_FORM_URL === "YOUR_GOOGLE_FORM_LINK_FOR_JEE_MAIN_PREFERENCE_LIST";
  const isJeeAdvancedFormPlaceholder = JEE_ADVANCED_PREFERENCE_FORM_URL === "YOUR_GOOGLE_FORM_LINK_FOR_JEE_ADVANCED_PREFERENCE_LIST";

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
          {isJeeMainFormPlaceholder ? (
            <button className="btn-primary w-full md:w-auto opacity-50 cursor-not-allowed" disabled>
              {uiText.comingSoon}
            </button>
          ) : (
            <a
              href={JEE_MAIN_PREFERENCE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full md:w-auto inline-block text-center"
            >
              {uiText.getAccessButton}
            </a>
          )}
        </div>

        {/* JEE Advanced Preference List Section */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-primary mb-3">{uiText.jeeAdvancedTitle}</h2>
          <p className="text-gray-700 mb-4">{uiText.jeeAdvancedDescription}</p>
          {isJeeAdvancedFormPlaceholder ? (
            <button className="btn-primary w-full md:w-auto opacity-50 cursor-not-allowed" disabled>
              {uiText.comingSoon}
            </button>
          ) : (
            <a
              href={JEE_ADVANCED_PREFERENCE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full md:w-auto inline-block text-center"
            >
              {uiText.getAccessButton}
            </a>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-10 p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-md text-sm">
        <p className="font-semibold mb-1">Important Note:</p>
        <p>{uiText.formSubmissionNote}</p>
      </div>
    </div>
  );
}
