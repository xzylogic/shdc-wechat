import * as axios from 'axios'

import * as CODE from '../status-code'

function getStrategy(url, config = {}) {
  console.log(config)
  return axios.get(url, config).then(res => res && res.data).then(res => {
    console.log(res)
    if (res.code == CODE.SUCCESS) {
      return res.data
    } else if (res.code == CODE.NOT_LOGIN) {
      throw new Error(CODE.NOT_LOGIN.toString())
    } else {
      throw new Error(res.msg || '未知错误')
    }
  })
}

function postStrategy(url, data, config = {}) {
  return axios.post(url, data, config).then(res => res && res.data).then(res => {
    if (res.code == CODE.SUCCESS) {
      return res.data || res.msg || true
    } else if (res.code == CODE.NOT_LOGIN) {
      throw new Error(CODE.NOT_LOGIN.toString())
    } else {
      throw new Error(res.msg || '未知错误')
    }
  })
}

export const HttpStrategy = {
  get: getStrategy,
  post: postStrategy
}
