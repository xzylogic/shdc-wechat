'use strict'

const logger = require('log4js').getLogger('utilities.js')
const config = require('./config')

const util = {}

util.setRedirectUrl = (url, state) => {
  let wechatUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize'
  let uri = encodeURIComponent(url)
  let query = `appid=${config.appId}&redirect_uri=${uri}&response_type=code&scope=snsapi_base&state=${state}`
  let redirectUrl = `${wechatUrl}?${query}#wechat_redirect`
  logger.info(`[redirectUrl:${redirectUrl}]`)
  return redirectUrl
}

util.setCookies = (res, key, value) => {
  logger.info(`[SetCookie][key:${key}][value:${value}]`)
  res.cookie(key, value, {
    maxAge: 72000000,
    httpOnly: true,
    signed: true
  })
}

module.exports = util
