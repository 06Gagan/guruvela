// src/components/Layout/Footer.jsx
import { Link } from 'react-router-dom'; // Import Link

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12"> {/* Slightly different bg and border, added mt-12 for more space */}
      <div className="container mx-auto px-4 py-8"> {/* Increased padding */}
        <div className="text-center text-gray-700">
          <p className="font-semibold text-lg mb-2">Guruvela</p>
          <p className="text-sm mb-4">
            Your trusted guide for JOSAA, CSAB, and all things related to engineering admissions in India.
          </p>
          <div className="flex justify-center space-x-4 mb-4 text-sm">
            <Link to="/about-us" className="text-gray-600 hover:text-primary transition-colors">About Us</Link>
            <Link to="/faqs" className="text-gray-600 hover:text-primary transition-colors">FAQ & Guides</Link>
            {/* Placeholder Links - replace '#' with actual paths when ready */}
            <Link to="#" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-gray-600 hover:text-primary transition-colors">Terms of Service</Link>
          </div>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Guruvela. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}