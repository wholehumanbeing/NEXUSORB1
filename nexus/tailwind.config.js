/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'phosphor-green': '#00FF00',
        'neon-cyan': '#00FFFF',
        'void-black': '#000000',
        'critique-crimson': '#FF0000',
      },
      fontFamily: {
        'mono': ['VT323', 'monospace'],
        'pixel': ['Press Start 2P', 'monospace'],
      },
      animation: {
        'pulse-green': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          from: { textShadow: '0 0 5px #00FF00, 0 0 10px #00FF00, 0 0 15px #00FF00' },
          to: { textShadow: '0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 30px #00FF00' },
        },
      },
    },
  },
  plugins: [],
}