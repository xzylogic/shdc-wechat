import { put, takeLatest, call, select } from 'redux-saga/effects'

import { actionTypes, updateDepartmentsParent, updateDepartmentsChild, updateToHosDeptCode } from '../../actions/appointment/departments.action'
import { authError, authNotLogin } from '../../actions/global.action'
import { HttpService } from '../../../utilities/httpService'

import { startLoading, endLoading } from '../../../utilities/common'
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
    yield startLoading('Loading')
    yield put(updateDepartmentsParent([]))

    const { hosOrgCode, deptType } = yield select((state) => state.departmentsReducer)
    const data = yield call(getDepartmentsService, hosOrgCode, deptType)
    if (data && data[0] && !data[0].children) {
      yield data[0].children = []
    }
    if (data) {
      yield put(updateDepartmentsParent(data))
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

const getDepartmentsChildService = (hosOrgCode, deptType, parentId) => {
  const query = `?hosOrgCode=${hosOrgCode}&deptType=${deptType}&parentId=${parentId}`
  return HttpService.get(`${PATH.queryDepartmentsChild}${query}`)
}

function* loadDepartmentsChild(actions) {
  try {
    const { hosOrgCode, deptType, departmentsParent } = yield select((state) => state.departmentsReducer)
    yield put(updateToHosDeptCode(actions.parentId))
    if (departmentsParent && departmentsParent[actions.index] && !departmentsParent[actions.index].children) {
      yield startLoading('Loading')
      const data = yield call(getDepartmentsChildService, hosOrgCode, deptType, actions.parentId)
      if (data) {
        yield put(updateDepartmentsChild(data, actions.parentId, actions.index))
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

export const departmentsSaga = [
  takeLatest(actionTypes.LOAD_DEPARTMENTS, loadDepartments),
  takeLatest(actionTypes.LOAD_DEPARTMENTS_CHILD, loadDepartmentsChild)
]
