import { put, takeLatest, call, select } from 'redux-saga/effects'
import { Toast } from 'antd-mobile'

import { actionTypes, updateDepartmentsParent, updateDepartmentsChild, initCodeAndType } from '../../actions/appointment/departments.action'
import { authError, authNotLogin } from '../../actions/global.action'
import { HttpToastService, HttpService } from '../../../utilities/httpService'
import * as CODE from '../../../utilities/status-code'

const PATH = {
  queryDepartments: '/api/department/query-parent-and-department',
  queryDepartmentsChild: '/api/department/query-department'
}

const getDepartmentsService = (hosOrgCode, deptType, parentId) => {
  const query = `?hosOrgCode=${hosOrgCode}&deptType=${deptType}`
  if (parentId) {
    query += `&parentId=${parentId}`
  }
  return HttpService.get(`${PATH.queryDepartments}${query}`)
}

function* loadDepartments() {
  try {
    const { hosOrgCode, deptType } = yield select((state) => state.departmentsReducer)
    const data = yield call(getDepartmentsService, hosOrgCode, deptType)
    yield put(updateDepartmentsParent(data))
    yield put(updateDepartmentsChild(data && data[0] && data[0].children || []))
  } catch (error) {
    if (error && error.message == CODE.NOT_LOGIN) {
      yield put(authNotLogin())
    } else {
      yield put(authError({errorMsg: error.message}))
    }
  }
}

const getDepartmentsChildService = (hosOrgCode, deptType, parentId) => {
  const query = `?hosOrgCode=${hosOrgCode}&deptType=${deptType}&parentId=${parentId}`
  return HttpToastService.get(`${PATH.queryDepartmentsChild}${query}`)
}

function* loadDepartmentsChild(actions) {
  yield Toast.loading('Loading...')
  const { hosOrgCode, deptType } = yield select((state) => state.departmentsReducer)
  const data = yield call(getDepartmentsChildService, hosOrgCode, deptType, actions.data)
  if (data) {
    yield put(updateDepartmentsChild(data))
    yield Toast.hide()
  }  
}

export const departmentsSaga = [
  takeLatest(actionTypes.LOAD_DEPARTMENTS, loadDepartments),
  takeLatest(actionTypes.LOAD_DEPARTMENTS_CHILD, loadDepartmentsChild)
]
