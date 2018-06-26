import { put, takeLatest, call } from 'redux-saga/effects'
import { actionTypes, updateAccount } from '../../actions/login.action'

import { HttpToastService } from '../../../utilities/httpService'

function* loadLoginSaga() {
  try {
    yield put(updateAccount({username: 'admin', password: '123456'}))
  } catch (err) {
    yield put(updateAccount({username: 'admin', password: '123456'}))
  }
}

function* login(formData) {
  try {
    const res = yield  call(HttpToastService.post, '/api/user/login', formData)
  } catch (err) {

  }
}

export const loginSaga = [
  takeLatest(actionTypes.INIT_ACCOUNT, loadLoginSaga)
]
