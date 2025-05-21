import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function ChatInterface() {
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const findBestResponse = async (userMessage) => {
    try {
      // Convert message to lowercase for better matching
      const searchTerms = userMessage.toLowerCase().split(' ')
      
      // Query fixed_responses table
      const { data, error } = await supabase
        .from('fixed_responses')
        .select('*')
        .or(
          searchTerms.map(term => 
            `question_keywords.cs.{${term}}`
          ).join(',')
        )
        .order('created_at', { ascending: false })
        .limit(1)

      if (error) throw error

      if (data && data.length > 0) {
        return {
          content: data[0].answer_text,
          relatedContent: data[0].related_content_slug
        }
      }

      return {
        content: "I'm sorry, I couldn't find a specific answer to your question. Please try rephrasing or check our guides for more information.",
        relatedContent: 'how-to-use'
      }
    } catch (error) {
      console.error('Error fetching response:', error)
      return {
        content: "I'm having trouble connecting to the database. Please try again later.",
        relatedContent: null
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    setIsLoading(true)
    // Add user message to chat
    setChatHistory(prev => [...prev, { type: 'user', content: message }])
    
    // Get response from Supabase
    const response = await findBestResponse(message)
    
    setChatHistory(prev => [...prev, {
      type: 'bot',
      content: response.content,
      relatedContent: response.relatedContent
    }])
    
    setMessage('')
    setIsLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card h-[600px] flex flex-col">
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  msg.type === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p>{msg.content}</p>
                {msg.relatedContent && (
                  <Link
                    to={`/pages/${msg.relatedContent}`}
                    className="mt-2 inline-block text-sm text-accent hover:underline"
                  >
                    Learn more about this topic →
                  </Link>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="border-t p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask your question..."
              className="flex-grow rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 