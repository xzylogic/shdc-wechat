import { put, takeLatest, call } from 'redux-saga/effects'
import { Toast } from 'antd-mobile'

import { 
  actionTypes, updateHospitalsAll, updateHospitalsZH, 
  updateHospitalsZY, updateHospitalsZK, updateSearchList 
} from '../../actions/appointment/hospitals.action'
import { authError, authNotLogin } from '../../actions/global.action'
import { HttpService, HttpToastService } from '../../../utilities/httpService'
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
  yield Toast.loading('Loading...', 0)
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
