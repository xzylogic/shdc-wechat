'use strict'

const logger = require('log4js').getLogger('utilities.js')
const config = require('./config')
const axios = require('axios')

const PATH = {
  getAccessTokenFromCode: '/api/weChat/auth'
}

const utilities = {}

/**
 * 设置重定向地址
 * @param {*} url 
 * @param {*} state 
 */
utilities.setRedirectUrl = (url, state) => {
  let wechatUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize'
  let uri = encodeURIComponent(url)
  let query = `appid=${config.appId}&redirect_uri=${uri}&response_type=code&scope=snsapi_base&state=${state}`
  let redirectUrl = `${wechatUrl}?${query}#wechat_redirect`
  logger.info(`[redirectUrl] ${redirectUrl}`)
  return redirectUrl
}

/**
 * 设置 cookie
 * @param {*} res 
 * @param {*} key 
 * @param {*} value 
 */
utilities.setCookies = (res, key, value) => {
  logger.info(`[SetSignedCookie] - key:${key} - value:${value}`)
  res.cookie(key, value, {
    maxAge: 72000000,
    httpOnly: true, 
    signed: true
  })
}

/**
 * 通过 code 请求后台接口获取 accessToken 和 weChatId
 * @param code
 * @returns data {accessToken, weChatId}
 */
utilities.getAccessTokenFromCode = (code) => {
  return axios.post(`${config.apiUrl}${PATH.getAccessTokenFromCode}?code=${code}`).then(res => res.data)
}

module.exports = utilities
