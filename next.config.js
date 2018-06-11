// This file is not going through babel transformation.
// So, we write it in vanilla JS
// (But you could use ES2015 features supported by your Node.js version)
const withSass = require('@zeit/next-sass')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { ANALYZE } = process.env
const dev = process.env.NODE_ENV !== 'production'

module.exports = withSass({
  // Disable serving each file in /pages under a pathname matching the filename
  // and use custom routing
  // useFileSystemPublicRoutes: false,
  // Use /build instead of /.next as the build directory
  // distDir: '',

  // Custom Config
  // pages/index.js
  // import getConfig from 'next/config'
  // const {serverRuntimeConfig, publicRuntimeConfig} = getConfig()
  // console.log(publicRuntimeConfig.appConfig)
  // publicRuntimeConfig: {
  //   appConfig: dev ? require('./config/enviroment.dev') : require('./config/enviroment')
  // },

  // You may only need to add assetPrefix in the production.
  // assetPrefix: dev ? 'https://cdn.mydomain.com' : '',

  webpack: (config, {
    buildId,
    dev,
    isServer,
    defaultLoaders
  }) => {
    // Perform customizations to webpack config
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: isServer ? 8888 : 8889,
        openAnalyzer: true
      }))
    }

    // Important: return the modified config
    return config
  },

  // webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config

    // Important: return the modified config
    // return config
  // }
})
