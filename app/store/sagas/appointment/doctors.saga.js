import { put, takeLatest, call, select } from 'redux-saga/effects'
import { Toast } from 'antd-mobile'

import { actionTypes, updateDoctorsByName, updateDoctorsByDate, modifyDoctorsSchedule, modifyDoctorsSShow } from '../../actions/appointment/doctors.action'
import { authError, authNotLogin } from '../../actions/global.action'
import { HttpService } from '../../../utilities/httpService'
import * as CODE from '../../../utilities/status-code'

const PATH = {
  queryDoctors: '/api/doctor/query-doctor',
  queryDoctorsByDate: '/api/schedule/queryDoctorsAndScheduleInfoByDate',
  querySchedule: '/api/schedule/query-number-source'
}

const getDoctorsByName = (hosOrgCode, deptCode, toHosDeptCode) => {
  const query = `?hosOrgCode=${hosOrgCode}&hosDeptCode=${deptCode}&topHosDeptCode=${toHosDeptCode}`
  return HttpService.get(`${PATH.queryDoctors}${query}`)
}

function* loadDoctorsByName() {
  try {
    if (typeof document !== 'undefined') {
      yield put(updateDoctorsByName([]))
      yield Toast.loading('loading...', 0)
    }
    const { hosOrgCode, hosDeptCode, toHosDeptCode } = yield select(state => state.doctorsReducer)
    const data = yield call(getDoctorsByName, hosOrgCode, hosDeptCode, toHosDeptCode)
    if (data) {
      yield put(updateDoctorsByName(data))
    }
    if (typeof document !== 'undefined') {
      yield Toast.hide()
    }
  } catch (error) {
    console.log(error)
    // if (error && error.message == CODE.NOT_LOGIN) {
    //   yield put(authNotLogin())
    // } else {
    //   yield put(authError({errorMsg: error.message}))
    // }
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
      yield Toast.loading('loading...')
    }
    const { hosOrgCode, hosDeptCode, toHosDeptCode } = yield select(state => state.doctorsReducer)
    const data = yield call(getDoctorsByDate, hosOrgCode, hosDeptCode, toHosDeptCode)
    if (data) {
      yield put(updateDoctorsByDate(data))
    }
    if (typeof document !== 'undefined') {
      yield Toast.hide()
    }
  } catch (error) {
    console.log(error)
    // if (error && error.message == CODE.NOT_LOGIN) {
    //   yield put(authNotLogin())
    // } else {
    //   yield put(authError({errorMsg: error.message}))
    // }
  }
}

const queryScheduleService = (hosOrgCode, scheduleId) => {
  const query = `?hosOrgCode=${hosOrgCode}&scheduleId=${scheduleId}`
  return HttpService.get(`${PATH.querySchedule}${query}`)
}

function* querySchedule(actions) {
  yield put(modifyDoctorsSShow(actions.i, actions.j, actions.k))
  const { hosOrgCode, doctorsByDate } = yield select(state => state.doctorsReducer)
  if(!doctorsByDate[actions.i]['doctors'][actions.j]['schedules'][actions.k]['children'] && doctorsByDate[actions.i]['doctors'][actions.j]['schedules'][actions.k]['show']) {
    yield Toast.loading('loading...', 0)
    const data = yield call(queryScheduleService, hosOrgCode, actions.id)
    if (data) {
      yield put(modifyDoctorsSchedule(data, actions.i, actions.j, actions.k))
      yield Toast.hide()
    }
  }
}

export const doctorsSaga = [
  takeLatest(actionTypes.LOAD_DOCTORS_BYNAME, loadDoctorsByName),
  takeLatest(actionTypes.LOAD_DOCTORS_BYDATE, loadDoctorsByDate),
  takeLatest(actionTypes.LOAD_SCHEDULE, querySchedule)
]
