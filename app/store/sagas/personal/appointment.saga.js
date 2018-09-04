import { put, takeLatest, call, select } from 'redux-saga/effects'

import { actionTypes, updateMyAppointmentsAction, loadMyAppointmentsAction, updateAppointmentParamAction } from '../../actions/personal/appointment.action'
import { authNotLogin, authError } from '../../actions/global.action'
import { HttpService } from '../../../utilities/httpService'
import { loadAccountList } from './account.saga'

import * as CODE from '../../../utilities/status-code'
import { startLoading, endLoading, checkNullArr, checkNotNullArr } from '../../../utilities/common'

const PATH = {
  getAppointmentList: '/api/user/reservation/getReservationRecord',
  cancelAppointment: '/api/user/reservation/cancelReservation'
}

const getAppointmentListService = (accessToken) => {
  return HttpService.get(PATH.getAppointmentList, '', {headers: { 'access-token': accessToken || ''}})
}

function* loadAppointmentList() {
  try {
    const { accessToken } = yield select((state) => state.globalReducer)
    const { accountList } = yield select((state) => state.accountReducer)
    if (accountList && checkNullArr(accountList)) {
      yield call(loadAccountList) 
    }
    const accountReducer = yield select((state) => state.accountReducer)
    if (accessToken && checkNotNullArr(accountReducer.accountList)) {
      const param = accountReducer.accountList[0]
      yield put(updateAppointmentParamAction(param.medicineCardId || param.cardId))

      yield startLoading('加载中')
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
  try {
    yield startLoading()
    const { accessToken } = yield select((state) => state.globalReducer)
    const data = yield call(cancelAppointmentService, actions.data, accessToken)
    if (data) {
      yield put(loadMyAppointmentsAction())
      yield endLoading()
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
  takeLatest(actionTypes.CANCEL_APPOINTMENT, cancelAppointment),
]
