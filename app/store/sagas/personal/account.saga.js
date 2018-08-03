import { put, takeLatest, call, select } from 'redux-saga/effects'
import Router from 'next/router'

import { actionTypes, updateAccountInfo, updateAccountList, loadAccountListAction } from '../../actions/personal/account.action'
import { authNotLogin, authError } from '../../actions/global.action'
import { HttpService, HttpToastService } from '../../../utilities/httpService'

import * as CODE from '../../../utilities/status-code'

const PATH = {
  getAccountInfo: '/api/user/getPersonalInfo',
  getAccountList: '/api/user/card/list',
  resetPassword: '/api/user/resetPassword',
  familyAdd: '/api/user/card/add'
}

const getAccountInfoService = (accessToken) => {
  return HttpService.get(`${PATH.getAccountInfo}`, {headers: { 'access-token': accessToken || ''}})
}

function* loadAccountInfo() {
  try {
    const { accessToken } = yield select((state) => state.globalReducer)
    const data = yield call(getAccountInfoService, accessToken)
    if (data) {
      yield put(updateAccountInfo(data))
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
  return HttpService.get(`${PATH.getAccountList}`, {headers: { 'access-token': accessToken || ''}})
}

function* loadAccountList() {
  try {
    const { accessToken } = yield select((state) => state.globalReducer)
    const data = yield call(getAccountListService, accessToken)
    if (data) {
      yield put(updateAccountList(data))
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
  HttpToastService.post(`${PATH.familyAdd}`, data, {headers: {'access-token':accessToken}})
}

function* familyAdd(actions) {
  const { accessToken } = yield select((state) => state.globalReducer)
  const res = yield call(familyAddService, actions.data, accessToken)
  if (res) {
    yield put(loadAccountListAction())
    yield Router.push(`/personal/mine`)
  }
}

const resetPasswordService = (data, accessToken) => {
  return HttpToastService.post(`${PATH.resetPassword}`, data, {headers: { 'access-token': accessToken}})
}

function* resetPassword(actions) {
  const { accessToken } = yield select((state) => state.globalReducer)
  const res = yield call(resetPasswordService, actions.data, accessToken)
  if (res) {
    Router.push('/login')
  }
}

export const accountSaga = [
  takeLatest(actionTypes.LOAD_ACCOUNT_INFO, loadAccountInfo),
  takeLatest(actionTypes.LOAD_ACCOUNT_LIST, loadAccountList),
  takeLatest(actionTypes.RESET_PASSWORD, resetPassword),
  takeLatest(actionTypes.FAMILY_ADD, familyAdd)
]
