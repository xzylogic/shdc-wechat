import { actionTypes } from '../../actions/appointment/consultation.action'
import { initialConsultationState } from '../../states/appointment/consultation.state'

export const consultationReducer = (state = initialConsultationState, action = {}) => {
  switch (action.type) {
    case actionTypes.INIT_CONSULTATION_CODE: {
      return {
        ...state,
        ...{hosOrgCode: action.hosOrgCode},
        ...{hosDeptCode: action.hosDeptCode},
        ...{toHosDeptCode: action.toHosDeptCode},
        ...{pageType: action.pageType}
      }
    }
    case actionTypes.UPDATE_CONSULTATION_LIST:
      let data = []
      if (action.data && Array.isArray(action.data)) {
        data = action.data
      }
      return {
        ...state,
        ...{consultationList: data},
      }
    case actionTypes.MODIFY_CONSULTATION_SHOW:
      let mData1 = state.consultationList
      mData1[action.j]['doctors'][action.k]['show'] = !mData1[action.j]['doctors'][action.k]['show']
      return {
        ...state,
        ...{consultationList: mData1},
      }
    case actionTypes.MODIFY_CONSULTATION_SCHEDULE:
      let mData2 = state.consultationList
      mData2[action.j]['doctors'][action.k]['children'] = action.data
      return {
        ...state,
        ...{consultationList: mData2},
      }
    default:
      return state
  }
}

export const consultationState = {
  consultationReducer: initialConsultationState
}
