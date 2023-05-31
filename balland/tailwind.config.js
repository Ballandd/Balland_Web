/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["AjouTTF"],
      mono: ["AjouTTF"],
      table: ["Helvetica", "Arial", "sans-serif"],
    },
    extend: {
      fontFamily: {
        sans: ["AjouTTF"],
        mono: ["AjouTTF"],
      },
      fontSize: {
        "2xs": "0.625rem", // 2px
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
