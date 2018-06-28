'use strict'

class HttpHandler {
  constructor(httpHandler, errorHandler, configUrl) {
    if (!httpHandler) {
      throw new Error('Http Handler not defined')
    }
    if (!errorHandler) {
      throw new Error('Error Handler not defined')
    }
    this.httpHandler = httpHandler
    this.errorHandler = errorHandler
    this.configUrl = configUrl || ''
  }

  handle(method, url, data) {
    return this.httpHandler[method](this.configUrl + url, data || {}).catch(err => {
      this.errorHandler(err)
    })
  }

  get(url) {
    return this.httpHandler.get(this.configUrl + url).catch(err => {
      this.errorHandler(err)
    })
  }

  post(url, data) {
    return this.httpHandler.post(this.configUrl + url, data || {}).catch(err => {
      this.errorHandler(err)
    })
  }
}

module.exports = HttpHandler
