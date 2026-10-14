import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#060709',
          900: '#0C0E13',
          850: '#11141B',
          800: '#171B24',
          750: '#1D222E',
          700: '#252B3A',
          600: '#343C50',
          500: '#4A556E',
          400: '#6B7A99',
          300: '#9EABC2',
          200: '#CCD4E2',
          100: '#E9EDF5',
          50: '#F5F7FA',
        },
        gold: {
          50: '#FDFBF5',
          100: '#FAF3E1',
          200: '#F4E4BD',
          300: '#EDD193',
          400: '#E4BD68',
          500: '#D4AF37', // Classic 24K Royal Gold
          600: '#B89228',
          700: '#94721D',
          800: '#735617',
          900: '#533D10',
        },
        emerald: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#022C22',
        },
        ivory: {
          50: '#FAF8F5',
          100: '#F5F2EB',
          200: '#EFE9DC',
          300: '#E2D9C5',
          400: '#D1C4A8',
          500: '#BDB092',
        },
        charcoal: {
          900: '#121314',
          800: '#1A1B1D',
          700: '#2A2B2E',
          600: '#3D3F43',
          500: '#5A5D63',
          400: '#7B7F87',
          300: '#A4A8B1',
          200: '#D2D5DC',
          100: '#E8EAEF',
        },
        sage: {
          50: '#F4F7F5',
          100: '#E7EDE8',
          200: '#D1DDD3',
          300: '#B0C3B4',
          400: '#8DA693',
          500: '#647D6B',
          600: '#4F6555',
          700: '#3E5043',
          800: '#2F3C33',
          900: '#212A24',
        },
        terracotta: {
          50: '#FDF6F3',
          100: '#F9ECE5',
          200: '#F2D5C7',
          300: '#E8B6A2',
          400: '#DC9378',
          500: '#C76F51',
          600: '#B1583B',
          700: '#8E432A',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Newsreader', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'book': '0 25px 45px -10px rgba(0, 0, 0, 0.5), 0 12px 20px -8px rgba(0, 0, 0, 0.4), -8px 0 25px -5px rgba(0, 0, 0, 0.35)',
        'book-gold': '0 20px 40px -10px rgba(212, 175, 55, 0.25), 0 0 25px rgba(212, 175, 55, 0.15)',
        'book-emerald': '0 20px 40px -10px rgba(16, 185, 129, 0.25), 0 0 25px rgba(16, 185, 129, 0.15)',
        'glow-gold': '0 0 35px rgba(212, 175, 55, 0.35)',
        'glow-emerald': '0 0 35px rgba(16, 185, 129, 0.35)',
        'soft': '0 4px 20px -2px rgba(6, 7, 9, 0.3), 0 2px 6px -1px rgba(6, 7, 9, 0.2)',
        'elevated': '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 10px 20px -6px rgba(0, 0, 0, 0.35)',
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(0.8deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
