'use strict'

const logger = require('log4js').getLogger('errorStrategy.js')

const ErrorStrategy = (error) => {
  logger.error(JSON.stringify({code: error && error.response && error.response.status || 'UNKNOW', msg: error.message || 'UNKNOW'}))
}

module.exports = ErrorStrategy
