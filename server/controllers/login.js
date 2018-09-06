'use strict'

const logger = require('log4js').getLogger('login.controller.js')
const http = require('../httpService')
const utilities = require('../utilities')
const uuid = require('uuid/v1')

const PATH = {
  login: '/api/user/login',
  logout: '/api/user/logout',
  register: '/api/user/register',
  resetPassword: '/api/user/resetPassword'
}

function getSignature() {
  let myuuid = uuid()
  myuuid = myuuid.split('-').reduce((a, b) => a + b)
  let timestamp = new Date().valueOf()
  return utilities.encodeData(`${myuuid}+${timestamp}`)
}

const headers = {
  'Content-Type': 'application/json',
  client: 'A868E677C04F42B6840B0D58D7D27DDE', 
  version: '1.3.1',
  signature: getSignature()
}

module.exports = {
  /**
   * @param req req.body - {}
   * @param res
   */
  login: (req, res) => {
    logger.info(`[login request body]`, req.body)
    let postData = req.body.data
    http.HttpService.post(`${PATH.login}`, postData, {
      headers: headers
    }).then(sres => {
      if (sres) {
        utilities.setCookies(res, 'accessToken', sres.data && sres.data.accessToken || '')
        res.send(sres)
      } else {
        res.send({
          code: 404,
          msg: '请求网络错误',
          errorMsg: '请求网络错误'
        })
      }
    })
  },

  /**
   * @param req req.body - {}
   * @param res
   */
  register: (req, res) => {
    logger.info(`[register request body]`, req.body)
    let postData = req.body.data
    http.HttpService.post(`${PATH.register}`, postData, {
      headers: headers
    }).then(sres => {
      if (sres) {
        utilities.setCookies(res, 'accessToken', sres.data && sres.data.accessToken || '')
        res.send(sres)
      } else {
        res.send({
          code: 404,
          msg: '请求网络错误',
          errorMsg: '请求网络错误'
        })
      }
    })
  },

  /**
   * @param req req.body - {accessToken: string}
   * @param res
   */
  logout: (req, res) => {
    logger.info(`[logout request body]`, req.body)
    let accessToken = req.signedCookies.accessToken || ''
    let postData = req.body.data
    http.HttpService.post(`${PATH.logout}`, postData, {
      headers: {
        ...headers,
        'access-token': accessToken, 
      }
    }).then(sres => {
      if (sres && sres.code === 200) {
        utilities.setCookies(res, 'accessToken', '')
        res.send(sres)
      } else if (sres) {
        res.send(sres)
      } else {
        res.send({
          code: 404,
          msg: '请求网络错误',
          errorMsg: '请求网络错误'
        })
      }
    })
  },

  /**
   * @param req req.body - {accessToken: string}
   * @param res
   */
  resetPassword: (req, res) => {
    logger.info(`[resetPassword request body]`, req.body)
    let postData = req.body.data
    let accessToken = req.headers['access-token']
    http.HttpService.post(`${PATH.resetPassword}`, postData, {
      headers: {
        ...headers,
        'access-token': accessToken, 
      }
    }).then(sres => {
      logger.info(sres)
      if (sres && sres.code === 200) {
        utilities.setCookies(res, 'accessToken', '')
        res.send(sres)
      } else if (sres) {
        res.send(sres)
      } else {
        res.send({
          code: 404,
          msg: '请求网络错误',
          errorMsg: '请求网络错误'
        })
      }
    })
  }
}
