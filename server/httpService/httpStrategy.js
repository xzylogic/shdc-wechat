'use strict'

const axios = require('axios')

axios.defaults.headers.common['version'] = '2.0'

const getStrategy = (url) => {
  return axios.get(url).then(res => res.data)
}

const postStrategy = (url, data) => {
  return axios.post(url, data).then(res => res.data)
}

module.exports = {
  get: getStrategy,
  post: postStrategy
}
