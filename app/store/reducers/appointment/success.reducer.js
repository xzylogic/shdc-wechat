import { actionTypes } from '../../actions/appointment/success.action'
import { initialSuccessState } from '../../states/appointment/success.state'

export const successReducer = (state = initialSuccessState, action = {}) => {
  switch (action.type) {
    case actionTypes.UPDATE_SUCCESS_ORDER: {
      return {
        ...state,
        ...{orderDetail: action.data}
      }
    }
    default:
      return state
  }
}

export const successState = {
  successReducer: initialSuccessState
}
