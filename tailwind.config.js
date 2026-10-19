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
        sans: ['"Plus Jakarta Sans"', '"Outfit"', '"Jameel Noori Nastaleeq"', '"JameelNooriNastaliq"', '"Noto Nastaliq Urdu"', 'system-ui', 'sans-serif'],
        english: ['"Plus Jakarta Sans"', '"Outfit"', 'system-ui', 'sans-serif'],
        urdu: ['"Jameel Noori Nastaleeq"', '"JameelNooriNastaliq"', '"Jameel Noori Kasheeda"', '"Noto Nastaliq Urdu"', 'serif'],
        nastaliq: ['"Jameel Noori Nastaleeq"', '"JameelNooriNastaliq"', '"Jameel Noori Kasheeda"', '"Noto Nastaliq Urdu"', 'serif'],
        luxury: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
      }
    },
  },
  plugins: [],
}
