/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  safelist: [
    'bg-blue-400',
    'bg-green-400',
    'bg-red-400'
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 1s linear infinite',
      }
    }
  },
  plugins: [],
}
