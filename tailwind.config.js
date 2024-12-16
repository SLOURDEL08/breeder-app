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
        'yellowed':'#f2d556'
      }
    },
    keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        'scroll': 'scroll 20s linear infinite',
      },
    screens: {
        'lg': '1024px',
      },
  },
  plugins: [],
}