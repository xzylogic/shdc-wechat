import { actionTypes } from '../../actions/personal/appointment.action'
import { initialAppointmentState } from '../../states/personal/appointment.state'

export const appointmentReducer = (state = initialAppointmentState, action = {}) => {
  switch (action.type) {
    case actionTypes.UPDATE_MY_APPOINTMENTS:
      return {
        ...state,
        ...{ appointmentList: action.data }
      }
    case actionTypes.UPDATE_APPOINTMENT_PARAM:
      return {
        ...state,
        ...{ searchParam: action.data }
      }
    default:
      return state
  }
}

export const appointmentState = {
  appointmentReducer: initialAppointmentState
}
