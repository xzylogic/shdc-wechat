import { put, takeLatest, call, select } from 'redux-saga/effects'

import { actionTypes } from '../../actions/appointment/success.action'
import { updateSuccessOrderAction } from '../../actions/appointment/success.action'
import { HttpService } from '../../../utilities/httpService'

import { startLoading, endLoading } from '../../../utilities/common'
import * as CODE from '../../../utilities/status-code'

const PATH = {
  getOrder: '/api/user/reservation/getReservationRecord'
}

const getOrderService = (accessToken) => {
  return HttpService.get(`${PATH.getOrder}`, {headers: {'access-token': accessToken}})
}

function* loadOrder() {
  try {
    const { accessToken } = yield select(state => state.globalReducer)
    if (accessToken) {
      yield startLoading('Loading')
      const data = yield call(getOrderService, accessToken)
      if (data && data[0]) {
        yield put(updateSuccessOrderAction(data[0]))
        yield endLoading()
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

export const successSaga = [
  takeLatest(actionTypes.LOAD_SUCCESS_ORDER, loadOrder)
]
