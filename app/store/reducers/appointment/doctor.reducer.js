import { actionTypes } from '../../actions/appointment/doctor.action'
import { initialDoctorState } from '../../states/appointment/doctor.state'

export const doctorReducer = (state = initialDoctorState, action = {}) => {
  switch (action.type) {
    case actionTypes.INIT_DOCTOR_CODE: {
      return {
        ...state,
        ...{hosDoctCode: action.hosDoctCode},
        ...{hosOrgCode: action.hosOrgCode},
        ...{hosDeptCode: action.hosDeptCode},
        ...{toHosDeptCode: action.toHosDeptCode}
      }
    }
    case actionTypes.UPDATE_DOCTOR_DETAIL:
      return {
        ...state,
        ...{doctorDetail: action.data},
      }
    case actionTypes.UPDATE_APPOINTMENT_LIST:
      return {
        ...state,
        ...{appointmentList: action.data},
      }
    default:
      return state
  }
}

export const doctorState = {
  doctorReducer: initialDoctorState
}
