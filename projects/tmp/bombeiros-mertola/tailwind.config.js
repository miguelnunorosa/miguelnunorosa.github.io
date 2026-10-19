/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './assets/js/**/*.js', './README.md'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#faf7f0',
          2: '#f3eee3',
          3: '#eae3d3',
        },
        ink: {
          DEFAULT: '#1c1a15',
          2: '#26231c',
          3: '#332f26',
        },
        smoke: '#6e6a5f',
        ember: {
          DEFAULT: '#b32226',
          dark: '#8c171b',
          bright: '#e2483f',
        },
        brass: '#c99a2e',
        charcoal: {
          DEFAULT: '#14120d',
          2: '#1c1913',
          3: '#25211a',
        },
        cream: '#f6f1e4',
      },
      fontFamily: {
        display: ['"Clash Display"', '"Archivo Black"', 'sans-serif'],
        body: ['Satoshi', '"Work Sans"', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(3.2rem, 9vw, 8.5rem)', { lineHeight: 0.95, letterSpacing: '-0.025em' }],
        h1: ['clamp(2.25rem, 5.5vw, 4.25rem)', { lineHeight: 1.02, letterSpacing: '-0.02em' }],
        h2: ['clamp(1.6rem, 3.2vw, 2.5rem)', { lineHeight: 1.08, letterSpacing: '-0.015em' }],
        h3: ['clamp(1.15rem, 1.8vw, 1.45rem)', { lineHeight: 1.2 }],
      },
      boxShadow: {
        card: '0 1px 2px rgb(20 18 13 / 0.06), 0 8px 24px rgb(20 18 13 / 0.07)',
        pop: '0 24px 64px rgb(20 18 13 / 0.35)',
      },
    },
  },
  plugins: [],
};
