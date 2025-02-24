/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          "dark-1": "rgb(var(--color-cyber-dark-1) / <alpha-value>)",
          "dark-2": "rgb(var(--color-cyber-dark-2) / <alpha-value>)",
          "dark-3": "rgb(var(--color-cyber-dark-3) / <alpha-value>)",
          black: "rgb(var(--color-cyber-black) / <alpha-value>)",
          "dark-warm": "rgb(var(--color-cyber-dark-warm) / <alpha-value>)",

          blue: "rgb(var(--color-cyber-blue) / <alpha-value>)",
          pink: "rgb(var(--color-cyber-pink) / <alpha-value>)",
          yellow: "rgb(var(--color-cyber-yellow) / <alpha-value>)",
          green: "rgb(var(--color-cyber-green) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};
