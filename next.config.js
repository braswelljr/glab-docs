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
    [withMdx, { pageExtensions: ['js', 'jsx', 'md', 'mdx'] }]
  ],
  {
    reactStrictMode: true,
    images: {
      domains: []
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      if (!dev) {
        defaultLoaders.babel.options.cache = false
      }

      config.resolve.modules.push(path.resolve(`./`))

      return config
    },
    async redirects() {
      return require('./redirects.json')
    }
  }
)
