/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { createLoader } = require('simple-functional-loader')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const withMdx = require('@next/mdx')({
  extension: /\.mdx?$/
})
// const Prism = require('prismjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    disableStaticImages: true
  },
  experimental: { esmExternals: true },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // pwa config
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development'
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!dev) {
      defaultLoaders.babel.options.cache = false
    }

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

    // embeding svg as react component
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: { svgoConfig: { plugins: { removeViewBox: false } } }
        },
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]'
          }
        }
      ]
    })

    // Remove the 3px deadzone for drag gestures in Framer Motion
    config.module.rules.push({
      test: /framer-motion/,
      use: createLoader(function (source) {
        return source.replace(
          /var isDistancePastThreshold = .*?$/m,
          'var isDistancePastThreshold = true'
        )
      })
    })

    return config
  },
  async redirects() {
    return require('./redirects.json')
  }
}

module.exports = withPWA(withMdx(nextConfig))
