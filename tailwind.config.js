/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        pulse: {
          "0%": {
            transform: "scale(0.95)",
          },
          "70%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 10px rgba(0, 0, 0, 0)",
          },
          "100%": {
            transform: "scale(0.95)",
            boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
          },
        },
      },
      animation: {
        pulseAnimation: "pulse 2s infinite",
      },
      colors: {
        font: "#040000",
        solid: "#888888",
        bg: {
          50: "#F3F0ED",
          100: "#E1D8CF",
          200: "#CABEB0",
          300: "#B5A591",
          400: "#A18D73",
          500: "#86735A",
          600: "#685946",
          700: "#493F31",
          800: "#2B251D",
          900: "#0C0A08",
        },
        gray: {
          50: "#EFEFF0",
          100: "#D6D6D7",
          200: "#BCBCBE",
          300: "#A2A2A5",
          400: "#88888C",
          500: "#6E6E72",
          600: "#555558",
          700: "#3D3D3F",
          800: "#232324",
          900: "#0A0A0A",
        },
        primary: {
          50: "#E6EAE7",
          100: "#CAD4CD",
          200: "#ADBDB2",
          300: "#91A698",
          400: "#758F7D",
          500: "#5E7365",
          600: "#46564B",
          700: "#303B33",
          800: "#191F1B",
          900: "#020302",
        },
      },
    },
  },
  plugins: [],
};
