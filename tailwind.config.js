/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'], // Terminal aesthetic
        serif: ['"Merriweather"', 'serif'], // Other text
      },
      colors: {
        terminal: {
          bg: '#0f172a',    // Deep slate background
          green: '#10b981', // Terminal green
          accent: '#f59e0b', // Amber accent for volition/logic checks
        }
      }
    },
  },
  plugins: [],
}