import { actionTypes } from '../../actions/login.action'
import { initialLoginState } from '../../states/login.state'

export const loginReducer = (state = initialLoginState, action = {}) => {
  switch (action.type) {
    case actionTypes.UPDATE_CODE:
      return {
        ...state,
        ...{ code: action.data }
      }
    default:
      return state
  }
}

export const loginState = {
  loginReducer: initialLoginState
}
