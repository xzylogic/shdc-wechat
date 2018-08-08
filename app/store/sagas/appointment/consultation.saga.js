import { put, takeLatest, call, select } from 'redux-saga/effects'
import { Toast } from 'antd-mobile'

import { actionTypes, updateConsultationList, modifyConsultationShow, modifyConsultationSchedule } from '../../actions/appointment/consultation.action'
import { HttpService } from '../../../utilities/httpService'

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
    if (typeof document !== 'undefined') {
      yield put(updateConsultationList([]))
      Toast.loading('loading', 0)
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
  }
}

const queryScheduleService = (hosOrgCode, scheduleId) => {
  const query = `?hosOrgCode=${hosOrgCode}&scheduleId=${scheduleId}`
  return HttpService.get(`${PATH.querySchedule}${query}`)
}

function* querySchedule(actions) {
  yield put(modifyConsultationShow(actions.j, actions.k))
  const { hosOrgCode, consultationList } = yield select(state => state.consultationReducer)
  if(!consultationList[actions.j]['doctors'][actions.k]['children'] && consultationList[actions.j]['doctors'][actions.k]['show']) {
    yield Toast.loading('loading...', 0)
    const data = yield call(queryScheduleService, hosOrgCode, actions.id)
    if (data) {
      yield put(modifyConsultationSchedule(data, actions.j, actions.k))
      yield Toast.hide()
    }
  }
}

export const consultationSaga = [
  takeLatest(actionTypes.LOAD_CONSULTATION_LIST, loadConsultationList),
  takeLatest(actionTypes.LOAD_CONSULTATION_SCHEDULE, querySchedule)
]
