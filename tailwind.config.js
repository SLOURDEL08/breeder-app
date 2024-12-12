/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#e4e1db',
        'secondary': '#151516',
      }
    },
    screens: {
        'lg': '1024px',
      },
  },
  plugins: [],
}