/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        'gold-text': '#F3C95D',
        'gold-darker-text': '#FFB800',
        'dark-blue': '#1269C7',
      },
    },
  },
  plugins: [],
}