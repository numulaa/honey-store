/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,ejs}", "./views/partials/*.{html,ejs}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        darkGreen: "rgba(0,61,41,255)",
        cream: "rgba(250,240,228,255)",
        lightGray: "rgba(245,247,246,255)",
      },
    },
  },
  plugins: [],
};
