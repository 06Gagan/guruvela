/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
export default {
  content: [
    "./index.html", //
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',      // indigo-500
        accent: '#D946EF',       // fuchsia-500
        'accent-alt': '#0EA5E9', // sky-500
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    typography,
  ],
}