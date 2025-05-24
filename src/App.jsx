// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import ChatInterface from './components/Chatbot/ChatInterface';
import ContentPage from './pages/ContentPage';
import FAQListPage from './pages/FAQListPage'; 
import RankPredictorPage from './pages/RankPredictorPage';
import CsabRankPredictorPage from './pages/CsabRankPredictorPage'; // Assuming this is your separate CSAB page
import { LanguageProvider } from './contexts/LanguageContext';

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
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;