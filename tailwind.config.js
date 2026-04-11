const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#06b6d4", // cyan-500
        secondary: "#64748b", // slate-500
        accent: "#ef4444", // red-500
        "bg-primary-light": "#f1f5f9", // slate-100
        "bg-secondary-light": "#ffffff", // white
        "bg-primary-dark": "#0f172ae3", // slate-900
        "bg-secondary-dark": "#1e293b", // slate-800
        "text-primary-light": "#0f172a", // slate-900
        "text-secondary-light": "#64748b", // slate-500
        "text-primary-dark": "#f1f5f9", // slate-100
        "text-secondary-dark": "#94a3b8", // slate-400
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px) scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        scaleIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
