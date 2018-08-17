import { actionTypes } from '../../actions/personal/waiting.action'
import { initialWaitingState } from '../../states/personal/waiting.state'

export const waitingReducer = (state = initialWaitingState, action = {}) => {
  switch (action.type) {
    case actionTypes.UPDATE_WAITING_PAGETYPE:
      return {
        ...state,
        ...{ pageType: action.data }
      }
    case actionTypes.UPDATE_WAITING_HOSPITALS:
      return {
        ...state,
        ...{ waitingHospitals: action.data }
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
    case actionTypes.UPDATE_WAITING_MINE:
      return {
        ...state,
        ...{ waitingMine: action.data }
      }
    case actionTypes.UPDATE_WAITING_MINE_PARAM:
      return {
        ...state,
        ...{ waitingMineParam: action.data }
      }
    case actionTypes.UPDATE_WAITING_DEPARTMENTS:
      return {
        ...state,
        ...{ waitingDepartments: action.data }
      }
    case actionTypes.UPDATE_WAITING_DEPARTMENTS_PARAM:
      return {
        ...state,
        ...{ departmentParam: action.data }
      }
    case actionTypes.UPDATE_WAITING_CONTENT:
      return {
        ...state,
        ...{ waitingContent: action.data }
      }
    default:
      return state
  }
}

export const waitingState = {
  waitingReducer: initialWaitingState
}
