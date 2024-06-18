/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        'gold-text': '#ffbf00',
        'gold-darker-text': '#ffbf00',
        'dark-blue': '#1269C7',
      },
      colors: { // Add the colors section
        'dark-blue': '#1269C7', // Access the color and rename it (optional)
        'dark-gold': '#ffbb00',
      },
      minHeight: {
        'custom-screen-minus-100': 'calc(100vh - 100px)', // Use calc() for dynamic calculation
      },
    },
  },
  plugins: [],
}