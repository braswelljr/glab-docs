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
              'h1::before': {
                content: '#',
                display: 'inline'
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
              pre: {
                color: theme('colors.yellow.200'),
                borderRadius: '.5rem',
                marginTop: 0,
                marginBottom: 0
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
              'em, strong': {
                color: 'currentColor'
              },
              p: {
                fontWeight: 500
              },
              'pre, code': {
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
      },
      backgroundImage: {
        ticTacToe: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z' fill='%23fdb43e' fill-opacity='0.25' fill-rule='evenodd'/%3E%3C/svg%3E")`
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
