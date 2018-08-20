import { put, takeLatest, call, select } from 'redux-saga/effects'

import { actionTypes, updateDoctorsByName, updateDoctorsByDate, modifyDoctorsSchedule, modifyDoctorsSShow, updateDoctorsSearchAction } from '../../actions/appointment/doctors.action'
import { authError, authNotLogin } from '../../actions/global.action'
import { HttpService } from '../../../utilities/httpService'

import { startLoading, endLoading } from '../../../utilities/common'
import * as CODE from '../../../utilities/status-code'

const PATH = {
  queryDoctors: '/api/doctor/query-doctor',
  queryDoctorsByDate: '/api/schedule/queryDoctorsAndScheduleInfoByDate',
  querySchedule: '/api/schedule/query-number-source'
}

const getDoctorsByName = (hosOrgCode, deptCode, toHosDeptCode, doctName) => {
  let query = `?hosOrgCode=${hosOrgCode}&hosDeptCode=${deptCode}&topHosDeptCode=${toHosDeptCode}`
  if (doctName) {
    query += `&doctName=${doctName}`
  }
  return HttpService.get(`${PATH.queryDoctors}${query}`)
}

function* loadDoctorsByName() {
  try {
    yield startLoading('Loading')
    yield put(updateDoctorsByName([]))
    const { hosOrgCode, hosDeptCode, toHosDeptCode } = yield select(state => state.doctorsReducer)
    const data = yield call(getDoctorsByName, hosOrgCode, hosDeptCode, toHosDeptCode)
    if (data) {
      yield put(updateDoctorsByName(data))
      yield endLoading()
    }
    yield endLoading()
  } catch (error) {
    if (error && error.message == CODE.NOT_LOGIN) {
      yield put(authNotLogin())
    } else {
      yield put(authError({errorMsg: error.message}))
    }
  }
}

function* searchDoctors() {
  try {
    yield put(updateDoctorsSearchAction([]))
    const { hosOrgCode, hosDeptCode, toHosDeptCode, searchParam } = yield select(state => state.doctorsReducer)
    if (searchParam) {
      yield startLoading('Loading')
      const data = yield call(getDoctorsByName, hosOrgCode, hosDeptCode, toHosDeptCode, searchParam)
      if (data) {
        yield put(updateDoctorsSearchAction(data))
        yield endLoading()
      }
    }
    yield endLoading()
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
    yield startLoading('Loading')
    yield put(updateDoctorsByDate([]))

    const { hosOrgCode, hosDeptCode, toHosDeptCode } = yield select(state => state.doctorsReducer)
    const data = yield call(getDoctorsByDate, hosOrgCode, hosDeptCode, toHosDeptCode)
    if (data) {
      yield put(updateDoctorsByDate(data))
      yield endLoading()
    }
    yield endLoading()
  } catch (error) {
    if (error && error.message == CODE.NOT_LOGIN) {
      yield put(authNotLogin())
    } else {
      yield put(authError({errorMsg: error.message}))
    }
  }
}

const queryScheduleService = (hosOrgCode, scheduleId) => {
  const query = `?hosOrgCode=${hosOrgCode}&scheduleId=${scheduleId}`
  return HttpService.get(`${PATH.querySchedule}${query}`)
}

function* querySchedule(actions) {
  try {
    yield put(modifyDoctorsSShow(actions.i, actions.j, actions.k))
    const { hosOrgCode, doctorsByDate } = yield select(state => state.doctorsReducer)
    if (!doctorsByDate[actions.i]['doctors'][actions.j]['schedules'][actions.k]['children'] && doctorsByDate[actions.i]['doctors'][actions.j]['schedules'][actions.k]['show']) {
      yield startLoading('Loading')
      const data = yield call(queryScheduleService, hosOrgCode, actions.id)
      if (data) {
        yield put(modifyDoctorsSchedule(data, actions.i, actions.j, actions.k))
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

export const doctorsSaga = [
  takeLatest(actionTypes.LOAD_DOCTORS_BYNAME, loadDoctorsByName),
  takeLatest(actionTypes.LOAD_DOCTORS_BYDATE, loadDoctorsByDate),
  takeLatest(actionTypes.LOAD_SCHEDULE, querySchedule),
  takeLatest(actionTypes.LOAD_DOCTORES_SEARCH, searchDoctors)
]
