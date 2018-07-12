import { actionTypes } from '../../actions/appointment/hospitals.action'
import { initialHospitalsState } from '../../states/appointment/hospitals.state'

export const hospitalsReducer = (state = initialHospitalsState, action = {}) => {
  switch (action.type) {
    case actionTypes.UPDATE_TAB: 
      return {
        ...state,
        ...{ tab: action.data }
      }
    case actionTypes.UPDATE_SEARCH_PARAM: 
      return {
        ...state,
        ...{ searchParam: action.data }
      }
    case actionTypes.UPDATE_SEARCH_LIST: 
      return {
        ...state,
        ...{ hospitalsSearch: action.data }
      }
    case actionTypes.UPDATE_HOSPITALS:
      return {
        ...state,
        ...{ hospitalsAll: action.data[0] },
        ...{ hospitalsZH: action.data[1] },
        ...{ hospitalsZY: action.data[2] },
        ...{ hospitalsZK: action.data[3] },
      }
    default:
      return state
  }
}

export const hospitalsState = {
  hospitalsReducer: initialHospitalsState
}
