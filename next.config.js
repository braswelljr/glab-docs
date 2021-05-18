const path = require('path')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')

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
    [withImages]
  ],
  {
    wepack: config => {
      config.resolve.modules.push(path.resolve(`./`))
      return config
    },
    future: {
      webpack5: true
    }
  }
)
