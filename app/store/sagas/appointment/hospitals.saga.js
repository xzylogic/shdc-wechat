import { put, takeLatest, call } from 'redux-saga/effects'

import { 
  actionTypes, updateHospitalsAll, updateHospitalsZH, 
  updateHospitalsZY, updateHospitalsZK, updateSearchList 
} from '../../actions/appointment/hospitals.action'
import { authError, authNotLogin } from '../../actions/global.action'
import { HttpService } from '../../../utilities/httpService'

import { startLoading, endLoading } from '../../../utilities/common'
import * as CODE from '../../../utilities/status-code'

const PATH = {
  queryHospitals: '/api/hospital/query_hospital',
  querySearch: '/api/search/search-function'
}

const getHospitalsService = (cityCode) => {
  let query = ''
  if (cityCode) {
    query += `?cityCode=${cityCode}`
  }
  return HttpService.get(`${PATH.queryHospitals}${query}`)
}

function* loadHospitals() {
  try {
    yield startLoading('Loading')
    const [ dataAll, dataZH, dataZY, dataZK] = yield [
      call(getHospitalsService),
      call(getHospitalsService, 'zhyy'),
      call(getHospitalsService, 'zyyy'),
      call(getHospitalsService, 'zkyy')
    ]
    if (dataAll && dataZH && dataZY && dataZK) {
      yield [
        put(updateHospitalsAll(dataAll)),
        put(updateHospitalsZH(dataZH)),
        put(updateHospitalsZY(dataZY)),
        put(updateHospitalsZK(dataZK)),
      ]
      yield endLoading()
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
  return HttpService.get(`${PATH.querySearch}?searchParams=${data}`)
}

function* loadSearch(actions) {
  try {
    yield startLoading('Loading')
    const data = yield call(querySearchService, actions.data)
    if (data) {
      yield put(updateSearchList(data))
      yield endLoading()
    }
  } catch (error) {
    if (error && error.message == CODE.NOT_LOGIN) {
      yield put(authNotLogin())
    } else {
      yield put(authError({errorMsg: error.message}))
    }
  }
}

export const hospitalsSaga = [
  takeLatest(actionTypes.LOAD_HOSPITALS, loadHospitals),
  takeLatest(actionTypes.LOAD_SEARCH, loadSearch)
]
