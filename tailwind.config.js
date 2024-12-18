/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'neue': ['Neue', 'sans-serif'],
        'clearface': ['Clearface', 'sans-serif'],  
      },
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
        'md': '796px',
        'lg': '1024px',
      },
  },
  plugins: [],
}