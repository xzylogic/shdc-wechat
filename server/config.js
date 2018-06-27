'use strict'

const config = process.env.NODE_ENV !== 'production'
               ? require('../config/enviroment.dev')
               : require('../config/enviroment')

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  port: parseInt(process.env.PORT, 10) || config.defaultPort,
  ...config
}
