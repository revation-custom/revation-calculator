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
    },
  },
  plugins: [],
};
