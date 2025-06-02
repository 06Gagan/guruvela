// src/App.jsx
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import ChatInterface from './components/Chatbot/ChatInterface';
import ContentPage from './pages/ContentPage';
import FAQListPage from './pages/FAQListPage';
import RankPredictorPage from './pages/RankPredictorPage';
import CsabRankPredictorPage from './pages/CsabRankPredictorPage';
import MentorsPage from './pages/MentorsPage';
import HowToUsePage from './pages/HowToUsePage';
import AboutUsPage from './pages/AboutUsPage';
import JosaaDocumentsPage from './pages/JosaaDocumentsPage';
import PreferenceGuidesPage from './pages/PreferenceGuidesPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react"; // Import Vercel Analytics

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
        path: "about-us",
        element: <AboutUsPage />
      },
      {
        path: "how-to-use",
        element: <HowToUsePage />
      },
      {
        path: "josaa-documents",
        element: <JosaaDocumentsPage />
      },
      {
        path: "preference-guides", 
        element: <PreferenceGuidesPage />
      },
      {
        path: "pages/:slug",
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
      <SpeedInsights />
      <Analytics /> {/* Add the Analytics component here */}
    </LanguageProvider>
  );
}

export default App;