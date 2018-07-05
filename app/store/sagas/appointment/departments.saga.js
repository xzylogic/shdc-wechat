import { put, takeLatest, call } from 'redux-saga/effects'

import { actionTypes, updateDepartmentsParent, updateDepartmentsChild, initCodeAndType } from '../../actions/appointment/departments.action'
import { HttpToastService, HttpService } from '../../../utilities/httpService'

const PATH = {
  queryDepartments: '/api/department/query-parent-and-department',
  queryDepartmentsChild: '/api/department/query-department'
}

const getDepartments = (hosOrgCode, deptType, parentId) => {
  const query = `?hosOrgCode=${hosOrgCode}&deptType=${deptType}`
  if (parentId) {
    query += `&parentId=${parentId}`
  }
  return HttpService.get(`${PATH.queryDepartments}${query}`)
}

const getDepartmentsChild = (hosOrgCode, deptType, parentId) => {
  const query = `?hosOrgCode=${hosOrgCode}&deptType=${deptType}&parentId=${parentId}`
  return HttpToastService.get(`${PATH.queryDepartmentsChild}${query}`)
}

function* loadDepartments(actions) {
  try {
    const data = yield call(getDepartments, actions.hosOrgCode, actions.deptType)
    yield put(initCodeAndType(actions.hosOrgCode, actions.deptType, actions.pageType))
    yield put(updateDepartmentsParent(data || []))
    yield put(updateDepartmentsChild(data && data[0] && data[0].children || []))
  } catch (err) {
    throw new Error(err)
  }
}

function* loadDepartmentsChild(actions) {
  try {
    const data = yield call(getDepartmentsChild, actions.hosOrgCode, actions.deptType, actions.parentId)
    yield put(updateDepartmentsChild(data || []))
  } catch (err) {
    throw new Error(err)
  }
}

export const departmentsSaga = [
  takeLatest(actionTypes.INIT_DEPARTMENTS, loadDepartments),
  takeLatest(actionTypes.LOAD_DEPARTMENTS_CHILD, loadDepartmentsChild)
]
