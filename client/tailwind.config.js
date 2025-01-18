/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      colors: {
        primary: '#1A659E',
        secondary: '#004E89',
        cream: '#EFEFD0',
        peach: '#F7C59F',
        orange: '#FF6B35',
      }
    },
  },
  plugins: [],
}