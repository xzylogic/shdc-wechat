'use strict'

const HttpHandler = require('./httpHandler')
const HttpStrategy = require('./httpStrategy')
const ErrorStrategy = require('./errorStrategy')
const config = require('../config')

const HttpService = new HttpHandler(HttpStrategy, ErrorStrategy, config.apiUrl)

module.exports = {
  HttpService: HttpService
}
