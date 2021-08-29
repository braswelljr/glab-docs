const path = require('path')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const withPlugins = require('next-compose-plugins')
const withMdx = require('@next/mdx')({
  extension: /\.(md|mdx)$/
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
    [withMdx]
  ],
  {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    reactStrictMode: true,
    webpack5: false,
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      if (!dev) {
        defaultLoaders.babel.options.cache = false
      }

      config.module.rules.push({
        test: /\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4|pdf|webp|txt)$/i,
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

      config.resolve.modules.push(path.resolve(`./`))

      return config
    }
  }
)
