/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const path = require('path')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const withPlugins = require('next-compose-plugins')
const withMdx = require('@next/mdx')({
  extension: /\.mdx?$/
})

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
          runtimeCaching,
          disable: process.env.NODE_ENV === 'development'
        }
      }
    ],
    [withMdx, { pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'] }]
  ],
  {
    reactStrictMode: true,
    images: {
      disableStaticImages: true
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      defaultLoaders.babel.options.cache = false

      config.resolve.modules.push(path.resolve('./'))

      // file-loader config
      config.module.rules.push({
        test: /\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4|pdf|webp|txt)$/i,
        issuer: /\.(jsx?|tsx?|mdx?)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              publicPath: '/_next',
              name: 'static/media/[name].[hash].[ext]'
            }
          }
        ]
      })

      return config
    },
    async redirects () {
      return require('./redirects.json')
    }
  }
)
