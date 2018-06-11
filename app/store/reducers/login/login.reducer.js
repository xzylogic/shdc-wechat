import { actionTypes } from '../../actions/login.action'
import { initialLoginState } from '../../states/login.state'

export const loginReducer = (state = initialLoginState, action = {}) => {
  switch (action.type) {
    case actionTypes.UPDATE_ACCOUNT:
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}

export const loginState = {
  loginReducer: initialLoginState
}
