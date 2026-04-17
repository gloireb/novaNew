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
          DEFAULT: '#00446c',
          container: '#0a5c8e',
          fixed: '#cee5ff',
          dim: '#96ccff'
        },
        secondary: {
          DEFAULT: '#0060a8',
          container: '#47a1ff',
          fixed: '#d3e4ff',
          dim: '#a2c9ff'
        },
        surface: {
          DEFAULT: '#f8f9fb',
          lowest: '#ffffff',
          dim: '#d8dadc',
          container: {
            low: '#f2f4f6',
            DEFAULT: '#eceef0',
            high: '#e6e8ea',
            highest: '#e0e3e5'
          }
        },
        on: {
          surface: '#191c1e',
          primary: '#ffffff'
        },
        error: '#ba1a1a',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      borderRadius: {
        'stitch': '24px',
        'stitch-sm': '12px'
      },
      boxShadow: {
        'long-fall': '0 20px 40px rgba(25, 28, 30, 0.06)',
        'premium': '0 10px 30px -10px rgba(10, 92, 142, 0.15)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
      },
      backgroundImage: {
        'atmospheric': 'linear-gradient(135deg, #0A5C8E 0%, #1E88E5 100%)',
        'noise': "url(\"https://www.transparenttextures.com/patterns/black-linen.png\")"
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'signal': 'signal 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        signal: {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '50%': { transform: 'scale(1.2)', opacity: '0.1' },
          '100%': { transform: 'scale(0.8)', opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
}
