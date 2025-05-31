// src/components/Layout/MainLayout.jsx (UPDATED based on your image)
import { Outlet, useLocation } from 'react-router-dom'; // 1. Import useLocation
import Header from './Header';
import Footer from './Footer';

export default function MainLayout() {
  const location = useLocation(); // 2. Get the current location

  // 3. Check if the current page is the chatbot page (which is at path "/")
  // Your ChatInterface is the index route for "/", so its pathname is "/"
  const isChatbotPage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet /> {/* Child route components (like ChatInterface) render here */}
      </main>
      {/* 4. Conditionally render the Footer */}
      {!isChatbotPage && <Footer />}
    </div>
  );
}