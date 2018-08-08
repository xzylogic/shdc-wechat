import { put, takeLatest, call, select } from 'redux-saga/effects'
import Router from 'next/router'
import { Toast } from 'antd-mobile'

import { actionTypes, updateOrderInfoAction } from '../../actions/appointment/detail.action'
// import { updateSuccessOrderAction } from '../../actions/appointment/success.action'
import { HttpService } from '../../../utilities/httpService'

const PATH = {
  submitOrder: '/api/order/submit-order'
}

const submitOrderService = (data, accessToken) => {
  return HttpService.post(`${PATH.submitOrder}`, data, {headers: {'access-token': accessToken}})
}

function* submitOrder(actions) {
  const { accessToken } = yield select(state => state.globalReducer)
  if(actions.data && accessToken) {
    yield Toast.loading('loading...', 0)
    const data = yield call(submitOrderService, actions.data, accessToken)
    if (data) {
      // yield put(updateSuccessOrderAction(data))
      yield Toast.hide()
      yield Router.push('/appointment/success')
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
