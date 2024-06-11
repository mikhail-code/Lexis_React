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
      colors: { // Add the colors section
        darkBlue: '#1269C7', // Access the color and rename it (optional)
      },
      minHeight: {
        'custom-screen-minus-100': 'calc(100vh - 100px)', // Use calc() for dynamic calculation
      },
    },
  },
  plugins: [],
}