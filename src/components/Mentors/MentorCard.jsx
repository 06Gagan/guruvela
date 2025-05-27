// src/components/Mentors/MentorCard.jsx
import React from 'react';

export default function MentorCard({ mentor }) {
  const {
    name,
    profile_image_path,
    branch,
    state,
    introduction, // Ensure this is selected in MentorsPage.jsx if you are using it
    google_form_link_1_to_1
  } = mentor;

  // 1. VERIFY THIS: Is VITE_SUPABASE_URL in your .env file correct?
  //    It should be like: VITE_SUPABASE_URL=https://acaoqrybztxymacdzyzf.supabase.co (NO trailing slash)
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  // 2. VERIFY THIS: Does this EXACTLY match the name of your Supabase Storage bucket?
  //    Based on your example URL, it seems to be 'profilepic'.
  const publicBucketName = 'profilepic'; 

  const imageUrl = profile_image_path
    ? `${supabaseUrl}/storage/v1/object/public/${publicBucketName}/${profile_image_path}`
    : 'https://via.placeholder.com/150'; 

  // For debugging, you can log the generated URL:
  // console.log(`Generated imageUrl for ${name}: ${imageUrl}`);

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
      
      {introduction && (
        <p className="text-gray-500 text-sm mb-4 flex-grow min-h-[60px] max-h-24 overflow-y-auto px-2">
          {introduction}
        </p>
      )}

      <div className="mt-auto w-full pt-4">
        {google_form_link_1_to_1 ? (
          <a
            href={google_form_link_1_to_1}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full"
          >
            1-to-1 Mentorship
          </a>
        ) : (
          <button
            className="btn-primary w-full opacity-50 cursor-not-allowed"
            disabled
          >
            1-to-1 (Not Available)
          </button>
        )}
      </div>
    </div>
  );
}