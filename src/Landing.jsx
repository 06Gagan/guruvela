import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from './components/Chatbot/ChatInterface';

const features = [
  {
    title: "College Predictor",
    description: "Predict your admission chances in IITs, NITs, and IIITs based on your rank. Supports both JoSAA and CSAB counselling rounds.",
    link: "/rank-predictor",
    buttonText: "Predict Now",
    bgColor: "bg-white",
    textColor: "text-gray-900",
  },
  {
    title: "Document Verification",
    description: "Ensure you have all necessary documents ready. Detailed checklists and formats for JoSAA and CSAB to avoid last-minute hassles.",
    link: "/josaa-documents",
    buttonText: "Check Documents",
    bgColor: "bg-blue-50",
    textColor: "text-primary-dark",
  },
  {
    title: "Preference Guides",
    description: "Expert-curated preference lists to help you make the best choice. Optimize your college selection strategy.",
    link: "/preference-guides",
    buttonText: "View Guides",
    bgColor: "bg-white",
    textColor: "text-gray-900",
  },
  {
    title: "Mentors",
    description: "Connect with seniors and mentors from top institutes. Get real insights and guidance for your college journey.",
    link: "/mentors",
    buttonText: "Find a Mentor",
    bgColor: "bg-blue-600",
    textColor: "text-white",
    isDark: true,
  },
  {
    title: "Merchandise",
    description: "Exclusive Guruvela and college-themed merchandise. Show your pride with our official authentic collection.",
    link: "/merchandise",
    buttonText: "Visit Store",
    bgColor: "bg-gray-900",
    textColor: "text-white",
    isDark: true,
  },
];

const FeatureCard = ({ feature, index }) => {
  // Stacking offset logic: Header (~64px) + small gap
  const topOffset = 80 + (index * 10);

  return (
    <div
      className={`sticky flex flex-col items-center justify-center min-h-[80vh] w-full border-t border-gray-200 shadow-xl ${feature.bgColor} ${feature.textColor} overflow-hidden`}
      style={{ top: `${topOffset}px`, zIndex: index + 10 }}
    >
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tight mb-6">
          {feature.title}
        </h2>
        <p className={`text-lg md:text-2xl mb-10 max-w-2xl mx-auto ${feature.isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {feature.description}
        </p>
        <Link
          to={feature.link}
          className={`inline-block px-8 py-4 rounded-full text-lg font-bold transition-transform hover:scale-105 shadow-lg
            ${feature.isDark
              ? 'bg-white text-gray-900 hover:bg-gray-100'
              : 'bg-primary text-white hover:bg-primary-dark'
            }`}
        >
          {feature.buttonText}
        </Link>
      </div>
    </div>
  );
};

export default function Landing() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate Opacity/Scale based on scroll for Hero Transition
  // 0 to 400px scroll: Fade out Title, Fade in Chat
  const scrollThreshold = 400;
  const progress = Math.min(scrollY / scrollThreshold, 1);

  const titleOpacity = 1 - progress;
  const titleScale = 1 - (progress * 0.2); // Scale down slightly
  const titleTranslateY = -progress * 100; // Move up

  // Chat Interface Transition
  // Starts appearing after 100px, fully visible by 400px
  const chatOpacity = Math.max(0, (scrollY - 100) / 300);
  const chatScale = 0.8 + (Math.min(1, Math.max(0, (scrollY - 100) / 300)) * 0.2); // Scale up from 0.8 to 1
  const chatTranslateY = 100 - (Math.min(1, Math.max(0, (scrollY - 100) / 300)) * 100); // Slide up

  // Should we allow pointer events on chat? Only when it's mostly visible
  const chatPointerEvents = progress > 0.8 ? 'auto' : 'none';

  return (
    <div className="w-full">
      {/*
        HERO + CHAT TRANSITION SECTION
        Pinned height to allow for scroll effect
      */}
      <section className="relative h-[160vh] bg-gradient-to-b from-primary via-blue-500 to-white overflow-visible">

        {/* Fixed Background Elements */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

          {/* TITLE LAYER */}
          <div
            className="absolute z-10 text-center px-4 transition-transform duration-100 ease-out will-change-transform"
            style={{
              opacity: titleOpacity,
              transform: `translateY(${titleTranslateY}px) scale(${titleScale})`,
              pointerEvents: titleOpacity > 0.1 ? 'auto' : 'none'
            }}
          >
            <h1 className="font-display text-[20vw] sm:text-[15vw] leading-none font-bold text-white tracking-tighter drop-shadow-sm select-none">
              GURUVELA
            </h1>
            <p className="mt-4 text-xl sm:text-2xl md:text-3xl text-blue-50 font-medium tracking-wide max-w-3xl mx-auto">
              Your Official Companion for Engineering Admissions
            </p>
            <div className="mt-10 animate-bounce">
               <span className="text-white/80 text-sm uppercase tracking-widest block mb-2">Scroll to Chat</span>
               <svg className="w-6 h-6 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </div>
          </div>

          {/* CHAT LAYER */}
          <div
            className="absolute z-20 w-full max-w-5xl px-4 transition-all duration-300 ease-out will-change-transform"
            style={{
              opacity: chatOpacity,
              transform: `translateY(${chatTranslateY}px) scale(${chatScale})`,
              pointerEvents: chatPointerEvents
            }}
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden h-[70vh] md:h-[80vh] flex flex-col relative">
              {/* Fake Browser Header for "Official" Look */}
              <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="ml-4 flex-grow bg-white rounded-md h-6 border border-gray-200 flex items-center px-3 text-xs text-gray-400">
                  guruvela.com/assistant
                </div>
              </div>

              {/* Chat Interface Container */}
              <div className="flex-grow overflow-hidden relative p-2 md:p-4">
                 <ChatInterface />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Stacking Cards Section */}
      <section className="relative w-full bg-gray-50 pb-20 z-30">
        <div className="py-20 text-center">
            <h2 className="text-3xl font-bold text-gray-400 uppercase tracking-widest">More Features</h2>
        </div>
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </section>
    </div>
  );
}
