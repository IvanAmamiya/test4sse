// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./global.css"
  ],
  safelist: [
    'bg-clip-text',
    'text-transparent',
    'bg-gradient-to-r',
    'from-blue-500',
    'via-purple-500',
    'to-pink-500'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};