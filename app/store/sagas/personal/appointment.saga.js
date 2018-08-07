import { put, takeLatest, call, select } from 'redux-saga/effects'

import { actionTypes, updateMyAppointmentsAction, updateAppointmentParamAction } from '../../actions/personal/appointment.action'
import { authNotLogin, authError } from '../../actions/global.action'
import { HttpService } from '../../../utilities/httpService'

import * as CODE from '../../../utilities/status-code'

const PATH = {
  getAppointmentList: '/api/user/reservation/getReservationRecord',
}

const getAppointmentListService = (accessToken) => {
  return HttpService.get(`${PATH.getAppointmentList}`, {headers: { 'access-token': accessToken || ''}})
}

function* loadAppointmentList() {
  try {
    const { accessToken } = yield select((state) => state.globalReducer)
    const data = yield call(getAppointmentListService, accessToken)
    if (data) {
      yield put(updateMyAppointmentsAction(data))
      yield put(updateAppointmentParamAction(data[0] && [data[0].mediCardId]))
    }
  } catch (error) {
    if (error && error.message == CODE.NOT_LOGIN) {
      yield put(authNotLogin())
    } else {
      yield put(authError({errorMsg: error.message}))
    }
  }
}

export const appointmentSaga = [
  takeLatest(actionTypes.LOAD_MY_APPOINTMENTS, loadAppointmentList),
]
