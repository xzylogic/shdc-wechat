'use strict'

const logger = require('log4js').getLogger('utilities.js')
const config = require('./config')
const axios = require('axios')
const JSEncrypt = require('./jsencrypt')

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
    maxAge: 604800000,
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

utilities.encodeData =  (data) => {
  const publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXvSMcKoqxOdpWt/XWJdOWJtsWtuQh6/mPoFOC\nnp0cbcytIF9iDWT3h+kNIsDTWIsL6hiDZx8V6eYe0nDY5jjI9LgNPmL+whNCLa80m6yergMS4/iv\nV2ymvbfWP+Arko9w/+u2hNJN6Puzw+UQki+yQeAUeA3VIgOZVr7J36F5HQIDAQAB`
  const privateKey = `MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAJe9IxwqirE52la39dYl05Ym2xa2\n5CHr+Y+gU4KenRxtzK0gX2INZPeH6Q0iwNNYiwvqGINnHxXp5h7ScNjmOMj0uA0+Yv7CE0ItrzSb\nrJ6uAxLj+K9XbKa9t9Y/4CuSj3D/67aE0k3o+7PD5RCSL7JB4BR4DdUiA5lWvsnfoXkdAgMBAAEC\ngYAL6rvGK4Um9A80vk/dWK0sXrLYLtbt3xWDdSj52jEmmWz4r9Et5zVlx1PDR1ZzgsGw1trD/yZO\n10bOZuKb9kDBUFfwfVY0A4lsNGkDtpOPjEXbVOoYXRBDgMJNhY8MZoIGz/PQhEP1O5oL6y+KfbbV\noDK/BV0pL1lqyecrCs1iYQJBAOAnq3Gc4Y1FwwgA3M33QFOWhaNPChHPdtLV4R/oaAuekqwtZ6Fz\nmbLlr4JL+KUxbyt2u5c9eCnJhthugGKihykCQQCtS8CWE+LtNVyjNUZ3JrbxwXlE9/f6VGSJ9BkK\n2cYisrrqN/F6DTVzpbuT8NjLwJIFCNhZt53Ao87I0qb/I2TVAkBRi90BLhOYM4LqTHYHsCWEw0PG\nz6BYLmOJ/Ck0VHZVk9DENph20flebdTV0BGa90r8Quun78LhYOFfp4OpXntRAkBGIiE326Z8L5tl\nJdt1v0JMxusoQV6nfd4Ogq5b2NS6GDFTNv7QUWYvfoRSlCd5Fl9CEFlWvdvnKaQ3XCFfolhdAkEA\nwto8jFzaCr1tAbmip//YpRmp/36xp1dqi5uPsxq+h7wwLdbibP1vKiWjsmZLtZkgol65QYdpxhP9\nTiCImO+y8g==`
  
  let result = ''
  
  let encrypt = new JSEncrypt()
  encrypt.setPublicKey(publicKey)
  
  result = encrypt.encrypt(data) || encrypt.encryptLong(data)
  
  return result || data
}

module.exports = utilities
