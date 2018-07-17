import { put, takeLatest, call, select } from 'redux-saga/effects'
import { Toast } from 'antd-mobile'

import { actionTypes, updateDoctorsByName, updateDoctorsByDate } from '../../actions/appointment/doctors.action'
import { authError, authNotLogin } from '../../actions/global.action'
import { HttpToastService, HttpService } from '../../../utilities/httpService'
import * as CODE from '../../../utilities/status-code'

const PATH = {
  queryDoctors: '/api/doctor/query-doctor',
  queryDoctorsByDate: '/api/schedule/queryDoctorByScheduleDate'
}

const getDoctorsByName = (hosOrgCode, deptCode) => {
  const query = `?hosOrgCode=${hosOrgCode}&hosDeptCode=${deptCode}`
  return HttpService.get(`${PATH.queryDoctors}${query}`)
}

function* loadDoctorsByName() {
  try {
    if (typeof document !== 'undefined') {
      yield put(updateDoctorsByName([]))
      Toast.loading('loading...')
    }
    const { hosOrgCode, hosDeptCode } = yield select(state => state.doctorsReducer)
    const data = yield call(getDoctorsByName, hosOrgCode, hosDeptCode)
    if (data) {
      yield put(updateDoctorsByName(data))
    }
    if (typeof document !== 'undefined') {
      yield Toast.hide()
    }
  } catch (error) {
    if (error && error.message == CODE.NOT_LOGIN) {
      yield put(authNotLogin())
    } else {
      yield put(authError({errorMsg: error.message}))
    }
  }
}


const getDoctorsByDate = (hosOrgCode, deptCode, toHosDeptCode) => {
  const query = `?hosOrgCode=${hosOrgCode}&hosDeptCode=${deptCode}&topHosDeptCode=${toHosDeptCode}&registerType=1`
  return HttpService.get(`${PATH.queryDoctorsByDate}${query}`)
}

function* loadDoctorsByDate() {
  try {
    if (typeof document !== 'undefined') {
      yield put(updateDoctorsByDate([]))
      Toast.loading('loading...')
    }
    const { hosOrgCode, hosDeptCode, toHosDeptCode } = yield select(state => state.doctorsReducer)
    const data = yield call(getDoctorsByDate, hosOrgCode, hosDeptCode, toHosDeptCode)
    cnsole.log(data)
    if (data) {
      yield put(updateDoctorsByDate(data))
    }
    if (typeof document !== 'undefined') {
      yield Toast.hide()
    }
  } catch (error) {
    if (error && error.message == CODE.NOT_LOGIN) {
      yield put(authNotLogin())
    } else {
      yield put(authError({errorMsg: error.message}))
    }
  }
}

export const doctorsSaga = [
  takeLatest(actionTypes.LOAD_DOCTORS_BYNAME, loadDoctorsByName),
  takeLatest(actionTypes.LOAD_DOCTORS_BYDATE, loadDoctorsByDate)
]
