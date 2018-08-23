import * as axios from 'axios'

import { encodeData } from '../common'
import * as CODE from '../status-code'

function getStrategy(url, params, config = {}) {
  let headers = {headers: {client: 'A868E677C04F42B6840B0D58D7D27DDE'}}
  let query = ''
  if (params) {
    query = `?${encodeData(params)}`
  }
  return axios.get(encodeURI(url + query), {
    ...config, 
    ...{headers: {...config.headers, ...headers.headers}}
  }).then(res => res && res.data).then(res => {
    if (res.code == CODE.SUCCESS) {
      return res.data || res.msg || true
    } else if (res.code == CODE.NOT_LOGIN) {
      throw new Error(CODE.NOT_LOGIN)
    } else {
      throw new Error(res.msg || '未知错误')
    }
  })
}

function postStrategy(url, data, config = {}) {
  let headers = {headers: {client: 'A868E677C04F42B6840B0D58D7D27DDE'}}
  let postData = encodeData(JSON.stringify(data))
  // console.log(postData)
  return axios.post(url, postData, {
    ...config, 
    ...{headers: {...config.headers, ...headers.headers, ...{'Content-Type': 'application/json'}}},
  }).then(res => res && res.data).then(res => {
    if (res.code == CODE.SUCCESS) {
      return res.data || res.msg || true
    } else if (res.code == CODE.NOT_LOGIN) {
      throw new Error(CODE.NOT_LOGIN)
    } else {
      throw new Error(res.msg || '未知错误')
    }
  })
}

function postHostStrategy(url, data, config = {}) {
  let headers = {headers: {client: 'A868E677C04F42B6840B0D58D7D27DDE'}}
  let postData = encodeData(JSON.stringify(data))
  // console.log(postData)
  return axios.post(url, {data: postData}, {
    ...config, 
    ...{headers: {...config.headers, ...headers.headers, ...{'Content-Type': 'application/json'}}},
  }).then(res => res && res.data).then(res => {
    if (res.code == CODE.SUCCESS) {
      return res.data || res.msg || true
    } else if (res.code == CODE.NOT_LOGIN) {
      throw new Error(CODE.NOT_LOGIN)
    } else {
      throw new Error(res.msg || '未知错误')
    }
  })
}

export const HttpStrategy = {
  get: getStrategy,
  post: postStrategy
}

export const HttpHostStrategy = {
  get: getStrategy,
  post: postHostStrategy
}
