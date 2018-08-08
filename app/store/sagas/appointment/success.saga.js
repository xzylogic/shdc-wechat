import { put, takeLatest, call, select } from 'redux-saga/effects'
import { Toast } from 'antd-mobile'

import { actionTypes } from '../../actions/appointment/success.action'
import { updateSuccessOrderAction } from '../../actions/appointment/success.action'
import { HttpService } from '../../../utilities/httpService'

const PATH = {
  getOrder: '/api/user/reservation/getReservationRecord'
}

const getOrderService = (accessToken) => {
  return HttpService.get(`${PATH.getOrder}`, {headers: {'access-token': accessToken}})
}

function* loadOrder() {
  const { accessToken } = yield select(state => state.globalReducer)
  if(accessToken) {
    if (typeof window !== 'undefined') {
      yield Toast.loading('loading...', 0)
    }
    const data = yield call(getOrderService, accessToken)
    if (data && data[0]) {
      console.log(data[0])
      console.log('success')
      yield put(updateSuccessOrderAction(data[0]))
      if (typeof window !== 'undefined') {
        yield Toast.hide()
      }
    }
  }
}

export const successSaga = [
  takeLatest(actionTypes.LOAD_SUCCESS_ORDER, loadOrder)
]
