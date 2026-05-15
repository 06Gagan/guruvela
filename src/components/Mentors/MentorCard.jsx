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
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col pt-8 px-6 pb-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
      <div className="flex flex-col items-center text-center">
        <img
          src={imageUrl}
          alt={`Profile of ${name}`}
          width={100}
          height={100}
          loading="lazy"
          className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-blue-50"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${name}&backgroundColor=0047AB&textColor=ffffff`;
          }}
        />
        <div className="flex items-center justify-center gap-2 mb-1 w-full">
          <h3 className="text-xl font-bold text-gray-900 truncate">{name}</h3>
          {linkedin_url && (
            <a
              href={linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0A66C2] hover:text-blue-800 flex-shrink-0 transition-colors"
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
        {branch && (
          <div className="bg-blue-50 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-2">
            {branch}
          </div>
        )}
        {state && <p className="text-gray-500 text-sm mb-4">{state}</p>}
      </div>

      <div className="mt-auto pt-4 space-y-3 border-t border-gray-100">
        {google_form_link_1_to_1 ? (
          <a
            href={google_form_link_1_to_1}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-white border-2 border-primary text-primary hover:bg-blue-50 font-bold py-2.5 rounded-xl block text-center transition-colors text-sm"
          >
            1-to-1 Mentorship
          </a>
        ) : (
          <button
            className="w-full bg-gray-50 border-2 border-gray-200 text-gray-400 font-bold py-2.5 rounded-xl block text-center cursor-not-allowed text-sm"
            disabled
          >
            1-to-1 (Unavailable)
          </button>
        )}

        <a
          href={isGroupLinkPlaceholder ? "#" : actualGroupLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full font-bold py-3 rounded-xl block text-center transition-all text-sm ${isGroupLinkPlaceholder ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' : 'bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20'}`}
          aria-disabled={isGroupLinkPlaceholder}
          onClick={(e) => isGroupLinkPlaceholder && e.preventDefault()}
        >
          Join Group Guidance
        </a>
      </div>
    </div>
  );
}