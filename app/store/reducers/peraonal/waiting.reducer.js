import { actionTypes } from '../../actions/personal/waiting.action'
import { initialWaitingState } from '../../states/personal/waiting.state'

export const waitingReducer = (state = initialWaitingState, action = {}) => {
  switch (action.type) {
    case actionTypes.UPDATE_WAITING_HOSPITALS:
      return {
        ...state,
        ...{ waitingHospitals: action.data }
      }
    case actionTypes.UPDATE_WAITING_HOSPITALS_SEARCH:
      return {
        ...state,
        ...{ waitingSearchHospitals: action.data }
      }
    case actionTypes.UPDATE_WAITING_HOSPITALS_PARAM:
      return {
        ...state,
        ...{ hospitalParam: action.data }
      }
    case actionTypes.UPDATE_WAITING_HOSPITALS_TAB:
      return {
        ...state,
        ...{ hospitalTab: action.data }
      }
    case actionTypes.UPDATE_WAITING_PAGETYPE:
      return {
        ...state,
        ...{ pageType: action.data }
      }
    default:
      return state
  }
}

export const waitingState = {
  waitingReducer: initialWaitingState
}
