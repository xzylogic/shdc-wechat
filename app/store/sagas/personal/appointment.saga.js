import { put, takeLatest, call, select } from 'redux-saga/effects'
import { Toast } from 'antd-mobile'

import { actionTypes, updateMyAppointmentsAction, updateAppointmentParamAction, loadMyAppointmentsAction } from '../../actions/personal/appointment.action'
import { authNotLogin, authError } from '../../actions/global.action'
import { HttpService } from '../../../utilities/httpService'

import * as CODE from '../../../utilities/status-code'
import { checkNotNullArr, checkNullArr, startLoading, endLoading } from '../../../utilities/common';
import { loadAccountListAction } from '../../actions/personal/account.action';

const PATH = {
  getAppointmentList: '/api/user/reservation/getReservationRecord',
  cancelAppointment: '/api/user/reservation/cancelReservation'
}

const getAppointmentListService = (accessToken) => {
  return HttpService.get(`${PATH.getAppointmentList}`, {headers: { 'access-token': accessToken || ''}})
}

function* loadAppointmentList() {
  try {
    yield startLoading()
    const { accessToken } = yield select((state) => state.globalReducer)
    if (accessToken) {
      const data = yield call(getAppointmentListService, accessToken)
      if (data) {
        yield put(updateMyAppointmentsAction(data))
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

const cancelAppointmentService = (data, accessToken) => {
  return HttpService.post(`${PATH.cancelAppointment}`, data, {headers: { 'access-token': accessToken || ''}})
}

function* cancelAppointment(actions) {
  yield Toast.loading('Loading', 0)
  const { accessToken } = yield select((state) => state.globalReducer)
  const data = yield call(cancelAppointmentService, actions.data, accessToken)
  if (data) {
    yield put(loadMyAppointmentsAction())
    yield Toast.hide()
  }
}

export const appointmentSaga = [
  takeLatest(actionTypes.LOAD_MY_APPOINTMENTS, loadAppointmentList),
  takeLatest(actionTypes.CANCEL_APPOINTMENT, cancelAppointment),
]
