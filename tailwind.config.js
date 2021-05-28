const color = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ['./public/index.html', './src/**/*.{js, jsx, ts, tsx, vue, mdx}'],
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
        nav: `minmax(auto, 1.5fr) minmax(0, 6.5fr) minmax(auto, 2.5fr)`
      },
      typography: theme => {
        return {
          DEFAULT: {
            css: {
              maxWidth: 'none',
              color: 'currentColor',
              '> :first-child': { marginTop: '-' },
              '> :last-child': { marginBottom: '-' },
              '&:first-child > :first-child': {
                marginTop: '0'
              },
              '&:last-child > :last-child': {
                marginBottom: '0'
              },
              'h1, h2, h3, h4, h5, h6, thead, th, code, blockquote, p': {
                color: 'currentColor'
              },
              'h1, h2': {
                letterSpacing: '-0.025em'
              },
              'h2, h3': {
                'scroll-margin-top': `${(70 + 40) / 16}rem`
              },
              blockquote: {
                borderLeft: '4px solid currentColor'
              },
              code: {
                paddingLeft: '4px',
                paddingRight: '4px',
                backgroundColor: theme('color.trueGray.600')
              },
              'code::before': {
                content: ''
              },
              'code::after': {
                content: ''
              },
              th: {
                fontSize: '1rem'
              },
              strong: {
                color: 'currentColor'
              },
              p: {
                fontWeight: 500
              },
              'pre > code': {
                color: theme('color.yellow.600')
              },
              'ul > li': {
                paddingLeft: '1.5em'
              },
              'ul > li::before': {
                width: '0.5em',
                height: '0.125em',
                top: 'calc(0.875em - 0.0625em)',
                left: 0,
                borderRadius: 0,
                backgroundColor: theme('colors.gray.300')
              }
            }
          }
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography')
  ]
}
