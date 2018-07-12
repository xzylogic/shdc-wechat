import { put, takeLatest, call } from 'redux-saga/effects'
import { Toast } from 'antd-mobile'

import { actionTypes, updateHospitals, updateSearchList } from '../../actions/appointment/hospitals.action'
import { authError, authNotLogin } from '../../actions/global.action'
import { HttpService, HttpToastService } from '../../../utilities/httpService'
import * as CODE from '../../../utilities/status-code'

const PATH = {
  queryHospitals: '/api/hospital/query_hospital',
  querySearch: '/api/search/search-function'
}

const getHospitalsService = () => {
  const getHospitalsAll = HttpService.get(`${PATH.queryHospitals}`)
  const getHospitalsZH = HttpService.get(`${PATH.queryHospitals}?cityCode=zhyy`)
  const getHospitalsZY = HttpService.get(`${PATH.queryHospitals}?cityCode=zyyy`)
  const getHospitalsZK = HttpService.get(`${PATH.queryHospitals}?cityCode=zkyy`)
  return Promise.all([getHospitalsAll, getHospitalsZH, getHospitalsZY, getHospitalsZK])
}

function* loadHospitals() {
  try {
    const data = yield call(getHospitalsService)
    if (data) {
      yield put(updateHospitals(data))
    }
  } catch (error) {
    if (error && error.message == CODE.NOT_LOGIN) {
      yield put(authNotLogin())
    } else {
      yield put(authError({errorMsg: error.message}))
    }
  }
}

const querySearchService = (data) => {
  return HttpToastService.get(`${PATH.querySearch}?searchParams=${data}`)
}

function* loadSearch(actions) {
  yield Toast.loading('Loading...')
  const data = yield call(querySearchService, actions.data)
  if (data) {
    yield put(updateSearchList(data))
    yield Toast.hide()
  }
}

export const hospitalsSaga = [
  takeLatest(actionTypes.LOAD_HOSPITALS, loadHospitals),
  takeLatest(actionTypes.LOAD_SEARCH, loadSearch)
]
