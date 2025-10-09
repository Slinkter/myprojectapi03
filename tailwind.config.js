const withMT = require("@material-tailwind/react/utils/withMT");
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = withMT({
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#06b6d4', // cyan-500
        secondary: '#64748b', // slate-500
        accent: '#ef4444', // red-500
        'bg-primary-light': '#f1f5f9', // slate-100
        'bg-secondary-light': '#ffffff', // white
        'bg-primary-dark': '#0f172a', // slate-900
        'bg-secondary-dark': '#1e293b', // slate-800
        'text-primary-light': '#0f172a', // slate-900
        'text-secondary-light': '#64748b', // slate-500
        'text-primary-dark': '#f1f5f9', // slate-100
        'text-secondary-dark': '#94a3b8', // slate-400
      },
    },
  },
  plugins: [],
});