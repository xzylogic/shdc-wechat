import { put, takeLatest, call, select } from 'redux-saga/effects'

import { actionTypes, updateGlobalLocation } from '../actions/global.action'
import { HttpUnSecretService } from '../../utilities/httpService'

import * as CODE from '../../utilities/status-code'
import { resolve } from 'url';

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
        yield call([window, wx.config], {
          debug: false, 
          appId: data.appId, 
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: ['closeWindow', 'openLocation', 'getLocation', 'hideAllNonBaseMenuItem']
        })
        yield call([window, wx.ready], () => {
          window.wx.hideAllNonBaseMenuItem() 
        })
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const globalSaga = [
  takeLatest(actionTypes.LOAD_JS_SDK, loadJssdk)
]
