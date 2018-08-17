import { put, takeLatest, call, select } from 'redux-saga/effects'

import { actionTypes, updateBalanceDetailAction } from '../../actions/personal/balance.action'
import { authNotLogin, authError } from '../../actions/global.action'
import { HttpService } from '../../../utilities/httpService'
import { checkNotNullArr, checkNullArr, startLoading, endLoading } from '../../../utilities/common'
import { loadAccountList } from './account.saga'

import * as CODE from '../../../utilities/status-code'

const PATH = {
  getBalance: '/api/user/getBalance'
}

const getBalanceService = (data, accessToken) => {
  let query = ''
  if (data.medicineCardId) {
    query = `?medicineCard=${data.medicineCardId}`
  } else {
    query = `?cardType=${data.cardType}&cardId=${data.cardId}`
  }
  return HttpService.get(`${PATH.getBalance}${query}`, {headers: { 'access-token': accessToken || ''}})
}

function* loadBalanceDetail() {
  try {
    yield startLoading('Loading')
    const { accessToken } = yield select((state) => state.globalReducer)
    const { searchParam } = yield select((state) => state.balanceReducer)
    const { accountList } = yield select((state) => state.accountReducer)
    if (accountList && checkNullArr(accountList)) {
      yield* loadAccountList() 
    }
    const accountReducer = yield select((state) => state.accountReducer)
    if (accessToken && checkNotNullArr(accountReducer.accountList) && accountReducer.accountList[searchParam]) {
      const search = accountReducer.accountList[searchParam]

      const data = yield call(getBalanceService, search, accessToken)
      if (data) {
        yield put(updateBalanceDetailAction(data))
        yield endLoading()
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

export const balanceSaga = [
  takeLatest(actionTypes.LOAD_BALANCE_DETAIL, loadBalanceDetail),
]
