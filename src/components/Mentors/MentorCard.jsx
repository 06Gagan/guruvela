// src/components/Mentors/MentorCard.jsx
import React from 'react';

export default function MentorCard({ mentor, fallbackGroupLink }) {
  const {
    name,
    profile_image_path,
    branch,
    state,
    google_form_link_1_to_1,
    group_guidance_link,
    linkedin_url 
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
        width={128}
        height={128}
        loading="lazy"
        className="w-32 h-32 rounded-full object-cover mb-4 shadow-md border-2 border-gray-200"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/150';
        }}
      />
      <div className="flex items-center mb-1">
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        {linkedin_url && (
          <a
            href={linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-blue-600 hover:text-blue-800"
            title={`${name}'s LinkedIn Profile`}
            aria-label={`${name}'s LinkedIn Profile`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        )}
      </div>
      {branch && <p className="text-primary font-semibold mb-1">{branch}</p>}
      {state && <p className="text-gray-600 text-sm mb-3">{state}</p>}

      <div className="mt-auto w-full pt-4 space-y-2">
        {google_form_link_1_to_1 ? (
          <a
            href={google_form_link_1_to_1}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full block"
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