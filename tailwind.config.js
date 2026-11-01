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
      },
      colors: {
        terminal: {
          bg: '#0f172a',    // Deep slate background
          green: '#10b981', // Terminal green
          accent: '#f59e0b', // Amber accent for volition/logic checks
        },
        // Theme-switchable tokens, defined in src/style.css
        theme: {
          'bg': 'rgb(var(--bg) / <alpha-value>)',
          'text': 'rgb(var(--text) / <alpha-value>)',
          'accent': 'rgb(var(--accent) / <alpha-value>)',
          'secondary': 'rgb(var(--secondary) / <alpha-value>)',
          'emphasis': 'rgb(var(--emphasis) / <alpha-value>)',
          'muted': 'rgb(var(--muted) / <alpha-value>)',
          'log': 'rgb(var(--log) / <alpha-value>)',
          'tag': 'rgb(var(--tag) / <alpha-value>)',
          'tag-border': 'rgb(var(--tag-border) / <alpha-value>)',
          'link': 'rgb(var(--link) / <alpha-value>)',
          'on-accent': 'rgb(var(--on-accent) / <alpha-value>)',
          'dot': 'rgb(var(--dot) / <alpha-value>)',
        }
      }
    },
  },
  plugins: [],
}