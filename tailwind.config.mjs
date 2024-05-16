import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      xs: "450px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1024px",
      "2xl": "1024px",
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        title: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        wood: {
          50: "#f7f4ed",
          100: "#dedcd5",
          200: "#c6c3be",
          300: "#adaba6",
          400: "#94928e",
          500: "#7c7a77",
          600: "#63625f",
          700: "#4a4947",
          800: "#31312f",
          900: "#191818",
        },
        viking: {
          400: "#80d2ec",
          500: "#6bbdd7",
          600: "#1c859b",
        },
      },
      fontWeight: {
        blackish: "830",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
