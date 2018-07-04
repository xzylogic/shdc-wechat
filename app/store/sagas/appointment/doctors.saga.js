import { put, takeLatest, call } from 'redux-saga/effects'

import { actionTypes, updateDoctorsByDate, updateDoctorsByName, initDoctorsCode} from '../../actions/doctors.action'
import { HttpToastService, HttpService } from '../../../utilities/httpService'

const PATH = {
  queryDoctors: '/api/doctor/query-doctor',
  queryDoctorsByDate: '/api/department/query-department'
}

const getDoctors = (hosOrgCode, deptCode) => {
  const query = `?hosOrgCode=${hosOrgCode}&hosDeptCode=${deptCode}`
  return HttpService.get(`${PATH.queryDoctors}${query}`)
}

// const getDepartmentsChild = (hosOrgCode, deptType, parentId) => {
//   const query = `?hosOrgCode=${hosOrgCode}&deptType=${deptType}&parentId=${parentId}`
//   return HttpToastService.get(`${PATH.queryDepartmentsChild}${query}`)
// }

function* loadDoctors(actions) {
  try {
    const data = yield call(getDoctors, actions.hosOrgCode, actions.deptCode)
    yield put(initDoctorsCode(actions.hosOrgCode, actions.deptCode))
    yield put(updateDoctorsByName(data || []))
  } catch (err) {
    throw new Error(err)
  }
}

// function* loadDoctorsByDate(actions) {
//   try {
//     const data = yield call(getDepartmentsChild, actions.hosOrgCode, actions.deptType, actions.parentId)
//     yield put(updateDoctorsByName(data || []))
//   } catch (err) {
//     throw new Error(err)
//   }
// }

export const doctorsSaga = [
  takeLatest(actionTypes.INIT_DOCTORS, loadDoctors),
  // takeLatest(actionTypes.LOAD_DOCTORS_BYDATE, loadDoctorsByDate)
]
