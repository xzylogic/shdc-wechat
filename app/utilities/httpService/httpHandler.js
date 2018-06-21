export class HttpHandler {
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

  handle(method, url, data, handle) {
    return this.httpHandler[method](this.configUrl + url, data || {}).catch(err => {
      this.errorHandler(err, handle)
    })
  }

  get(url, handle) {
    return this.httpHandler.get(this.configUrl + url).catch(err => {
      this.errorHandler(err, handle)
    })
  }

  post(url, data, handle) {
    return this.httpHandler.post(this.configUrl + url, data || {}).catch(err => {
      this.errorHandler(err, handle)
    })
  }
}
