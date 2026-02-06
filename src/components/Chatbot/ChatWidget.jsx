import React, { useState, useEffect, useRef } from 'react';
import ChatInterface from './ChatInterface';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef(null);

  const toggleOpen = () => setIsOpen(prev => !prev);

  // Close when clicking outside, optional but good UX
  useEffect(() => {
    function handleClickOutside(event) {
      if (widgetRef.current && !widgetRef.current.contains(event.target) && !event.target.closest('button[aria-label="Toggle Chat"]')) {
        // Optional: uncomment to auto-close when clicking away
        // setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Widget Container */}
      <div
        ref={widgetRef}
        className={`fixed z-50 transition-all duration-300 ease-in-out transform origin-bottom-right
          ${isOpen
            ? 'scale-100 opacity-100'
            : 'scale-0 opacity-0 pointer-events-none translate-y-10 translate-x-10'
          }
          bottom-20 right-4 w-[95vw] h-[80vh] sm:right-6 sm:bottom-24 sm:w-[400px] sm:h-[600px]
          bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col
        `}
      >
        {/* Header (Optional, if we want a drag handle or specific close button separate from the FAB) */}
        <div className="bg-primary px-4 py-3 flex items-center justify-between text-white sm:hidden">
            <span className="font-bold">Guruvela Assistant</span>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-hidden relative">
            {isOpen && <ChatInterface />}
        </div>
      </div>

      {/* Toggle Button (FAB) */}
      <button
        onClick={toggleOpen}
        aria-label="Toggle Chat"
        className={`fixed z-50 bottom-4 right-4 sm:bottom-6 sm:right-6 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/30
          ${isOpen ? 'bg-gray-800 text-white rotate-90' : 'bg-primary text-white'}
        `}
      >
        {isOpen ? (
          <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </>
  );
}
