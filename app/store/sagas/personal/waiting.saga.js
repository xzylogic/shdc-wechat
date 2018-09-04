import { put, takeLatest, call, select } from 'redux-saga/effects'
import { Toast } from 'antd-mobile'

import { actionTypes, updateWaitingHospitalsAction, updateWaitingMineAction, updateWaitingDepartmentsAction, updateWaitingContentAction } from '../../actions/personal/waiting.action'
import { authNotLogin, authError } from '../../actions/global.action'
import { HttpService } from '../../../utilities/httpService'
import { startLoading, endLoading, checkNotNullArr, checkNullArr } from '../../../utilities/common'

import * as CODE from '../../../utilities/status-code'

const PATH = {
  getHospitals: '/api/queue/getHospitals',
  getWaitingMine: '/api/queue/v1/mine',
  getDepartments: '/api/queue/getDepartments',
  getDetail: '/api/queue/chose/departmentDetail'
}

const getHospitalsService = (accessToken, name) => {
  let query = ''
  if (name) {
    query = `name=${name}`
  }
  return HttpService.get(PATH.getHospitals, query, {headers: { 'access-token': accessToken || ''}})
}

function* loadWaitingHospitals() {
  try {
    yield startLoading('加载中')
    const { accessToken } = yield select((state) => state.globalReducer)
    const { hospitalParam } = yield select((state) => state.waitingReducer)
    
    if (accessToken) {
      const data = yield call(getHospitalsService, accessToken, hospitalParam)
      if (data) {
        yield put(updateWaitingHospitalsAction(data))
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

const getWaitingMineService = (accessToken, hosOrgCode, medicineCardType, medicineCardId) => {
  const query = `hospitalCode=${hosOrgCode}&medicineCardType=${medicineCardType}&medicineCardId=${medicineCardId}`
  return HttpService.get(PATH.getWaitingMine, query, {headers: {'access-token': accessToken}})
}

function* loadWaitingMine(actions) {
  try {
    yield startLoading('加载中')
    const { accessToken } = yield select((state) => state.globalReducer)
    const { waitingMineParam } = yield select((state) => state.waitingReducer)
    const { accountList } = yield select((state) => state.accountReducer)
    if (accountList && checkNullArr(accountList)) {
      yield call(loadAccountList)
    }
    const accountReducer = yield select((state) => state.accountReducer)
    if (actions.hosOrgCode && accessToken && checkNotNullArr(accountReducer.accountList) && accountReducer.accountList[waitingMineParam]) {
      const search = accountReducer.accountList[waitingMineParam]

      const data = yield call(getWaitingMineService, accessToken, actions.hosOrgCode, search.medicineCardType, search.medicineCardTypeId)
      if (data) {
        yield put(updateWaitingMineAction(data))
        yield endLoading()
      }
    } else {
      if (typeof window !== 'undefined') {
        Toast.info('查询错误')
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

const getDepartmentsService = (accessToken, hosOrgCode, name) => {
  let query = `hospitalCode=${hosOrgCode}`
  if (name) {
    query += `&deptName=${name}`
  }
  return HttpService.get(PATH.getDepartments, query, {headers: {'access-token': accessToken}})
}

function* loadDepartments() {
  try {
    const { accessToken, query } = yield select((state) => state.globalReducer)
    const { departmentParam } = yield select((state) => state.waitingReducer)
    yield put(updateWaitingDepartmentsAction([]))
    
    if (accessToken && query.hosOrgCode) {
      yield startLoading('加载中')
      const data = yield call(getDepartmentsService, accessToken, query.hosOrgCode, departmentParam)
      if (data) {
        yield put(updateWaitingDepartmentsAction(data))
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

const getDetailService = (accessToken, hosOrgCode, hosDeptCode) => {
  const query = `hospitalCode=${hosOrgCode}&deptCode=${hosDeptCode}`
  return HttpService.get(PATH.getDetail, query, {headers: {'access-token': accessToken}})
}

function* loadDetail() {
  try {
    const { accessToken, query } = yield select((state) => state.globalReducer)
    yield put(updateWaitingContentAction(''))

    if (accessToken && query.hosOrgCode && query.hosDeptCode) {
      yield startLoading('加载中')
      const data = yield call(getDetailService, accessToken, query.hosOrgCode, query.hosDeptCode)
      if (data) {
        yield put(updateWaitingContentAction(data))
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

export const waitingSaga = [
  takeLatest(actionTypes.LOAD_WAITING_HOSPITALS, loadWaitingHospitals),
  takeLatest(actionTypes.LOAD_WAITING_MINE, loadWaitingMine),
  takeLatest(actionTypes.LOAD_WAITING_DEPARTMENTS, loadDepartments),
  takeLatest(actionTypes.LOAD_WAITING_CONTENT, loadDetail),
]
