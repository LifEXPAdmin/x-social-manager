/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'aa-bg': '#050816',
        'aa-card': 'rgba(15, 23, 42, 0.55)',
      },
      boxShadow: {
        glow: '0 30px 80px rgba(15, 23, 42, 0.35)',
      },
    },
  },
  plugins: [],
};

