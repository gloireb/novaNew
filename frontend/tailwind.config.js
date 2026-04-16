/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A5C8E',
          container: '#1E88E5',
        },
        secondary: {
          DEFAULT: '#1E88E5',
          container: '#47a1ff',
        },
        surface: {
          DEFAULT: '#f8f9fb',
          lowest: '#ffffff',
          dim: '#d8dadc',
          container: {
            low: '#f2f4f6',
            high: '#e6e8ea',
          }
        },
        on: {
          surface: '#191c1e',
          primary: '#ffffff',
        },
        error: '#ba1a1a',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'stitch': '4px',
      },
      boxShadow: {
        'long-fall': '0 20px 40px rgba(25, 28, 30, 0.06)',
      },
      backgroundImage: {
        'atmospheric': 'linear-gradient(135deg, #0A5C8E 0%, #1E88E5 100%)',
      }
    },
  },
  plugins: [],
}
