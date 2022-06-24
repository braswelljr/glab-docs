// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  experimental: {
    optimizeUniversalDefaults: true
  },
  content: ['./src/**/*.{js,jsx,ts,tsx,vue,mdx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xxs: '320px',
      xs: '375px',
      '3xl': '1920px',
      ...defaultTheme.screens
    },
    extend: {
      colors: {
        brown: {
          900: '#382519',
          800: '#462e20',
          700: '#63412c',
          600: '#7f5439',
          500: '#8d5d3f',
          400: '#9b6646',
          300: '#b37a56',
          200: '#c09072',
          100: '#cc868e',
          50: '#d9bcab'
        }
      },
      fontFamily: {
        sans: ["'Jetbrains Mono'", ...defaultTheme.fontFamily.sans],
        serif: ["'Mulish'", ...defaultTheme.fontFamily.serif],
        mono: ["'Ubuntu'", ...defaultTheme.fontFamily.mono]
      },
      gridTemplateColumns: {
        nav: `minmax(auto, 1.5fr) minmax(0, 6.5fr) minmax(auto, 2fr)`
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.neutral.800'),
            hr: {
              borderColor: theme('colors.neutral.100'),
              marginTop: '3em',
              marginBottom: '3em'
            },
            'h1, h2, h3': {
              letterSpacing: '-0.025em'
            },
            h2: {
              marginBottom: `${16 / 24}em`
            },
            h3: {
              marginTop: '2.4em',
              lineHeight: '1.4'
            },
            h4: {
              marginTop: '2em',
              fontSize: '1.125em'
            },
            'h2 small, h3 small, h4 small': {
              fontFamily: theme('fontFamily.mono').join(', '),
              color: theme('colors.neutral.500'),
              fontWeight: 500
            },
            'h2 small': {
              fontSize: theme('fontSize.lg')[0],
              ...theme('fontSize.lg')[1]
            },
            'h3 small': {
              fontSize: theme('fontSize.base')[0],
              ...theme('fontSize.base')[1]
            },
            'h4 small': {
              fontSize: theme('fontSize.sm')[0],
              ...theme('fontSize.sm')[1]
            },
            'h2, h3, h4': {
              'scroll-margin-top': 'var(--scroll-mt)'
            },
            ul: {
              listStyleType: 'none',
              paddingLeft: 0
            },
            'ul > li': {
              position: 'relative',
              paddingLeft: '1.75em'
            },
            'ul > li::before': {
              content: '""',
              width: '0.75em',
              height: '0.125em',
              position: 'absolute',
              top: 'calc(0.875em - 0.0625em)',
              left: 0,
              borderRadius: '999px',
              backgroundColor: theme('colors.neutral.300')
            },
            a: {
              fontWeight: theme('fontWeight.semibold'),
              textDecoration: 'none',
              borderBottom: `1px solid ${theme('colors.sky.300')}`
            },
            'a:hover': {
              borderBottomWidth: '2px'
            },
            'a code': {
              color: 'inherit',
              fontWeight: 'inherit'
            },
            strong: {
              color: theme('colors.neutral.900'),
              fontWeight: theme('fontWeight.semibold')
            },
            'a strong': {
              color: 'inherit',
              fontWeight: 'inherit'
            },
            kbd: {
              background: theme('colors.neutral.100'),
              borderWidth: '1px',
              borderColor: theme('colors.neutral.200'),
              padding: '0.125em 0.25em',
              color: theme('colors.neutral.700'),
              fontWeight: 500,
              fontSize: '0.875em',
              fontVariantLigatures: 'none',
              borderRadius: '4px',
              margin: '0 1px'
            },
            code: {
              fontWeight: theme('fontWeight.medium')
              // fontVariantLigatures: 'none'
            },
            pre: {
              color: theme('colors.neutral.50'),
              borderRadius: theme('borderRadius.xl'),
              padding: theme('padding.5'),
              boxShadow: theme('boxShadow.md'),
              display: 'flex',
              marginTop: `${20 / 14}em`,
              marginBottom: `${32 / 14}em`
            },
            'p + pre': {
              marginTop: `${-4 / 14}em`
            },
            'pre + pre': {
              marginTop: `${-16 / 14}em`
            },
            'pre code': {
              flex: 'none',
              minWidth: '100%'
            },
            table: {
              fontSize: theme('fontSize.sm')[0],
              lineHeight: theme('fontSize.sm')[1].lineHeight
            },
            thead: {
              color: theme('colors.neutral.700'),
              borderBottomColor: theme('colors.neutral.200')
            },
            'thead th': {
              paddingTop: 0,
              fontWeight: theme('fontWeight.semibold')
            },
            'tbody tr': {
              borderBottomColor: theme('colors.neutral.100')
            },
            'tbody tr:last-child': {
              borderBottomWidth: '1px'
            },
            'tbody code': {
              fontSize: theme('fontSize.xs')[0]
            },
            'figure figcaption': {
              textAlign: 'center',
              fontStyle: 'italic'
            },
            'figure > figcaption': {
              marginTop: `${12 / 14}em`
            }
          }
        },
        dark: {
          css: {
            color: theme('colors.yellow.200'),
            'h2, h3, h4, thead th': {
              color: theme('colors.yellow.500')
            },
            'h2 small, h3 small, h4 small': {
              color: theme('colors.yellow.400')
            },
            kbd: {
              background: theme('colors.neutral.700'),
              borderColor: theme('colors.neutral.600'),
              color: theme('colors.neutral.200')
            },
            code: {
              color: theme('colors.cyan.500')
            },
            hr: {
              borderColor: theme('colors.neutral.200'),
              opacity: '0.05'
            },
            pre: {
              boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / 0.1)'
            },
            a: {
              color: theme('colors.white'),
              borderBottomColor: theme('colors.sky.400')
            },
            strong: {
              color: theme('colors.neutral.200')
            },
            thead: {
              color: theme('colors.neutral.300'),
              borderBottomColor: 'rgb(148 163 184 / 0.2)'
            },
            'tbody tr': {
              borderBottomColor: 'rgb(148 163 184 / 0.1)'
            },
            blockQuote: {
              color: theme('colors.white')
            },
            'p code': {
              color: theme('colors.yellow.500'),
              fontFamily: theme('fontFamily.sans')[0]
            }
          }
        }
      }),
      backgroundImage: {
        ticTacToe: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z' fill='%23fdb43e' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    // direct child selector variant
    function ({ addVariant }) {
      addVariant('children', '& > *')
      addVariant('not-first', '& > *:not(:first-child)')
      addVariant('not-last', '& > *:not(:last-child)')
    }
  ]
}
