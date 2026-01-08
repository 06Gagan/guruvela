// src/App.jsx
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from './components/Layout/MainLayout';
import ChatInterface from './components/Chatbot/ChatInterface';
const ContentPage = lazy(() => import('./pages/ContentPage'));
const FAQListPage = lazy(() => import('./pages/FAQListPage'));
const RankPredictorPage = lazy(() => import('./pages/RankPredictorPage'));
const CsabRankPredictorPage = lazy(() => import('./pages/CsabRankPredictorPage'));
const MentorsPage = lazy(() => import('./pages/MentorsPage'));
const HowToUsePage = lazy(() => import('./pages/HowToUsePage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const JosaaDocumentsPage = lazy(() => import('./pages/JosaaDocumentsPage'));
const PreferenceGuidesPage = lazy(() => import('./pages/PreferenceGuidesPage'));
const MerchandisePage = lazy(() => import('./pages/MerchandisePage'));
import { LanguageProvider } from './contexts/LanguageContext';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react"; // Import Vercel Analytics

const withSuspense = (Component) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

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
        element: withSuspense(AboutUsPage)
      },
      {
        path: "how-to-use",
        element: withSuspense(HowToUsePage)
      },
      {
        path: "josaa-documents",
        element: withSuspense(JosaaDocumentsPage)
      },
      {
        path: "preference-guides",
        element: withSuspense(PreferenceGuidesPage)
      },
      {
        path: "pages/:slug",
        element: withSuspense(ContentPage)
      },
      {
        path: "faqs",
        element: withSuspense(FAQListPage)
      },
      {
        path: "rank-predictor",
        element: withSuspense(RankPredictorPage)
      },
      {
        path: "csab-predictor",
        element: withSuspense(CsabRankPredictorPage)
      },
      {
        path: "mentors",
        element: withSuspense(MentorsPage)
      },
      {
        path: "merchandise",
        element: withSuspense(MerchandisePage)
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