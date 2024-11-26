/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        spin: "spin 1s linear infinite",
      },
    },
  },
  variants: {
    extend: {
      transform: ["hover", "focus"],
      translate: ["hover", "focus"],
    },
  },
  plugins: [],
};
