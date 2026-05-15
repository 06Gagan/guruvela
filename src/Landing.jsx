import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart2, 
  Map, 
  ShieldCheck, 
  Users, 
  ChevronRight, 
  Target, 
  Eye, 
  Award,
  Globe 
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden flex items-center justify-center min-h-[85vh]">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Column: Text & CTAs */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-primary text-sm font-semibold mb-6">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                Official Counselling Partner 2025
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-6">
                Navigating <span className="text-primary">Ambition</span> <br />
                with Clarity
              </h1>
              <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Experience premium, data-driven college admissions counseling. We empower students with AI-assisted insights, accurate predictors, and expert Ivy-League level guidance to secure their future.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link
                  to="/rank-predictor"
                  className="px-8 py-4 w-full sm:w-auto bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all transform hover:-translate-y-1 shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
                >
                  Start Predicting
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/mentors"
                  className="px-8 py-4 w-full sm:w-auto bg-white text-gray-700 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center"
                >
                  Meet Our Experts
                </Link>
              </div>
            </div>

            {/* Right Column: Dashboard Mockup */}
            <div className="w-full lg:w-1/2 relative hidden md:block">
              {/* Decorative backgrounds */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
              
              <div className="relative bg-white border border-gray-200 rounded-3xl p-6 shadow-2xl shadow-gray-200/50 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-primary">
                      <BarChart2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">Analytics Engine</div>
                      <div className="text-xs text-gray-500">Live Prediction Data</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">
                    99.8% Accuracy
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                        <Map className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                      </div>
                      <div className="h-4 bg-blue-100 rounded w-12"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating element */}
              <div className="absolute -bottom-6 -left-10 bg-white p-4 rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/50 flex items-center gap-4 animate-bounce">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">10,000+</div>
                  <div className="text-xs text-gray-500">Students Guided</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 relative bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Mission Card */}
            <div className="bg-gray-50 p-10 rounded-3xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-white border border-gray-200 rounded-2xl flex items-center justify-center text-primary mb-8 shadow-sm">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-500 leading-relaxed text-lg">
                To democratize expert college consulting by leveraging data analytics and AI, providing every student with transparent, accurate, and actionable admission strategies regardless of their background.
              </p>
            </div>
            
            {/* Vision Card */}
            <div className="bg-gray-50 p-10 rounded-3xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-white border border-gray-200 rounded-2xl flex items-center justify-center text-primary mb-8 shadow-sm">
                <Eye className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-500 leading-relaxed text-lg">
                We envision a future where the stress of collegiate admissions is entirely eliminated through seamless technology, where ambition is met with crystal clarity and precise engineering roadmaps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Guruvela */}
      <section className="py-24 relative bg-[#f8fafc]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose Guruvela</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Our platform stands apart with an uncompromising commitment to premium architecture and precise outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 hover:-translate-y-2 transition-transform shadow-sm hover:shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-primary mb-6">
                <BarChart2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Data-Driven Predictor</h3>
              <p className="text-gray-500 leading-relaxed">
                Utilizing years of verified historical cutoffs across JoSAA and CSAB to deliver the industry's most accurate rank forecasts.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-200 hover:-translate-y-2 transition-transform shadow-sm hover:shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-primary mb-6">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Ivy-League Expertise</h3>
              <p className="text-gray-500 leading-relaxed">
                Consult with mentors who have walked the path at premier institutions, offering insider insights no algorithmic tool can match.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-200 hover:-translate-y-2 transition-transform shadow-sm hover:shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-primary mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Authentic Narratives</h3>
              <p className="text-gray-500 leading-relaxed">
                We believe in genuine guidance. No false promises, just purely authentic documentation, verified strategies, and measurable outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Experts */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Meet the Experts</h2>
              <p className="text-gray-500 text-lg max-w-xl">
                Our mentorship board consists of accomplished individuals from IITs, NITs, and leading tech companies.
              </p>
            </div>
            <Link to="/mentors" className="mt-6 md:mt-0 text-primary font-bold hover:text-primary-dark flex items-center gap-1 group">
              View All Mentors <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Dr. Alok Verma", role: "IIT Bombay Alumni", img: "avataaars" },
              { name: "Sarah Jenkins", role: "Admissions Coach", img: "avataaars" },
              { name: "Rahul Sharma", role: "NIT Trichy Expert", img: "avataaars" },
              { name: "Priya Desai", role: "Financial Aid Specialist", img: "avataaars" }
            ].map((mentor, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="aspect-[4/5] bg-gray-100 rounded-3xl mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-colors z-10" />
                  <img 
                    src={`https://api.dicebear.com/7.x/${mentor.img}/svg?seed=${mentor.name}&backgroundColor=f1f5f9`} 
                    alt={mentor.name}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900">{mentor.name}</h4>
                <p className="text-sm font-medium text-primary mt-1">{mentor.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}
