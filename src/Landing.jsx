import React, { useState } from 'react';

// Helper component for keyboard key badges
const KeyBadge = ({ children, className }) => (
  <div
    className={`absolute bg-white/80 backdrop-blur-sm shadow-md rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-900/5 ${className}`}
  >
    {children}
  </div>
);

// Helper component for feature chips
const FeatureChip = ({ children }) => (
  <div className="bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-gray-800 ring-1 ring-gray-900/10">
    {children}
  </div>
);

// Helper component for demo overlay chips
const DemoChip = ({ children, className }) => (
  <div
    className={`absolute bg-white/80 backdrop-blur-md rounded-full px-4 py-2 text-sm font-medium text-gray-900 ring-1 ring-gray-900/10 shadow-lg ${className}`}
  >
    {children}
  </div>
);

const Landing = ({
  logoSrc = 'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
  demoSrc = 'https://tailwindui.com/img/screenshots/abstract-application-demo-light.png',
  macCtaLink = '#',
  windowsCtaLink = '#',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Background Gradient & Vignette */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,239,255,0.5),rgba(255,255,255,0))]"></div>

      {/* Header */}
      <header className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <a href="#" title="Your Company">
              <img className="h-8 w-auto" src={logoSrc} alt="Company Logo" />
            </a>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Product</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Features</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Pricing</a>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
             <a href="#" className="text-sm font-semibold text-gray-700 hover:text-gray-900">Log in</a>
             <a href="#" className="px-4 py-2 text-sm font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800">
                Sign up
             </a>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg mt-2">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Product</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Features</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Pricing</a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="px-5">
                    <a href="#" className="block w-full text-center px-4 py-2 text-base font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-900">Sign up</a>
                    <p className="mt-4 text-center text-base font-medium text-gray-500">
                        Existing customer? <a href="#" className="text-indigo-600 hover:text-indigo-500">Log in</a>
                    </p>
                </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-16 sm:pt-24 lg:pt-32">
          <div className="max-w-2xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-gray-900">
              Your notes, but smarter
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto">
              Capture your thoughts, and let our AI organize, summarize, and connect them for you.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href={macCtaLink}
                className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get for Mac
              </a>
              <a
                href={windowsCtaLink}
                className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-gray-800 hover:bg-gray-900 shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
              >
                Get for Windows
              </a>
            </div>
          </div>

          {/* Floating Keyboard Badges */}
          <div className="hidden lg:block">
            <KeyBadge className="top-10 left-1/4 -translate-x-20 transition-transform hover:-translate-y-1">⌘ + K</KeyBadge>
            <KeyBadge className="top-1/2 right-1/4 translate-x-24 transition-transform hover:-translate-y-1">✨ Ask AI</KeyBadge>
            <KeyBadge className="bottom-0 left-1/4 translate-x-12 transition-transform hover:-translate-y-1">Summarize</KeyBadge>
            <KeyBadge className="top-20 right-[15%] transition-transform hover:-translate-y-1">Ctrl + S</KeyBadge>
          </div>
        </section>

        {/* Frosted Glass Context Card */}
        <section className="mt-16 sm:mt-24 lg:mt-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-8 sm:p-12 rounded-2xl bg-white/50 backdrop-blur-xl shadow-2xl ring-1 ring-black/5">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                What if your notes could think?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Our app doesn't just store your notes. It understands them. Instantly find related ideas, get answers from your knowledge base, and even search the web in real-time, all within your notes.
              </p>
          </div>
        </section>

        {/* Feature Band */}
        <section className="mt-16 sm:mt-24 lg:mt-32 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Thinking is the most tiring job. Let AI do it for you instead.
            </h3>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <FeatureChip>Live notetaking</FeatureChip>
              <FeatureChip>Instant answers</FeatureChip>
              <FeatureChip>Real-time web search</FeatureChip>
            </div>
        </section>

        {/* Product Demo */}
        <section className="mt-16 sm:mt-24 lg:mt-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-t-xl bg-gray-200/50 p-2 ring-1 ring-inset ring-gray-900/10">
            {/* Mockup Browser Controls */}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            {/* Demo Image and Overlays */}
            <div className="relative mt-2 rounded-t-lg border border-gray-200/80 shadow-inner">
              <img
                src={demoSrc}
                alt="Product demo screenshot"
                className="rounded-t-lg"
              />
               <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/10 rounded-t-lg">
                    {/* Overlay chips on hover */}
                    <DemoChip className="transform -translate-x-24 -translate-y-12">AI response</DemoChip>
                    <DemoChip className="transform translate-x-20 translate-y-16">Show transcript</DemoChip>
               </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-16 sm:mt-24 lg:mt-32 py-12 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Your Company, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
