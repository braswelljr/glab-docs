const path = require('path')
// const withPWA = require('next-pwa')
// const runtimeCaching = require('next-pwa/cache')
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')
const withMdx = require('@next/mdx')({
  extension: /\.(md|mdx)$/
})
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withPlugins(
  [
    // [
    //   withPWA,
    //   {
    //     pwa: {
    //       dest: 'public',
    //       runtimeCaching
    //     }
    //   }
    // ],
    [withBundleAnalyzer],
    [withImages],
    [withMdx]
  ],
  {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    wepack: (config, options) => {
      if (!options.dev) {
        options.defaultLoaders.babel.options.cache = false
      }

      config.module.rules.push({
        test: /\.(png|jpe?g|gif|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/.next',
              name: 'static/media/[name].[hash].[ext]'
            }
          }
        ]
      })

      config.resolve.modules.push(path.resolve(`./`))

      return config
    },
    future: {
      webpack5: true
    }
  }
)
