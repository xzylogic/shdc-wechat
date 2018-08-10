import { actionTypes } from '../../actions/personal/balance.action'
import { initialBalanceState } from '../../states/personal/balance.state'

export const balanceReducer = (state = initialBalanceState, action = {}) => {
  switch (action.type) {
    case actionTypes.UPDATE_BALANCE_DETAIL:
      return {
        ...state,
        ...{ balanceDetail: action.data }
      }
    case actionTypes.UPDATE_BALANCE_PARAM:
      return {
        ...state,
        ...{ searchParam: action.data }
      }
    default:
      return state
  }
}

export const balanceState = {
  balanceReducer: initialBalanceState
}
