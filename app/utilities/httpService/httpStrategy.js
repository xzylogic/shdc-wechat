import * as axios from 'axios'

import { encodeData, getSignature } from '../common'
import * as CODE from '../status-code'

const headers = {
  headers: {
    client: 'A868E677C04F42B6840B0D58D7D27DDE',
    version: '1.3.1'
  }
}

function objKeySort(obj) {
  var newkey = Object.keys(obj).sort()
  var newObj = {}
  for (var i = 0; i < newkey.length; i++) {
    newObj[newkey[i]] = obj[newkey[i]]
  }
  return newObj
}

function getStrategy(url, params, config = {}) {
  // console.log(params)
  let query = ''
  if (params) {
    query = `?${encodeData(params)}`
  }
  return axios.get(encodeURI(url + query), {
    ...config, 
    ...{
      headers: {
        ...config.headers, 
        ...headers.headers, 
        signature: getSignature()
      }
    }
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
  if (typeof data === 'object') {
    // console.log(JSON.stringify(objKeySort(data)))
    let postData = encodeData(JSON.stringify(objKeySort(data)))
    // console.log(postData)
    return axios.post(url, postData, {
      ...config, 
      ...{
        headers: {
          ...config.headers, 
          ...headers.headers, 
          signature: getSignature(),
          'Content-Type': 'application/json'
        }
      },
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
}

function postUnSecretStrategy(url, data, config = {}) {
  // console.log(data)
  return axios.post(url, data, {
    ...config, 
    ...{
      headers: {
        ...config.headers, 
        ...headers.headers, 
        signature: getSignature(),
        'Content-Type': 'application/json'
      }
    },
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
  // console.log(JSON.stringify(objKeySort(data)))
  let postData = encodeData(JSON.stringify(objKeySort(data)))
  // console.log(postData)
  return axios.post(url, {data: postData}, {
    ...config, 
    ...{
      headers: {
        ...config.headers, 
        ...headers.headers, 
        signature: getSignature(),
        'Content-Type': 'application/json'
      }
    },
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

export const HttpUnSecretStrategy = {
  get: getStrategy,
  post: postUnSecretStrategy
}
