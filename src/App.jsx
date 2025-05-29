// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import ChatInterface from './components/Chatbot/ChatInterface';
import ContentPage from './pages/ContentPage';
import FAQListPage from './pages/FAQListPage'; 
import RankPredictorPage from './pages/RankPredictorPage';
import CsabRankPredictorPage from './pages/CsabRankPredictorPage';
import MentorsPage from './pages/MentorsPage';
import HowToUsePage from './pages/HowToUsePage'; // Import the new page
import { LanguageProvider } from './contexts/LanguageContext';
import { Analytics } from "@vercel/analytics/react"; // Assuming you'll re-add if needed

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<ChatInterface />} />
            <Route path="pages/:slug" element={<ContentPage />} /> 
            <Route path="faqs" element={<FAQListPage />} /> 
            <Route path="rank-predictor" element={<RankPredictorPage />} />
            <Route path="csab-predictor" element={<CsabRankPredictorPage />} />
            <Route path="mentors" element={<MentorsPage />} />
            <Route path="how-to-use" element={<HowToUsePage />} /> {/* Added route for How To Use page */}
            {/* You might want a 404 page here as well */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Route>
        </Routes>
      </Router>
      {/* <Analytics /> */}
    </LanguageProvider>
  );
}

export default App;