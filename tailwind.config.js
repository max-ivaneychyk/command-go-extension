/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-mode="dark"]'],
  content: ["./src/app/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {

      colors: {
        "body-layout": "var(--body-layout)",
        "body-color": "var(--body-color)",
        "surface-border": "var(--surface-border)",
        "surface": "var(--surface)",
        "surface-border-primary": "var(--surface-border-primary)",
        "surface-border-primary-hover": "var(--surface-border-primary-hover)",
        "surface-primary": "var(--surface-primary)",
        "primary": "var(--primary)",
        "primary-hover": "var(--primary-hover)",
      },
      fontSize: {
        "default": "var(--text-default)",
      },
      lineHeight: {
        "default": "var(--lh-default)",
      }
    },
  },
  plugins: [],
}

