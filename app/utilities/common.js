import * as moment from 'moment'
import { authLogin, authNotLogin, authError, updateCurrentPage } from '../store/actions/global.action'

export const initGlobalQuery = (store, query) => {
  return new Promise((resolve, reject) => {
    if (query && query.weChatId && query.accessToken) {
      store.dispatch(authLogin(query))
      resolve(true)
    } else if (query && query.weChatId && !query.accessToken) {
      store.dispatch(authNotLogin(query))
      resolve(false)
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

export const getLastFour = (str) => {
  return typeof str == 'string' ? str.substr(str.length - 4) : ''
}

export const getMembers = (accountList) => {
  let returnMembers = []
  if (accountList && Array.isArray(accountList)) {
    returnMembers = accountList.map(account => {
      let label = ''
      let value = ''
      if (account.medicineCardType) {
        label = `【${renderMedicineCardType(account.medicineCardType)}】${account.name}(尾号${getLastFour(account.medicineCardId)})`
      } else if (account.cardType) {
        label = `【${renderCardType(account.cardType)}】${account.name}(尾号${getLastFour(account.cardId)})`
      }
      value = `${account.name}+${account.memberId || ''}`
      return {
        label: label,
        value: value
      }
    })
  }
  return [returnMembers]
}

export const getCardList = (accountList) => {
  let returnCards = []
  if (accountList && Array.isArray(accountList)) {
    returnCards = accountList.map(account => {
      let label = ''
      let value = ''
      if (account.medicineCardType) {
        label = `【${renderMedicineCardType(account.medicineCardType)}】${account.name}(尾号${getLastFour(account.medicineCardId)})`
      } else if (account.cardType) {
        label = `【${renderCardType(account.cardType)}】${account.name}(尾号${getLastFour(account.cardId)})`
      }
      value = account.medicineCardId || account.cardId
      return {
        label: label,
        value: value
      }
    })
  }
  return [returnCards]
}

export const getInitialMember = (accountList) => {
  let initialValue = ''
  if(accountList && Array.isArray(accountList) && accountList[0]){
    initialValue = `${accountList[0].name}+${accountList[0].memberId || ''}`
  }
  return [initialValue]
}

/**
 * 判断对象存在且为空
 * @param {*} obj 
 */
export const checkNullObj = (obj) => {
  return obj && typeof obj === 'object' && Object.keys(obj).length === 0
}

/**
 * 判断对象存在且为非空
 * @param {*} obj 
 */
export const checkNotNullObj = (obj) => {
  return obj && typeof obj === 'object' && Object.keys(obj).length !== 0
}

/**
 * 判断数组存在且为空
 * @param {*} arr 
 */
export const checkNullArr = (arr) => {
  return arr && Array.isArray(arr) && arr.length === 0
}

/**
 * 判断数组存在且为非空
 * @param {*} arr 
 */
export const checkNotNullArr = (arr) => {
  return arr && Array.isArray(arr) && arr.length !== 0
}

export const formatTime = (startTime, endTime) => {
  return moment(startTime).format('HH:mm - ') + moment(endTime).format('HH:mm')
}
