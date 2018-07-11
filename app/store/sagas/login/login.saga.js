import { put, takeLatest, call, select } from 'redux-saga/effects'
import Router from 'next/router'
import { Toast } from 'antd-mobile'

import { actionTypes } from '../../actions/login.action'
import { authLogin, getCurrentPage } from '../../actions/global.action'

import { HttpHostService, HttpToastService } from '../../../utilities/httpService'

const PATH = {
  login: '/api/login',
  register: '/api/register',
  getCode: '/api/user/sendValidCode',
  getbackPassword: '/api/user/forgetPassword'
}

const loginService = (data) => {
  return HttpHostService.post(`${PATH.login}`, data)
}

function* login(actions) {
  const loginRes = yield call(loginService, actions.data)
  if (loginRes) {
    yield put(authLogin({accessToken: loginRes.accessToken}))
    yield put(getCurrentPage())
    const { currentPage } = yield select((state) => state.globalReducer)
    yield Router.replace(currentPage)
  }
}

const registerService = (data) => {
  return HttpHostService.post(`${PATH.register}`, data)
}

function* register(actions) {
  const registerRes = yield call(registerService, actions.data)
  if (registerRes) {
    yield put(authLogin({accessToken: registerRes.accessToken}))
    yield put(getCurrentPage())
    const { currentPage } = yield select((state) => state.globalReducer)
    yield Router.replace(currentPage)
  }
}

const getCodeService = (data) => {
  return HttpToastService.post(`${PATH.getCode}`, data)
}

function* getCode(actions) {
  const codeRes = yield call(getCodeService, actions.data)
  if (codeRes) {
    yield Toast.info(codeRes)
  }
}

const getbackPasswordService = (data) => {
  return HttpToastService.post(`${PATH.getbackPassword}`, data, {headers: { version: '2.0' }})
}

function* getbackPassword(actions) {
  const res = yield call(getbackPasswordService, actions.data)
  if (res) {
    Router.push('/resetpwd/success')
  }
}

export const loginSaga = [
  takeLatest(actionTypes.LOGIN, login),
  takeLatest(actionTypes.REGISTER, register),
  takeLatest(actionTypes.GET_CODE, getCode),
  takeLatest(actionTypes.GETBACK_PASSWORD, getbackPassword)
]
