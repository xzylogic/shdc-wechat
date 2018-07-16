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
    case actionTypes.UPDATE_HOSPITALS_ALL:
      let dataAll = []
      if (action.data && Array.isArray(action.data)) {
        dataAll = action.data
      }
      return {
        ...state,
        ...{ hospitalsAll: dataAll }
      }
    case actionTypes.UPDATE_HOSPITALS_ZH:
      let dataZH = []
      if (action.data && Array.isArray(action.data)) {
        dataZH = action.data
      }
      return {
        ...state,
        ...{ hospitalsZH: dataZH }
      }
    case actionTypes.UPDATE_HOSPITALS_ZY:
      let dataZY = []
      if (action.data && Array.isArray(action.data)) {
        dataZY = action.data
      }
      return {
        ...state,
        ...{ hospitalsZY: dataZY }
      }
    case actionTypes.UPDATE_HOSPITALS_ZK:
      let dataZK = []
      if (action.data && Array.isArray(action.data)) {
        dataZK = action.data
      }
      return {
        ...state,
        ...{ hospitalsZK: dataZK }
      }
    default:
      return state
  }
}

export const hospitalsState = {
  hospitalsReducer: initialHospitalsState
}
