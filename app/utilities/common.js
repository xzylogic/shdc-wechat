import * as moment from 'moment'
import {
  Toast
} from 'antd-mobile'
import {
  authLogin,
  authNotLogin,
  updateCurrentPage
} from '../store/actions/global.action'
import {
  JSEncrypt
} from './jsencrypt'
import * as uuid from 'uuid/v4'

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
  return Object.keys(fieldsError).some(field => fieldsError[field])
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

export const cardList = [{
  label: '身份证',
  value: 1
}, {
  label: '军官证（士兵证）',
  value: 2
}, {
  label: '护照',
  value: 3
}, {
  label: '港澳居民来往内地通行证',
  value: 4
// }, {
//   label: '居民户口簿',
//   value: 5
// }, {
//   label: '驾驶执照',
//   value: 6
// }, {
//   label: '台湾居民来往内地通行证',
//   value: 7
}]

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
        label = `【${renderMedicineCardType(account.medicineCardType)}】${encodeName(account.name)}(尾号${getLastFour(account.medicineCardId)})`
      } else if (account.cardType) {
        label = `【${renderCardType(account.cardType)}】${encodeName(account.name)}(尾号${getLastFour(account.cardId)})`
      }
      value = `${account.name}+${account.medicineCardType || account.cardType}+${account.medicineCardId || account.cardId}+${account.memberId || ''}`
      return {
        label: label,
        value: value
      }
    })
  }
  return [returnMembers]
}

