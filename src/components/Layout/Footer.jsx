// src/components/Layout/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto bg-gray-50 border-t border-gray-200 text-gray-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link to="/" className="text-xl font-black text-primary tracking-tight mb-4 block">
              Guruvela
            </Link>
            <p className="text-sm text-gray-500 mb-4">
              Your trusted guide for JoSAA, CSAB, and engineering admissions in India. Official, authentic, and student-focused.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/rank-predictor" className="hover:text-primary transition-colors">College Predictor</Link></li>
              <li><Link to="/josaa-documents" className="hover:text-primary transition-colors">Document Verification</Link></li>
              <li><Link to="/preference-guides" className="hover:text-primary transition-colors">Preference Guides</Link></li>
              <li><Link to="/merchandise" className="hover:text-primary transition-colors">Merchandise</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faqs" className="hover:text-primary transition-colors">FAQs & Guides</Link></li>
              <li><Link to="/how-to-use" className="hover:text-primary transition-colors">How to Use</Link></li>
              <li><Link to="/mentors" className="hover:text-primary transition-colors">Mentors</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about-us" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Guruvela. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
