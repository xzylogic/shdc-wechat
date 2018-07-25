import { put, takeLatest, call, select } from 'redux-saga/effects'
import { Toast } from 'antd-mobile'

import { actionTypes, updateConsultationList } from '../../actions/appointment/consultation.action'
import { authError, authNotLogin } from '../../actions/global.action'
import { HttpService } from '../../../utilities/httpService'
import * as CODE from '../../../utilities/status-code'

const PATH = {
  queryConsultations: '/api/schedule/queryDoctorByScheduleDate'
}

const getConsultationListService = (hosOrgCode, hosDeptCode, toHosDeptCode, registerType) => {
  const query = `?hosOrgCode=${hosOrgCode}&hosDeptCode=${hosDeptCode}&topHosDeptCode=${toHosDeptCode}&registerType=${registerType}`
  return HttpService.get(`${PATH.queryConsultations}${query}`)
}

function* loadConsultationList() {
  try {
    if (typeof document !== 'undefined') {
      yield put(updateConsultationList([]))
      Toast.loading('loading')
    }
    const { hosOrgCode, hosDeptCode, toHosDeptCode, pageType } = yield select((state) => state.consultationReducer)
    const data = yield call(getConsultationListService, hosOrgCode, hosDeptCode, toHosDeptCode, pageType)
    if (data) {
      yield put(updateConsultationList(data))
    }
    if (typeof document !== 'undefined') {
      yield Toast.hide()
    }
  } catch (error) {
    console.log(error)
    if (error && error.message == CODE.NOT_LOGIN) {
      yield put(authNotLogin())
    } else {
      yield put(authError({errorMsg: error.message}))
    }
  }
}

export const consultationSaga = [
  takeLatest(actionTypes.LOAD_CONSULTATION_LIST, loadConsultationList)
]
