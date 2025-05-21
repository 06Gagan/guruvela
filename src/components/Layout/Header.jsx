import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Guruvela
          </Link>
          <div className="space-x-6">
            <Link to="/pages/about-us" className="text-gray-600 hover:text-primary">
              About
            </Link>
            <Link to="/pages/how-to-use" className="text-gray-600 hover:text-primary">
              How to Use
            </Link>
            <Link to="/pages/faq" className="text-gray-600 hover:text-primary">
              FAQ
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
} 