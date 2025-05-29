// src/App.jsx
import { BrowserRouter as Router, Routes, Route, ScrollRestoration } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import ChatInterface from './components/Chatbot/ChatInterface';
import ContentPage from './pages/ContentPage';
import FAQListPage from './pages/FAQListPage'; 
import RankPredictorPage from './pages/RankPredictorPage';
import CsabRankPredictorPage from './pages/CsabRankPredictorPage';
import MentorsPage from './pages/MentorsPage';
import HowToUsePage from './pages/HowToUsePage';
import { LanguageProvider } from './contexts/LanguageContext';
// import { Analytics } from "@vercel/analytics/react"; // Uncomment if you use Vercel analytics

function App() {
  return (
    <LanguageProvider>
      <Router>
        {/* Temporarily commenting out ScrollRestoration for debugging */}
        {/* <ScrollRestoration 
          getKey={(location, matches) => {
            // Default key generation, or customize if needed
            return location.key;
          }}
        />
        */}
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<ChatInterface />} />
            <Route path="pages/:slug" element={<ContentPage />} /> 
            <Route path="faqs" element={<FAQListPage />} /> 
            <Route path="rank-predictor" element={<RankPredictorPage />} />
            <Route path="csab-predictor" element={<CsabRankPredictorPage />} />
            <Route path="mentors" element={<MentorsPage />} />
            <Route path="how-to-use" element={<HowToUsePage />} />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Route>
        </Routes>
      </Router>
      {/* <Analytics /> */}
    </LanguageProvider>
  );
}

export default App;
