/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Pale Blue Palette
        brand: {
          50:  '#F0F7FD', // canvas pale blue
          100: '#E1F0FA', // light pale blue surface
          200: '#CBE4F6', // soft pale blue
          300: '#A7D3F2', // pale blue accent
          400: '#6EBAEC', // sky blue
          500: '#389FE4', // active blue
          600: '#1B7FC9', // primary blue
          700: '#1465A3', // deep blue
          800: '#145385', // slate blue
          900: '#15456E', // dark navy blue
          950: '#0C2B47', // deepest slate
        },
        // Surfaces: Light Pale Blue & White
        surface: {
          DEFAULT: '#F0F5FA', // Light Pale Blue
          card:    '#FFFFFF', // White Secondary
          sidebar: '#F4F8FC', // Pale Blue Sidebar
          border:  '#D7E5F0', // Sharp Pale Blue Border
        },
        // Professional status palette
        success:  { DEFAULT: '#10B981', light: '#E6F8F0', dark: '#047857' },
        warning:  { DEFAULT: '#F59E0B', light: '#FEF3C7', dark: '#B45309' },
        syncing:  { DEFAULT: '#1B7FC9', light: '#E1F0FA', dark: '#1465A3' },
        danger:   { DEFAULT: '#EF4444', light: '#FEE2E2', dark: '#B91C1C' },
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '10px',
        '2xl': '14px',
        '3xl': '18px',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
        card: '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)',
        'card-md': '0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.03)',
      },
      keyframes: {
        'spin-slow': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
        'pulse-dot': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
        'slide-up': { from: { opacity: '0', transform: 'translateY(6px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
      },
      animation: {
        'spin-slow': 'spin-slow 2s linear infinite',
        'pulse-dot': 'pulse-dot 1.5s ease-in-out infinite',
        'slide-up': 'slide-up 0.18s ease-out',
        'fade-in': 'fade-in 0.12s ease-out',
      }
    },
  },
  plugins: [],
}
