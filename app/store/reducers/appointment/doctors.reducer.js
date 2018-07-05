import { actionTypes } from '../../actions/appointment/doctors.action'
import { initialDoctorsState } from '../../states/appointment/doctors.state'

export const doctorsReducer = (state = initialDoctorsState, action = {}) => {
  switch (action.type) {
    case actionTypes.INIT_DOCTORS_CODE: {
      return {
        ...state,
        ...{hosOrgCode: action.hosOrgCode},
        ...{deptCode: action.deptCode}
      }
    }
    case actionTypes.UPDATE_DOCTORS_BYNAME:
      return {
        ...state,
        ...{doctorsByName: action.data},
      }
    case actionTypes.UPDATE_DOCTORS_BYDATE:
      return {
        ...state,
        ...{doctorsByDate: action.data},
      }
    default:
      return state
  }
}

export const doctorsState = {
  doctorsReducer: initialDoctorsState
}
