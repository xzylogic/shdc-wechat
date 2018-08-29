import { put, takeLatest, call, select } from 'redux-saga/effects'
import { Toast } from 'antd-mobile'

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
        window.wx.config({
          debug: false, 
          appId: data.appId, 
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: ['closeWindow', 'openLocation', 'getLocation', 'hideAllNonBaseMenuItem']
        })
        window.wx.ready(() => {
          window.wx.hideAllNonBaseMenuItem() 
        })
        wx.error((res) => {
          console.log(res)
          Toast.info('微信JS-SDK调用失败')
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const globalSaga = [
  takeLatest(actionTypes.LOAD_JS_SDK, loadJssdk)
]
