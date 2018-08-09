import { put, takeLatest, call, select } from 'redux-saga/effects'

import { actionTypes, updateConsultationList, modifyConsultationShow, modifyConsultationSchedule } from '../../actions/appointment/consultation.action'
import { authNotLogin, authError } from '../../actions/global.action'
import { HttpService } from '../../../utilities/httpService'

import * as CODE from '../../../utilities/status-code'
import { startLoading, endLoading } from '../../../utilities/common'

const PATH = {
  queryConsultations: '/api/schedule/queryDoctorByScheduleDate',
  querySchedule: '/api/schedule/query-number-source'
}

const getConsultationListService = (hosOrgCode, hosDeptCode, toHosDeptCode, registerType) => {
  const query = `?hosOrgCode=${hosOrgCode}&hosDeptCode=${hosDeptCode}&topHosDeptCode=${toHosDeptCode}&registerType=${registerType}`
  return HttpService.get(`${PATH.queryConsultations}${query}`)
}

function* loadConsultationList() {
  try {
    yield startLoading('Loading')
    yield put(updateConsultationList([]))

    const { hosOrgCode, hosDeptCode, toHosDeptCode, pageType } = yield select((state) => state.consultationReducer)
    const data = yield call(getConsultationListService, hosOrgCode, hosDeptCode, toHosDeptCode, pageType)
    if (data) {
      yield put(updateConsultationList(data))
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

const queryScheduleService = (hosOrgCode, scheduleId) => {
  const query = `?hosOrgCode=${hosOrgCode}&scheduleId=${scheduleId}`
  return HttpService.get(`${PATH.querySchedule}${query}`)
}

function* querySchedule(actions) {
  try {
    yield put(modifyConsultationShow(actions.j, actions.k))
    const { hosOrgCode, consultationList } = yield select(state => state.consultationReducer)
    if (!consultationList[actions.j]['doctors'][actions.k]['children'] && consultationList[actions.j]['doctors'][actions.k]['show']) {
      yield startLoading('Loading')
      const data = yield call(queryScheduleService, hosOrgCode, actions.id)
      if (data) {
        yield put(modifyConsultationSchedule(data, actions.j, actions.k))
        yield endLoading()
      }
    }
  } catch(error) {
    if (error && error.message == CODE.NOT_LOGIN) {
      yield put(authNotLogin())
    } else {
      yield put(authError({errorMsg: error.message}))
    }
  }
}

export const consultationSaga = [
  takeLatest(actionTypes.LOAD_CONSULTATION_LIST, loadConsultationList),
  takeLatest(actionTypes.LOAD_CONSULTATION_SCHEDULE, querySchedule)
]
