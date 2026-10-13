/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          850: '#064232',
          950: '#022c22',
        },
        royal: {
          gold: '#D4AF37',
          'gold-light': '#F3E5AB',
          'gold-dark': '#AA7C11',
          crimson: '#881337',
          deep: '#0F2922'
        }
      },
      fontFamily: {
        urdu: ['"Noto Nastaliq Urdu"', 'serif'],
        arabic: ['"Amiri"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
