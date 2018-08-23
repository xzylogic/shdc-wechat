import { put, takeLatest, call, select } from 'redux-saga/effects'

import { actionTypes, updateDoctorDetail, updateAppointmentList } from '../../actions/appointment/doctor.action'
import { modifyDoctorShow, modifyDoctorSchedule } from '../../actions/appointment/doctor.action'
import { authError, authNotLogin } from '../../actions/global.action'
import { HttpService } from '../../../utilities/httpService'

import { startLoading, endLoading } from '../../../utilities/common'
import * as CODE from '../../../utilities/status-code'

const PATH = {
  getDoctorDetail: '/api/doctor/query-doctor',
  getAppointmentList: '/api/schedule/queryDoctorByScheduleDate',
  querySchedule: '/api/schedule/query-number-source'
}

const getDoctorDetailService = (hosOrgCode, hosDoctCode, hosDeptCode, toHosDeptCode) => {
  const query = `hosOrgCode=${hosOrgCode}&hosDoctCode=${hosDoctCode}&hosDeptCode=${hosDeptCode}&topHosDeptCode=${toHosDeptCode}`
  return HttpService.get(PATH.getDoctorDetail, query)
}

function* loadDoctorDetail() {
  try {
    yield startLoading('Loading')
    const { hosOrgCode, hosDoctCode, hosDeptCode, toHosDeptCode } = yield select(data => data.doctorReducer) 
    const data = yield call(getDoctorDetailService, hosOrgCode, hosDoctCode, hosDeptCode, toHosDeptCode)
    if (data) {
      yield put(updateDoctorDetail(data && data[0] || {}))
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

const getAppointmentListService = (hosOrgCode, hosDoctCode, hosDeptCode, toHosDeptCode) => {
  const query = `hosOrgCode=${hosOrgCode}&hosDoctCode=${hosDoctCode}&hosDeptCode=${hosDeptCode}&topHosDeptCode=${toHosDeptCode}&registerType=1`
  return HttpService.get(PATH.getAppointmentList, query)
}

function* loadAppointmentList() {
  try {
    yield startLoading('Loading')
    const { hosOrgCode, hosDoctCode, hosDeptCode, toHosDeptCode } = yield select(data => data.doctorReducer) 
    const data = yield call(getAppointmentListService, hosOrgCode, hosDoctCode, hosDeptCode, toHosDeptCode)
    if (data) {
      yield put(updateAppointmentList(data))
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

const queryScheduleService = (hosOrgCode, scheduleId) => {
  const query = `hosOrgCode=${hosOrgCode}&scheduleId=${scheduleId}`
  return HttpService.get(PATH.querySchedule, query)
}

function* querySchedule(actions) {
  try {
    yield put(modifyDoctorShow(actions.j, actions.k))
    const { hosOrgCode, appointmentList } = yield select(state => state.doctorReducer)
    if (!appointmentList[actions.j]['doctors'][actions.k]['children'] && appointmentList[actions.j]['doctors'][actions.k]['show']) {
      yield startLoading('Loading')
      const data = yield call(queryScheduleService, hosOrgCode, actions.id)
      if (data) {
        yield put(modifyDoctorSchedule(data, actions.j, actions.k))
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

export const doctorSaga = [
  takeLatest(actionTypes.LOAD_DOCTOR_DETAIL, loadDoctorDetail),
  takeLatest(actionTypes.LOAD_APPOINTMENT_LIST, loadAppointmentList),
  takeLatest(actionTypes.LOAD_DOCTOR_SCHEDULE, querySchedule)
]
