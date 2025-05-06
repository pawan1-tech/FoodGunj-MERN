/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EB0029',
        secondary: '#5B86E5',
        disabled: '#b1b2b3',
        menubar: '#191c29',
        navbar: '#242B3F',
        arrow: '#AFAFB5',
        text: {
          primary: '#404040',
          secondary: '#4d4c4c',
        },
        custom: {
          green: '#00ff6a',
          yellow: '#e8ba00',
          red: '#ef5350',
          orange: '#F7AD63',
        }
      },
      boxShadow: {
        custom: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
      },
      screens: {
        'sm': '640px',
        'md': {'max': '768px'},
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}