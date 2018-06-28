'use strict'

const logger = require('log4js').getLogger('errorStrategy.js')

const ErrorStrategy = (error) => {
  logger.error(JSON.stringify({code: error.response.status, msg: error.message}))
}

module.exports = ErrorStrategy
