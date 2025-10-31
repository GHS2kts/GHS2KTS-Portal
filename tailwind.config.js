/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'glass-bg': 'rgba(255, 255, 255, 0.1)',
        'glass-border': 'rgba(255, 255, 255, 0.2)',
        'highlight': '#3b82f6',
      },
      backgroundImage: {
        'morning': 'linear-gradient(to bottom right, #87CEEB, #FFA500)',
        'afternoon': 'linear-gradient(to bottom right, #4A90E2, #F39C12)',
        'evening': 'linear-gradient(to bottom right, #2C3E50, #8E44AD)',
      },
      backdropBlur: {
        'md': '10px',
      }
    },
  },
  plugins: [],
}
