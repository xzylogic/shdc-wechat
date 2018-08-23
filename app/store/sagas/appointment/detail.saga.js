import { put, takeLatest, call, select } from 'redux-saga/effects'
import Router from 'next/router'
import { Toast } from 'antd-mobile'

import { actionTypes, updateOrderInfoAction } from '../../actions/appointment/detail.action'
import { authNotLogin, authError } from '../../actions/global.action'
import { HttpService } from '../../../utilities/httpService'

import { startLoading, endLoading } from '../../../utilities/common'
import * as CODE from '../../../utilities/status-code'

const PATH = {
  submitOrder: '/api/order/submit-order'
}

const submitOrderService = (data, accessToken) => {
  return HttpService.post(`${PATH.submitOrder}`, data, {headers: {'access-token': accessToken}})
}

function* submitOrder(actions) {
  try {
    const { accessToken } = yield select(state => state.globalReducer)
    if (actions.data && accessToken) {
      yield startLoading()
      const data = yield call(submitOrderService, actions.data, accessToken)
      if (data) {
        yield endLoading()
        yield Router.push('/appointment/success')
      }
    }
  } catch (error) {
    if (error && error.message == CODE.NOT_LOGIN) {
      yield put(authNotLogin())
    } else {
      yield put(authError({errorMsg: error.message}))
    }
  }
}

function* storeOrder(actions) {
  yield put(updateOrderInfoAction(actions.data))
  yield call([localStorage, 'setItem'], 'order', JSON.stringify(actions.data))
}

function* getOrder() {
  try {
    const data = yield call([localStorage, 'getItem'], 'order')
    const jsonData = JSON.parse(data)
    yield put(updateOrderInfoAction(jsonData))
  } catch (err) {
    Toast.info(err.message || '获取数据错误')
  }
}

export const detailSaga = [
  takeLatest(actionTypes.STORE_ORDER_INFO, storeOrder),
  takeLatest(actionTypes.GET_ORDER_INFO, getOrder),
  takeLatest(actionTypes.SUBMIT_ORDER, submitOrder)
]
