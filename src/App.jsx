// src/App.jsx
import { 
  createBrowserRouter, 
  RouterProvider, 
  ScrollRestoration // Keep the import for now, even if component is commented out
} from 'react-router-dom';
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
import { SpeedInsights } from "@vercel/speed-insights/react"; // Keep the import

// Define the routes using the createBrowserRouter API
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // MainLayout will contain the Outlet for children
    children: [
      {
        index: true, // This makes ChatInterface the default child for "/"
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
        path: "pages/:slug", // For individual FAQ/Guide pages
        element: <ContentPage />
      },
      {
        path: "faqs", // For the list of FAQs and Guides
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
      // TODO: Add a 404 Not Found route if desired
      // {
      //   path: "*",
      //   element: <NotFoundPage /> 
      // }
    ]
  }
]);

function App() {
  return (
    <LanguageProvider>
      {/* ScrollRestoration helps manage scroll position on navigation */}
      {/* Temporarily commented out for debugging */}
      {/* <ScrollRestoration 
        getKey={(location, matches) => {
          // Default key generation, or customize if needed
          // Using the default often works well with createBrowserRouter
          return location.pathname; 
        }}
      />
      */}
      <RouterProvider router={router} />
      {/* Vercel Speed Insights component */}
      <SpeedInsights />
      {/* Vercel Analytics component */}
      {/* Temporarily commented out for debugging */}
      {/* <Analytics /> */}
    </LanguageProvider>
  );
}

export default App;