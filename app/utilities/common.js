import * as moment from 'moment'
import { authLogin, authNotLogin, authError, updateCurrentPage } from '../store/actions/global.action'

export const initGlobalQuery = (store, query) => {
  return new Promise((resolve, reject) => {
    if (query && query.weChatId && query.accessToken) {
      store.dispatch(authLogin(query))
      resolve()
    } else if (query && query.weChatId && !query.accessToken) {
      store.dispatch(authNotLogin(query))
    } else if (query && query.errorMsg) {
      store.dispatch(authError(query))
    }
  })
}

export const recordCurrentPage = (store, path) => {
  store.dispatch(updateCurrentPage(path))
}

export const hasErrors = (fieldsError) => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export const renderSex = (sex) => {
  switch (sex) {
    case 1:
      return '男'
    case '1':
      return '男'
    case 2:
      return '女'
    case '2':
      return '女'
    default:
      return '未知'
  }
}

export const renderMedicineCardType = (cardType) => {
  switch (cardType) {
    case 1:
      return '社保卡'
    case '1':
      return '社保卡'
    case 2:
      return '医联卡'
    case '2':
      return '医联卡'
    default:
      return ''
  }
}

export const renderCardType = (cardType) => {
  switch (cardType) {
    case 1:
      return '身份证'
    case '1':
      return '身份证'
    case 2:
      return '军官证（士兵证）'
    case '2':
      return '军官证（士兵证）'
    case 3:
      return '护照'
    case '3':
      return '护照'
    case 4:
      return '港澳居民来往内地通行证'
    case '4':
      return '港澳居民来往内地通行证'
    case 5:
      return '居民户口簿'
    case '5':
      return '居民户口簿'
    case 6:
      return '驾驶执照'
    case '6':
      return '驾驶执照'
    case 7:
      return '台湾居民来往内地通行证'
    case '7':
      return '台湾居民来往内地通行证'
    default:
      return ''
  }
}

export const checkNullObj = (obj) => {
  return obj && typeof obj === 'object' && Object.keys(obj).length === 0
}

export const checkNullArr = (arr) => {
  return arr && Array.isArray(arr) && arr.length === 0
}

export const formatTime = (startTime, endTime) => {
  return moment(startTime).format('HH:mm - ') + moment(endTime).format('HH:mm')
}
