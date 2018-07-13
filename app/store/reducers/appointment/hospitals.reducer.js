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
        ...{ hospitalsAll: action.data['all'] },
        ...{ hospitalsZH: action.data['zh'] },
        ...{ hospitalsZY: action.data['zy'] },
        ...{ hospitalsZK: action.data['zk'] },
      }
    default:
      return state
  }
}

export const hospitalsState = {
  hospitalsReducer: initialHospitalsState
}
