// src/components/Layout/Footer.jsx
import { Link } from 'react-router-dom'; // Import Link

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary to-accent-alt text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="font-semibold text-lg mb-2">Guruvela</p>
          <p className="text-sm mb-4">
            Your trusted guide for JOSAA, CSAB, and all things related to engineering admissions in India.
          </p>
          <div className="flex justify-center space-x-4 mb-4 text-sm">
            <Link to="/about-us" className="text-white/80 hover:text-white transition-colors">About Us</Link>
            <Link to="/faqs" className="text-white/80 hover:text-white transition-colors">FAQ & Guides</Link>
            {/* Placeholder Links - replace '#' with actual paths when ready */}
            <Link to="#" className="text-white/80 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-white/80 hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} Guruvela. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}