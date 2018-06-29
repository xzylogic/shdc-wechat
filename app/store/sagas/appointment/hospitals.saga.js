import { put, takeLatest, call } from 'redux-saga/effects'

import { actionTypes, updateHospitals } from '../../actions/hospitals.action'
import { HttpToastService, HttpService } from '../../../utilities/httpService'

const PATH = {
  queryHospitals: '/api/hospital/query_hospital'
}

const getHospitals = () => {
  const getHospitalsAll = HttpService.get(`${PATH.queryHospitals}`)
  const getHospitalsZH = HttpService.get(`${PATH.queryHospitals}?cityCode=zhyy`)
  const getHospitalsZY = HttpService.get(`${PATH.queryHospitals}?cityCode=zyyy`)
  const getHospitalsZK = HttpService.get(`${PATH.queryHospitals}?cityCode=zkyy`)
  return Promise.all([getHospitalsAll, getHospitalsZH, getHospitalsZY, getHospitalsZK])
}

function* loadHospitals() {
  try {
    console.log('loadHospitals')
    const data = yield call(getHospitals)
    yield console.log(data)
    yield put(updateHospitals(data))
  } catch (err) {
    throw new Error(err)
  }
}

export const hospitalsSaga = [
  takeLatest(actionTypes.INIT_HOSPITALS, loadHospitals)
]
