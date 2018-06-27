'use strict'

const express = require('express')
const next = require('next')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const log4js = require('log4js')

const config = require('./server/config')
const utilities = require('./server/utilities')

log4js.configure({
  appenders: {
    out: {type: 'console'}, // 控制台输出
    app: {
      type: 'file', //文件输出
      filename: 'logs/pci-wechat.log',
      maxLogSize: 1024,
      backups: 3,
      category: 'normal'
    }
  },
  categories: {
    default: {
      appenders: ['out', 'app'],
      level: 'info'
    }
  }
})
const logger = log4js.getLogger('server.js')

const {port, dev} = config

const myRoutes = require('./config/routes.json')

const app = next({dev})

const handle = app.getRequestHandler()
const server = new express()
const router = express.Router()

server.use(bodyParser.json())
server.use(cookieParser('shdc-wechat'))
server.use(log4js.connectLogger(logger, {level: log4js.levels.INFO}))

server.use(express.static(path.join(__dirname, 'static')))

app.prepare().then(() => {

  myRoutes.routes.forEach(route => {
    server.use(router.get(route.path, (req, res) => {
      // 从 query 获取微信返回的 code 和 state
      const code = req.query.code || ''
      const state = req.query.state || ''

      const accessToken = req.signedCookies.accessToken || ''

      const actualPage = route.page
      const queryParams = req.params

      // app.render(req, res, actualPage, queryParams)

      if (accessToken) {
        // 如果有 accessToken 则直接将 accessToken 作为 param 值传给页面
        logger.info(`accessToken is existed.`)
        queryParams.accessToken = accessToken
        app.render(req, res, actualPage, queryParams)

      } else if (!accessToken && code) {
        // 如果没有 accessToken 但是有 code 则请求接口获取 accessToken 
        utilities.getAccessTokenFromCode(code).then(sres => {
          if (sres.code===200 && sres.data && sres.data.accessToken) {
            util.setCookies(res, 'accessToken', sres.data.accessToken)
            queryParams = sres.data.accessToken
            app.render(req, res, actualPage, queryParams)
          } else if(sres.code===200 && sres.data && !sres.data.accessToken && sres.data.weChatId) {
            queryParams.weChatId = sres.data.weChatId
            app.render(req, res, actualPage, queryParams)
          } else {
            logger.info(`[getAccessTokenFromCode]${sres.errorMsg || 'UNKNOWN ERROR'}`)
            queryParams.errorMsg = sres.msg || '未知错误'
            app.render(req, res, actualPage, queryParams)
          }
        }).catch(err => {
          logger.info(`[getAccessTokenFromCode]NETWORK ERROR`)
          queryParams.error = err.message || '未知错误'
          app.render(req, res, '/error', queryParams)
        })
      } else {
        // const originUrl = `${req.protocol}://${req.headers.host}${req.path}`
        const originUrl = `${req.protocol}://${config.domain}${req.path}`
        const redirectUrl = utilities.setRedirectUrl(originUrl, state)
        res.redirect(redirectUrl)
      }
    }))
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

}).catch((ex) => {
  logger.info(ex.stack)
  process.exit(1)
})

server.listen(port, (err) => {
  if (err)
    throw err
  logger.info(`> Ready on http://localhost:${port}`)
})

module.exports = app
