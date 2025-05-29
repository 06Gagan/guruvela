// src/App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import ChatInterface from './components/Chatbot/ChatInterface';
import ContentPage from './pages/ContentPage'; // For FAQs, Guides, etc. from 'content_pages' table
import FAQListPage from './pages/FAQListPage'; 
import RankPredictorPage from './pages/RankPredictorPage';
import CsabRankPredictorPage from './pages/CsabRankPredictorPage';
import MentorsPage from './pages/MentorsPage';
import HowToUsePage from './pages/HowToUsePage'; 
import AboutUsPage from './pages/AboutUsPage';
import { LanguageProvider } from './contexts/LanguageContext';
// import { Analytics } from "@vercel/analytics/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ChatInterface />
      },
      {
        path: "about-us", // This route uses AboutUsPage.jsx
        element: <AboutUsPage />
      },
      {
        path: "how-to-use", // This route uses HowToUsePage.jsx
        element: <HowToUsePage />
      },
      {
        path: "pages/:slug", // This route uses ContentPage.jsx
        element: <ContentPage />
      },
      {
        path: "faqs",
        element: <FAQListPage />
      },
      {
        path: "rank-predictor",
        element: <RankPredictorPage />
      },
      {
        path: "csab-predictor",
        element: <CsabRankPredictorPage />
      },
      {
        path: "mentors",
        element: <MentorsPage />
      }
    ]
  }
]);

function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
      {/* <Analytics /> */}
    </LanguageProvider>
  );
}

export default App;