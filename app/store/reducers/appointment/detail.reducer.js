import { actionTypes } from '../../actions/appointment/detail.action'
import { initialDetailState } from '../../states/appointment/detail.state'

export const detailReducer = (state = initialDetailState, action = {}) => {
  switch (action.type) {
    case actionTypes.UPDATE_ORDER_INFO: {
      return {
        ...state,
        ...{orderInfo: {...state.orderInfo, ...action.data}}
      }
    }
    default:
      return state
  }
}

export const detailState = {
  detailReducer: initialDetailState
}
