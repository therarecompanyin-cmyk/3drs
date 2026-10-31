/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          900: '#121316',
          800: '#1a1c22',
          700: '#252830',
          600: '#323742',
        },
        beige: {
          50: '#fbfaf8',
          100: '#f5f2eb',
          200: '#e8e2d5',
          300: '#d7ccb8',
          400: '#c2b196',
          500: '#aa9573',
          600: '#8c7756',
        },
        bronze: {
          400: '#c59b6d',
          500: '#b08354',
          600: '#8f653a',
        },
        emerald: {
          500: '#10b981',
          600: '#059669',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
        'elevated': '0 20px 40px -15px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
