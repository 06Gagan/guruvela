import React from 'react';
import { Link } from 'react-router-dom';

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
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary via-blue-500 to-white overflow-hidden pt-16">
        <div className="absolute inset-0 pointer-events-none">
           {/* Abstract minimalist vertical lines or slight texture could go here if needed */}
        </div>

        <div className="z-10 text-center px-4 animate-fade-in-up">
          <h1 className="font-display text-[20vw] sm:text-[15vw] leading-none font-bold text-white tracking-tighter drop-shadow-sm opacity-90 select-none transform hover:scale-105 transition-transform duration-700 ease-out">
            GURUVELA
          </h1>
          <p className="mt-4 text-xl sm:text-2xl md:text-3xl text-blue-50 font-medium tracking-wide max-w-3xl mx-auto">
            Your Official Companion for Engineering Admissions
          </p>
          <div className="mt-10">
             <span className="text-white/80 text-sm uppercase tracking-widest">Scroll to explore</span>
             <div className="mt-2 w-px h-16 bg-white/50 mx-auto animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Stacking Cards Section */}
      <section className="relative w-full bg-gray-50 pb-20">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </section>
    </div>
  );
}
