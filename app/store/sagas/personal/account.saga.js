import { put, takeLatest, call, select, all } from 'redux-saga/effects'
import Router from 'next/router'

import { actionTypes, updateAccountInfo, updateAccountList } from '../../actions/personal/account.action'
import { authNotLogin, authError } from '../../actions/global.action'
import { HttpService, HttpHostService } from '../../../utilities/httpService'

import * as CODE from '../../../utilities/status-code'
import { startLoading, endLoading } from '../../../utilities/common'

const PATH = {
  getAccountInfo: '/api/user/getPersonalInfo',
  getAccountList: '/api/user/card/list',
  resetPassword: '/api/resetPassword',
  familyAdd: '/api/user/card/add'
}

const getAccountInfoService = (accessToken) => {
  return HttpService.get(PATH.getAccountInfo, '', {headers: { 'access-token': accessToken || ''}})
}

function* loadAccountInfo() {
  try {
    const { accessToken } = yield select((state) => state.globalReducer)
    if (accessToken) {
      yield startLoading('Loading')
      const data = yield call(getAccountInfoService, accessToken)
      if (data) {
        yield endLoading()
        yield put(updateAccountInfo(data))
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

const getAccountListService = (accessToken) => {
  return HttpService.get(PATH.getAccountList, '', {headers: { 'access-token': accessToken || ''}})
}

export function* loadAccountList() {
  try {
    const { accessToken } = yield select((state) => state.globalReducer)
    if (accessToken) {
      yield startLoading('Loading')
      const data = yield call(getAccountListService, accessToken)
      if (data) {
        yield endLoading()
        yield put(updateAccountList(data))
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

export function* loadAccount() {
  try {
    const { accessToken } = yield select((state) => state.globalReducer)
    if (accessToken) {
      yield startLoading('Loading')
      const data1 = yield call(getAccountInfoService, accessToken)
      const data2 = yield call(getAccountListService, accessToken)
      if (data1 && data2) {
        yield endLoading()
        yield put(updateAccountInfo(data1))
        yield put(updateAccountList(data2))
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

const familyAddService = (data, accessToken) => {
  return HttpService.post(`${PATH.familyAdd}`, data, {headers: {'access-token':accessToken}})
}

function* familyAdd(actions) {
  try {
    const { accessToken } = yield select((state) => state.globalReducer)
    if (accessToken) {
      yield startLoading()
      const res = yield call(familyAddService, actions.data, accessToken)
      if (res) {
        yield endLoading()
        yield call(loadAccountList)
        yield Router.push(`/personal/mine`)
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

const resetPasswordService = (data, accessToken) => {
  return HttpHostService.post(`${PATH.resetPassword}`, data, {headers: { 'access-token': accessToken}})
}

function* resetPassword(actions) {
  try {
    yield startLoading()
    const { accessToken } = yield select((state) => state.globalReducer)
    const res = yield call(resetPasswordService, actions.data, accessToken)
    if (res) {
      yield endLoading()
      Router.push('/login')
    }
  } catch (error) {
    if (error && error.message == CODE.NOT_LOGIN) {
      yield put(authNotLogin())
    } else {
      yield put(authError({errorMsg: error.message}))
    }
  }
}

export const accountSaga = [
  takeLatest(actionTypes.LOAD_ACCOUNT_INFO, loadAccountInfo),
  takeLatest(actionTypes.LOAD_ACCOUNT_LIST, loadAccountList),
  takeLatest(actionTypes.RESET_PASSWORD, resetPassword),
  takeLatest(actionTypes.FAMILY_ADD, familyAdd),
  takeLatest(actionTypes.LOAD_ACCOUNT, loadAccount),
]
