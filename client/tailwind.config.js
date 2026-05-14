/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-pink': '#E91E63',
        'deep-pink': '#C2185B',
        'gold': '#D4AF37',
        'dark-text': '#0F172A',
        'soft-cream': '#FFFBFB',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
