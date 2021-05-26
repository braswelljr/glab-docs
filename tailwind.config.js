const color = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: [
    './public/index.html',
    './src/**/*.{js, jsx, ts, tsx, "md", "mdx", vue}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: '475px',
      '3xl': '1920px',
      ...defaultTheme.screens
    },
    extend: {
      colors: {
        gray: color.trueGray
      },
      fontFamily: {
        sans: ["'Mulish'", ...defaultTheme.fontFamily.sans]
      },
      gridTemplateColumns: {
        nav: `auto minmax(0, 6.5fr) auto`
      },
      animations: {
        slide: `slide 2s ease`,
        carousel: `carosel 10s ease-in`
      },
      keyframes: {
        slide: {
          '0%': {
            opacity: '.2'
          },
          '50%': {
            opacity: '.5'
          },
          '100%': {
            opacity: '1'
          }
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/aspect-ratio')]
}
