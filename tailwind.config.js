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
        // Official Blue Palette
        primary: {
          DEFAULT: '#0047AB', // Cobalt / Strong Blue
          dark: '#003380',
          light: '#3373E0',
        },
        accent: {
          DEFAULT: '#0EA5E9', // Sky Blue (keeping it blue-ish)
          hover: '#0284C7',
        },
        // Using Slate for neutrals to keep it cool/blue-toned
        gray: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
      },
    },
  },
  plugins: [
    typography,
  ],
}
