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
    screens:{
      'xxs': '320px',
      'xs': '360px',
      's': '480px',
      'sm': '640px',
      'md' : '768px',
      'lg' : '1024px',
      'xl' : '1280px',
      '2xl' : '1536px'
    }
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
