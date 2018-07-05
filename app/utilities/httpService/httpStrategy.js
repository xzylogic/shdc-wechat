import * as axios from 'axios'

import { updateState } from '../../store/actions/global.action'
import * as CODE from '../status-code'

function getStrategy(url, config = {}) {
  return axios.get(url, config).then(res => res && res.data).then(res => {
    if (res.code === CODE.SUCCESS) {
      return res.data
    } else {
      throw new Error(res.msg || '未知错误')
    }
  })
}

function getWithAuthStrategy(url, store, config = {}) {
  return axios.get(url, config).then(res => res && res.data).then(res => {
    if (res.code === CODE.SUCCESS) {
      return res.data
    } else if (res.code === CODE.NOT_LOGIN) {
      store.dispatch(updateState({code: CODE.NOT_LOGIN}))
    } else {
      throw new Error(res.msg || '未知错误')
    }
  })
}

function postStrategy(url, data, config = {}) {
  return axios.post(url, data, config).then(res => res && res.data).then(res => {
    if (res.code === CODE.SUCCESS) {
      return res.data || res.msg || true
    } else {
      throw new Error(res.msg || '未知错误')
    }
  })
}

function postWithAuthStrategy(url, store, config = {}) {
  return axios.get(url, config).then(res => res && res.data).then(res => {
    if (res.code === CODE.SUCCESS) {
      return res.data
    } else if (res.code === CODE.NOT_LOGIN) {
      store.dispatch(updateState({code: CODE.NOT_LOGIN}))
    } else {
      throw new Error(res.msg || '未知错误')
    }
  })
}

export const HttpStrategy = {
  get: getStrategy,
  post: postStrategy,
  getWithAuth: getWithAuthStrategy,
  postWithAuth: postWithAuthStrategy,
}
