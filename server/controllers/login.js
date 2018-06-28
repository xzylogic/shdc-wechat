'use strict'

const logger = require('log4js').getLogger('login.controller.js')
const http = require('../utilities/httpService')
const CODE = require('../../config/status-code')

const PATH = {
  login: 'api/user/login',
  register: 'api/user/register'
}

module.exports = {

  /**
   * @param req req.body - {}
   * @param res
   */
  login: (req, res) => {
    auth.getOpenId(req, res).then((openId) => {
      logger.info(`[request body]`, req.body)
      let postData = req.body
      postData.openId = openId
      http.microService.post(`${PATH.login}`, postData).then(data => {
        res.send(data)
      })
    })
  },

  /**
   * @param req req.body - {tel: string, code: string, password: string}
   * @param res
   */
  register: (req, res) => {
    logger.info(`[request body]`, req.body)
    let postData = req.body
    postData.openId = openId
    http.microService.post(`${PATH.register}`, postData).then(data => {
      if (data) {
        res.send(data)
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
