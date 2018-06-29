import * as axios from 'axios'

import * as CODE from '../status-code'

function getStrategy(url) {
  return axios.get(url).then(res => res && res.data).then(res => {
    if (res.code === CODE.SUCCESS) {
      return res.data
    } else {
      throw new Error(res.msg || '未知错误')
    }
  })
}

function postStrategy(url, data) {
  return axios.post(url, data).then(res => res && res.data).then(res => {
    if (res.code === CODE.SUCCESS) {
      return res.data || res.msg || true
    } else {
      throw new Error(res.msg || '未知错误')
    }
  })
}

export const HttpStrategy = {
  get: getStrategy,
  post: postStrategy
}
