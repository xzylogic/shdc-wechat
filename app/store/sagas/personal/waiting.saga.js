import { put, takeLatest, call, select } from 'redux-saga/effects'

import { actionTypes, updateWaitingHospitalsAction } from '../../actions/personal/waiting.action'
import { authNotLogin, authError } from '../../actions/global.action'
import { HttpService } from '../../../utilities/httpService'
import { startLoading, endLoading } from '../../../utilities/common'

import * as CODE from '../../../utilities/status-code'

const PATH = {
  getHospitals: '/api/queue/getHospitals'
}

const getHospitals = (accessToken, name) => {
  let query
  if (name) {
    query = `?name=${name}`
  }
  return HttpService.get(`${PATH.getHospitals}${query ? query : ''}`, {headers: { 'access-token': accessToken || ''}})
}

function* loadWaitingHospitals() {
  try {
    startLoading('Loading')
    const { accessToken } = yield select((state) => state.globalReducer)
    const { hospitalParam } = yield select((state) => state.waitingReducer)
    
    if (accessToken) {
      const data = yield call(getHospitals, accessToken, hospitalParam)
      if (data) {
        yield put(updateWaitingHospitalsAction(data))
        endLoading()
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
  takeLatest(actionTypes.LOAD_WAITING_HOSPITALS, loadWaitingHospitals)
]
