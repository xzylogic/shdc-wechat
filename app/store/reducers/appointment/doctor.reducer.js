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
    case actionTypes.MODIFY_DOCTOR_SHOW:
      let mData1 = state.appointmentList
      mData1[action.j]['doctors'][action.k]['show'] = !mData1[action.j]['doctors'][action.k]['show']
      return {
        ...state,
        ...{appointmentList: mData1},
      }
    case actionTypes.MODIFY_DOCTOR_SCHEDULE:
      let mData2 = state.appointmentList
      mData2[action.j]['doctors'][action.k]['children'] = action.data
      return {
        ...state,
        ...{appointmentList: mData2},
      }
    default:
      return state
  }
}

export const doctorState = {
  doctorReducer: initialDoctorState
}
