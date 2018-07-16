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
    default:
      return state
  }
}

export const consultationState = {
  consultationReducer: initialConsultationState
}
