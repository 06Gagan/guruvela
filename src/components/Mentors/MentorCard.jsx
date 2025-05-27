// src/components/Mentors/MentorCard.jsx
import React from 'react';

export default function MentorCard({ mentor, fallbackGroupLink }) { // Added fallbackGroupLink
  const {
    name,
    profile_image_path, 
    branch,
    state,
    google_form_link_1_to_1,
    group_guidance_link // This now comes from the mentor object
  } = mentor;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const publicBucketName = 'profilepic'; 

  const imageUrl = profile_image_path 
    ? `${supabaseUrl}/storage/v1/object/public/${publicBucketName}/${profile_image_path.startsWith('/') ? profile_image_path.substring(1) : profile_image_path}`
    : 'https://via.placeholder.com/150'; 

  const actualGroupLink = group_guidance_link || fallbackGroupLink;
  const isGroupLinkPlaceholder = actualGroupLink === "YOUR_FALLBACK_WHATSAPP_GROUP_LINK_HERE" || !actualGroupLink;


  return (
    <div className="card flex flex-col items-center text-center p-6 transform transition-all duration-300 hover:shadow-xl hover:scale-105 h-full">
      <img
        src={imageUrl}
        alt={`Profile of ${name}`}
        className="w-32 h-32 rounded-full object-cover mb-4 shadow-md border-2 border-gray-200"
        onError={(e) => { 
          console.error(`Error loading image for ${name}: ${imageUrl}`);
          e.target.onerror = null; 
          e.target.src = 'https://via.placeholder.com/150'; 
        }}
      />
      <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
      {branch && <p className="text-primary font-semibold mb-1">{branch}</p>}
      {state && <p className="text-gray-600 text-sm mb-3">{state}</p>}
      
      {/* Introduction section removed as per your SQL */}

      <div className="mt-auto w-full pt-4 space-y-2">
        {google_form_link_1_to_1 ? (
          <a
            href={google_form_link_1_to_1}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full block" // Added block for better layout if multiple buttons
          >
            1-to-1 Mentorship
          </a>
        ) : (
          <button
            className="btn-primary w-full block opacity-50 cursor-not-allowed"
            disabled
          >
            1-to-1 (Not Available)
          </button>
        )}

        {/* Per-mentor group guidance link */}
        <a 
          href={isGroupLinkPlaceholder ? "#" : actualGroupLink}
          target="_blank" 
          rel="noopener noreferrer" 
          className={`btn-accent w-full block ${isGroupLinkPlaceholder ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'}`}
          aria-disabled={isGroupLinkPlaceholder}
          onClick={(e) => isGroupLinkPlaceholder && e.preventDefault()}
        >
          Join Group Guidance
        </a>
      </div>
    </div>
  );
}