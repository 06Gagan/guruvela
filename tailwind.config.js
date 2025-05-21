/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", //
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',    // blue-500
        accent: '#F97316',     // orange-500
        'accent-alt': '#10B981', // emerald-500
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), 
  ],
}