/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'emerald-green': '#50C878', 
        'emerald-dark': '#2E7D5E', 
        'black-bg': '#000000', 
      },
    },
  },
  plugins: [],
}