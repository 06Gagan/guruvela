import React, { useState } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';

// Helper component for keyboard key badges
const KeyBadge = ({ children, className }) => (
  <div
    className={`absolute bg-background border border-border shadow-subtle rounded-lg px-3 py-2 text-sm font-medium text-muted transition-transform hover:-translate-y-1 ${className}`}
  >
    {children}
  </div>
);

// Helper component for feature chips
const FeatureChip = ({ children }) => (
  <div className="border border-border bg-background rounded-full px-4 py-2 text-sm font-medium text-foreground">
    {children}
  </div>
);

// Helper component for demo overlay chips
const DemoChip = ({ children, className }) => (
  <div
    className={`absolute bg-background/80 backdrop-blur-sm border border-border shadow-lg rounded-full px-4 py-2 text-sm font-medium text-foreground ${className}`}
  >
    {children}
  </div>
);

const Landing = ({
  logoSrc = 'https://tailwindui.com/img/logos/mark.svg?color=black',
  demoSrc = 'https://tailwindui.com/img/screenshots/abstract-application-demo-light.png',
  macCtaLink = '#',
  windowsCtaLink = '#',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-muted font-sans">
      {/* Header */}
      <header className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <a href="#" title="Your Company">
              <img className="h-8 w-auto" src={logoSrc} alt="Company Logo" />
            </a>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium text-muted hover:text-foreground transition-colors">Product</a>
            <a href="#" className="text-sm font-medium text-muted hover:text-foreground transition-colors">Features</a>
            <a href="#" className="text-sm font-medium text-muted hover:text-foreground transition-colors">Pricing</a>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
             <a href="#" className="text-sm font-semibold text-muted hover:text-foreground transition-colors">Log in</a>
             <a href="#" className="px-4 py-2 text-sm font-semibold text-background bg-foreground rounded-lg hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground">
                Sign up
             </a>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted hover:text-foreground hover:bg-subtle focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background shadow-lg rounded-b-lg mt-2 border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-foreground hover:bg-subtle">Product</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-foreground hover:bg-subtle">Features</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-foreground hover:bg-subtle">Pricing</a>
            </div>
            <div className="pt-4 pb-3 border-t border-border">
                <div className="px-5">
                    <a href="#" className="block w-full text-center px-4 py-2 text-base font-medium text-background bg-foreground rounded-lg hover:bg-gray-800">Sign up</a>
                    <p className="mt-4 text-center text-base font-medium text-muted">
                        Existing customer? <a href="#" className="text-accent hover:underline">Log in</a>
                    </p>
                </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 sm:pt-28 lg:pt-32">
          <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground">
              Your notes, but smarter
            </h1>
            <p className="mt-6 text-lg text-muted max-w-2xl mx-auto">
              Capture your thoughts, and let our AI organize, summarize, and connect them for you.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href={macCtaLink}
                className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-accent hover:bg-blue-600 shadow-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Get for Mac
              </a>
              <a
                href={windowsCtaLink}
                className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-border text-base font-semibold rounded-lg text-foreground bg-background hover:bg-subtle shadow-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Get for Windows
              </a>
            </div>
          </div>

          {/* Floating Keyboard Badges */}
          <div className="hidden lg:block">
            <KeyBadge className="top-10 left-1/4 -translate-x-20">⌘ + K</KeyBadge>
            <KeyBadge className="top-1/2 right-1/4 translate-x-24 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" /> Ask AI
            </KeyBadge>
            <KeyBadge className="bottom-0 left-1/4 translate-x-12">Summarize</KeyBadge>
            <KeyBadge className="top-20 right-[15%]">Ctrl + S</KeyBadge>
          </div>
        </section>

        {/* Context Card */}
        <section className="mt-20 sm:mt-28 lg:mt-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-8 sm:p-12 rounded-2xl bg-subtle border border-border">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                What if your notes could think?
              </h2>
              <p className="mt-4 text-lg text-muted">
                Our app doesn't just store your notes. It understands them. Instantly find related ideas, get answers from your knowledge base, and even search the web in real-time, all within your notes.
              </p>
          </div>
        </section>

        {/* Feature Band */}
        <section className="mt-20 sm:mt-28 lg:mt-32 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl sm:text-3xl font-semibold text-foreground">
              Thinking is the most tiring job. Let AI do it for you instead.
            </h3>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <FeatureChip>Live notetaking</FeatureChip>
              <FeatureChip>Instant answers</FeatureChip>
              <FeatureChip>Real-time web search</FeatureChip>
            </div>
        </section>

        {/* Product Demo */}
        <section className="mt-20 sm:mt-28 lg:mt-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-xl bg-subtle p-2 ring-1 ring-inset ring-border">
            {/* Mockup Browser Controls */}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            </div>
            {/* Demo Image and Overlays */}
            <div className="relative mt-2 rounded-lg border border-border">
              <img
                src={demoSrc}
                alt="Product demo screenshot"
                className="rounded-lg"
              />
               <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/10 rounded-lg">
                    {/* Overlay chips on hover */}
                    <DemoChip className="transform -translate-x-24 -translate-y-12">AI response</DemoChip>
                    <DemoChip className="transform translate-x-20 translate-y-16">Show transcript</DemoChip>
               </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-20 sm:mt-28 lg:mt-32 py-12 bg-subtle border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted">
            <p>&copy; {new Date().getFullYear()} Your Company, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
