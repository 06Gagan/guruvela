// src/pages/MentorsPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import MentorCard from '../components/Mentors/MentorCard';
import { Users, AlertCircle, Search, ChevronRight } from 'lucide-react';

export default function MentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const actualGeneralGroupLink = "https://chat.whatsapp.com/ILaZUl502MSJI2zF8B3iGw";
  const actualPremiumGuidanceLink = "https://docs.google.com/forms/d/e/1FAIpQLSdh6syRNkLn8RzrUTf7rSBO8wXiIoxZ98SRLdm014_3lhv8AQ/viewform";

  const GENERAL_GROUP_LINK_PLACEHOLDER = "YOUR_GENERAL_GROUP_LINK_HERE";
  const PREMIUM_GUIDANCE_LINK_PLACEHOLDER = "YOUR_PREMIUM_GUIDANCE_LINK_HERE";


  useEffect(() => {
    document.title = 'Mentors | Guruvela';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Connect with mentors for counselling guidance');
    }
  }, []);

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: supabaseError } = await supabase
          .from('mentors')
          .select('id, name, profile_image_path, branch, state, google_form_link_1_to_1, group_guidance_link, linkedin_url')
          .eq('active', true)
          .order('sort_order', { ascending: true });

        if (supabaseError) {
          throw supabaseError;
        }
        setMentors(data || []);
      } catch (err) {
        console.error('Error fetching mentors:', err);
        setError(err.message || 'Failed to fetch mentors.');
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="card p-6">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link to="/" className="btn-primary">Go to Homepage</Link>
        </div>
      </div>
    );
  }

  const isGeneralLinkEffectivelyPlaceholder = actualGeneralGroupLink === GENERAL_GROUP_LINK_PLACEHOLDER;
  const isPremiumLinkEffectivelyPlaceholder = actualPremiumGuidanceLink === PREMIUM_GUIDANCE_LINK_PLACEHOLDER;


  return (
    <div className="w-full bg-[#f8fafc] min-h-screen pb-20 font-sans">
      
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 py-12 mb-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex justify-start mb-4">
            <Link to="/" className="text-primary hover:underline flex items-center text-sm font-medium">
              <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
              Back to Home
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            Connect with Our Mentors
          </h1>
          <p className="text-gray-500 text-lg max-w-3xl">
            Get personalized guidance from engineering students who have successfully navigated the admission process. They are here to help you secure the best possible college based on your rank.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl">
        {mentors.length === 0 && !loading && (
          <div className="bg-white border border-gray-200 p-12 rounded-3xl flex flex-col items-center justify-center min-h-[300px] text-center">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-400">
               <Search className="w-10 h-10" />
             </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Mentors Found</h3>
            <p className="text-gray-500 text-lg">
              No mentors are currently available. Please check back later.
            </p>
          </div>
        )}

        {mentors.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {mentors.map(mentor => (
              <MentorCard key={mentor.id} mentor={mentor} fallbackGroupLink={actualGeneralGroupLink} />
            ))}
          </div>
        )}

        <div className="mt-16 p-8 md:p-10 bg-white border border-gray-200 rounded-3xl shadow-sm text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -ml-20 -mb-20"></div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 relative z-10">Other Mentorship Options</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto relative z-10 text-lg">
            For general guidance in a group setting, you can join our active community group. Connect with peers and solve your queries together.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <a
              href={isGeneralLinkEffectivelyPlaceholder ? "#" : actualGeneralGroupLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-8 py-4 rounded-xl font-bold transition-all shadow-sm ${isGeneralLinkEffectivelyPlaceholder ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' : 'bg-primary text-white hover:bg-primary-dark hover:shadow-md'}`}
              aria-disabled={isGeneralLinkEffectivelyPlaceholder}
              onClick={(e) => isGeneralLinkEffectivelyPlaceholder && e.preventDefault()}
            >
              Join Community Group
            </a>
            
            <a
              href={isPremiumLinkEffectivelyPlaceholder ? "#" : actualPremiumGuidanceLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-8 py-4 rounded-xl font-bold transition-all ${isPremiumLinkEffectivelyPlaceholder ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' : 'bg-white text-primary border-2 border-primary hover:bg-blue-50'}`}
              aria-disabled={isPremiumLinkEffectivelyPlaceholder}
              onClick={(e) => isPremiumLinkEffectivelyPlaceholder && e.preventDefault()}
            >
              Explore Premium Guidance
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-6 relative z-10">
             Need more dedicated support? The Premium Guidance offers early WhatsApp replies and direct calls.
          </p>
        </div>
      </div>
    </div>
  );
}