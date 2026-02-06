// src/components/Layout/MainLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ChatWidget from '../Chatbot/ChatWidget';

export default function MainLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-[100dvh] flex flex-col bg-gray-50">
      <Header />

      {/*
        If Home Page: No default container/padding (Landing handles it).
        Other Pages: Use container and padding.
      */}
      <main className={`flex-grow ${isHomePage ? '' : 'container mx-auto px-4 py-8'}`}>
        <Outlet />
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
