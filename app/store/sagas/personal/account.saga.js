import { put, takeLatest, call } from 'redux-saga/effects'

import { actionTypes, updateAccountInfo, updateAccountList } from '../../actions/personal/account.action'
import { updateState } from '../../actions/global.action'
import { HttpService } from '../../../utilities/httpService'

import * as CODE from '../../../utilities/status-code'

const PATH = {
  getAccountInfo: '/api/user/getPersonalInfo',
  getAccountList: '/api/user/card/list'
}

const getAccountInfo = (accessToken) => {
  return HttpService.get(`${PATH.getAccountInfo}`, {headers: { 'access-token': accessToken}})
}

const getAccountList = (accessToken) => {
  return HttpService.get(`${PATH.getAccountList}`, {headers: { 'access-token': accessToken}})
}

function* loadAccountInfo(actions) {
  try {
    const data = yield call(getAccountInfo, actions.token)
    yield put(updateAccountInfo(data || {}))
  } catch (error) {
    console.log(error.message)
    if (error && error.message == CODE.NOT_LOGIN) {
      yield put(updateState({code: CODE.NOT_LOGIN}))
    } else {
      yield put(updateState({errorMsg: error.message, accessToken: '', weChatId: ''}))
    }
  }
}

function* loadAccountList(actions) {
  try {
    const data = yield call(getAccountList, actions.token)
    yield put(updateAccountList(data || []))
  } catch (error) {
    console.log(error.message)
    if (error && error.message == CODE.NOT_LOGIN) {
      yield put(updateState({code: CODE.NOT_LOGIN}))
    } else {
      yield put(updateState({errorMsg: error.message, accessToken: '', weChatId: ''}))
    }
  }
}

export const accountSaga = [
  takeLatest(actionTypes.INIT_ACCOUNT_INFO, loadAccountInfo),
  takeLatest(actionTypes.LOAD_ACCOUNT_LIST, loadAccountList)
]
