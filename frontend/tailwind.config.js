/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        flipkart: {
          blue: "#2874f0",
          yellow: "#ffe11b",
          green: "#388e3c",
          red: "#ff6161",
        },
      },
      boxShadow: {
        card: "0 2px 4px 0 rgba(0,0,0,.08)",
        "card-hover": "0 4px 16px 0 rgba(0,0,0,.12)",
      },
    },
  },
  plugins: [],
};
