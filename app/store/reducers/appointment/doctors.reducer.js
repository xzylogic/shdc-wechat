import { actionTypes } from '../../actions/appointment/doctors.action'
import { initialDoctorsState } from '../../states/appointment/doctors.state'

export const doctorsReducer = (state = initialDoctorsState, action = {}) => {
  switch (action.type) {
    case actionTypes.INIT_DOCTORS_CODE: {
      return {
        ...state,
        ...{hosOrgCode: action.hosOrgCode},
        ...{hosDeptCode: action.hosDeptCode},
        ...{toHosDeptCode: action.toHosDeptCode}
      }
    }
    case actionTypes.UPDATE_DOCTORS_BYNAME:
      let dataN = []
      if (action.data && Array.isArray(action.data)) {
        dataN = action.data
      }
      return {
        ...state,
        ...{doctorsByName: dataN},
      }
    case actionTypes.UPDATE_DOCTORS_BYDATE:
      let dataD = []
      if (action.data && Array.isArray(action.data)) {
        dataD = action.data
      }
      return {
        ...state,
        ...{doctorsByDate: dataD},
      }
    default:
      return state
  }
}

export const doctorsState = {
  doctorsReducer: initialDoctorsState
}
