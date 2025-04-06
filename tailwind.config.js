import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";
import lineClamp from "@tailwindcss/line-clamp";

export default {
  darkMode: "class",

  content: {
    safelist: [],
  },

  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },

    container: {
      center: true,
      padding: "1rem",
    },

    extend: {
      colors: {},

      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: ["Merriweather", "Georgia", "serif"],
        mono: [
          "Fira Code",
          "Fira Mono",
          "Menlo",
          "Monaco",
          "Courier New",
          "monospace",
        ],
      },

      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
        1000: "1000",
        9999: "9999",
      },
    },
  },

  plugins: [forms, typography, aspectRatio, lineClamp],
};
