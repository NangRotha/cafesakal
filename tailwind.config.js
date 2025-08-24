// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        'Khmer Hounan': ['"Khmer Hounan"', 'cursive'],
        'Battambang': ['Battambang', 'cursive'],
        'Content': ['Content', 'cursive'],
        'Hanuman': ['Hanuman', 'serif'],
        'Metal': ['Metal', 'cursive'],
        'Noto Sans Khmer': ['Noto Sans Khmer', 'sans-serif'],
      },
    },
  },
  plugins: [],
};