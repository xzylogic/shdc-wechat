
import { put, takeLatest } from 'redux-saga/effects'
import { actionTypes, updateAccount } from '../../actions/login.action'

function* loadLoginSaga() {
  try {
    yield put(updateAccount({username: 'admin', password: '123456'}))
  } catch (err) {
    yield put(updateAccount({username: 'admin', password: '123456'}))
  }
}

export const loginSaga = [
  takeLatest(actionTypes.INIT_ACCOUNT, loadLoginSaga)
]