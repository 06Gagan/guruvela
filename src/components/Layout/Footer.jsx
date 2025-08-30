// src/components/Layout/Footer.jsx
import { Link } from 'react-router-dom'; // Import Link

export default function Footer() {
  return (
    <footer className="mt-12 bg-white/70 backdrop-blur-md border-t border-accent/20 text-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="font-semibold text-lg mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Guruvela</p>
          <p className="text-sm mb-4 text-gray-600">
            Your trusted guide for JOSAA, CSAB, and all things related to engineering admissions in India.
          </p>
          <div className="flex justify-center space-x-4 mb-4 text-sm">
            <Link to="/about-us" className="text-gray-700 hover:text-accent transition-colors">About Us</Link>
            <Link to="/faqs" className="text-gray-700 hover:text-accent transition-colors">FAQ & Guides</Link>
            {/* Placeholder Links - replace '#' with actual paths when ready */}
            <Link to="#" className="text-gray-700 hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-gray-700 hover:text-accent transition-colors">Terms of Service</Link>
          </div>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Guruvela. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}