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
        sans: ['"Plus Jakarta Sans"', '"Outfit"', '"Inter"', 'system-ui', 'sans-serif'],
        english: ['"Plus Jakarta Sans"', '"Outfit"', 'sans-serif'],
        urdu: ['"Jameel Noori Nastaleeq"', '"Jameel Noori Kasheeda"', '"Noto Nastaliq Urdu"', 'serif'],
        nastaliq: ['"Jameel Noori Nastaleeq"', '"Jameel Noori Kasheeda"', '"Noto Nastaliq Urdu"', 'serif'],
        luxury: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
      }
    },
  },
  plugins: [],
}