export const getCardList = (accountList, ifKey) => {
  let returnCards = []
  if (accountList && Array.isArray(accountList)) {
    returnCards = accountList.map((account, index) => {
      let label = ''
      let value = ''
      if (account.medicineCardType) {
        label = `【${renderMedicineCardType(account.medicineCardType)}】${encodeName(account.name)}(尾号${getLastFour(account.medicineCardId)})`
      } else if (account.cardType) {
        label = `【${renderCardType(account.cardType)}】${encodeName(account.name)}(尾号${getLastFour(account.cardId)})`
      }
      value = ifKey ? index : account.medicineCardId || account.cardId
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
  if (accountList && Array.isArray(accountList) && accountList[0]) {
    initialValue = `${accountList[0].name}+${accountList[0].medicineCardType || accountList[0].cardType}+${accountList[0].medicineCardId || accountList[0].cardId}+${accountList[0].memberId || ''}`
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

export const startLoading = async (content = '') => {
  if (typeof window !== 'undefined') {
    await Toast.hide()
    await Toast.loading(content, 0)
  }
}

export const endLoading = () => {
  if (typeof window !== 'undefined') {
    Toast.hide()
  }
}

export const encodeData = (data) => {
  const publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXvSMcKoqxOdpWt/XWJdOWJtsWtuQh6/mPoFOC\nnp0cbcytIF9iDWT3h+kNIsDTWIsL6hiDZx8V6eYe0nDY5jjI9LgNPmL+whNCLa80m6yergMS4/iv\nV2ymvbfWP+Arko9w/+u2hNJN6Puzw+UQki+yQeAUeA3VIgOZVr7J36F5HQIDAQAB`
  const privateKey = `MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAJe9IxwqirE52la39dYl05Ym2xa2\n5CHr+Y+gU4KenRxtzK0gX2INZPeH6Q0iwNNYiwvqGINnHxXp5h7ScNjmOMj0uA0+Yv7CE0ItrzSb\nrJ6uAxLj+K9XbKa9t9Y/4CuSj3D/67aE0k3o+7PD5RCSL7JB4BR4DdUiA5lWvsnfoXkdAgMBAAEC\ngYAL6rvGK4Um9A80vk/dWK0sXrLYLtbt3xWDdSj52jEmmWz4r9Et5zVlx1PDR1ZzgsGw1trD/yZO\n10bOZuKb9kDBUFfwfVY0A4lsNGkDtpOPjEXbVOoYXRBDgMJNhY8MZoIGz/PQhEP1O5oL6y+KfbbV\noDK/BV0pL1lqyecrCs1iYQJBAOAnq3Gc4Y1FwwgA3M33QFOWhaNPChHPdtLV4R/oaAuekqwtZ6Fz\nmbLlr4JL+KUxbyt2u5c9eCnJhthugGKihykCQQCtS8CWE+LtNVyjNUZ3JrbxwXlE9/f6VGSJ9BkK\n2cYisrrqN/F6DTVzpbuT8NjLwJIFCNhZt53Ao87I0qb/I2TVAkBRi90BLhOYM4LqTHYHsCWEw0PG\nz6BYLmOJ/Ck0VHZVk9DENph20flebdTV0BGa90r8Quun78LhYOFfp4OpXntRAkBGIiE326Z8L5tl\nJdt1v0JMxusoQV6nfd4Ogq5b2NS6GDFTNv7QUWYvfoRSlCd5Fl9CEFlWvdvnKaQ3XCFfolhdAkEA\nwto8jFzaCr1tAbmip//YpRmp/36xp1dqi5uPsxq+h7wwLdbibP1vKiWjsmZLtZkgol65QYdpxhP9\nTiCImO+y8g==`

  let result = ''

  let encrypt = new JSEncrypt()
  encrypt.setPublicKey(publicKey)

  result = encrypt.encrypt(data) || encrypt.encryptLong(data)

  return result || data
}

export const encodeCard = (card) => {
  card = card && card.toString() || ''
  let star = ''
  for (let i = 0; i < card.length - 8; i++) {
    star += '*'
  }
  let newCard = card.replace(/^(.{4})(.*)(.{4})(?=\b)$/, `$1${star}$3`)
  return newCard
}

export const encodeMCard = (card) => {
  card = card && card.toString() || ''
  let star = ''
  for (let i = 0; i < card.length - 5; i++) {
    star += '*'
  }
  let newCard = card.replace(/^(.{3})(.*)(.{2})(?=\b)$/, `$1${star}$3`)
  return newCard
}

export const encodeTel = (card) => {
  card = card && card.toString() || ''
  let star = ''
  for (let i = 0; i < card.length - 7; i++) {
    star += '*'
  }
  let newCard = card.replace(/^(.{3})(.*)(.{4})(?=\b)$/, `$1${star}$3`)
  return newCard
}

export const encodeName = (name) => {
  name = name && name.toString() || ''
  let newName = name.replace(/^(.{1})(.*)$/, `*$2`)
  return newName
}

export const encodeDate = (date) => {
  date = date && date.toString() || ''
  let newDate = date.replace(/^(.{2}).{2}(.{1}).{2}(.{1}).{1}(.{1})$/, `$1**$2**$3*$4`)
  return newDate
}

export const calcDistance = (lat1, lng1, lat2, lng2) => {
  var radLat1 = lat1 * Math.PI / 180.0
  var radLat2 = lat2 * Math.PI / 180.0
  var a = radLat1 - radLat2
  var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
  s = s * 6378.137
  s = Math.round(s * 10000) / 10000
  return s
}

export const Convert_BD09_To_GCJ02 = ($lat,$lng) =>{
  let $x_pi = 3.14159265358979324 * 3000.0 / 180.0
  let $x = $lng - 0.0065
  let $y = $lat - 0.006
  let $z = Math.sqrt($x * $x + $y * $y) - 0.00002 * Math.sin($y * $x_pi)
  let $theta = Math.atan2($y, $x) - 0.000003 * Math.cos($x * $x_pi)
  let lng = $z * Math.cos($theta)
  let lat = $z * Math.sin($theta)
  return {
    lat: lat, 
    lng: lng
  }
}

export const getSignature = () => {
  let myuuid = uuid()
  myuuid = myuuid.split('-').reduce((a, b) => a + b)
  let timestamp = new Date().valueOf()
  return encodeData(`${myuuid}+${timestamp}`)
}