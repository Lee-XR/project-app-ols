/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue, js, ts, jsx, tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        "primary": "#1836f5",
        "secondary": "#0b5fde",
        "tertiary": "#0da9fa"
      },
      fontFamily:{
        roboto: ["Roboto", "sans-serif"],
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}