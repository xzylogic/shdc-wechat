import { put, takeLatest, call } from 'redux-saga/effects'

import { actionTypes } from '../actions/global.action'
import { authError, authNotLogin } from '../actions/global.action'
import { HttpUnSecretService } from '../../utilities/httpService'

import * as CODE from '../../utilities/status-code'

const PATH = {
  getJSSDK: '/api/weChat/jsTicket',
}

const getJSSDKService = (url) => {
  const data = { url: url }
  return HttpUnSecretService.post(PATH.getJSSDK, data)
}

function* loadJssdk() {
  try {
    console.log('loadJssdk')
    if (typeof window !== 'undefined') {
      const url = window.location.href
      const data = yield call(getJSSDKService, url)
      if (data) {
        window.wx.config({
          debug: false, 
          appId: data.appId, 
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: ['closeWindow', 'openLocation', 'getLocation', 'hideAllNonBaseMenuItem']
        })

        window.wx.hideAllNonBaseMenuItem()
      }
    }
  } catch (error) {
    console.log(error)
    // if (error && error.message == CODE.NOT_LOGIN) {
    //   yield put(authNotLogin())
    // } else {
    //   yield put(authError({errorMsg: error.message}))
    // }
  }
}

export const globalSaga = [
  takeLatest(actionTypes.LOAD_JS_SDK, loadJssdk)
]
