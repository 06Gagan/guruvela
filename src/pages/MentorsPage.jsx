// src/pages/MentorsPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import MentorCard from '../components/Mentors/MentorCard';

export default function MentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const actualGeneralGroupLink = "https://chat.whatsapp.com/ILaZUl502MSJI2zF8B3iGw";
  const actualPremiumGuidanceLink = "https://docs.google.com/forms/d/e/1FAIpQLSdh6syRNkLn8RzrUTf7rSBO8wXiIoxZ98SRLdm014_3lhv8AQ/viewform";

  const GENERAL_GROUP_LINK_PLACEHOLDER = "YOUR_GENERAL_GROUP_LINK_HERE";
  const PREMIUM_GUIDANCE_LINK_PLACEHOLDER = "YOUR_PREMIUM_GUIDANCE_LINK_HERE";


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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-start mb-6">
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
        Connect with Our Mentors
      </h1>

      {mentors.length === 0 && !loading && (
        <div className="card p-6 text-center">
          <p className="text-gray-600 text-lg">
            No mentors are currently available. Please check back later.
          </p>
        </div>
      )}

      {mentors.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {mentors.map(mentor => (
            <MentorCard key={mentor.id} mentor={mentor} fallbackGroupLink={actualGeneralGroupLink} />
          ))}
        </div>
      )}

      <div className="mt-12 p-6 md:p-8 bg-blue-50 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Other Mentorship Options</h2>
        <p className="text-gray-700 mb-3">
          For general guidance in a group setting, you can join our community group:
          <a
            href={isGeneralLinkEffectivelyPlaceholder ? "#" : actualGeneralGroupLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`ml-1 font-semibold ${isGeneralLinkEffectivelyPlaceholder ? 'text-gray-400 cursor-not-allowed' : 'text-accent hover:underline'}`}
            aria-disabled={isGeneralLinkEffectivelyPlaceholder}
            onClick={(e) => isGeneralLinkEffectivelyPlaceholder && e.preventDefault()}
          >
            Join Community Group
          </a>
        </p>
        <p className="text-gray-700">
          Need more dedicated support, such as early WhatsApp replies or direct calls?
          <a
            href={isPremiumLinkEffectivelyPlaceholder ? "#" : actualPremiumGuidanceLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`ml-1 font-semibold ${isPremiumLinkEffectivelyPlaceholder ? 'text-gray-400 cursor-not-allowed' : 'text-accent hover:underline'}`}
            aria-disabled={isPremiumLinkEffectivelyPlaceholder}
            onClick={(e) => isPremiumLinkEffectivelyPlaceholder && e.preventDefault()}
          >
            Explore Premium Guidance
          </a>
        </p>
      </div>
    </div>
  );
}