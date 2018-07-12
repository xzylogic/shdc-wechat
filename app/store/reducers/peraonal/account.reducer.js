import { actionTypes } from '../../actions/personal/account.action'
import { initialAccountState } from '../../states/personal/account.state'

export const accountReducer = (state = initialAccountState, action = {}) => {
  switch (action.type) {
    case actionTypes.UPDATE_ACCOUNT_INFO:
      return {
        ...state,
        ...{ accountInfo: action.data }
      }
    case actionTypes.UPDATE_ACCOUNT_LIST:
      return {
        ...state,
        ...{ accountList: action.data }
      }
    case actionTypes.UPDATE_ACCOUNT_DETAIL:
      return {
        ...state,
        ...{ accountDetail: action.data }
      }
    default:
      return state
  }
}

export const accountState = {
  accountReducer: initialAccountState
}
