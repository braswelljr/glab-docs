const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: [
    './public/index.html',
    './src/**/*.{js, jsx, ts, tsx, "md", "mdx", vue}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["'Mulish'", ...defaultTheme.fontFamily.sans]
    },
    screens: {
      xs: '475px',
      '3xl': '1920px',
      ...defaultTheme.screens
    },
    extend: {
      colors: {},
      gridTemplateColumns: {
        nav: `minmax(0, 1.25fr) minmax(0, 6.5fr) minmax(0, 2.25fr)`
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
