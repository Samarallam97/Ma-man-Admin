/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef5ff',
          100: '#d9e7ff',
          200: '#bcd5ff',
          300: '#8bbaff',
          400: '#5694ff',
          500: '#2970ff', // primary blue
          600: '#1a55db',
          700: '#174fb1',
          800: '#153d7a',
          900: '#143464',
          950: '#0e1c37',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e6fe',
          300: '#7dd4fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        success: {
          500: '#10b981',
          600: '#059669',
        },
        warning: {
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          500: '#ef4444',
          600: '#dc2626',
        }
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        arabic: ['IBM Plex Sans Arabic', 'sans-serif'],
      },
    },
  },
  plugins: [],
}