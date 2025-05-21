import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout'
import ChatInterface from './components/Chatbot/ChatInterface'
import ContentPage from './pages/ContentPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ChatInterface />} />
          <Route path="pages/:slug" element={<ContentPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App 