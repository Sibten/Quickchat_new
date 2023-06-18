/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pop: "Poppins",
        int: "Inter",
        qs: "Quicksand",
        rob: "Roboto",
        nun: "Nunito",
      },
      backgroundColor: {
        mainBg: "#111b21",
        headBg: "#202c33",
      },
      
    },
  },
  plugins: [],
});
