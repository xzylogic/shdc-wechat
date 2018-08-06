'use strict'

const logger = require('log4js').getLogger('login.controller.js')
const http = require('../httpService')
const utilities = require('../utilities')

const PATH = {
  login: '/api/user/login',
  logout: '/api/user/logout',
  register: '/api/user/register',
  resetPassword: '/api/user/resetPassword'
}

module.exports = {
  /**
   * @param req req.body - {}
   * @param res
   */
  login: (req, res) => {
    logger.info(`[login request body]`, req.body)
    let postData = req.body
    http.HttpService.post(`${PATH.login}`, postData).then(sres => {
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
    let postData = req.body
    http.HttpService.post(`${PATH.register}`, postData).then(sres => {
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
    let postData = req.body
    http.HttpService.post(`${PATH.logout}`, {}, {headers: {'access-token': postData.accessToken}}).then(sres => {
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
    let postData = req.body
    let accessToken = req.headers['access-token']
    http.HttpService.post(`${PATH.resetPassword}`, postData, {headers: {'access-token': accessToken}}).then(sres => {
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
