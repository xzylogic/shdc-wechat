import { put, takeLatest, call } from 'redux-saga/effects'

import { actionTypes, updateDoctorDetail, updateAppointmentList } from '../../actions/appointment/doctor.action'
import { HttpToastService, HttpService } from '../../../utilities/httpService'

const PATH = {
  getDoctorDetail: '/api/doctor/query-doctor',
  getAppointmentList: '/api/schedule/queryDoctorByScheduleDate'
}

const getDoctorDetail = (hosOrgCode, hosDoctCode, hosDeptCode) => {
  const query = `?hosOrgCode=${hosOrgCode}&hosDoctCode=${hosDoctCode}&hosDeptCode=${hosDeptCode}`
  return HttpService.get(`${PATH.getDoctorDetail}${query}`)
}

// function* loadDepartments(actions) {
//   try {
//     const data = yield call(getDepartments, actions.hosOrgCode, actions.deptType)
//     yield put(initCodeAndType(actions.hosOrgCode, actions.deptType, actions.pageType))
//     yield put(updateDepartmentsParent(data || []))
//     yield put(updateDepartmentsChild(data && data[0] && data[0].children || []))
//   } catch (err) {
//     throw new Error(err)
//   }
// }

// function* loadDepartmentsChild(actions) {
//   try {
//     const data = yield call(getDepartmentsChild, actions.hosOrgCode, actions.deptType, actions.parentId)
//     yield put(updateDepartmentsChild(data || []))
//   } catch (err) {
//     throw new Error(err)
//   }
// }

export const doctorSaga = [
  // takeLatest(actionTypes.INIT_DEPARTMENTS, loadDepartments),
  // takeLatest(actionTypes.LOAD_DEPARTMENTS_CHILD, loadDepartmentsChild)
]
