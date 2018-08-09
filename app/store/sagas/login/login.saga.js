import { put, takeLatest, call, select } from 'redux-saga/effects'
import Router from 'next/router'
import { Toast } from 'antd-mobile'

import { actionTypes } from '../../actions/login.action'
import { authLogin, authNotLogin, getCurrentPage } from '../../actions/global.action'

import { HttpHostService, HttpService } from '../../../utilities/httpService'
import { startLoading, endLoading } from '../../../utilities/common'

const PATH = {
  login: '/api/login',
  logout: '/api/logout',
  register: '/api/register',
  getCode: '/api/user/sendValidCode',
  getbackPassword: '/api/user/forgetPassword'
}

const loginService = (data) => {
  return HttpHostService.post(`${PATH.login}`, data)
}

function* login(actions) {
  yield startLoading('登录中')
  const loginRes = yield call(loginService, actions.data)
  if (loginRes) {
    yield put(authLogin({accessToken: loginRes.accessToken}))
    yield put(getCurrentPage())
    const { currentPage } = yield select((state) => state.globalReducer)
    yield endLoading()
    yield Router.replace(currentPage)
  }
}

const logoutService = (accessToken) => {
  return HttpHostService.post(`${PATH.logout}`, {accessToken: accessToken})
}

function* logout() {
  const { accessToken, weChatId } = yield select(state=> state.globalReducer)
  if (accessToken) {
    yield startLoading('正在退出')
    const res = yield call(logoutService, accessToken)
    if (res) {
      yield put(authNotLogin({weChatId: weChatId}))
      yield endLoading()
      yield Router.replace('/login')
    }
  } else {
    Toast.info('当前无法退出')
  }
}

const registerService = (data) => {
  return HttpHostService.post(`${PATH.register}`, data)
}

function* register(actions) {
  yield startLoading('注册中')
  const registerRes = yield call(registerService, actions.data)
  if (registerRes) {
    yield put(authLogin({accessToken: registerRes.accessToken}))
    yield put(getCurrentPage())
    const { currentPage } = yield select((state) => state.globalReducer)
    yield endLoading()
    yield Router.replace(currentPage)
  }
}

const getCodeService = (data) => {
  return HttpService.post(`${PATH.getCode}`, data)
}

function* getCode(actions) {
  yield startLoading()
  const codeRes = yield call(getCodeService, actions.data)
  if (codeRes) {
    yield Toast.info(codeRes)
  }
}

const getbackPasswordService = (data) => {
  return HttpService.post(`${PATH.getbackPassword}`, data, {headers: { version: '2.0' }})
}

function* getbackPassword(actions) {
  yield startLoading()
  const res = yield call(getbackPasswordService, actions.data)
  if (res) {
    yield endLoading()
    Router.push('/resetpwd/success')
  }
}

export const loginSaga = [
  takeLatest(actionTypes.LOGIN, login),
  takeLatest(actionTypes.LOGOUT, logout),
  takeLatest(actionTypes.REGISTER, register),
  takeLatest(actionTypes.GET_CODE, getCode),
  takeLatest(actionTypes.GETBACK_PASSWORD, getbackPassword)
]
