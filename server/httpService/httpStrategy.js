'use strict'

const axios = require('axios')

axios.defaults.headers.common['version'] = '2.0'

const getStrategy = (url, config = {}) => {
  return axios.get(url, config).then(res => res.data)
}

const postStrategy = (url, data, config = {}) => {
  return axios.post(url, data, config).then(res => res.data)
}

module.exports = {
  get: getStrategy,
  post: postStrategy
}
