/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./themes/conimethemev2/**/*.html",
    "./themes/conimethemev2/content/**/*.{html,md}",
    "./themes/conimethemev2/layouts/**/*.html", 
    "./content/**/*.{html,md}",
    "./assets/**/*.{html,js}",
    "./layouts/**/*.html",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        conime: {
          50: '#ffe5ec',
          100: '#fbb8c5',
          200: '#f58da1',
          300: '#ef607b',
          400: '#e9335a',
          500: '#FF1545',
          600: '#CF012B',
          700: '#A00123',
          800: '#75011B',
          900: '#630318',
          950: '#5C0317',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          925: '#0A1120',
          950: '#030712',
        },
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.75', transform: 'scale(1.10) translateY(-3px)' },
        },
        scroll: {
          '0%': { transform: 'translateY(-12%)' },
          '100%': { transform: 'translateY(-85%)' },
        },
        glitch: {
          '0%, 100%': { clipPath: 'inset(0 0 0 0)', transform: 'translate(0)' },
          '20%': { clipPath: 'inset(10% 0 67% 0)', transform: 'translate(-5px, -2px)' },
          '40%': { clipPath: 'inset(50% 0 30% 0)', transform: 'translate(4px, 2px)' },
          '60%': { clipPath: 'inset(80% 0 5% 0)', transform: 'translate(-5px, -1px)' },
          '80%': { clipPath: 'inset(40% 0 40% 0)', transform: 'translate(3px, -1px)' },
        },
        glitch2: {
          '0%, 100%': { clipPath: 'inset(0 0 0 0)', transform: 'translate(0)' },
          '15%': { clipPath: 'inset(12% 0 40% 0)', transform: 'translate(-5px, -2px)' },
          '34%': { clipPath: 'inset(50% 0 30% 0)', transform: 'translate(4px, 2px)' },
          '70%': { clipPath: 'inset(80% 0 5% 0)', transform: 'translate(-5px, -1px)' },
          '90%': { clipPath: 'inset(80% 0 5% 0)', transform: 'translate(3px, -1px)' },
        },
      },
      animation: {
        scroll: 'scroll 6s ease-in forwards',
        glitch: 'glitch 2s infinite',
        glitch2: 'glitch2 2s infinite',
        flicker: 'flicker 1s infinite ease-in-out',
      },
    },
    fontFamily: {
      sans: [
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      poppins: [
        "Poppins",
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
  },
  safelist: [
    {
      pattern: /^(dark:)?(hover:|group-hover:|focus:)?(bg|text)-(gray|conime)-(50|100|200|300|400|500|600|700|800|900|950)$/,
    },
    {
  pattern: /^(dark:)?opacity-(10|20|30|40|50|60|70|80|90|95|100)$/,
},

  ],
  plugins: [],
};
