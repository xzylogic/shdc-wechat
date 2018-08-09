import { put, takeLatest, call, select } from 'redux-saga/effects'

import { actionTypes, updateMyReportsAction } from '../../actions/personal/reports.action'
import { authNotLogin, authError } from '../../actions/global.action'
import { HttpService } from '../../../utilities/httpService'
import { checkNotNullArr, checkNullArr, startLoading, endLoading } from '../../../utilities/common'
import { loadAccountList } from './account.saga'

import * as CODE from '../../../utilities/status-code'

const PATH = {
  getReports: '/api/report/v1/getRecords'
}

const getMyReportsService = (idno, cardType, cardValue, type, accessToken) => {
  let query = `?idno=${idno}&cardType=${cardType}&cardValue=${cardValue}&type=${type}`
  return HttpService.get(`${PATH.getReports}${query}`, {headers: { 'access-token': accessToken || ''}})
}

function* loadMyReports() {
  try {
    startLoading('Loading')
    const { accessToken } = yield select((state) => state.globalReducer)
    const { searchParam } = yield select((state) => state.reportsReducer)
    const { accountList } = yield select((state) => state.accountReducer)
    if (accountList && checkNullArr(accountList)) {
      yield* loadAccountList() 
    }
    const accountReducer = yield select((state) => state.accountReducer)
    if (accessToken && checkNotNullArr(accountReducer.accountList) && accountReducer.accountList[searchParam]) {
      const search = accountReducer.accountList[searchParam]
      yield put(updateMyReportsAction([], []))

      const dataSurvey = yield call(getMyReportsService, search.cardId, search.medicineCardType || '', search.medicineCardId || '', 'survey', accessToken)
      const dataInspection = yield call(getMyReportsService, search.cardId, search.medicineCardType || '', search.medicineCardId || '', 'inspection', accessToken)
      if (dataSurvey && dataInspection) {
        yield put(updateMyReportsAction(dataSurvey, dataInspection))
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

export const reportsSaga = [
  takeLatest(actionTypes.LOAD_MY_REPORTS, loadMyReports),
]
