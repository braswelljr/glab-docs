const path = require('path')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')
const withMdx = require('@next/mdx')({
  extension: /\.mdx$/
})

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
          runtimeCaching
        }
      }
    ],
    [withImages],
    [
      withMdx,
      {
        loader: '@mdx-js/loader'
      }
    ]
  ],
  {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    wepack: config => {
      config.resolve.modules.push(path.resolve(`./`))
      return config
    },
    future: {
      webpack5: true
    }
  }
)
